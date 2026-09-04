"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockGoogleAI, mockElevenLabs } from '@/lib/mocks';
import { Loader2 } from 'lucide-react';

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
    const newId = Math.floor(Math.random() * 1000).toString();
    localStorage.setItem(`campaign_${newId}`, JSON.stringify({
        title,
        story,
        audioUrl
    }));
    router.push(`/campaign/${newId}`);
  };

  return (
    <div className="pt-20 min-h-screen bg-background text-on-background pb-20 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-12">

            <header className="mb-12 text-center md:text-left">
                <h1 className="font-headline-lg text-4xl md:text-headline-lg font-bold mb-4 drop-shadow-md">Create Campaign</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Launch your vision. Let AI amplify your voice.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Form Inputs Section */}
                <section className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-4">
                        <span className="material-symbols-outlined text-primary" data-icon="edit_document">edit_document</span>
                        <h2 className="font-headline-md text-xl md:text-headline-md font-semibold text-on-surface">Campaign Details</h2>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-label-mono text-label-mono uppercase text-on-surface-variant ml-2 tracking-widest">Campaign Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-surface/50 border border-white/10 rounded-xl px-4 py-4 text-on-surface focus:outline-none focus:border-primary focus:shadow-[0_4px_20px_rgba(255,177,196,0.15)] transition-all font-body-md placeholder:text-on-surface-variant/50"
                            placeholder="e.g., Clean Water for Tech Villages"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-label-mono text-label-mono uppercase text-on-surface-variant ml-2 tracking-widest">Rough Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="bg-surface/50 border border-white/10 rounded-xl px-4 py-4 text-on-surface focus:outline-none focus:border-primary focus:shadow-[0_4px_20px_rgba(255,177,196,0.15)] transition-all font-body-md placeholder:text-on-surface-variant/50 min-h-[150px] resize-y"
                            placeholder="Jot down the problem, the solution, and who it helps... Gemini will do the rest."
                            required
                        ></textarea>
                    </div>
                </section>

                {/* AI Interaction Section */}
                <section className="flex flex-col items-center">
                    <button
                        type="button"
                        onClick={handleGenerateStory}
                        disabled={isGeneratingStory || !notes}
                        className="group relative flex items-center justify-center gap-3 w-full md:w-auto bg-surface-container border border-primary/40 rounded-full py-4 px-8 overflow-hidden hover:border-primary transition-colors disabled:opacity-50"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        {isGeneratingStory ? <Loader2 className="animate-spin text-primary" /> : <span className="material-symbols-outlined text-primary" data-icon="auto_awesome">auto_awesome</span>}
                        <span className="font-button-text text-button-text text-primary">Generate Story with Gemini</span>
                    </button>
                </section>

                {/* AI Output Section */}
                {story && (
                  <section className="glass-panel p-6 md:p-8 rounded-2xl border-primary/20 shadow-[0_0_20px_rgba(255,177,196,0.05)] relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-transparent"></div>
                      <h3 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-4 tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                          Generated Narrative
                      </h3>
                      <div className="font-body-md text-body-md text-on-surface/90 leading-relaxed max-h-[300px] overflow-y-auto pr-2 custom-scrollbar whitespace-pre-wrap">
                          {story}
                      </div>
                  </section>
                )}

                {/* Audio Action Section */}
                {story && (
                  <section className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both">

                      {!audioUrl ? (
                          <button
                              type="button"
                              onClick={handleGenerateAudio}
                              disabled={isGeneratingAudio}
                              className="group flex items-center justify-center gap-3 w-full md:w-auto bg-surface-container border border-secondary/40 rounded-full py-4 px-8 hover:border-secondary transition-colors disabled:opacity-50"
                          >
                              {isGeneratingAudio ? <Loader2 className="animate-spin text-secondary" /> : <span className="material-symbols-outlined text-secondary" data-icon="graphic_eq">graphic_eq</span>}
                              <span className="font-button-text text-button-text text-secondary">Generate Audio with ElevenLabs</span>
                          </button>
                      ) : (
                          <div className="glass-panel p-4 rounded-full flex items-center gap-4 w-full md:w-auto border-tertiary/30 shadow-[0_0_15px_rgba(0,221,221,0.1)]">
                              <span className="material-symbols-outlined text-tertiary ml-2" data-icon="play_circle">play_circle</span>
                              <span className="font-label-mono text-xs text-on-surface">Audio Ready. Check campaign page to play.</span>
                              <span className="material-symbols-outlined text-tertiary/50 mr-2" data-icon="check_circle">check_circle</span>
                          </div>
                      )}
                  </section>
                )}

                {/* Submit Action */}
                {story && title && (
                    <div className="pt-8 flex justify-center border-t border-white/5 animate-in fade-in duration-500 delay-300 fill-mode-both">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-secondary text-on-primary font-headline-md text-xl font-bold py-5 rounded-2xl shadow-[0_0_30px_rgba(255,177,196,0.2)] hover:shadow-[0_0_40px_rgba(236,177,255,0.4)] transition-all hover:-translate-y-1 active:translate-y-0"
                        >
                            Publish Campaign
                        </button>
                    </div>
                )}
            </form>
        </div>
    </div>
  );
}
