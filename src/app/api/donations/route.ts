import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { amount, transactionId, campaignId } = await req.json();

    if (!amount || !transactionId || !campaignId) {
      return NextResponse.json({ error: 'Amount, transactionId, and campaignId are required' }, { status: 400 });
    }

    const donation = await prisma.donation.create({
      data: {
        amount,
        transactionId,
        campaignId,
      },
    });

    return NextResponse.json(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json({ error: 'Failed to record donation' }, { status: 500 });
  }
}
