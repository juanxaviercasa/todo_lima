import { getCategoryData } from '../../lib/getData.js';
import Navbar from '../../components/Navbar.js';
import HeroGHL from '../../components/HeroGHL.js';
import BusinessCard from '../../components/BusinessCard.js';
import GHLConversionSections from '../../components/GHLConversionSections.js';
import Footer from '../../components/Footer.js';
import { AlertCircle, Clock } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { subdomain } = params;
  const data = getCategoryData(subdomain);

  return {
    title: `${data.meta.title} (Revisión 2026)`,
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
  const { meta, businesses, updatedAt, totalResults, hasData } = getCategoryData(subdomain);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar categoryTitle={meta.title} />

      <main className="flex-grow">
        {/* Héroe persuasivo con estructura Go High Level */}
        <HeroGHL
          category={meta}
          totalResults={totalResults}
          updatedAt={updatedAt}
        />

        {/* Sección de Fichas de Negocios */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Fichas Verificadas en Lima
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Ordenados por reputación en Google Maps y número de valoraciones de pacientes o clientes reales.
              </p>
            </div>

            {hasData && (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 py-1.5 px-3 rounded-xl shadow-xs shrink-0 self-start">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>{businesses.length} Negocios en el ranking</span>
              </div>
            )}
          </div>

          {hasData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businesses.map((business, index) => (
                <BusinessCard
                  key={business.id || index}
                  business={business}
                  rank={index + 1}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto my-8 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Extrayendo negocios para {meta.title}...
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                El robot de Playwright se encuentra procesando las fichas públicas de Google Maps para esta categoría. En breve estará disponible el directorio con hasta 100 especialistas.
              </p>
              <div className="mt-6">
                <a
                  href="/"
                  className="inline-flex items-center justify-center font-bold text-xs text-sky-700 bg-sky-50 border border-sky-200 px-4 py-2.5 rounded-xl hover:bg-sky-100 transition-colors"
                >
                  Explorar otras categorías listas
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Módulos de Conversión, Autoridad y FAQs */}
        <GHLConversionSections category={meta} />
      </main>

      <Footer />
    </div>
  );
}
