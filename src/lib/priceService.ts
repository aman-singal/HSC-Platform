import { adminDb, firebaseAdmin } from './firebaseAdmin';

export interface ScrapPriceItem {
  name: string;
  buyPrice: string;
  sellPrice: string;
}

export interface CommodityPrice {
  category: string;
  items: ScrapPriceItem[];
}

export interface DailyPriceDoc {
  date: string; // YYYY-MM-DD
  timestamp: any;
  commodities: CommodityPrice[];
}

const COLLECTION_NAME = 'scrap_prices';

export const getLatestPrices = async (): Promise<DailyPriceDoc | null> => {
  try {
    if (!adminDb) return null;
    const snapshot = await adminDb
      .collection(COLLECTION_NAME)
      .orderBy('date', 'desc')
      .limit(1)
      .get();
      
    if (!snapshot.empty) {
      return snapshot.docs[0].data() as DailyPriceDoc;
    }
    return null;
  } catch (error: any) {
    if (error.message?.includes('credentials')) {
       console.warn("Firebase Admin credentials not found.");
       return null;
    }
    console.error("Error getting latest prices:", error);
    return null;
  }
};

export const getTodayPrices = async (dateStr: string): Promise<DailyPriceDoc | null> => {
  try {
    if (!adminDb) return null;
    const docRef = await adminDb.collection(COLLECTION_NAME).doc(dateStr).get();
    if (docRef.exists) {
      return docRef.data() as DailyPriceDoc;
    }
    return null;
  } catch (error: any) {
    if (error.message?.includes('credentials')) {
      console.warn("Firebase Admin credentials not found. Live prices sync will be skipped.");
      return null;
    }
    console.error("Error getting today prices:", error);
    return null;
  }
};

export const getPriceHistory = async (category: string, days: number = 30): Promise<any[]> => {
  try {
    if (!adminDb) return [];
    const snapshot = await adminDb
      .collection(COLLECTION_NAME)
      .orderBy('date', 'desc')
      .limit(days)
      .get();
      
    const history = snapshot.docs.map(doc => {
      const data = doc.data() as DailyPriceDoc;
      const commodity = data.commodities.find(c => c.category.toLowerCase() === category.toLowerCase());
      return {
        date: data.date,
        items: commodity ? commodity.items : []
      };
    });
    
    return history.reverse(); // Chronological order
  } catch (error: any) {
     if (error.message?.includes('credentials')) return [];
    console.error("Error getting price history:", error);
    return [];
  }
};

export const saveDailyPrices = async (data: DailyPriceDoc) => {
  try {
    if (!adminDb) return false;
    await adminDb.collection(COLLECTION_NAME).doc(data.date).set({
      ...data,
      timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error: any) {
    if (error.message?.includes('credentials')) return false;
    console.error("Error saving daily prices:", error);
    return false;
  }
};

export const syncPrices = async (): Promise<DailyPriceDoc | null> => {
  try {
    const today = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const dateObj = new Date(today);
    const dateStr = dateObj.toISOString().split('T')[0];

    // This will return null gracefully if credentials are missing
    const existingPrices = await getTodayPrices(dateStr);
    if (existingPrices) return existingPrices;

    // Check if we even have admin access to save before scraping
    if (!adminDb) return null;

    const cheerio = await import('cheerio');
    const response = await fetch("https://scrapc.com/news/delhi-scrap-price-today/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) return null;

    const html = await response.text();
    const $ = cheerio.load(html);

    const commodities: CommodityPrice[] = [];
    let currentCategory = "";
    let currentItems: ScrapPriceItem[] = [];

    $('table tr').each((i, row) => {
      if (i < 2) return;
      const cells = $(row).find('td, th');
      const text1 = $(cells[0]).text().trim();
      const text2 = $(cells[1]).text().trim();
      const text3 = $(cells[2]).text().trim();

      if (text1 && !text2 && !text3) {
        if (currentCategory && currentItems.length > 0) {
          commodities.push({ category: currentCategory, items: currentItems });
        }
        currentCategory = text1;
        currentItems = [];
      } else if (text1 && text2) {
        currentItems.push({ name: text1, buyPrice: text2, sellPrice: text3 });
      }
    });

    if (currentCategory && currentItems.length > 0) {
      commodities.push({ category: currentCategory, items: currentItems });
    }

    if (commodities.length > 0) {
      const dailyData: DailyPriceDoc = { date: dateStr, timestamp: Date.now(), commodities };
      await saveDailyPrices(dailyData);
      return dailyData;
    }
    return null;
  } catch (error) {
    console.error("Sync error:", error);
    return null;
  }
};
