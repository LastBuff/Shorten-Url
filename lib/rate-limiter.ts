interface RateLimitRecord {
  timestamps: number[];
}

const ipRequestMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const record = ipRequestMap.get(ip) || { timestamps: [] };

  // ลบ timestamp ที่เก่าเกิน windowMs ออกไป
  const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= limit) {
    const oldestTimestamp = validTimestamps[0];
    const resetMs = windowMs - (now - oldestTimestamp);
    return { allowed: false, remaining: 0, resetMs };
  }

  // บันทึก timestamp ของรอบนี้
  validTimestamps.push(now);
  ipRequestMap.set(ip, { timestamps: validTimestamps });

  return {
    allowed: true,
    remaining: limit - validTimestamps.length,
    resetMs: windowMs,
  };
}