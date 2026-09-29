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

// Distritos comunes en Lima para etiquetado inteligente
const LIMA_DISTRICTS = [
  'Miraflores', 'San Isidro', 'Surco', 'Santiago de Surco', 'San Borja', 'La Molina', 
  'Barranco', 'San Miguel', 'Magdalena', 'Jesús María', 'Lince', 'Pueblo Libre', 
  'Breña', 'Cercado de Lima', 'Lima', 'Los Olivos', 'Independencia', 'San Martín de Porres', 
  'Comas', 'San Juan de Lurigancho', 'Ate', 'Santa Anita', 'Chorrillos', 'San Juan de Miraflores', 
  'Villa El Salvador', 'Callao', 'Bellavista', 'La Perla', 'Ventanilla', 'Puente Piedra', 'Carabayllo'
];

function extractDistrict(address) {
  if (!address) return 'Lima';
  for (const dist of LIMA_DISTRICTS) {
    const regex = new RegExp(`\\b${dist}\\b`, 'i');
    if (regex.test(address)) {
      return dist;
    }
  }
  return 'Lima Metropolitana';
}

export default function BusinessCard({ business, rank }) {
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
        wrapper: 'bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border-amber-300 text-amber-900',
        badge: 'bg-amber-500 text-white',
        text: 'Oro • Top #1 Lima',
        icon: Award
      };
    }
    if (r === 2) {
      return {
        wrapper: 'bg-slate-100 border-slate-300 text-slate-800',
        badge: 'bg-slate-700 text-white',
        text: 'Plata • Top #2',
        icon: Award
      };
    }
    if (r === 3) {
      return {
        wrapper: 'bg-orange-50 border-orange-200 text-orange-900',
        badge: 'bg-orange-600 text-white',
        text: 'Bronce • Top #3',
        icon: Award
      };
    }
    return {
      wrapper: 'bg-slate-50 border-slate-200 text-slate-700',
      badge: 'bg-slate-200 text-slate-700',
      text: `#${r} Verificado`,
      icon: ShieldCheck
    };
  };

  const rankStyle = getRankBadgeStyle(rank);
  const RankIcon = rankStyle.icon;

  return (
    <article className="open-card relative bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-sky-300/80 p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300">
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
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100/90 py-1 px-2.5 rounded-lg border border-slate-200/60">
              <MapPin className="w-3 h-3 text-rose-500" />
              <span>{district}</span>
            </span>
          </div>

          {/* Calificación de Google Maps */}
          {business.rating && (
            <div className="inline-flex items-center gap-1.5 bg-amber-50/90 border border-amber-200/80 px-2.5 py-1 rounded-xl shadow-2xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-black text-sm text-slate-900">{business.rating}</span>
              <span className="text-[11px] text-slate-500 font-semibold">
                ({business.reviewsCount ?? 0})
              </span>
            </div>
          )}
        </div>

        {/* Nombre del Negocio / Profesional */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
          {business.name}
        </h3>

        {/* Categoría secundaria si existe */}
        {business.category && (
          <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            {business.category}
          </p>
        )}

        {/* Dirección física legible */}
        <div className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{business.address || 'Lima, Perú'}</span>
        </div>

        {/* Enlace verificado a Google Maps */}
        {business.url && (
          <div className="mt-2 pl-6">
            <a
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors"
            >
              <span>Ver ficha y reseñas en Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* Botones de Acción Inmediata (WhatsApp + Llamar + Copiar + Web) */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2.5">
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
          <div className="text-center text-xs font-semibold text-slate-400 py-1">
            Atención presencial en local
          </div>
        )}

        {/* Fila secundaria: Llamar, Copiar número y Web */}
        <div className="flex items-center gap-2">
          {telLink ? (
            <a
              href={telLink}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200/80 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span className="truncate">{rawPhone}</span>
            </a>
          ) : null}

          {rawPhone && (
            <button
              onClick={handleCopyPhone}
              type="button"
              className={`p-2.5 rounded-xl border transition-all text-xs font-bold flex items-center gap-1 ${
                copied
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-600'
              }`}
              title="Copiar número"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          )}

          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 hover:text-slate-900 transition-colors"
              title="Visitar sitio web oficial"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
