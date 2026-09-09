import { Star, ShieldCheck, PhoneCall, Zap, Clock, Users } from 'lucide-react';

export default function HeroGHL({ category, totalResults, updatedAt }) {
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })
    : 'Septiembre 2026';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-24">
      {/* Glow decorativo de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge de Confianza */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Ranking Auditado de Google Maps • Actualizado a {formattedDate}</span>
        </div>

        {/* Título Principal de Alto Impacto */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Los Mejores{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
            {category.title}
          </span>
        </h1>

        {/* Subtítulo Persuasivo (Hook GHL) */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {category.heroHook ||
            `Compara reputación comprobada, puntuaciones reales de Google Maps y contacta directamente por WhatsApp o teléfono sin intermediarios.`}
        </p>

        {/* 3 Pilares de Reducción de Fricción */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Top calificados (4.8+ ⭐)</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Contacto directo inmediato</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>Cero comisiones ni cobros extra</span>
          </div>
        </div>

        {/* Barra de Estadísticas de Autoridad */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">{totalResults}</div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase font-semibold">Negocios listados</div>
          </div>
          <div className="border-x border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center justify-center gap-1">
              4.9 <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase font-semibold">Calificación Promedio</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase font-semibold">Reseñas Reales</div>
          </div>
        </div>
      </div>
    </section>
  );
}
