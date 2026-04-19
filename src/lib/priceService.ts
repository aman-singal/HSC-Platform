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


export const syncMetalPriceApi = async (): Promise<any | null> => {
  try {
    const today = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const dateObj = new Date(today);
    const dateStr = dateObj.toISOString().split('T')[0];

    const API_KEY = "8c9acb58797879a19bcf19ebc1bb5003";
    const SYMBOLS = "XAU,XAG,ALU,XCU,ZNC,NI,XPB,XSN,IRON,STEEL"; // Added IRON and STEEL
    
    // We already check if synced today in the route, but we can double check here or just proceed
    // The requirement says "fetch once a day", which is handled by the caller checking getTodayPrices.

    let url = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=INR&currencies=${SYMBOLS}`;
    let response = await fetch(url);
    let json = await response.json();

    if (!json.success && json.error?.statusCode === 416) {
      console.warn("MetalPriceAPI: Plan restriction detected. Retrying with precious metals only...");
      // Retry with only Gold/Silver which are usually free
      url = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=INR&currencies=XAU,XAG`;
      response = await fetch(url);
      json = await response.json();
    }

    if (!json.success) {
      console.warn("MetalPriceAPI fetch failed:", json.error);
      return null;
    }

    const rates = json.rates;
    const items: ScrapPriceItem[] = [];
    
    // Price of 1 Troy Ounce in INR
    // Precious metals are mostly per troy ounce
    // Others are per ounce (avoirdupois) or troy ounce depending on API
    // Documentation says: "All precious metal rates are expressed in per troy ounce. All other metals are expressed in per ounce."
    const TROY_OZ_TO_KG = 0.0311034768;
    const OZ_TO_KG = 0.0283495231;

    const metalConfig: Record<string, { name: string, isPrecious: boolean }> = {
      "XAU": { name: "Gold (Pure)", isPrecious: true },
      "XAG": { name: "Silver", isPrecious: true },
      "ALU": { name: "Aluminum", isPrecious: false },
      "XCU": { name: "Copper", isPrecious: false },
      "ZNC": { name: "Zinc", isPrecious: false },
      "NI": { name: "Nickel", isPrecious: false },
      "XPB": { name: "Lead", isPrecious: false },
      "XSN": { name: "Tin", isPrecious: false },
      "IRON": { name: "Iron Ore", isPrecious: false },
      "STEEL": { name: "Steel", isPrecious: false },
    };

    for (const [symbol, rate] of Object.entries(rates)) {
      // API can return INR symbol directly (like INRXAU) 
      const pureSymbol = symbol.startsWith("INR") ? symbol.replace("INR", "") : symbol;
      const config = metalConfig[pureSymbol];
      
      if (config) {
        const pricePerUnitInINR = rate as number;
        // If the rate is quoted as 1 INR = X units, we invert it
        // Check if rate is very small (likely Quote per INR) or large (INR per unit)
        // Usually, Latest with Base=INR returns INR per unit for metals if standard
        // But our previous check showed: 1 INR = 0.0000022352 XAU
        // So Price per unit = 1 / rate
        
        let pricePerUnit = pricePerUnitInINR;
        if (pricePerUnit < 1) {
          pricePerUnit = 1 / pricePerUnit;
        }

        const factor = config.isPrecious ? TROY_OZ_TO_KG : OZ_TO_KG;
        const pricePerKg = Math.round(pricePerUnit / factor);
        
        items.push({
          name: config.name,
          buyPrice: `₹${pricePerKg}`,
          sellPrice: `₹${Math.round(pricePerKg * 1.05)}`
        });
      }
    }

    if (items.length > 0) {
      const metalCategory: CommodityPrice = {
        category: "Global Metal Rates (INR/Kg)",
        items: items
      };
      return metalCategory;
    }
    return null;
  } catch (error) {
    console.error("MetalPriceAPI Sync error:", error);
    return null;
  }
};

export const syncPrices = async (): Promise<DailyPriceDoc | null> => {
  try {
    const today = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const dateObj = new Date(today);
    const dateStr = dateObj.toISOString().split('T')[0];

    const existingPrices = await getTodayPrices(dateStr);
    if (existingPrices) return existingPrices;

    if (!adminDb) return null;

    const commodities: CommodityPrice[] = [];

    // 1. Fetch from MetalPriceAPI (Primary)
    const metalApiCategory = await syncMetalPriceApi();
    if (metalApiCategory) {
      const precious = ["Gold (Pure)", "Silver"];
      const industrial = ["Aluminum", "Copper", "Zinc", "Nickel", "Lead", "Tin", "Iron Ore", "Steel"];

      const preciousItems = metalApiCategory.items.filter((i: any) => precious.includes(i.name));
      const industrialItems = metalApiCategory.items.filter((i: any) => industrial.includes(i.name));

      if (preciousItems.length > 0) {
        commodities.push({ category: "Precious Metals", items: preciousItems });
      }
      if (industrialItems.length > 0) {
        commodities.push({ category: "Industrial Scrap", items: industrialItems });
      }
    }

    // 2. Fallback Scraper (If API was insufficient or restricted)
    // We run this if we have few industrial items, as base metals are often restricted in free plans
    const hasBaseMetals = commodities.some(c => c.category === "Industrial Scrap" && c.items.length > 2);
    
    if (!hasBaseMetals) {
      try {
        const cheerio = await import('cheerio');
        const scResp = await fetch("https://scrapc.com/news/delhi-scrap-price-today/", {
          headers: { "User-Agent": "Mozilla/5.0" },
          next: { revalidate: 0 }
        });

        if (scResp.ok) {
          const html = await scResp.text();
          const $ = cheerio.load(html);
          let currentCategory = "";
          let currentItems: ScrapPriceItem[] = [];

          $('table tr').each((i, row) => {
            if (i < 2) return;
            const cells = $(row).find('td, th');
            const t1 = $(cells[0]).text().trim();
            const t2 = $(cells[1]).text().trim();
            const t3 = $(cells[2]).text().trim();

            if (t1 && !t2 && !t3) {
              if (currentCategory && currentItems.length > 0) {
                commodities.push({ category: currentCategory, items: currentItems });
              }
              currentCategory = t1;
              currentItems = [];
            } else if (t1 && t2) {
              currentItems.push({ name: t1, buyPrice: t2, sellPrice: t3 });
            }
          });
          if (currentCategory && currentItems.length > 0) {
            commodities.push({ category: currentCategory, items: currentItems });
          }
        }
      } catch (err) {
        console.warn("Scraper fallback failed:", err);
      }
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
