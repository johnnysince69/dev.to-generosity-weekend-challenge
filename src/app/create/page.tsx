"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockGoogleAI, mockElevenLabs } from '@/lib/mocks';
import { Loader2, Wand2, Volume2 } from 'lucide-react';

export default function CreateCampaign() {
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [title, setTitle] = useState('');
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [story, setStory] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleGenerateStory = async () => {
    if (!notes) return;
    setIsGeneratingStory(true);
    try {
      const generatedStory = await mockGoogleAI.generateStory(notes);
      setStory(generatedStory);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const handleGenerateAudio = async () => {
    if (!story) return;
    setIsGeneratingAudio(true);
    try {
      const generatedAudioUrl = await mockElevenLabs.generateAudio(story);
      setAudioUrl(generatedAudioUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save to database here.
    // For now, just redirect to a mock campaign ID.
    const newId = Math.floor(Math.random() * 1000).toString();

    // Store in localStorage so the detail page can read it (mocking a DB)
    localStorage.setItem(`campaign_${newId}`, JSON.stringify({
        title,
        story,
        audioUrl
    }));

    router.push(`/campaign/${newId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Create a Campaign</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 border mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
           <Wand2 className="w-5 h-5 mr-2 text-blue-500" />
           Step 1: AI Story Generation
        </h2>
        <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Campaign Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                placeholder="e.g. Help rebuild local library"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rough Notes</label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                placeholder="Jot down some rough ideas... Google AI will expand them."
              />
            </div>
            <button
              type="button"
              onClick={handleGenerateStory}
              disabled={isGeneratingStory || !notes}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isGeneratingStory ? <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> : null}
              Generate Story with Gemini
            </button>
        </div>
      </div>

      {story && (
        <div className="bg-white rounded-lg shadow-sm p-6 border mb-8">
           <h2 className="text-xl font-bold mb-4 flex items-center">
             <Volume2 className="w-5 h-5 mr-2 text-purple-500" />
             Step 2: AI Voiceover
           </h2>
           <div className="prose max-w-none mb-4 p-4 bg-gray-50 rounded-md text-sm text-gray-700">
               {story}
           </div>

           {!audioUrl ? (
             <button
                 type="button"
                 onClick={handleGenerateAudio}
                 disabled={isGeneratingAudio}
                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
             >
                 {isGeneratingAudio ? <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> : null}
                 Generate Audio with ElevenLabs
             </button>
           ) : (
               <div className="mt-4">
                 <p className="text-sm font-medium text-green-600 mb-2">Audio generated successfully!</p>
                 <audio controls src={audioUrl} className="w-full">
                   Your browser does not support the audio element.
                 </audio>
               </div>
           )}
        </div>
      )}

      {story && audioUrl && title && (
         <div className="flex justify-end">
             <button
                 onClick={handleSubmit}
                 className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
             >
                 Publish Campaign
             </button>
         </div>
      )}
    </div>
  );
}
