export const mockGoogleAI = {
  generateStory: async (notes: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `This is a compelling story generated from your notes: "${notes}".

It highlights the struggles and the importance of this cause. Your contribution can make a real difference. Imagine a world where this problem is solved. That's what we are working towards.

We need your help to reach our goal. Every little bit counts. Together, we can make an impact.`;
  },
  translateStory: async (story: string, language: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `[Translated to ${language}]: ${story}`;
  }
};
