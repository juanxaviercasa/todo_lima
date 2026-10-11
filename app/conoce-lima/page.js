import Link from 'next/link';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import JsonLd from '../../components/JsonLd.js';
import AtlasIcon from '../../components/AtlasIcon.js';
import { getPillars } from '../../lib/atlas.js';
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
  'Enciclopedia de referencia sobre Lima Metropolitana. 7 pilares esenciales sobre historia prehispánica y virreinal, gastronomía criolla, tradiciones vivas, geografía, transporte, las 5 Limas y clústeres comerciales.',
  '/conoce-lima'
);

export default function ConoceLimaHubPage() {
  const pillars = getPillars();

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
    })),
  };

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-w-0 [overflow-wrap:anywhere] flex-grow">
        {/* Hero Section con Mesh Gradient */}
        <header className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/30 via-slate-950/80 to-slate-950 pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-5">
            <nav aria-label="Ruta de navegación" className="flex flex-wrap gap-2 text-xs sm:text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-sky-400 font-semibold">Conoce Lima (Atlas)</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold tracking-wide uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Atlas Conoce Lima · Enciclopedia Territorial y Cultural</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl leading-tight">
              La identidad, historia y geografía de <span className="text-sky-400">Lima Metropolitana</span>
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
              Un compendio referencial permanente diseñado para ciudadanos, visitantes e investigadores. 
              Siete pilares de conocimiento estructurado que desglosan la evolución milenaria, el mestizaje culinario, 
              la división territorial y los motores económicos de la capital del Perú.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl border-t border-slate-800/80 pt-8">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-sky-400">7</p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">Pilares Canónicos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">43 + Callao</p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">Distritos Documentados</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400">5</p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">Macrozonas Metropolitanas</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-purple-400">100%</p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">Fuentes Institucionales</p>
              </div>
            </div>
          </div>
        </header>

        {/* Contenedor Principal de Pilares */}
        <div className="max-w-7xl mx-auto px-5 py-12 sm:py-16 space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Compass className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Estructura de Referencia Permanente
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Los 7 Pilares del Conocimiento Limeño
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Cada módulo integra una matriz estructural comparativa, narrativa de profundidad contextual, 
              entidades enlazadas de Wikidata y conexiones directas con los distritos y comercios de la ciudad.
            </p>
          </div>

          {/* Grid de Tarjetas de Pilares */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((pillar) => (
              <article 
                key={pillar.slug}
                className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-sky-500/50 transition-all duration-300 open-card"
              >
                <div>
                  {/* Top card header */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                      <AtlasIcon name={pillar.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Pilar 0{pillar.order}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    <Link href={`/conoce-lima/${pillar.slug}`}>
                      {pillar.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {pillar.metaDescription}
                  </p>

                  {/* Highlights de secciones */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Temas destacados:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {pillar.sections.slice(0, 3).map((sec) => (
                        <li key={sec.id} className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                          <span className="truncate">{sec.title}</span>
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
                    <span>Explorar contenido completo</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Sección de Metodología y Fuentes Institucionales */}
          <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-widest mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Rigor y Verificación Documental</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Construido sobre datos públicos y fuentes primarias
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                El Atlas Conoce Lima no utiliza contenido genérico ni redactado al azar. Todas las matrices, 
                marcos legales y cronologías han sido consolidadas y verificadas consultando repositorios oficiales 
                de la Municipalidad Metropolitana de Lima (MML/PROLIMA), el Ministerio de Cultura (MINCUL), 
                el Instituto Nacional de Estadística e Informática (INEI), la Autoridad de Transporte Urbano (ATU), 
                el Archivo General de la Nación (AGN) y el diario oficial El Peruano.
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
