import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { title, story, audioUrl } = await req.json();

    if (!title || !story) {
      return NextResponse.json({ error: 'Title and story are required' }, { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        title,
        story,
        audioUrl,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
