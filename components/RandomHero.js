'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  PhoneCall, 
  ShieldCheck, 
  Star, 
  Zap, 
  MapPin, 
  CheckCircle2, 
  ArrowDown, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

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
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Imagen de fondo específica de la categoría generada con IA */}
      <div className="absolute inset-0 z-0">
        {category?.slug && (
          <img 
            src={`/images/categories/${category.slug}.webp`}
            alt={`Fondo de ${category.title}`}
            className="w-full h-full object-cover object-center opacity-40"
          />
        )}
        {/* Gradiente para asegurar legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-900" />
      </div>

      {/* Luces y resplandores ambientales de fondo (ahora sobre la imagen pero detrás del texto) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-sky-500/20 blur-[130px] pointer-events-none rounded-full z-0" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb navegable */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <Link href="/" className="hover:text-white transition-colors">
            Todo Lima
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-sky-400 capitalize">{category.niche || 'Servicios'}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-200">{category.title.split(' en Lima')[0]}</span>
        </div>

        {/* Badge auditado */}
        <div className="block">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold mb-6 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ranking Auditado de Google Maps • Actualizado a {formattedDate}</span>
          </div>
        </div>

        {/* Título de alto impacto */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
          {activeCopy?.headline || `Los Mejores ${category.title}`}
        </h1>

        {/* Subtítulos */}
        {activeCopy?.subtitles?.map((subtitle, index) => (
          <p key={index} className="mt-5 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        ))}

        {/* Botón de acción con scroll directo */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#directorio"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowDown className="w-4 h-4" />
            <span>{activeCopy?.ctas?.[0] || 'Ver Fichas Verificadas'}</span>
          </a>

          <a
            href="https://wa.me/51925475034?text=Hola,%20deseo%20publicar%20mi%20negocio%20en%20todolima.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-3.5 rounded-2xl border border-white/10 transition-colors text-sm"
          >
            <span>Publicar mi Negocio</span>
          </a>
        </div>

        {/* Puntos destacados */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300 font-semibold">
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/80 shadow-xs">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Top 4.5+ Estrellas</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/80 shadow-xs">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Directo</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/80 shadow-xs">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>Sin Intermediarios</span>
          </div>
        </div>

        {/* Tarjetas de métricas numéricas con Open Design */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <div className="text-2xl sm:text-3xl font-black text-white">{totalResults || '30+'}</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">Negocios listados</div>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center justify-center gap-1">
              4.9 <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">Promedio Google</div>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">Opiniones reales</div>
          </div>
        </div>
      </div>
    </section>
  );
}