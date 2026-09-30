import { getCategoryData } from '../../lib/getData.js';
import { CATEGORIES } from '../../scraper/config/categories.js';
import Navbar from '../../components/Navbar.js';
import RandomHero from '../../components/RandomHero.js';
import CategoryDirectorioClient from '../../components/CategoryDirectorioClient.js';
import GHLConversionSections from '../../components/GHLConversionSections.js';
import Footer from '../../components/Footer.js';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    subdomain: cat.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { subdomain } = params;
  const data = getCategoryData(subdomain);

  return {
    title: `${data.meta.title} (Revisión 2026) | Todo Lima`,
    description: data.meta.heroHook,
    openGraph: {
      title: data.meta.title,
      description: data.meta.heroHook,
      siteName: 'Todo Lima',
      locale: 'es_PE',
      type: 'website',
    }
  };
}

export default function SubdomainPage({ params }) {
  const { subdomain } = params;
  const { meta, pageContent, businesses, updatedAt, totalResults, hasData } = getCategoryData(subdomain);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar categoryTitle={meta.title} />

      <main className="flex-grow">
        {/* Héroe persuasivo con Open Design */}
        <RandomHero
          category={meta}
          pageContent={pageContent}
          totalResults={totalResults}
          updatedAt={updatedAt}
        />

        {/* Sección del Directorio con Filtrado Interactivo */}
        {hasData ? (
          <CategoryDirectorioClient
            businesses={businesses}
            categoryTitle={meta.title}
          />
        ) : (
          <div className="max-w-xl mx-auto px-4 my-16">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Extrayendo negocios para {meta.title}...
              </h3>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                El robot de Playwright se encuentra procesando las fichas públicas de Google Maps para esta categoría. En breve estará disponible el directorio con los mejores especialistas de Lima.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 font-bold text-xs text-sky-700 bg-sky-50 border border-sky-200 px-5 py-3 rounded-xl hover:bg-sky-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Explorar otras categorías listas</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Módulos de Conversión, Autoridad y FAQs */}
        <GHLConversionSections category={meta} />
      </main>

      <Footer />
    </div>
  );
}
