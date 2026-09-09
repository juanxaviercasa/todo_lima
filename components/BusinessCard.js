import { Star, MapPin, Phone, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

export default function BusinessCard({ business, rank }) {
  // Limpieza de teléfono para enlace de WhatsApp
  const rawPhone = business.phone || '';
  const normalizedWhatsAppNumber = rawPhone
    .replace(/\D/g, '')
    .replace(/^0+/, '')
    .replace(/^(?!51)(\d{9})$/, '51$1');
  const waLink = normalizedWhatsAppNumber
    ? `https://wa.me/${normalizedWhatsAppNumber}?text=${encodeURIComponent('Hola, vi su perfil destacado como uno de los especialistas mejor calificados en el directorio y me gustaría realizar una consulta.')}`
    : null;
  const telLink = rawPhone ? `tel:${rawPhone.replace(/\s+/g, '')}` : null;

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 p-5 sm:p-7 flex flex-col justify-between group">
      <div>
        {/* Encabezado de la Tarjeta con Ranking y Rating */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center justify-center font-black text-xs px-2.5 py-1 rounded-lg ${
              rank === 1
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : rank === 2
                ? 'bg-slate-100 text-slate-800 border border-slate-300'
                : rank === 3
                ? 'bg-orange-100 text-orange-800 border border-orange-300'
                : 'bg-slate-50 text-slate-600 border border-slate-200'
            }`}>
              #{rank} {rank === 1 ? 'Mejor Calificado' : rank <= 3 ? 'Top Recomendado' : 'Destacado'}
            </span>
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {business.category || 'Servicio Local'}
            </span>
          </div>

          <div className="flex flex-col items-end shrink-0">
            {business.rating && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-extrabold text-sm text-slate-900">{business.rating}</span>
                <span className="text-xs text-slate-500 font-medium">({business.reviewsCount ?? 0})</span>
              </div>
            )}

            {waLink ? (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 mt-3 px-4 rounded-lg transition-colors text-sm shadow-sm w-full"
              >
                📱 Chatear por WhatsApp
              </a>
            ) : (
              <span className="block mt-3 text-xs text-gray-400">Sin número registrado</span>
            )}
          </div>
        </div>

        {/* Nombre del Negocio */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
          {business.name}
        </h3>

        {/* Dirección física */}
        <div className="mt-3 flex items-start gap-2.5 text-sm text-slate-600">
          <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span className="line-clamp-2 leading-snug">{business.address || 'Lima, Perú'}</span>
        </div>

        {/* Ver en Google Maps */}
        {business.url && (
          <div className="mt-2 pl-6.5">
            <a
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-800 transition-colors"
            >
              <span>Ver ubicación y opiniones en Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* Botones de Contacto Inmediato (WhatsApp & Llamada) */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
        {telLink && (
          <a
            href={telLink}
            className={`inline-flex items-center justify-center gap-2 font-bold text-sm py-2.5 px-4 rounded-xl border transition-all ${
              waLink
                ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                : 'flex-1 bg-sky-600 hover:bg-sky-500 text-white border-transparent'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>{business.phone}</span>
          </a>
        )}

        {business.website && (
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 p-2.5 rounded-xl border border-slate-200 transition-colors"
            title="Visitar sitio web oficial"
          >
            <Globe className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
