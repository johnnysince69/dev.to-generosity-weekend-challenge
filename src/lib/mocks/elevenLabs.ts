export const mockElevenLabs = {
  generateAudio: async (text: string): Promise<string> => {
    // Keep 'text' parameter to simulate standard API structure even if unused in this mock response.
    // Suppress warning by using it in a console.log or similar if strictly needed, or just let the param exist.
    console.debug("Generating audio for length:", text.length);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Return a mock audio URL (a generic sound effect or blank audio for now, or just a placeholder string that the UI handles)
    return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  }
};
