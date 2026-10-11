import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar.js';
import Footer from '../../../components/Footer.js';
import JsonLd from '../../../components/JsonLd.js';
import AtlasHero from '../../../components/AtlasHero.js';
import AtlasContents from '../../../components/AtlasContents.js';
import AtlasIcon from '../../../components/AtlasIcon.js';
import AtlasFormattedText from '../../../components/AtlasFormattedText.js';
import { getPillars, getPillarBySlug, getAllPillarSlugs } from '../../../lib/atlas.js';
import { ATLAS_IMAGES } from '../../../lib/atlasImages.js';
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

  const heroImg = ATLAS_IMAGES[pillar.images?.hero] || ATLAS_IMAGES[`${pillar.slug}-hero`];

  const meta = pageMetadata(
    `${pillar.title} | Conoce Lima | Todo Lima`,
    pillar.metaDescription,
    `/conoce-lima/${pillar.slug}`,
    heroImg
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

  const heroImg = ATLAS_IMAGES[pillar.images?.hero] || ATLAS_IMAGES[`${pillar.slug}-hero`];
  const imgA = ATLAS_IMAGES[pillar.images?.interiorA];
  const imgB = ATLAS_IMAGES[pillar.images?.interiorB];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pillar.title,
    description: pillar.metaDescription,
    mainEntityOfPage: `${SITE_URL}/conoce-lima/${pillar.slug}`,
    url: `${SITE_URL}/conoce-lima/${pillar.slug}`,
    image: heroImg ? `${SITE_URL}${heroImg.src}` : undefined,
    datePublished: '2026-10-10',
    dateModified: '2026-10-10',
    author: {
      '@type': 'Organization',
      name: 'Todo Lima',
      url: `${SITE_URL}/equipo-editorial`,
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
      <main id="contenido" className="atlas-page min-w-0 flex-grow">
        {/* Hero Section con Fotografía Documental */}
        <AtlasHero image={heroImg} title={pillar.title} intro={pillar.metaDescription} topic={pillar.shortTitle}/>

        {/* Contenido principal en 2 columnas */}
        <div id="contenido-atlas" className="max-w-7xl mx-auto px-5 py-10 scroll-mt-24">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_19rem] gap-6 xl:gap-8">
            {/* Columna Izquierda: Contenido del Pilar */}
            <article className="min-w-0 space-y-12">
              {/* Featured Snippet Definition Box */}
              {pillar.canonicalDefinition && (
                <section className="relative rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-900/60 border-2 border-sky-200 dark:border-sky-900/50 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2.5 text-sky-700 dark:text-sky-400 text-xs font-extrabold uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span>Lo esencial</span>
                  </div>
                  <blockquote className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    "{pillar.canonicalDefinition}"
                  </blockquote>
                  <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
                    Resumen editorial de Todo Lima.
                  </p>
                </section>
              )}

              {/* Tabla de Contenidos Interactiva (TOC) */}
              <AtlasContents pillar={pillar}/>

              {/* Datos de un vistazo */}
              {pillar.table && pillar.table.rows && pillar.table.rows.length > 0 && (
                <section id="matriz-estructural" className="scroll-mt-24 space-y-4">
                  <div className="flex items-center gap-2">
                    <TableIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      Datos de un vistazo
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Compara los datos principales. En pantallas pequeñas, desliza la tabla horizontalmente.
                  </p>

                  <div role="region" aria-label="Tabla comparativa; desplazamiento horizontal" tabIndex={0} className="atlas-table max-w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                    <table className="w-full min-w-[640px] text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                          {pillar.table.headers.map((h, hIdx) => (
                            <th 
                              key={hIdx} scope="col"
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
                                className={`py-3.5 px-4 text-slate-700 dark:text-slate-300 align-top ${cIdx === 0 ? 'font-bold text-slate-900 dark:text-white whitespace-normal' : ''}`}
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

              {/* Las 6 Secciones Narrativas con Fotografías Documentales Intercaladas */}
              <div className="space-y-12">
                {pillar.sections.map((section, sIdx) => (
                  <div key={section.id}>
                    <section 
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

                    {/* Inserción Fotográfica A: Entre Sección 2 y Sección 3 */}
                    {sIdx === 1 && imgA && (
                      <figure className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm group">
                        <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={imgA.src}
                            srcSet={imgA.srcSet}
                            sizes="(min-width: 1024px) 780px, 100vw"
                            alt={imgA.alt}
                            width="1440"
                            height="810"
                            loading="lazy"
                            className="block w-full h-full object-contain"
                          />
                        </div>
                        <figcaption className="p-4 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <span className="font-medium">{imgA.caption || imgA.alt}</span>
                          <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 shrink-0">Atlas Conoce Lima</span>
                        </figcaption>
                      </figure>
                    )}

                    {/* Inserción Fotográfica B: Entre Sección 4 y Sección 5 */}
                    {sIdx === 3 && imgB && (
                      <figure className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm group">
                        <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={imgB.src}
                            srcSet={imgB.srcSet}
                            sizes="(min-width: 1024px) 780px, 100vw"
                            alt={imgB.alt}
                            width="1440"
                            height="810"
                            loading="lazy"
                            className="block w-full h-full object-contain"
                          />
                        </div>
                        <figcaption className="p-4 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <span className="font-medium">{imgB.caption || imgB.alt}</span>
                          <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 shrink-0">Atlas Conoce Lima</span>
                        </figcaption>
                      </figure>
                    )}
                  </div>
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
                      Distritos y negocios relacionados
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Explora los negocios y servicios de las zonas mencionadas; confirma sus condiciones directamente con cada proveedor.
                    </p>
                  </div>

                  {/* Grid de Distritos */}
                  {pillar.crossLinks.districts && pillar.crossLinks.districts.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Distritos protagonistas:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3">
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
                              <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
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
                    <span>Fuentes y referencias</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Referencias y entidades citadas para ampliar la información de esta guía:
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
                    <span>Referencias en Wikidata</span>
                  </h3>
                  <div className="space-y-2">
                    {pillar.wikidataEntities.map((ent) => (
                      <a
                        key={ent.id || ent.name}
                        href={ent.url || `https://www.wikidata.org/wiki/${ent.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 text-xs transition-colors group"
                      >
                        <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                          {ent.name}
                        </span>
                        <div className="flex shrink-0 items-center gap-1 text-[10px] text-slate-400">
                          {ent.id && <span>{ent.id}</span>}
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-500" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Sigue conociendo Lima */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Sigue conociendo Lima
                  </h3>
                  <Link href="/conoce-lima" className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline">
                    Ver todos
                  </Link>
                </div>
                <div className="space-y-2.5">
                  {otherPillars.map((other) => {
                    const otherThumb = ATLAS_IMAGES[other.images?.hero] || ATLAS_IMAGES[`${other.slug}-hero`];
                    return (
                      <Link
                        key={other.slug}
                        href={`/conoce-lima/${other.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        {otherThumb ? (
                          <img
                            src={otherThumb.src}
                            alt=""
                            width="40"
                            height="40"
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/80 border border-sky-100 dark:border-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
                            <AtlasIcon name={other.icon} className="w-4 h-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 leading-relaxed">
                            {other.shortTitle}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Explorar tema
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Callout Directorio de Negocios */}
              <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-6 shadow-md">
                <Building2 className="w-8 h-8 text-sky-200 mb-3" />
                <h3 className="text-base font-bold leading-tight mb-2">
                  ¿Buscas un negocio en Lima?
                </h3>
                <p className="text-xs text-sky-100 leading-relaxed mb-4">
                  Encuentra negocios y servicios por categoría y distrito. Consulta su información y contacta directamente con cada proveedor.
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
