import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { saveDailyPrices, getTodayPrices, DailyPriceDoc, CommodityPrice, ScrapPriceItem } from '@/lib/priceService';

// Force dynamic so it always executes
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Get current date in IST
    const today = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const dateObj = new Date(today);
    const dateStr = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD

    // 2. Check if we already scraped today
    const existingPrices = await getTodayPrices(dateStr);
    if (existingPrices) {
      return NextResponse.json({ success: true, message: "Already synced today", data: existingPrices });
    }

    // 3. Fetch from scrapc.com
    const response = await fetch("https://scrapc.com/news/delhi-scrap-price-today/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      next: { revalidate: 0 } // no cache
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const commodities: CommodityPrice[] = [];
    let currentCategory = "";
    let currentItems: ScrapPriceItem[] = [];

    // Parse logic matching test script
    const rows = $('table tr');
    
    rows.each((i, row) => {
      // Skip header rows
      if (i < 2) return;

      const cells = $(row).find('td, th');
      const text1 = $(cells[0]).text().trim();
      const text2 = $(cells[1]).text().trim();
      const text3 = $(cells[2]).text().trim();

      // If it's a category header (like COPPER, BRASS, ALUMINIUM) where buy/sell prices are empty
      if (text1 && !text2 && !text3) {
        // Save previous category before starting new one
        if (currentCategory && currentItems.length > 0) {
          commodities.push({
            category: currentCategory,
            items: currentItems
          });
        }
        currentCategory = text1;
        currentItems = [];
      } else if (text1 && text2) {
        // It's a valid item row
        currentItems.push({
          name: text1,
          buyPrice: text2,
          sellPrice: text3
        });
      }
    });

    // Push the very last category
    if (currentCategory && currentItems.length > 0) {
      commodities.push({
        category: currentCategory,
        items: currentItems
      });
    }

    if (commodities.length === 0) {
      throw new Error("Parsing failed, no commodities found.");
    }

    const dailyData: DailyPriceDoc = {
      date: dateStr,
      timestamp: Date.now(),
      commodities: commodities
    };

    // 4. Save to Firebase via admin
    const success = await saveDailyPrices(dailyData);

    if (!success) {
      throw new Error("Failed to save to Firestore");
    }

    return NextResponse.json({ success: true, message: "Scraped and saved successfully", data: dailyData });

  } catch (error: any) {
    console.error("Scraping error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
