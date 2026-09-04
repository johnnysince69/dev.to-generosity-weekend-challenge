import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { notes } = await req.json();

    if (!notes) {
      return NextResponse.json({ error: 'Notes are required' }, { status: 400 });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not set, using mock generation");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return NextResponse.json({
        story: `[MOCK STORY]\nThis is a compelling story generated from your notes: "${notes}".\n\nIt highlights the struggles and the importance of this cause. Your contribution can make a real difference. Imagine a world where this problem is solved. That's what we are working towards.`
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert copywriter and storyteller for a charity platform called "Aura".
    Convert the following rough notes into a highly compelling, empathetic, and professional fundraising story.
    Make it engaging to encourage donations. Output ONLY the story text, without any conversational filler like "Here is your story:".

    Rough Notes:
    ${notes}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ story: text });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}
