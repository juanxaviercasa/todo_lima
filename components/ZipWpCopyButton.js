'use client';

import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

export default function ZipWpCopyButton({ promptText }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!promptText) return;
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-slate-900 text-amber-300 hover:bg-slate-800 border border-amber-400/40 transition shadow-sm"
        title="Copiar prompt optimizado de 2000 caracteres para ZipWP.com"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-300">¡Prompt Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar Prompt ZipWP</span>
          </>
        )}
      </button>

      <a
        href="https://zipwp.com"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 hover:text-slate-800 underline ml-1"
        title="Abrir ZipWP en una nueva pestaña"
      >
        <span>Abrir ZipWP</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
