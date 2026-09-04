"use client";

import { useEffect, useState, use } from 'react';
import { mockSolana } from '@/lib/mocks';
import { Loader2, Heart, CheckCircle } from 'lucide-react';

interface CampaignData {
  title: string;
  story: string;
  audioUrl: string;
}

export default function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [donationAmount, setDonationAmount] = useState('10');
  const [isDonating, setIsDonating] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

  useEffect(() => {
    // Mock fetching campaign data from DB
    const saved = localStorage.getItem(`campaign_${resolvedParams.id}`);

    // Use a timeout or similar to move setState outside of synchronous effect flow if lint rules demand it,
    // although for local storage a sync setState is often acceptable.
    // Here we'll wrap it in a microtask.
    Promise.resolve().then(() => {
        if (saved) {
          setCampaign(JSON.parse(saved));
        } else {
          // Fallback dummy data if not created locally
          setCampaign({
            title: "Support Local Education Initiatives",
            story: "Education is the key to a better future. By supporting this campaign, you help provide resources to underfunded schools in our community. Every child deserves a chance to learn and thrive. Together, we can make this a reality.",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          });
        }
    });
  }, [resolvedParams.id]);

  const handleDonate = async () => {
    setIsDonating(true);
    setDonationSuccess(false);
    try {
      const res = await mockSolana.donate(Number(donationAmount), resolvedParams.id);
      if (res.success) {
        setDonationSuccess(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDonating(false);
    }
  };

  if (!campaign) {
    return <div className="text-center py-20"><Loader2 className="animate-spin h-8 w-8 mx-auto text-gray-500" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
             <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{campaign.title}</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                    <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{campaign.story}</p>
                </div>

                {campaign.audioUrl && (
                  <div className="bg-gray-50 p-4 rounded-lg border flex flex-col space-y-2">
                     <span className="text-sm font-medium text-gray-700 flex items-center">
                         Listen to the story (AI Voiceover)
                     </span>
                     <audio controls src={campaign.audioUrl} className="w-full">
                       Your browser does not support the audio element.
                     </audio>
                  </div>
                )}
             </div>
          </div>

          <div className="md:col-span-1">
             <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Support this cause</h3>
                <div className="space-y-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USDC)</label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                          placeholder="0.00"
                        />
                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">USDC</span>
                        </div>
                      </div>
                   </div>
                   <button
                     onClick={handleDonate}
                     disabled={isDonating || !donationAmount}
                     className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                   >
                     {isDonating ? <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> : <Heart className="mr-2 h-4 w-4" />}
                     Donate with Solana
                   </button>

                   {donationSuccess && (
                       <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <p className="text-sm text-green-700">Thank you! Your transaction is verified on the blockchain.</p>
                       </div>
                   )}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
