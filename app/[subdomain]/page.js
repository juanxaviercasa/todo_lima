import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialShell from '../../components/EditorialShell.js';
import JsonLd from '../../components/JsonLd.js';
import CategoryDirectorioClient from '../../components/CategoryDirectorioClient.js';
import { getCategory, getDirectory, getLocalPages, enrichBusinesses } from '../../lib/directory.js';
import { categoryEditorial } from '../../lib/categoryEditorial.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../lib/seo.js';
import { GUIDES } from '../../lib/guides.js';

export const dynamicParams = false;
export function generateStaticParams() { return getDirectory().map(c => ({ subdomain: c.meta.slug })); }
export function generateMetadata({ params }) {
  const category = getCategory(params.subdomain);
  if (!category) return {};
  return pageMetadata(`${category.meta.title} | Todo Lima`, categoryEditorial(category.meta).description, `/${category.meta.slug}`);
}
export default function CategoryPage({ params }) {
  const category = getCategory(params.subdomain);
  if (!category) notFound();
  const { meta, businesses, updatedAt } = category;
  const editorial = categoryEditorial(meta);
  const locals = getLocalPages().filter(p => p.category === meta.slug);
  const guides = GUIDES.filter(g => g.category === meta.slug);
  const related = getDirectory().filter(c => c.meta.niche === meta.niche && c.meta.slug !== meta.slug).slice(0, 6);
  return <EditorialShell title={meta.title} intro={editorial.description} action={{ href: '#directorio', label: `Ver ${businesses.length} opciones` }}>
    <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300"><span>{businesses.length} opciones en el directorio</span>{updatedAt && <span>Datos recogidos: {new Date(updatedAt).toLocaleDateString('es-PE', { timeZone: 'America/Lima' })}</span>}<Link href="/metodologia" className="text-sky-600 underline">Cómo usamos las fuentes</Link></div>
    <p className="leading-relaxed">{editorial.introduction}</p>
    {locals.length > 0 && <section><h2 className="text-2xl font-bold mb-4">Explora por distrito</h2><div className="flex flex-wrap gap-3">{locals.map(p => <Link className="editorial-chip" key={p.slug} href={`/${meta.slug}/${p.slug}`}>{p.district} · {p.businesses.length}</Link>)}</div></section>}
    <Suspense fallback={<p>Cargando opciones…</p>}><CategoryDirectorioClient businesses={enrichBusinesses(businesses)} categoryTitle={meta.title} /></Suspense>
    {editorial.sections.map(s => <section key={s.title}><h2 className="text-2xl font-bold mb-3">{s.title}</h2><p className="leading-relaxed text-slate-600 dark:text-slate-300">{s.text}</p></section>)}
    {guides.length > 0 && <section><h2 className="text-2xl font-bold mb-4">Guías para decidir</h2><div className="grid sm:grid-cols-2 gap-4">{guides.map(g => <Link className="editorial-card" key={g.slug} href={`/guias/${g.slug}`}><h3 className="font-bold text-lg">{g.title}</h3><p className="text-sm mt-2">{g.description}</p></Link>)}</div></section>}
    <section><h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>{editorial.questions.map(q => <details className="editorial-card mb-3" key={q.q}><summary className="cursor-pointer font-bold">{q.q}</summary><p className="mt-3 leading-relaxed">{q.a}</p></details>)}</section>
    <section><h2 className="text-2xl font-bold mb-4">Servicios relacionados</h2><div className="flex flex-wrap gap-3">{related.map(c => <Link className="editorial-chip" key={c.meta.slug} href={`/${c.meta.slug}`}>{c.meta.title.replace(' en Lima', '')}</Link>)}</div></section>
    <p className="text-sm text-slate-500">Información de fuentes públicas. La inclusión no certifica al proveedor. <Link className="underline" href="/correcciones">Reportar un dato</Link> · <Link className="underline" href="/para-negocios">¿Eres el titular de un negocio?</Link></p>
    <JsonLd data={breadcrumbs([['Inicio', '/'], [meta.title, `/${meta.slug}`]])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: meta.title, url: `${SITE_URL}/${meta.slug}`, description: editorial.description, isPartOf: { '@id': `${SITE_URL}/#website` } }} />
  </EditorialShell>;
}
