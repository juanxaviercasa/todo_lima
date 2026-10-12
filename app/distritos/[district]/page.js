import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialShell from '../../../components/EditorialShell.js';
import CategoryDirectorioClient from '../../../components/CategoryDirectorioClient.js';
import JsonLd from '../../../components/JsonLd.js';
import { enrichBusinesses } from '../../../lib/directory.js';
import { getDistrictProfiles, getDistrictInventory } from '../../../lib/districtDirectory.js';
import { pageMetadata, breadcrumbs } from '../../../lib/seo.js';
export const dynamicParams = false;
export function generateStaticParams() { return getDistrictProfiles().map(p => ({ district:p.slug })); }
export function generateMetadata({ params }) {
  const p = getDistrictInventory(params.district);
  if (!p) return {};
  return pageMetadata(`Negocios y servicios en ${p.name} | Todo Lima`, p.intro, `/distritos/${p.slug}`);
}
export default function DistrictPage({ params }) {
  const p = getDistrictInventory(params.district);
  if (!p) notFound();
  return <EditorialShell title={`Descubre ${p.name}`} intro={p.intro} trail={[["Distritos", "/distritos"]]} action={p.count ? { href:'#directorio', label:'Comparar negocios' } : undefined}>
    <section className="editorial-card"><h2 className="text-2xl font-bold mb-3">Una guía para tu búsqueda local</h2><p>{p.context}</p><p className="mt-3">{p.zone} es una agrupación editorial del directorio. Encontramos {p.count} negocios distintos en los archivos disponibles; no constituye un censo ni acredita que sigan operando.</p></section>
    <section aria-labelledby="areas-title"><h2 id="areas-title" className="text-2xl font-bold mb-4">Explora por áreas y categorías</h2><div className="grid gap-5 sm:grid-cols-2">{p.areas.map(area => <article className="editorial-card" key={area.slug}><h3 className="text-xl font-bold mb-3">{area.title}</h3><ul className="space-y-2">{area.categories.map(c => <li key={c.slug}><Link className="underline inline-flex min-h-11 items-center" href={c.href}>{c.title} ({c.count})</Link></li>)}</ul></article>)}</div>{!p.areas.length && <p>Aún no tenemos categorías con direcciones identificadas en este distrito. <Link className="underline" href="/categorias">Explora las áreas de Lima</Link>.</p>}</section>
    {p.count > 0 && <CategoryDirectorioClient businesses={enrichBusinesses(p.businesses)} categoryTitle={`Negocios en ${p.name}`} />}
    <section className="editorial-card"><h2 className="text-2xl font-bold mb-3">Antes de contactar o desplazarte</h2><p>La ubicación registrada no equivale a cobertura a domicilio. Confirma dirección, horario, disponibilidad, precio y distritos atendidos directamente con el negocio.</p><p className="mt-3"><a className="underline inline-flex min-h-11 items-center" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', Lima, Perú')}`} target="_blank" rel="noopener noreferrer">Abrir mapa de {p.name}</a></p><Link className="underline" href="/correcciones">Informar una dirección incorrecta</Link></section>
    <section><h2 className="text-2xl font-bold mb-3">Fuentes y actualización</h2><p>Ficha editorial revisada el 12 de octubre de 2026. Los datos de negocios proceden de los archivos públicos del directorio y pueden tener fechas de recopilación diferentes.</p><ul className="mt-3 space-y-2">{p.sources.map(s => <li key={s.url}><a className="underline inline-flex min-h-11 items-center" href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a></li>)}</ul><Link className="underline" href="/distritos">Explorar otro distrito</Link></section>
    <JsonLd data={breadcrumbs([['Inicio','/'],['Distritos','/distritos'],[p.name,`/distritos/${p.slug}`]])} />
  </EditorialShell>;
}
