import { EDITORIAL_IMAGES } from '../../lib/editorialImages.js';
import Link from 'next/link';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import HomeExplorer from '../../components/HomeExplorer.js';
import JsonLd from '../../components/JsonLd.js';
import { getDirectory } from '../../lib/directory.js';
import { categoryEditorial } from '../../lib/categoryEditorial.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../lib/seo.js';
import { getMacroAreas } from '../../lib/areasTaxonomy.js';
import AreaIcon from '../../components/AreaIcon.js';

export const metadata = pageMetadata(
  'Categorías y Áreas de Negocios en Lima | Directorio Todo Lima',
  'Explora las 14 grandes áreas temáticas y 56 categorías de negocios y profesionales en Lima Metropolitana. Encuentra servicios verificados por distrito.',
  '/categorias',
  EDITORIAL_IMAGES['explorar-servicios']
);

export default function CategoriasIndexPage() {
  const categories = getDirectory().map(c => ({
    ...c.meta,
    description: categoryEditorial(c.meta).description,
    count: c.businesses.length,
    districtCounts: c.businesses.reduce((counts, b) => {
      counts[b.district] = (counts[b.district] || 0) + 1;
      return counts;
    }, {})
  }));

  const activeAreas = getMacroAreas({ includeUpcoming: false });

  return (
    <>
      <Navbar />
      <main id="contenido" className="flex-grow">
        {/* Hero de Categorías */}
        <section className="editorial-hero relative overflow-hidden bg-slate-950 text-white border-b border-slate-800">
          <div className="editorial-hero-media">
            <img {...EDITORIAL_IMAGES['explorar-servicios']} sizes="100vw" width="1440" height="810" fetchPriority="high" className="block w-full h-auto" />
            <div className="category-hero-shade absolute inset-0" aria-hidden="true" />
          </div>
          <div className="editorial-hero-copy relative max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 text-xs text-sky-400 font-semibold mb-4 uppercase tracking-wider">
              <Link href="/" className="hover:underline">Inicio</Link>
              <span>/</span>
              <span className="text-slate-300">Categorías</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black max-w-3xl leading-tight">
              Grandes Áreas y Categorías de Lima
            </h1>
            <p className="mt-4 text-slate-300 max-w-2xl text-base sm:text-lg leading-relaxed">
              Organizamos la ciudad en grandes áreas para que explores con facilidad y categorías específicas para que encuentres el negocio o profesional que necesitas en tu distrito.
            </p>

            <p className="mt-4 text-xs text-slate-200">Imagen ilustrativa generada con IA.</p>

            {/* Accesos rápidos a páginas dedicadas de cada área */}
            <div className="flex flex-wrap gap-2.5 mt-8">
              {activeAreas.map(area => (
                <Link
                  key={area.slug}
                  href={`/categorias/${area.slug}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <AreaIcon name={area.icon} className="w-3.5 h-3.5 text-sky-400" />
                  <span>{area.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Explorador con búsqueda, filtros de distrito y tarjetas interactivas */}
        <HomeExplorer categories={categories} />

        <JsonLd
          data={breadcrumbs([
            ['Inicio', '/'],
            ['Categorías', '/categorias']
          ])}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Directorio de Categorías en Lima',
            url: `${SITE_URL}/categorias`,
            description: 'Grandes áreas y categorías de negocios, técnicos y profesionales en Lima Metropolitana.',
            isPartOf: { '@id': `${SITE_URL}/#website` }
          }}
        />
      </main>
      <Footer />
    </>
  );
}
