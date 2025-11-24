import {put} from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'pretty_polaroid.png';
  
  const body = request.body;
  if (!body) {
    return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
  }

  const blob = await put(filename, body, {
    access: 'public',
    token: process.env.polaroid_share_READ_WRITE_TOKEN,
  });

  return NextResponse.json(blob);
}