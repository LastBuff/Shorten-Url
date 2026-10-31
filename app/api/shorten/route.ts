import { NextResponse } from 'next/server';
import { encodeBase62 } from '@/lib/base62';
import { checkRateLimit } from '@/lib/rate-limiter';
import { db } from '@/lib/storage';

export async function POST(req: Request) {
  // ดึง Client IP (รองรับทั้ง localhost และ Reverse Proxy)
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  // 1. ตรวจสอบ Rate Limit (จำกัด 5 ครั้ง / 1 นาที ต่อ IP)
  const rateLimit = checkRateLimit(ip, 5, 60_000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: 'Too Many Requests',
        message: `ยิงคำขอถี่เกินไป กรุณารออีก ${Math.ceil(rateLimit.resetMs / 1000)} วินาที`,
      },
      {
        status: 429,
        headers: {
          'Retry-After': `${Math.ceil(rateLimit.resetMs / 1000)}`,
        },
      }
    );
  }
  
  const { url } = await req.json();

  // Validate รูปแบบ URL
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'รูปแบบ URL ไม่ถูกต้อง' }, { status: 400 });
  }

  // 2. ออกรหัสด้วย Base62
  const nextId = db.getNextId();
  const shortCode = encodeBase62(nextId);

  // 3. บันทึกลง Storage
  const record = db.createUrl(url, shortCode);
  const host = req.headers.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  return NextResponse.json({
    code: record.code,
  shortUrl: `${baseUrl}/${record.code}`,
  originalUrl: record.originalUrl,
  remainingRequests: rateLimit.remaining,
  });


}