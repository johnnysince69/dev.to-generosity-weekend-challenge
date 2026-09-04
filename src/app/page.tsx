import Link from 'next/link';
import { ArrowRight, Globe, Mic, Database } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">The Transparent Voice of</span>
          <span className="block text-rose-500">Generosity</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Aura amplifies charitable causes through AI-enhanced storytelling, accessible audio, and transparent blockchain micro-donations.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link href="/create" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 md:py-4 md:text-lg md:px-10">
              Start a Campaign
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link href="/dashboard" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-rose-500 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              View Analytics
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-12">Powered by cutting-edge tech</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Google AI</h3>
                <p className="mt-5 text-base text-gray-500">
                  Transforms rough notes into compelling, multi-lingual stories.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                    <Mic className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">ElevenLabs</h3>
                <p className="mt-5 text-base text-gray-500">
                  Generates high-quality, emotional audio voiceovers for accessibility.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                    <Database className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Solana</h3>
                <p className="mt-5 text-base text-gray-500">
                  Enables near-instant, transparent blockchain micro-donations.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                    <Database className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Snowflake</h3>
                <p className="mt-5 text-base text-gray-500">
                  Aggregates transparent analytics and generosity trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
         <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Campaigns</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-white rounded-lg shadow-sm p-6 border text-left flex flex-col">
                 <h3 className="font-bold text-lg mb-2">Campaign {id}</h3>
                 <p className="text-gray-500 mb-4 flex-grow">A brief description of this mock campaign showing how we can help people in need.</p>
                 <Link href={`/campaign/${id}`} className="text-rose-500 font-medium hover:text-rose-600 flex items-center">
                   View details <ArrowRight className="ml-1 w-4 h-4" />
                 </Link>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
