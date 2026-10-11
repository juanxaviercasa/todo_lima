import Link from 'next/link';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import JsonLd from '../../components/JsonLd.js';
import AtlasHero from '../../components/AtlasHero.js';
import AtlasIcon from '../../components/AtlasIcon.js';
import { getPillars } from '../../lib/atlas.js';
import { ATLAS_IMAGES } from '../../lib/atlasImages.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../lib/seo.js';
import { 
  Building2, 
  BookOpen, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Compass,
  FileCheck2
} from 'lucide-react';

export const metadata = pageMetadata(
  'Conoce Lima: Atlas Territorial, Histórico y Cultural | Todo Lima',
  'Enciclopedia de referencia sobre Lima Metropolitana. siete temas sobre historia prehispánica y virreinal, gastronomía criolla, tradiciones vivas, geografía, transporte, las 5 Limas y clústeres comerciales.',
  '/conoce-lima',
  ATLAS_IMAGES['atlas-hub-hero']
);

export default function ConoceLimaHubPage() {
  const pillars = getPillars();
  const hubHero = ATLAS_IMAGES['atlas-hub-hero'];

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Atlas Conoce Lima: Enciclopedia Territorial, Histórica y Cultural',
    description: 'Guía de referencia permanente y canónica sobre el territorio, la memoria histórica y la cultura de Lima Metropolitana.',
    url: `${SITE_URL}/conoce-lima`,
    publisher: {
      '@type': 'Organization',
      name: 'Todo Lima',
      url: SITE_URL,
    },
    hasPart: pillars.map((p, idx) => ({
      '@type': 'Article',
      position: idx + 1,
      name: p.title,
      description: p.metaDescription,
      url: `${SITE_URL}/conoce-lima/${p.slug}`,
      image: ATLAS_IMAGES[p.images?.hero]?.src ? `${SITE_URL}${ATLAS_IMAGES[p.images.hero].src}` : undefined,
    })),
  };

  return (
    <>
      <Navbar />
      <main id="contenido" className="atlas-page min-w-0 flex-grow">
        {/* Hero Section con Fotografía Panorámica */}
        <AtlasHero image={hubHero} title="Lima, una ciudad por descubrir" intro="Explora su historia, gastronomía, tradiciones y barrios. Siete recorridos temáticos para entender la ciudad y conectar con su vida local."/>

        {/* Contenedor Principal de Pilares */}
        <div id="temas-lima" className="max-w-7xl mx-auto px-5 py-10 sm:py-14 space-y-10 scroll-mt-24">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Compass className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Elige por dónde empezar
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Siete formas de conocer Lima
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Historia, sabores, cultura, paisajes, transporte, barrios y comercio: encuentra el tema que te interesa y sigue explorando.
            </p>
          </div>

          {/* Grid de Tarjetas de Pilares Enriquecidas con Imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((pillar) => {
              const pImg = ATLAS_IMAGES[pillar.images?.hero] || ATLAS_IMAGES[`${pillar.slug}-hero`];
              return (
                <article 
                  key={pillar.slug}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-500/50 transition-all duration-300 open-card"
                >
                  {/* Imagen de Cabecera de la Tarjeta */}
                  {pImg && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                      <img
                        src={pImg.src}
                        srcSet={pImg.srcSet}
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        alt={pImg.alt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 right-3 flex items-start gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-white border border-white/20">
                          {pillar.shortTitle}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-slate-950/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-sky-400">
                        <AtlasIcon name={pillar.icon} className="w-5 h-5" />
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        <Link href={`/conoce-lima/${pillar.slug}`}>
                          {pillar.title}
                        </Link>
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {pillar.metaDescription}
                      </p>

                      {/* Highlights de secciones */}
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Temas destacados:
                        </p>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          {pillar.sections.slice(0, 3).map((sec) => (
                            <li key={sec.id} className="flex items-start gap-2 min-w-0">
                              <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-sky-500 shrink-0" />
                              <span className="min-w-0 leading-relaxed">{sec.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom link button */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href={`/conoce-lima/${pillar.slug}`}
                        className="inline-flex items-center justify-between w-full font-bold text-xs sm:text-sm text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300"
                      >
                        <span>Explorar este tema</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Sección de Metodología y Fuentes Institucionales */}
          <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-widest mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Fuentes y contexto</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Construido sobre datos públicos y fuentes primarias
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Cada tema reúne contexto, datos y referencias para seguir investigando. Puedes consultar la metodología editorial y proponer una corrección si encuentras información desactualizada. Las imágenes son ilustraciones generadas con IA, no fotografías documentales.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/metodologia"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Ver Metodología Editorial</span>
                </Link>
                <Link
                  href="/#directorios"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors border border-slate-700"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Ir al Directorio de Empresas</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <JsonLd data={breadcrumbs([['Inicio', '/'], ['Conoce Lima', '/conoce-lima']])} />
      <JsonLd data={jsonLdData} />
    </>
  );
}
