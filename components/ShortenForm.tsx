'use client';

import { useState } from 'react';

interface ShortenFormProps {
  onSuccess: (data: { shortUrl: string; code: string }) => void;
  onError: (msg: string) => void;
}

export default function ShortenForm({ onSuccess, onError }: ShortenFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'เกิดข้อผิดพลาดในการย่อลิงก์');
      }

      onSuccess(data);
      setUrl('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="url"
          required
          placeholder="วาง URL ที่ต้องการย่อ เช่น https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 font-medium rounded-lg text-sm transition text-white"
      >
        {loading ? 'กำลังประมวลผล...' : 'ย่อลิงก์'}
      </button>
    </form>
  );
}