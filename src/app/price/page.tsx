import Link from 'next/link';
import { getLatestPrices, DailyPriceDoc } from '@/lib/priceService';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Force dynamic to ensure data is fresh and avoid prerender errors with missing envs
export const dynamic = 'force-dynamic';

export default async function LivePricesPage() {
  // First check if sync is needed or just get the latest
  let prices: DailyPriceDoc | null = null;
  let syncMessage = "";

  try {
    // This fetch runs on the server side to trigger sync API
    // We use absolute URL for server-side fetch or just call the sync logic.
    // Instead of fetch, we can just call getLatestPrices assuming a cron handles the sync,
    // or we can call syncPrices() directly since it's a server component!
    const { syncPrices } = await import('@/lib/priceService');
    const syncedData = await syncPrices();
    
    if (syncedData) {
      prices = syncedData;
    } else {
      prices = await getLatestPrices();
    }
  } catch (err: any) {
    prices = await getLatestPrices();
  }

  if (!prices || !prices.commodities) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 text-center flex items-center justify-center">
        <h2 className="text-3xl font-bold">Prices are currently unavailable. Please try again later.</h2>
      </div>
    );
  }

  const dateObj = new Date(prices.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-pure-white pt-32 pb-32">
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <div className="inline-block px-5 py-2 rounded-full border border-corporate-blue/20 bg-blue-50 text-corporate-blue text-xs font-black tracking-[0.2em] uppercase mb-8 shadow-sm">
            Market Index
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-heading mb-6 tracking-tighter">
            Live Scrap Prices
          </h1>
          <p className="text-xl text-body font-medium leading-relaxed max-w-2xl mx-auto mb-4">
            Daily updated market rates for metals and materials.
          </p>
          <p className="text-sm font-bold bg-layer-light inline-block px-4 py-2 rounded-full border border-divider shadow-sm">
            Last Updated: {formattedDate}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prices.commodities.map((item, i) => {
            const slug = item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            
            // Calculate a dummy average or just show first item price
            const firstItem = item.items[0];
            const avgPrice = firstItem ? firstItem.buyPrice : 'N/A';
            
            return (
              <Link href={`/price/${slug}`} key={i} className="block group">
                <SpotlightCard className="h-full p-8 border-divider shadow-sm group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 cursor-pointer bg-white">
                   <div className="flex justify-between items-start mb-8">
                     <h2 className="text-3xl font-black text-heading tracking-tight uppercase group-hover:text-corporate-blue transition-colors">
                       {item.category}
                     </h2>
                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-corporate-blue opacity-0 group-hover:opacity-100 transition-opacity">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                     </div>
                   </div>
                   
                   <p className="text-sm font-bold text-body uppercase tracking-wider mb-2">Starting From</p>
                   <p className="text-4xl font-black text-corporate-blue mb-4">
                     ₹{avgPrice} <span className="text-lg text-body font-bold">/kg</span>
                   </p>
                   
                   <div className="pt-6 border-t border-divider mt-auto flex items-center justify-between text-sm">
                     <span className="font-bold text-heading">{item.items.length} variants available</span>
                     <span className="text-corporate-blue font-bold group-hover:underline decoration-2 underline-offset-4">View History</span>
                   </div>
                </SpotlightCard>
              </Link>
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
