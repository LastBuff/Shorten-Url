'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SecretResultProps {
  result: {
    shortUrl: string;
    code: string;
  };
}

export default function SecretResult({ result }: SecretResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-lg space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase">ลิงก์ของคุณพร้อมแล้ว:</p>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={result.shortUrl}
          className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm font-mono text-blue-400"
        />
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-xs rounded text-white transition min-w-[55px]"
        >
          {copied ? 'คัดลอกแล้ว' : 'Copy'}
        </button>
      </div>
      <div className="pt-2 flex justify-between items-center text-xs text-slate-400 border-t border-slate-700/60">
        <span>รหัส: {result.code}</span>
        <Link
          href={`/${result.code}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition"
        >
          เปิดลิงก์
        </Link>
      </div>
    </div>
  );
}