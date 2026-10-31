'use client';

import { useState } from 'react';
import ShortenForm from '@/components/ShortenForm';
import SecretResult from '@/components/SecretResult';

export default function HomePage() {
  const [result, setResult] = useState<{ shortUrl: string; code: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-center tracking-tight text-white">
            Smart URL Shortener
          </h1>
          <p className="text-sm text-slate-400 text-center mt-1">
            ย่อลิงก์ด้วย Base62 พร้อมระบบ Rate Limiting
          </p>
        </div>

        <ShortenForm
          onSuccess={(data) => {
            setError(null);
            setResult(data);
          }}
          onError={(msg) => {
            setResult(null);
            setError(msg);
          }}
        />

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-sm rounded-lg">
            {error}
          </div>
        )}

        {result && <SecretResult result={result} />}
      </div>
    </main>
  );
}