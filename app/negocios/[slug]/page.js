import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialShell from '../../../components/EditorialShell.js';
import JsonLd from '../../../components/JsonLd.js';
import { getProfiles } from '../../../lib/directory.js';
import { businessContactMessage, businessPhone, buildClaimListingLink, buildGrowthAuditLink } from '../../../lib/contact.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../../lib/seo.js';
export const dynamicParams = false;
export function generateStaticParams() { return getProfiles().map(b => ({ slug: b.slug })); }
export function generateMetadata({ params }) {
  const b = getProfiles().find(b => b.slug === params.slug);
  if (!b) return {};
  return pageMetadata(`${b.name} en ${b.district} | Todo Lima`, `Consulta la dirección y los canales de contacto disponibles de ${b.name}. Información procedente de fuentes públicas.`, `/negocios/${b.slug}`);
}
export default function BusinessProfile({ params }) {
  const b = getProfiles().find(b => b.slug === params.slug);
  if (!b) notFound();
  const auditLink = buildGrowthAuditLink(b);
  const phone = businessPhone(b.phone);
  return <EditorialShell title={b.name} intro={`${b.category || b.categoryTitle} · ${b.district}`} trail={[[b.categoryTitle, `/${b.category}`]]}>
    <section className="editorial-card"><h2 className="text-2xl font-bold mb-5">Ubicación y contacto</h2><dl className="grid sm:grid-cols-[160px_1fr] gap-4"><dt className="font-semibold">Dirección recogida</dt><dd>{b.address}</dd><dt className="font-semibold">Teléfono recogido</dt><dd>{phone.telephone ? <a data-contact-event="contact_phone" data-entity={b.entityId} className="text-sky-600 underline" href={`tel:${phone.telephone}`}>{b.phone}</a> : b.phone}</dd>{b.updatedAt && <><dt className="font-semibold">Recogida de datos</dt><dd>{new Date(b.updatedAt).toLocaleDateString('es-PE', { timeZone: 'America/Lima' })}</dd></>}</dl><div className="flex flex-wrap gap-3 mt-6"><a className="editorial-chip" data-contact-event="contact_map" data-entity={b.entityId} href={b.url} target="_blank" rel="noopener noreferrer">Ver fuente en Google Maps</a>{b.website && /^https?:\/\//i.test(b.website) && <a className="editorial-chip" data-contact-event="contact_website" data-entity={b.entityId} href={b.website} target="_blank" rel="noopener noreferrer">Consultar sitio web</a>}</div></section>
    <section><h2 className="text-2xl font-bold mb-4">Antes de coordinar</h2><p>Confirma con el negocio el servicio que necesitas, la sede, el horario y el presupuesto. La ubicación recogida no acredita atención a domicilio. Esta ficha procede de una fuente pública y no certifica identidad, habilitación profesional ni disponibilidad.</p>{phone.mobile && <div className="mt-5"><a className="editorial-chip" data-contact-event="contact_whatsapp" data-entity={b.entityId} href={`https://wa.me/${phone.mobile}?text=${encodeURIComponent(businessContactMessage(b))}`} target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a><p className="text-sm text-slate-500 mt-2">El número tiene formato móvil; confirma si el negocio atiende por WhatsApp.</p></div>}</section>
    {b.rating && <section className="editorial-card"><h2 className="font-bold text-xl mb-3">Valoración en la fuente</h2><p>{b.rating} sobre 5{b.reviewsCount != null ? ` · ${b.reviewsCount} reseñas recogidas` : ''}. Esta información procede de Google Maps y puede haber cambiado. Consulta el enlace de origen para leer las opiniones actuales.</p></section>}
    {auditLink && <section className="editorial-card"><h2 className="text-2xl font-bold mb-4">¿Gestionas este negocio?</h2><p>Solicita una auditoría gratuita y un plan estratégico de crecimiento en Hazlo Crecer. El formulario recupera esta ficha para contextualizar tu solicitud.</p><a className="editorial-chip inline-flex items-center min-h-11 mt-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={auditLink} data-contact-event="growth_audit" data-entity={b.supabase_business_id}>Solicitar auditoría gratuita →</a></section>}
    <section><h2 className="text-2xl font-bold mb-4">¿Un dato necesita revisión?</h2><div className="flex flex-wrap gap-3"><Link className="editorial-chip" href="/correcciones">Reportar una corrección</Link><a className="editorial-chip" data-contact-event="claim_listing" data-entity={b.entityId} href={buildClaimListingLink(b.name, b.entityId)}>Soy el titular de este negocio</a></div></section>
    <Link className="text-sky-600 underline" href={`/${b.category}`}>Ver más opciones en {b.categoryTitle.toLowerCase()}</Link>
    <JsonLd data={breadcrumbs([['Inicio', '/'], [b.categoryTitle, `/${b.category}`], [b.name, `/negocios/${b.slug}`]])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': `${SITE_URL}/negocios/${b.slug}#business`, name: b.name, url: `${SITE_URL}/negocios/${b.slug}`, address: { '@type': 'PostalAddress', streetAddress: b.address, addressLocality: b.district, addressCountry: 'PE' }, ...(phone.telephone ? { telephone: phone.telephone } : {}), sameAs: [b.url, ...(/^https?:\/\//i.test(b.website || '') ? [b.website] : [])] }} />
  </EditorialShell>;
}
