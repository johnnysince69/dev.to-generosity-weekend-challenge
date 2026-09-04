"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface GenerosityData {
  totalDonated: number;
  activeCampaigns: number;
  topCategories: { name: string; percentage: number }[];
  monthlyTrend: { month: string; amount: number }[];
}

export default function Dashboard() {
  const [data, setData] = useState<GenerosityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const res = await fetch('/api/data/generosity');
        const result = await res.json();
        if (mounted) {
           setData(result as GenerosityData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) {
           setLoading(false);
        }
      }
    }
    loadData();
    return () => { mounted = false; };
  }, []);

  if (loading || !data) {
    return <div className="text-center py-40 min-h-screen"><Loader2 className="animate-spin h-12 w-12 mx-auto text-primary" /></div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-background text-on-surface pb-20">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* Hero Section */}
        <section className="py-12 mb-8 border-b border-white/5">
            <h1 className="font-display-lg text-[40px] md:text-display-lg font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-on-surface/50">
                Impact <br/><span className="text-tertiary drop-shadow-[0_0_15px_rgba(0,221,221,0.5)]">Transparency</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Real-time metrics aggregated securely via Snowflake. Tracking the pulse of global generosity on the blockchain.
            </p>
        </section>

        {/* Global Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

            {/* Metric Card 1 */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 group-hover:bg-primary/30 transition-colors"></div>
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary">public</span>
                    <h3 className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant">Total Global Donations</h3>
                </div>
                <div>
                    <div className="font-headline-lg text-4xl md:text-headline-lg font-bold text-on-surface flex items-baseline gap-2">
                        <span>${data.totalDonated.toLocaleString()}</span>
                        <span className="font-body-md text-primary opacity-80">SOL eqv.</span>
                    </div>
                </div>
            </div>

            {/* Metric Card 2 */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-tertiary/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 group-hover:bg-tertiary/30 transition-colors"></div>
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-tertiary">campaign</span>
                    <h3 className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant">Active Campaigns</h3>
                </div>
                <div>
                    <div className="font-headline-lg text-4xl md:text-headline-lg font-bold text-on-surface">
                        {data.activeCampaigns.toLocaleString()}
                    </div>
                </div>
            </div>

        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Monthly Trend Chart Area */}
            <section className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-2xl">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="font-headline-md text-2xl md:text-headline-md font-semibold mb-2">Monthly Trend</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Donation volume over the last 6 months.</p>
                    </div>
                </div>

                {/* Simulated Chart Container */}
                <div className="relative h-64 w-full border-b border-l border-white/10 flex items-end justify-between pt-4 pb-0 px-2 md:px-4">

                    {/* SVG Line Chart (Simulated) */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Define neon gradient */}
                        <defs>
                            <linearGradient id="neonLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00FFFF" />
                                <stop offset="50%" stopColor="#BF00FF" />
                                <stop offset="100%" stopColor="#FF007F" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* We use the real mock data to draw a rough SVG path relative to max value */}
                        {(() => {
                           const maxAmt = Math.max(...data.monthlyTrend.map(d => d.amount));
                           // Map points to SVG coordinates (0-100 x, 100-0 y)
                           const pts = data.monthlyTrend.map((d, i) => {
                               const x = (i / (data.monthlyTrend.length - 1)) * 100;
                               const y = 100 - ((d.amount / maxAmt) * 80); // leave 20% padding top
                               return `${x},${y}`;
                           });
                           return (
                             <path
                                d={`M ${pts.join(' L ')}`}
                                fill="none"
                                stroke="url(#neonLine)"
                                strokeWidth="2"
                                filter="url(#glow)"
                                vectorEffect="non-scaling-stroke"
                             />
                           );
                        })()}
                    </svg>

                    {/* Data Points overlay */}
                    {data.monthlyTrend.map((item, index) => {
                         const maxAmt = Math.max(...data.monthlyTrend.map(d => d.amount));
                         const heightPct = (item.amount / maxAmt) * 80;
                         return (
                            <div key={index} className="relative flex flex-col items-center group h-full justify-end w-1/5" style={{ height: `${heightPct}%`}}>
                                <div className="absolute -top-3 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff] opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"></div>
                                {/* Tooltip on hover */}
                                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-white/20 px-2 py-1 rounded text-xs whitespace-nowrap z-20 pointer-events-none">
                                    ${item.amount.toLocaleString()}
                                </div>
                            </div>
                         )
                    })}
                </div>

                {/* X-axis labels */}
                <div className="flex justify-between w-full mt-4 text-on-surface-variant font-label-mono text-[10px] md:text-label-mono uppercase px-2 md:px-4">
                    {data.monthlyTrend.map(item => <span key={item.month}>{item.month}</span>)}
                </div>
            </section>

            {/* Top Categories */}
            <section className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col">
                <h2 className="font-headline-md text-2xl md:text-headline-md font-semibold mb-8">Top Impact Sectors</h2>

                <div className="flex flex-col gap-6 flex-grow justify-center">
                    {data.topCategories.map((cat, i) => {
                        // Use different neon colors based on index
                        const colorClass = i === 0 ? 'bg-primary shadow-[0_0_10px_rgba(255,177,196,0.8)]'
                                         : i === 1 ? 'bg-secondary shadow-[0_0_10px_rgba(236,177,255,0.8)]'
                                         : 'bg-tertiary shadow-[0_0_10px_rgba(0,221,221,0.8)]';
                        return (
                        <div key={cat.name} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center font-label-mono text-label-mono text-on-surface">
                                <span>{cat.name}</span>
                                <span>{cat.percentage}%</span>
                            </div>
                            <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${cat.percentage}%` }}></div>
                            </div>
                        </div>
                    )})}
                </div>

                <button className="mt-8 w-full py-3 border border-white/10 rounded-full font-button-text text-button-text text-on-surface-variant hover:bg-white/5 hover:text-white transition-colors">
                    View Full Breakdown
                </button>
            </section>
        </div>

      </div>
    </div>
  );
}
