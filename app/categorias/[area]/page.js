import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles, MapPin } from 'lucide-react';
import Navbar from '../../../components/Navbar.js';
import Footer from '../../../components/Footer.js';
import JsonLd from '../../../components/JsonLd.js';
import AreaIcon from '../../../components/AreaIcon.js';
import { getDirectory } from '../../../lib/directory.js';
import { categoryEditorial } from '../../../lib/categoryEditorial.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../../lib/seo.js';
import { getMacroAreas, getAreaBySlug } from '../../../lib/areasTaxonomy.js';

export const dynamicParams = false;

export function generateStaticParams() {
  return getMacroAreas({ includeUpcoming: false }).map(area => ({
    area: area.slug
  }));
}

export function generateMetadata({ params }) {
  const area = getAreaBySlug(params.area);
  if (!area) return {};
  return pageMetadata(
    `${area.title} en Lima | Categorías y Directorios Especializados`,
    `${area.editorial.headline}. Explora ${area.categorySlugs.length} categorías especializadas en Lima: ${area.description}`,
    `/categorias/${area.slug}`
  );
}

export default function AreaPage({ params }) {
  const area = getAreaBySlug(params.area);
  if (!area) notFound();

  const allDirectory = getDirectory();

  // Categorías primarias de esta área
  const areaCategories = area.categorySlugs
    .map(slug => allDirectory.find(c => c.meta.slug === slug))
    .filter(Boolean)
    .map(c => ({
      ...c.meta,
      description: categoryEditorial(c.meta).description,
      count: c.businesses.length,
      districts: c.businesses.reduce((acc, b) => {
        if (b.district && b.district !== 'Lima') {
          acc[b.district] = (acc[b.district] || 0) + 1;
        }
        return acc;
      }, {})
    }));

  // Categorías recomendadas secundarias (cross-linking sin duplicar páginas)
  const recommendedCategories = area.recommendedSlugs
    .map(slug => allDirectory.find(c => c.meta.slug === slug))
    .filter(Boolean)
    .map(c => ({
      ...c.meta,
      description: categoryEditorial(c.meta).description,
      count: c.businesses.length
    }));

  const totalBusinesses = areaCategories.reduce((sum, c) => sum + c.count, 0);
  const otherAreas = getMacroAreas({ includeUpcoming: false }).filter(a => a.slug !== area.slug);

  return (
    <>
      <Navbar />
      <main id="contenido" className="flex-grow">
        {/* Cabecera del Área */}
        <section className="bg-slate-950 text-white py-14 sm:py-16 border-b border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 relative z-10">
            {/* Breadcrumb accesible */}
            <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-xs text-sky-400 font-semibold mb-5 uppercase tracking-wider">
              <Link href="/" className="hover:underline">Inicio</Link>
              <span>/</span>
              <Link href="/categorias" className="hover:underline">Categorías</Link>
              <span>/</span>
              <span className="text-slate-300">{area.title}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-bold mb-4">
                  <AreaIcon name={area.icon} className="w-4 h-4" />
                  <span>Gran Área de Lima</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                  {area.title}
                </h1>
                <p className="mt-3 text-lg sm:text-xl font-medium text-sky-200">
                  {area.editorial.headline}
                </p>
                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {area.editorial.intro}
                </p>
              </div>

              <div className="shrink-0 p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center min-w-[200px]">
                <span className="text-3xl sm:text-4xl font-black text-sky-400 block">
                  {areaCategories.length}
                </span>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400 mt-1 block">
                  Categorías disponibles
                </span>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                  <strong className="text-white font-bold">{totalBusinesses}</strong> negocios registrados
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Categorías del Área */}
        <section className="max-w-7xl mx-auto px-5 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
                SERVICIOS Y RUBROS INCLUIDOS
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Categorías en {area.title}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
                Selecciona una categoría para ver los negocios, teléfonos y direcciones disponibles en los distritos de Lima.
              </p>
            </div>
            <Link
              href="/categorias"
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>Ver todas las áreas</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaCategories.map(cat => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 dark:hover:border-sky-400 group transition-all flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={`/images/categories/${cat.slug.replace(/-/g, '_')}.webp`}
                    alt=""
                    width="640"
                    height="400"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur text-xs font-bold text-white">
                    {cat.count} opciones
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {cat.title.replace(' en Lima', '')}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>

                  <div className="mt-auto pt-4 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800/80">
                    {Object.keys(cat.districts).slice(0, 3).map(dist => (
                      <span key={dist} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {dist}
                      </span>
                    ))}
                    {Object.keys(cat.districts).length > 3 && (
                      <span className="text-[11px] text-slate-400 self-center">
                        +{Object.keys(cat.districts).length - 3} distritos
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recomendaciones Cruzadas Secundarias */}
        {recommendedCategories.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 py-8">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-8 sm:p-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Servicios recomendados en otras áreas para {area.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mb-6">
                Especialidades complementarias frecuentemente consultadas en conjunto. Accede a su página directa sin intermediación.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedCategories.map(rc => (
                  <Link
                    key={rc.slug}
                    href={`/${rc.slug}`}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 transition-colors group flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors">
                        {rc.title.replace(' en Lima', '')}
                      </h4>
                      <span className="text-xs text-slate-500">{rc.count} opciones</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-sky-600 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Consejos editoriales para elegir en este área */}
        <section className="max-w-7xl mx-auto px-5 py-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="editorial-card">
              <div className="flex items-center gap-2 text-sky-600 font-bold mb-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-sky-500" />
                <span>Criterio para elegir</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Qué verificar antes de contratar o reservar</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {area.editorial.buyingTip}
              </p>
            </div>

            <div className="editorial-card">
              <div className="flex items-center gap-2 text-sky-600 font-bold mb-3 text-sm">
                <MapPin className="w-5 h-5 text-sky-500" />
                <span>Cobertura en distritos</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Ubicación física vs. atención a domicilio</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                En Lima Metropolitana la dirección registrada corresponde al local o consultorio publicado. Para servicios a domicilio o pedidos para llevar, consulta siempre la cobertura real y costos de desplazamiento con el negocio.
              </p>
            </div>
          </div>
        </section>

        {/* Próximas incorporaciones en esta área */}
        {area.upcomingCategories.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 py-8">
            <div className="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Próximas incorporaciones en {area.title}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {area.upcomingCategories.map(item => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 font-medium"
                  >
                    {item} · <span className="text-slate-400 text-[10px]">Próximamente</span>
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Otras Áreas para Explorar */}
        <section className="max-w-7xl mx-auto px-5 py-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
            Explora otras grandes áreas de Lima
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {otherAreas.map(oa => (
              <Link
                key={oa.slug}
                href={`/categorias/${oa.slug}`}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 transition-colors group flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-500 group-hover:text-white text-slate-600 dark:text-slate-300 transition-colors">
                    <AreaIcon name={oa.icon} className="w-4 h-4" />
                  </span>
                  <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {oa.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 mt-auto">
                  {oa.categorySlugs.length} categorías
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Schemas JSON-LD */}
        <JsonLd
          data={breadcrumbs([
            ['Inicio', '/'],
            ['Categorías', '/categorias'],
            [area.title, `/categorias/${area.slug}`]
          ])}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${area.title} en Lima`,
            url: `${SITE_URL}/categorias/${area.slug}`,
            description: area.description,
            isPartOf: { '@id': `${SITE_URL}/#website` }
          }}
        />
      </main>
      <Footer />
    </>
  );
}
