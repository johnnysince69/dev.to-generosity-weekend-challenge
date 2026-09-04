"use client";

import { useEffect, useState, use } from 'react';
import { Loader2 } from 'lucide-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

interface CampaignData {
  id: string;
  title: string;
  story: string;
  audioUrl: string;
}

export default function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [donationAmount, setDonationAmount] = useState('0.1');
  const [isDonating, setIsDonating] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const res = await fetch(`/api/campaigns/${resolvedParams.id}`);
        if (res.ok) {
           const data = await res.json();
           setCampaign(data);
        }
      } catch (error) {
        console.error("Failed to fetch campaign", error);
      }
    }
    fetchCampaign();
  }, [resolvedParams.id]);

  const handleDonate = async () => {
    setErrorMsg('');
    if (!publicKey) {
        setErrorMsg('Please connect your wallet first');
        return;
    }

    setIsDonating(true);
    setDonationSuccess(false);
    try {
      // Mock receiver address for the hackathon
      const receiverPubKey = new PublicKey("11111111111111111111111111111111");

      const transaction = new Transaction().add(
          SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: receiverPubKey,
              lamports: Number(donationAmount) * LAMPORTS_PER_SOL,
          })
      );

      const signature = await sendTransaction(transaction, connection);

      // Await confirmation
      await connection.confirmTransaction(signature, 'processed');

      // Record to DB
      await fetch('/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              amount: Number(donationAmount),
              transactionId: signature,
              campaignId: resolvedParams.id
          })
      });

      setDonationSuccess(true);
    } catch (e: unknown) {
      console.error(e);
      setErrorMsg((e as Error).message || 'Transaction failed');
    } finally {
      setIsDonating(false);
    }
  };

  if (!campaign) {
    return <div className="text-center py-20 min-h-screen"><Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" /></div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-background text-on-background pb-20">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="md:col-span-2 space-y-8">
                <div>
                   <h1 className="text-3xl font-extrabold text-on-surface mb-4">{campaign.title}</h1>
                   <div className="glass-panel p-6 rounded-lg shadow-sm mb-6">
                       <p className="whitespace-pre-wrap text-on-surface-variant leading-relaxed">{campaign.story}</p>
                   </div>

                   {campaign.audioUrl && (
                     <div className="glass-panel p-4 rounded-lg flex flex-col space-y-2">
                        <span className="text-sm font-medium text-on-surface flex items-center">
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
                <div className="glass-panel rounded-lg shadow-sm border p-6 sticky top-24">
                   <h3 className="text-lg font-bold text-on-surface mb-4">Support this cause</h3>
                   <div className="space-y-4">
                      <div>
                         <label className="block text-sm font-medium text-on-surface-variant mb-1">Amount (SOL)</label>
                         <div className="relative rounded-md shadow-sm">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <span className="text-on-surface-variant sm:text-sm">◎</span>
                           </div>
                           <input
                             type="number"
                             value={donationAmount}
                             onChange={(e) => setDonationAmount(e.target.value)}
                             step="0.01"
                             className="bg-surface/50 text-on-surface focus:ring-tertiary focus:border-tertiary block w-full pl-7 pr-12 sm:text-sm border-white/10 rounded-md py-2 px-3 border"
                             placeholder="0.00"
                           />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                             <span className="text-on-surface-variant sm:text-sm">SOL</span>
                           </div>
                         </div>
                      </div>
                      <button
                        onClick={handleDonate}
                        disabled={isDonating || !donationAmount || !publicKey}
                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-on-primary bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(255,177,196,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all"
                      >
                        {isDonating ? <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-on-primary" /> : null}
                        {!publicKey ? "Connect Wallet to Donate" : "Donate with Solana"}
                      </button>

                      {errorMsg && (
                          <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-md">
                              <p className="text-sm text-error">{errorMsg}</p>
                          </div>
                      )}

                      {donationSuccess && (
                          <div className="mt-4 p-3 bg-tertiary/10 border border-tertiary/20 rounded-md flex items-start">
                             <span className="material-symbols-outlined text-tertiary mr-2 flex-shrink-0">check_circle</span>
                             <p className="text-sm text-tertiary">Thank you! Your transaction is verified on the blockchain.</p>
                          </div>
                      )}
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
