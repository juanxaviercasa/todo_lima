'use client';

import { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  MessageCircle, 
  Copy, 
  Check, 
  Award,
  Clock,
  Sparkles
} from 'lucide-react';
import { buildClaimListingLink } from '../lib/contact';
import { extractDistrict } from '../lib/districts';

export default function BusinessCard({ business, rank, onSelectDistrict }) {
  const [copied, setCopied] = useState(false);

  // Normalización de número para WhatsApp
  const rawPhone = business.phone || '';
  const cleanDigits = rawPhone.replace(/\D/g, '');
  const normalizedWhatsAppNumber = cleanDigits
    ? cleanDigits.replace(/^0+/, '').replace(/^(?!51)(\d{9})$/, '51$1')
    : null;

  const waText = `Hola ${business.name}, encontré su negocio verificado en el directorio Todo Lima y deseo solicitar información sobre sus servicios.`;
  const waLink = normalizedWhatsAppNumber
    ? `https://wa.me/${normalizedWhatsAppNumber}?text=${encodeURIComponent(waText)}`
    : null;

  const telLink = rawPhone ? `tel:${rawPhone.replace(/\s+/g, '')}` : null;
  const district = extractDistrict(business.address);

  const handleCopyPhone = (e) => {
    e.preventDefault();
    if (!rawPhone) return;
    navigator.clipboard.writeText(rawPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Jerarquía visual del ranking estilo Open Design
  const getRankBadgeStyle = (r) => {
    if (r === 1) {
      return {
        wrapper: 'bg-gradient-to-r from-amber-500/15 to-yellow-500/15 dark:from-amber-500/20 dark:to-yellow-500/20 border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-300',
        badge: 'bg-amber-500 text-white',
        text: 'Oro • Top #1 Lima',
        icon: Award
      };
    }
    if (r === 2) {
      return {
        wrapper: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200',
        badge: 'bg-slate-700 text-white',
        text: 'Plata • Top #2',
        icon: Award
      };
    }
    if (r === 3) {
      return {
        wrapper: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-500/40 text-orange-900 dark:text-orange-300',
        badge: 'bg-orange-600 text-white',
        text: 'Bronce • Top #3',
        icon: Award
      };
    }
    return {
      wrapper: 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300',
      badge: 'bg-slate-200 text-slate-700',
      text: `#${r} Verificado`,
      icon: ShieldCheck
    };
  };

  const rankStyle = getRankBadgeStyle(rank);
  const RankIcon = rankStyle.icon;

  return (
    <article className="open-card relative bg-white dark:bg-slate-900/95 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-sky-300/80 dark:hover:border-sky-500/50 p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300">
      <div>
        {/* Fila superior: Ranking, Categoría y Rating */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Medalla de ranking */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-black ${rankStyle.wrapper}`}>
              <RankIcon className="w-3.5 h-3.5" />
              <span>{rankStyle.text}</span>
            </div>

            {/* Distrito extraído */}
            {onSelectDistrict ? (
              <button
                type="button"
                onClick={() => onSelectDistrict(district)}
                title={`Filtrar especialistas en ${district}`}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 py-1 px-2.5 rounded-lg border border-rose-200/80 dark:border-rose-800/60 transition-colors cursor-pointer group/dist shadow-2xs"
              >
                <MapPin className="w-3 h-3 text-rose-500 group-hover/dist:scale-110 transition-transform" />
                <span>{district}</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 py-1 px-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>{district}</span>
              </span>
            )}
          </div>

          {/* Calificación de Google Maps */}
          {business.rating && (
            <div className="inline-flex items-center gap-1.5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 px-2.5 py-1 rounded-xl shadow-2xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-black text-sm text-slate-900 dark:text-amber-200">{business.rating}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                ({business.reviewsCount ?? 0})
              </span>
            </div>
          )}
        </div>

        {/* Nombre del Negocio / Profesional */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
          {business.name}
        </h3>

        {/* Categoría secundaria si existe */}
        {business.category && (
          <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            {business.category}
          </p>
        )}

        {/* Dirección física legible */}
        <div className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{business.address || 'Lima, Perú'}</span>
        </div>

        {/* Enlace verificado a Google Maps */}
        {business.url && (
          <div className="mt-2 pl-6">
            <a
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors"
            >
              <span>Ver ficha y reseñas en Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* Botones de Acción Inmediata (WhatsApp + Llamar + Copiar + Web) */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
        {/* Botón Principal WhatsApp */}
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm py-3 px-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] text-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contactar por WhatsApp Directo</span>
          </a>
        ) : (
          <div className="text-center text-xs font-semibold text-slate-400 dark:text-slate-500 py-1">
            Atención presencial en local
          </div>
        )}

        {/* Fila secundaria: Llamar, Copiar número y Web */}
        <div className="flex items-center gap-2">
          {telLink ? (
            <a
              href={telLink}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200/80 dark:border-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="truncate">{rawPhone}</span>
            </a>
          ) : null}

          {rawPhone && (
            <button
              onClick={handleCopyPhone}
              type="button"
              className={`p-2.5 rounded-xl border transition-all text-xs font-bold flex items-center gap-1 ${
                copied
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
              title="Copiar número"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
              <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          )}

          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Visitar sitio web oficial"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* CTA Inbound: Reclamar ficha oficial y solicitar Auditoría 360° gratuita */}
        <div className="pt-2 text-center">
          <a
            href={buildClaimListingLink(business.name, business.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1 px-2 rounded-lg hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40"
            title="Reclamar administración de este perfil en Todo Lima"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>¿Eres el dueño? Reclama tu ficha y recibe tu Auditoría 360° gratis</span>
          </a>
        </div>
      </div>
    </article>
  );
}
