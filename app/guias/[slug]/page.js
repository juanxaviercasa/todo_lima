import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialShell from '../../../components/EditorialShell.js';
import JsonLd from '../../../components/JsonLd.js';
import { GUIDES } from '../../../lib/guides.js';
import { getCategory } from '../../../lib/directory.js';
import { pageMetadata, breadcrumbs, SITE_URL, EDITORIAL_DATE } from '../../../lib/seo.js';
export const dynamicParams = false;
export function generateStaticParams() { return GUIDES.map(g => ({ slug: g.slug })); }
export function generateMetadata({ params }) {
  const guide = GUIDES.find(g => g.slug === params.slug);
  if (!guide) return {};
  return { ...pageMetadata(`${guide.title} | Todo Lima`, guide.description, `/guias/${guide.slug}`), openGraph: { ...pageMetadata(guide.title, guide.description, `/guias/${guide.slug}`).openGraph, type: 'article', publishedTime: EDITORIAL_DATE, modifiedTime: EDITORIAL_DATE } };
}
export default function GuidePage({ params }) {
  const guide = GUIDES.find(g => g.slug === params.slug);
  if (!guide) notFound();
  const category = getCategory(guide.category);
  const others = GUIDES.filter(g => g.slug !== guide.slug).slice(0, 3);
  return <EditorialShell title={guide.title} intro={guide.description} trail={[["Guías", '/guias']]}>
    <article className="max-w-3xl space-y-8">
      <p className="text-sm text-slate-500">Por el equipo editorial de Todo Lima · <time dateTime={EDITORIAL_DATE}>9 de octubre de 2026</time> · Guía editorial de contratación</p>
      <section className="editorial-card border-l-4 border-l-sky-500"><h2 className="font-bold text-lg mb-3">Antes de coordinar</h2><p className="leading-relaxed">{guide.answer}</p></section>
      <nav aria-label="En esta guía" className="editorial-card"><p className="font-semibold mb-3">En esta guía</p><ol className="list-decimal pl-5 space-y-2">{guide.sections.map(([heading], index) => <li key={heading}><a className="text-sky-600 underline" href={`#paso-${index + 1}`}>{heading}</a></li>)}</ol></nav>
      {guide.sections.map(([heading, text], index) => <section key={heading} id={`paso-${index + 1}`} className="scroll-mt-24"><h2 className="text-2xl font-bold mb-4">{heading}</h2><p className="leading-relaxed text-slate-600 dark:text-slate-300">{text}</p></section>)}
      <section className="editorial-card"><h2 className="text-xl font-bold mb-4">Tu checklist</h2><ul className="list-disc pl-5 space-y-3">{guide.checklist.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="bg-slate-950 text-white rounded-3xl p-8"><h2 className="text-2xl font-bold">Encuentra opciones para consultar</h2><p className="text-slate-300 mt-3 mb-5">Compara ubicaciones y consulta al proveedor las condiciones de tu caso.</p><Link className="inline-block rounded-xl bg-sky-500 text-white px-5 py-3 font-semibold" href={`/${guide.category}`}>{category.meta.title} →</Link></section>
      <p className="text-sm text-slate-500">Este checklist es una elaboración editorial, sin estudio de precios ni entrevistas atribuidas. <Link className="underline" href="/metodologia">Consulta nuestra metodología</Link> y <Link className="underline" href="/correcciones">propón una corrección</Link>.</p>
    </article>
    <section><h2 className="text-2xl font-bold mb-4">Continúa explorando</h2><div className="grid sm:grid-cols-3 gap-4">{others.map(g => <Link key={g.slug} className="editorial-card font-semibold" href={`/guias/${g.slug}`}>{g.title}</Link>)}</div></section>
    <JsonLd data={breadcrumbs([['Inicio', '/'], ['Guías', '/guias'], [guide.title, `/guias/${guide.slug}`]])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.description, datePublished: EDITORIAL_DATE, dateModified: EDITORIAL_DATE, mainEntityOfPage: `${SITE_URL}/guias/${guide.slug}`, author: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Todo Lima', url: `${SITE_URL}/metodologia` }, publisher: { '@id': `${SITE_URL}/#organization` }, image: `${SITE_URL}/images/todo_lima.jpg` }} />
  </EditorialShell>;
}
