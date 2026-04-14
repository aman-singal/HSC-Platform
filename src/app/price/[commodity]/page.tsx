import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPriceHistory, getLatestPrices } from '@/lib/priceService';
import { PriceChart } from '@/components/prices/PriceChart';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Force dynamic
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ commodity: string }> }) {
  const { commodity } = await params;
  const decoded = decodeURIComponent(commodity);
  const capitalized = decoded.charAt(0).toUpperCase() + decoded.slice(1);
  return {
    title: `Live ${capitalized} Scrap Price Today in India | Hindustan Scrap Corporation`,
    description: `Check the latest live scrap market prices for ${capitalized} in India. Track historical trends and get accurate daily updates directly from the official market.`
  };
}

export default async function CommodityDetailPage({ params }: { params: Promise<{ commodity: string }> }) {
  const { commodity } = await params;
  const decoded = decodeURIComponent(commodity);
  
  const history = await getPriceHistory(decoded, 30);
  
  // If we have no history, then this commodity doesn't exist or isn't tracked
  if (!history || history.length === 0) {
    notFound();
  }

  const latestRecord = history[history.length - 1]; // Because history was reversed to chronological
  const todayItems = latestRecord.items;
  
  // Try to find yesterday's data
  const yesterdayRecord = history.length > 1 ? history[history.length - 2] : null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-pure-white pt-32 pb-32">
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <Link href="/price" className="inline-flex items-center text-sm font-bold text-corporate-blue hover:text-blue-800 transition-colors mb-8">
             &larr; Back to Market Index
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-divider pb-10">
            <div>
              <div className="inline-block px-5 py-1.5 rounded-full border border-corporate-blue/20 bg-blue-50 text-corporate-blue text-xs font-black tracking-[0.2em] uppercase mb-6 shadow-sm">
                Commodity Detail
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-heading tracking-tighter uppercase">
                {decoded}
              </h1>
            </div>
            
            <div className="text-left md:text-right">
               <p className="text-sm font-bold text-body uppercase tracking-widest mb-2">Last Updated</p>
               <p className="text-xl font-black text-heading">
                 {new Date(latestRecord.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
               </p>
            </div>
          </div>
        </div>

        {/* 30-Day Trend Chart */}
        <div className="max-w-6xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-black text-heading tracking-tight mb-8">30-Day Market Trend</h2>
          <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-divider shadow-sm hover:shadow-xl transition-all duration-300">
            <PriceChart historyData={history} />
          </div>
        </div>

        {/* Live Rates Data Table */}
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black text-heading tracking-tight mb-8">Live Item Rates</h2>
          
          <div className="bg-white rounded-[2rem] border border-divider shadow-sm overflow-hidden text-left">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-layer-light border-b border-divider">
                    <th className="p-6 text-sm font-black text-heading uppercase tracking-widest text-left">Scrap Item</th>
                    <th className="p-6 text-sm font-black text-heading uppercase tracking-widest text-left">Buy Price (₹)</th>
                    <th className="p-6 text-sm font-black text-heading uppercase tracking-widest text-left">Sell Price (₹)</th>
                    <th className="p-6 text-sm font-black text-heading uppercase tracking-widest text-left">Trend (1D)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider">
                  {todayItems.map((item: any, i: number) => {
                     // Calculate trend if yesterday exists
                     let trendIcon = <span className="text-slate-400 font-bold">-</span>;
                     if (yesterdayRecord && yesterdayRecord.items) {
                       const yItem = yesterdayRecord.items.find((y: any) => y.name === item.name);
                       if (yItem) {
                          const tBuy = parseFloat(item.buyPrice);
                          const yBuy = parseFloat(yItem.buyPrice);
                          if (!isNaN(tBuy) && !isNaN(yBuy)) {
                            if (tBuy > yBuy) {
                              trendIcon = <span className="text-green-500 font-bold flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> +₹{(tBuy - yBuy).toFixed(2)}</span>;
                            } else if (tBuy < yBuy) {
                              trendIcon = <span className="text-red-500 font-bold flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg> -₹{(yBuy - tBuy).toFixed(2)}</span>;
                            }
                          }
                       }
                     }

                     return (
                        <tr key={i} className="hover:bg-layer-light/50 transition-colors">
                          <td className="p-6">
                            <span className="font-bold text-heading text-lg">{item.name}</span>
                          </td>
                          <td className="p-6 font-black text-corporate-blue text-xl">
                            {item.buyPrice ? `₹${item.buyPrice}` : '-'}
                          </td>
                          <td className="p-6 font-black text-heading text-xl">
                            {item.sellPrice ? `₹${item.sellPrice}` : '-'}
                          </td>
                          <td className="p-6">
                            {trendIcon}
                          </td>
                        </tr>
                     );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}
