'use client';
import Link from 'next/link';
import { MapPin, Phone, Star, ArrowUpRight } from 'lucide-react';
import { businessPhone, buildClaimListingLink } from '../lib/contact.js';
import { extractDistrict } from '../lib/districts.js';
export default function BusinessCard({ business, onSelectDistrict }) {
  const phone = businessPhone(business.phone);
  const district = business.district || extractDistrict(business.address);
  return <article className="editorial-card min-w-0 [overflow-wrap:anywhere] flex flex-col justify-between hover:border-sky-400 transition-colors">
    <div><p className="text-xs font-semibold text-sky-600 dark:text-sky-300 mb-3">Información de fuente pública</p><h3 className="text-xl font-bold">{business.profileSlug ? <Link href={`/negocios/${business.profileSlug}`}>{business.name}</Link> : business.name}</h3>
      {business.category && <p className="text-sm text-slate-500 mt-2">{business.category}</p>}
      <p className="flex gap-2 mt-4 text-sm"><MapPin className="w-4 h-4 shrink-0 mt-1" /><span>{business.address || 'Dirección no disponible'}</span></p>
      {onSelectDistrict && district !== 'Lima' && <button className="text-sm text-sky-600 underline mt-3" type="button" onClick={() => onSelectDistrict(district)}>Ver opciones en {district}</button>}
      {business.rating && <p className="flex items-center gap-2 text-sm mt-4"><Star className="w-4 h-4 text-amber-500" /><span>{business.rating}/5 en Google Maps{business.reviewsCount != null ? ` · ${business.reviewsCount} reseñas` : ''}</span></p>}
    </div><div className="mt-6 space-y-3">
      {phone.telephone ? <a className="flex gap-2 justify-center items-center rounded-xl bg-sky-600 text-white py-3 font-semibold" href={`tel:${phone.telephone}`} data-contact-event="contact_phone" data-entity={business.entityId}><Phone className="w-4 h-4" />Llamar al negocio</a> : <p className="text-sm text-slate-500">Teléfono no disponible o sin formato confirmado</p>}
      {phone.mobile && <div><a className="block text-sm font-semibold text-emerald-700 dark:text-emerald-300" data-contact-event="contact_whatsapp" data-entity={business.entityId} href={`https://wa.me/${phone.mobile}?text=${encodeURIComponent(`Hola, encontré ${business.name} en Todo Lima y quisiera consultar sus servicios.`)}`} target="_blank" rel="noopener noreferrer">Abrir WhatsApp →</a><p className="text-xs text-slate-500 mt-1">Confirma si el negocio atiende por este canal.</p></div>}
      <div className="flex flex-wrap gap-3 text-sm font-semibold">{business.url && /^https?:\/\//i.test(business.url) && <a href={business.url} target="_blank" rel="noopener noreferrer" data-contact-event="contact_map" data-entity={business.entityId} className="text-sky-600 inline-flex gap-1 items-center">Ver fuente y reseñas<ArrowUpRight className="w-4 h-4" /></a>}{business.website && /^https?:\/\//i.test(business.website) && <a href={business.website} target="_blank" rel="noopener noreferrer" data-contact-event="contact_website" data-entity={business.entityId} className="text-sky-600">Sitio web</a>}</div>
      {business.profileSlug && <Link className="block text-sm font-semibold underline" href={`/negocios/${business.profileSlug}`}>Ver información de la ficha</Link>}
      <a className="block pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500" href={buildClaimListingLink(business.name, business.entityId || business.id)} data-contact-event="claim_listing" data-entity={business.entityId}>Soy el titular: solicitar revisión de mi ficha</a>
    </div>
  </article>;
}
