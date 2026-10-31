import { NextResponse } from 'next/server';
import { db } from '@/lib/storage';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const record = db.findByCode(code);

  if (!record) {
    return new NextResponse('Short link not found or expired', { status: 404 });
  }

  return NextResponse.redirect(record.originalUrl, { status: 302 });
}