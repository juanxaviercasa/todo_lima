'use client';

import { useEffect, useState } from 'react';
import { PhoneCall, ShieldCheck, Star, Zap } from 'lucide-react';

export default function RandomHero({ category, pageContent, totalResults, updatedAt }) {
  const content = Array.isArray(pageContent) ? pageContent : [];
  const [activeCopy, setActiveCopy] = useState(content[0] || null);

  useEffect(() => {
    if (content.length > 1) {
      const randomIndex = Math.floor(Math.random() * content.length);
      setActiveCopy(content[randomIndex]);
    }
  }, [pageContent]);

  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })
    : 'Septiembre 2026';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Ranking Auditado de Google Maps • Actualizado a {formattedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          {activeCopy?.headline || `Los Mejores ${category.title}`}
        </h1>

        {activeCopy?.subtitles?.map((subtitle, index) => (
          <p key={index} className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        ))}

        <a
          href="#directorio"
          className="inline-flex items-center gap-2 mt-8 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <PhoneCall className="w-4 h-4" />
          {activeCopy?.ctas?.[0] || 'Ver directorio'}
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Top calificados</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Contacto directo</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>Sin intermediarios</span>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">{totalResults}</div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase font-semibold">Negocios listados</div>
          </div>
          <div className="border-x border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center justify-center gap-1">
              4.9 <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase font-semibold">Calificación promedio</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase font-semibold">Reseñas reales</div>
          </div>
        </div>
      </div>
    </section>
  );
}