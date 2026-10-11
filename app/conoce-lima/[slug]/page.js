import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar.js';
import Footer from '../../../components/Footer.js';
import JsonLd from '../../../components/JsonLd.js';
import AtlasIcon from '../../../components/AtlasIcon.js';
import AtlasFormattedText from '../../../components/AtlasFormattedText.js';
import { getPillars, getPillarBySlug, getAllPillarSlugs } from '../../../lib/atlas.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../../lib/seo.js';
import { 
  BookOpen, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Sparkles, 
  Table as TableIcon,
  FileText,
  Compass,
  ChevronRight
} from 'lucide-react';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPillarSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const pillar = getPillarBySlug(params.slug);
  if (!pillar) return {};

  const meta = pageMetadata(
    `${pillar.title} | Conoce Lima | Todo Lima`,
    pillar.metaDescription,
    `/conoce-lima/${pillar.slug}`
  );

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      publishedTime: '2026-10-10',
      modifiedTime: '2026-10-10',
    },
  };
}

export default function PillarPage({ params }) {
  const pillar = getPillarBySlug(params.slug);
  if (!pillar) notFound();

  const allPillars = getPillars();
  const otherPillars = allPillars.filter((p) => p.slug !== pillar.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pillar.title,
    description: pillar.metaDescription,
    mainEntityOfPage: `${SITE_URL}/conoce-lima/${pillar.slug}`,
    url: `${SITE_URL}/conoce-lima/${pillar.slug}`,
    datePublished: '2026-10-10',
    dateModified: '2026-10-10',
    author: {
      '@type': 'Organization',
      name: 'Equipo Editorial e Histórico de Todo Lima',
      url: `${SITE_URL}/metodologia`,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    about: (pillar.wikidataEntities || []).map((ent) => ({
      '@type': 'Thing',
      name: ent.name,
      sameAs: ent.url || undefined,
    })),
  };

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-w-0 [overflow-wrap:anywhere] flex-grow">
        {/* Hero Section */}
        <header className="relative bg-slate-950 text-white py-14 sm:py-20 border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/25 via-slate-950/80 to-slate-950 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-5">
            {/* Breadcrumbs */}
            <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href="/conoce-lima" className="hover:text-white transition-colors">Conoce Lima</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-sky-400 font-semibold">{pillar.shortTitle}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <AtlasIcon name={pillar.icon} className="w-3.5 h-3.5" />
                <span>Pilar 0{pillar.order} · Atlas Conoce Lima</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">Revisión Institucional 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-4xl leading-tight">
              {pillar.title}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {pillar.metaDescription}
            </p>

            {/* Entity badges preview */}
            {pillar.wikidataEntities && pillar.wikidataEntities.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Entidades canónicas:</span>
                {pillar.wikidataEntities.map((ent) => (
                  <a
                    key={ent.id || ent.name}
                    href={ent.url || `https://www.wikidata.org/wiki/${ent.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500 text-[11px] font-semibold text-slate-300 hover:text-sky-300 transition-colors"
                  >
                    <span>{ent.name}</span>
                    {ent.id && <span className="text-slate-500">({ent.id})</span>}
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Contenido principal en 2 columnas */}
        <div className="max-w-7xl mx-auto px-5 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-10">
            {/* Columna Izquierda: Contenido del Pilar */}
            <article className="min-w-0 space-y-12">
              {/* Featured Snippet Definition Box */}
              {pillar.canonicalDefinition && (
                <section className="relative rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-900/60 border-2 border-sky-200 dark:border-sky-900/50 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2.5 text-sky-700 dark:text-sky-400 text-xs font-extrabold uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span>Definición Canónica y Resumen de Referencia</span>
                  </div>
                  <blockquote className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    "{pillar.canonicalDefinition}"
                  </blockquote>
                  <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
                    Definición estructurada para respuesta directa y consulta enciclopédica · Todo Lima (2026).
                  </p>
                </section>
              )}

              {/* Tabla de Contenidos Interactiva (TOC) */}
              <nav aria-label="Tabla de contenidos del artículo" className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-extrabold text-base">
                  <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>Índice del Contenido</span>
                </div>
                <ol className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  {pillar.table && pillar.table.rows && pillar.table.rows.length > 0 && (
                    <li>
                      <a 
                        href="#matriz-estructural" 
                        className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-semibold p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="w-5 h-5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 flex items-center justify-center text-[10px] font-bold">01</span>
                        <span>Matriz Estructural Comparativa</span>
                      </a>
                    </li>
                  )}
                  {pillar.sections.map((sec, idx) => (
                    <li key={sec.id}>
                      <a 
                        href={`#${sec.id}`}
                        className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors truncate"
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {String(idx + 2).padStart(2, '0')}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </a>
                    </li>
                  ))}
                  {pillar.crossLinks && (pillar.crossLinks.districts?.length > 0 || pillar.crossLinks.categories?.length > 0) && (
                    <li>
                      <a 
                        href="#distritos-relacionados" 
                        className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">08</span>
                        <span>Conexión Territorial & Directorio</span>
                      </a>
                    </li>
                  )}
                  {pillar.sources && pillar.sources.length > 0 && (
                    <li>
                      <a 
                        href="#fuentes-verificadas" 
                        className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">09</span>
                        <span>Fuentes Institucionales</span>
                      </a>
                    </li>
                  )}
                </ol>
              </nav>

              {/* Matriz Estructural Comparativa */}
              {pillar.table && pillar.table.rows && pillar.table.rows.length > 0 && (
                <section id="matriz-estructural" className="scroll-mt-24 space-y-4">
                  <div className="flex items-center gap-2">
                    <TableIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      Matriz Estructural Comparativa
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Datos estructurados del pilar para comparativa rápida, análisis cronológico y referencia ciudadana.
                  </p>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                          {pillar.table.headers.map((h, hIdx) => (
                            <th 
                              key={hIdx} 
                              className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {pillar.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td 
                                key={cIdx} 
                                className={`py-3.5 px-4 text-slate-700 dark:text-slate-300 align-top ${cIdx === 0 ? 'font-bold text-slate-900 dark:text-white whitespace-nowrap sm:whitespace-normal' : ''}`}
                              >
                                <AtlasFormattedText text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Las 6 Secciones Narrativas en Profundidad */}
              <div className="space-y-12">
                {pillar.sections.map((section, sIdx) => (
                  <section 
                    key={section.id} 
                    id={section.id} 
                    className="scroll-mt-24 space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 first:border-none first:pt-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {String(sIdx + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        {section.title}
                      </h2>
                    </div>

                    <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>
                          <AtlasFormattedText text={p} />
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Módulo de Distritos y Directorio Comercial Vinculado */}
              {pillar.crossLinks && (
                <section id="distritos-relacionados" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Compass className="w-4 h-4" />
                      <span>Conexión Territorial & Directorio Local</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      Distritos y Comercios Vinculados a este Pilar
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Explora la oferta comercial, servicios profesionales y fichas de negocios verificadas en las zonas clave mencionadas.
                    </p>
                  </div>

                  {/* Grid de Distritos */}
                  {pillar.crossLinks.districts && pillar.crossLinks.districts.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Distritos protagonistas:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {pillar.crossLinks.districts.map((dist) => (
                          <Link
                            key={dist.slug}
                            href={dist.url}
                            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 hover:shadow-sm transition-all group flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                                {dist.name}
                              </span>
                              <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500" />
                            </div>
                            {dist.desc && (
                              <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2">
                                {dist.desc}
                              </p>
                            )}
                            <span className="mt-2 text-[10px] font-bold text-sky-600 dark:text-sky-400">
                              Ver negocios en {dist.name} →
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grid de Categorías Comerciales */}
                  {pillar.crossLinks.categories && pillar.crossLinks.categories.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Categorías comerciales recomendadas en Todo Lima:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {pillar.crossLinks.categories.map((cat, cIdx) => (
                          <Link
                            key={cIdx}
                            href="/#directorios"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors border border-slate-200 dark:border-slate-700"
                          >
                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                            <span>{cat.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Expediente de Fuentes Verificadas */}
              {pillar.sources && pillar.sources.length > 0 && (
                <section id="fuentes-verificadas" className="scroll-mt-24 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-base">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>Expediente de Fuentes Institucionales Verificadas</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Este documento se basa estrictamente en normativa legal, repositorios ministeriales y archivos históricos oficiales:
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {pillar.sources.map((src, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                        <div>
                          <strong className="text-slate-900 dark:text-white font-bold">{src.publisher}:</strong>{' '}
                          <span>{src.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
                    <span>Revisión permanente · Equipo Editorial de Todo Lima</span>
                    <Link href="/correcciones" className="text-sky-600 dark:text-sky-400 underline font-semibold">
                      Proponer actualización de datos
                    </Link>
                  </div>
                </section>
              )}
            </article>

            {/* Columna Derecha: Sticky Sidebar */}
            <aside className="space-y-6">
              {/* Entidades de Conocimiento Wikidata */}
              {pillar.wikidataEntities && pillar.wikidataEntities.length > 0 && (
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                    <span>Knowledge Graph / Wikidata</span>
                  </h3>
                  <div className="space-y-2">
                    {pillar.wikidataEntities.map((ent) => (
                      <a
                        key={ent.id || ent.name}
                        href={ent.url || `https://www.wikidata.org/wiki/${ent.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 text-xs transition-colors group"
                      >
                        <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                          {ent.name}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          {ent.id && <span>{ent.id}</span>}
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-500" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Otros Pilares del Atlas */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Otros Pilares del Atlas
                  </h3>
                  <Link href="/conoce-lima" className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline">
                    Ver todos
                  </Link>
                </div>
                <div className="space-y-2.5">
                  {otherPillars.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/conoce-lima/${other.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/80 border border-sky-100 dark:border-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
                        <AtlasIcon name={other.icon} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 truncate">
                          {other.shortTitle}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Pilar 0{other.order}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Callout Directorio de Negocios */}
              <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-6 shadow-md">
                <Building2 className="w-8 h-8 text-sky-200 mb-3" />
                <h3 className="text-base font-bold leading-tight mb-2">
                  ¿Buscas servicios verificados en Lima?
                </h3>
                <p className="text-xs text-sky-100 leading-relaxed mb-4">
                  Accede a más de 1,700 fichas de negocios locales segmentados por especialidad y distrito.
                </p>
                <Link
                  href="/#directorios"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-sky-50 transition-colors"
                >
                  <span>Explorar Directorio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <JsonLd data={breadcrumbs([['Inicio', '/'], ['Conoce Lima', '/conoce-lima'], [pillar.shortTitle, `/conoce-lima/${pillar.slug}`]])} />
      <JsonLd data={articleSchema} />
    </>
  );
}
