import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import EditorialShell from '../../../components/EditorialShell.js';
import CategoryDirectorioClient from '../../../components/CategoryDirectorioClient.js';
import JsonLd from '../../../components/JsonLd.js';
import { getLocalPages, getCategory, enrichBusinesses } from '../../../lib/directory.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../../lib/seo.js';
import { CATEGORY_DETAILS } from '../../../lib/categoryEditorial.js';
export const dynamicParams = false;
export function generateStaticParams() { return getLocalPages().map(p => ({ subdomain: p.category, district: p.slug })); }
function find(params) { return getLocalPages().find(p => p.category === params.subdomain && p.slug === params.district); }
export function generateMetadata({ params }) {
  const local = find(params);
  if (!local) return {};
  const name = getCategory(local.category).meta.title.replace(' en Lima', '');
  return pageMetadata(`${name} en ${local.district} | Todo Lima`, `Compara ${local.businesses.length} opciones con dirección en ${local.district}. Consulta sus fuentes y canales de contacto disponibles.`, `/${local.category}/${local.slug}`);
}
export default function DistrictPage({ params }) {
  const local = find(params);
  if (!local) notFound();
  const category = getCategory(local.category);
  const name = category.meta.title.replace(' en Lima', '');
  const phones = local.businesses.filter(b => b.phone).length;
  return <EditorialShell title={`${name} en ${local.district}`} intro={`Explora ${local.businesses.length} opciones cuya dirección recogida corresponde a ${local.district}.`} trail={[[category.meta.title, `/${local.category}`]]} action={{ href: '#directorio', label: 'Ver opciones del distrito' }}>
    <section className="editorial-card"><h2 className="text-xl font-bold mb-3">Opciones y contacto en el distrito</h2><p>{phones} de las {local.businesses.length} fichas tienen un teléfono en la fuente consultada. La dirección no garantiza atención a domicilio ni disponibilidad: confirma el servicio, la sede y el horario antes de desplazarte.</p><p className="mt-3">Al comparar, pregunta por {CATEGORY_DETAILS[local.category][1]}. Si el proveedor se desplaza, indica la dirección de atención y consulta si hay un costo adicional.</p></section>
    <Suspense fallback={<p>Cargando opciones…</p>}><CategoryDirectorioClient businesses={enrichBusinesses(local.businesses)} categoryTitle={`${name} en ${local.district}`} /></Suspense>
    <section><h2 className="text-2xl font-bold mb-4">Amplía tu búsqueda</h2><Link className="editorial-chip" href={`/${local.category}`}>Ver {name.toLowerCase()} en toda Lima</Link><p className="mt-4 text-sm">Estas opciones proceden de direcciones públicas normalizadas. <Link className="underline" href="/correcciones">Avísanos si una ubicación no corresponde</Link>.</p></section>
    <JsonLd data={breadcrumbs([['Inicio', '/'], [category.meta.title, `/${local.category}`], [local.district, `/${local.category}/${local.slug}`]])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${name} en ${local.district}`, url: `${SITE_URL}/${local.category}/${local.slug}` }} />
  </EditorialShell>;
}
