import Link from 'next/link';
import { getLatestPrices, DailyPriceDoc } from '@/lib/priceService';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';

// Revalidate every 10 minutes to keep data fresh but loads instant
export const revalidate = 600;

export default async function LivePricesPage() {
  let prices: DailyPriceDoc | null = null;

  try {
    // Get latest available prices immediately for instant load
    prices = await getLatestPrices();
    
    // Check if data is missing or from a previous day
    const today = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const dateStr = new Date(today).toISOString().split('T')[0];
    
    if (!prices || prices.date !== dateStr) {
      // Data is missing or old. Trigger sync in the background or proceed to sync if critical.
      // For now, we will perform sync but only if it's the first load of the day.
      const { syncPrices } = await import('@/lib/priceService');
      const synced = await syncPrices();
      if (synced) prices = synced;
    }
  } catch (err: any) {
    console.error("Price page load error:", err);
  }

  if (!prices || !prices.commodities) {
    return (
      <div className="min-h-screen bg-pure-white pt-32 pb-20 text-center flex items-center justify-center">
        <h2 className="text-3xl font-bold text-heading">Market data is currently syncing. Please refresh in a moment.</h2>
      </div>
    );
  }

  const dateObj = new Date(prices.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-pure-white pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-eco-green"></span>
                </div>
                <span className="text-sm font-black text-eco-green uppercase tracking-[0.3em]">Live Market Feed</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-heading mb-6 tracking-tighter leading-[0.9]">
                Global Metal <br/>Spot Rates.
              </h1>
              <p className="text-xl text-body font-medium leading-relaxed">
                Direct indices from global metal exchanges, converted to INR/Kg for real-time industrial valuation and scrap planning.
              </p>
            </div>
            <div className="bg-layer-light p-6 rounded-[2rem] border border-divider shadow-sm min-w-[240px]">
              <p className="text-xs font-black text-body uppercase tracking-widest mb-2 opacity-50">Settlement Date</p>
              <p className="text-lg font-black text-heading">{formattedDate}</p>
              <div className="mt-4 pt-4 border-t border-divider/50 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-corporate-blue" />
                 <span className="text-xs font-bold text-corporate-blue uppercase tracking-wider">Verified by MetalPriceAPI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {prices.commodities.map((category, i) => (
            <div key={i} className="space-y-10">
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-black text-heading uppercase tracking-widest">{category.category}</h2>
                <div className="h-px flex-1 bg-divider" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, j) => (
                  <Link href={`/price/${category.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={j} className="group">
                    <SpotlightCard className="p-8 border-divider shadow-sm group-hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white h-full flex flex-col">
                      <h3 className="text-lg font-black text-body mb-6 group-hover:text-corporate-blue transition-colors uppercase tracking-tight">
                        {item.name}
                      </h3>
                      <div className="mt-auto">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Price per Kg</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-heading tracking-tighter">{item.buyPrice}</span>
                          <span className="text-sm font-bold text-body">/kg</span>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <span className="text-[10px] font-black py-1 px-3 bg-blue-50 text-corporate-blue rounded-full uppercase tracking-tighter">Spot Rate</span>
                          <svg className="w-5 h-5 text-divider group-hover:text-corporate-blue group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto px-6 mt-32">
          <div className="p-12 bg-heading rounded-[3rem] text-white relative overflow-hidden text-center">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Bulk Selling & Enterprise Contracts</h2>
              <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto font-medium">For manufacturing units and large-scale vehicle fleets, we offer premium contract rates and priority fulfillment.</p>
              <Link href="/contact" className="inline-block px-10 py-5 bg-corporate-blue hover:bg-white hover:text-corporate-blue transition-all rounded-2xl font-black text-lg shadow-xl">
                Get Enterprise Quote
              </Link>
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-corporate-blue/20 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
