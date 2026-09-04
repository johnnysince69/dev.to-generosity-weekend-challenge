"use client";

import { useEffect, useState } from 'react';
import { mockSnowflake } from '@/lib/mocks';
import { Loader2, TrendingUp, Users, DollarSign } from 'lucide-react';

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
        const result = await mockSnowflake.getGlobalGenerosityData();
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
    return <div className="text-center py-20"><Loader2 className="animate-spin h-8 w-8 mx-auto text-gray-500" /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Transparency Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">
          Powered by Snowflake. All data is aggregated anonymously from the Solana blockchain to ensure complete transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Global Donations</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      ${data.totalDonated.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Campaigns</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {data.activeCampaigns}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-indigo-500"/>
            Monthly Trend
          </h3>
          <div className="space-y-4">
            {data.monthlyTrend.map((item) => (
              <div key={item.month} className="flex items-center">
                <span className="w-12 text-sm text-gray-500">{item.month}</span>
                <div className="flex-1 ml-4 relative h-4 bg-gray-100 rounded-full overflow-hidden">
                   <div
                     className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full"
                     style={{ width: `${(item.amount / 200000) * 100}%` }}
                   />
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Top Categories
          </h3>
           <div className="space-y-4">
            {data.topCategories.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
