"use client";

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface PriceChartProps {
  historyData: any[];
}

export function PriceChart({ historyData }: PriceChartProps) {
  // historyData contains [{ date: '2026-04-14', items: [{ name: 'Brass Honey', buyPrice: '812', sellPrice: '' }] }]
  
  // We will pick up to 3 keys that have the most complete data to plot
  const chartData = useMemo(() => {
    if (!historyData || historyData.length === 0) return [];
    
    // Transform into flat objects for Recharts
    // e.g. { date: 'Apr 14', 'Brass Honey': 812, 'Brass Purja': 767 }
    return historyData.map((record) => {
      const dataPoint: any = { date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
      
      if (record.items && Array.isArray(record.items)) {
        record.items.forEach((item: any) => {
          // Attempt to map buyPrice. If buyPrice is empty, check sellPrice.
          let price = parseFloat(item.buyPrice);
          if (isNaN(price)) {
             price = parseFloat(item.sellPrice);
          }
          if (!isNaN(price)) {
            dataPoint[item.name] = price;
          }
        });
      }
      return dataPoint;
    });
  }, [historyData]);

  // Extract unique item names from the latest record
  const dataKeys = useMemo(() => {
    if (chartData.length === 0) return [];
    const latest = chartData[chartData.length - 1];
    return Object.keys(latest).filter(k => k !== 'date').slice(0, 5); // Limit to top 5 lines to avoid clutter
  }, [chartData]);

  const colors = ['#0050ff', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (chartData.length <= 1) {
    return (
       <div className="h-64 flex items-center justify-center text-body border border-divider rounded-3xl bg-layer-light/50">
         <p className="font-medium text-lg">Not enough historical data to generate a chart.</p>
       </div>
    )
  }

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
             dataKey="date" 
             axisLine={false} 
             tickLine={false} 
             tick={{ fill: '#64748B', fontWeight: 600 }}
             dy={10}
          />
          <YAxis 
             axisLine={false} 
             tickLine={false} 
             tick={{ fill: '#64748B', fontWeight: 600 }}
             domain={['auto', 'auto']}
             tickFormatter={(val) => `₹${val}`}
          />
          <Tooltip 
             contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '16px' }}
             itemStyle={{ fontWeight: 700 }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
