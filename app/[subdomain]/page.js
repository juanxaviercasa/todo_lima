import { Suspense } from 'react';
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
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
          <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 font-medium">Cargando directorio de especialistas...</div>}>
            <CategoryDirectorioClient
              businesses={businesses}
              categoryTitle={meta.title}
            />
          </Suspense>
        ) : (
          <div className="max-w-xl mx-auto px-4 my-16">
            <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/85 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-12 text-center shadow-sm dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-200 dark:border-amber-500/30 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Extrayendo negocios para {meta.title}...
              </h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                El robot de Playwright se encuentra procesando las fichas públicas de Google Maps para esta categoría. En breve estará disponible el directorio con los mejores especialistas de Lima.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 font-bold text-xs text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 px-5 py-3 rounded-xl hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors"
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

        {/* Schema FAQPage para Answer Engine Optimization (AEO & GEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              'mainEntity': [
                {
                  '@type': 'Question',
                  'name': `¿Cómo encontrar los mejores profesionales de ${meta.title} en Lima?`,
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': `En Todo Lima puedes filtrar y contactar a los especialistas de ${meta.title} con más de 4.5 estrellas en Google Maps y atención directa por WhatsApp en los diferentes distritos de Lima Metropolitana.`
                  }
                },
                {
                  '@type': 'Question',
                  'name': `¿Cómo contactar por WhatsApp con ${meta.title} en Lima?`,
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': `Elige el comercio o especialista en el directorio y haz clic en "Contactar por WhatsApp Directo" para chatear en tiempo real sin comisiones.`
                  }
                },
                {
                  '@type': 'Question',
                  'name': `¿Cómo reclamar la ficha de mi negocio en ${meta.title}?`,
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': `Si eres el dueño o representante, haz clic en "¿Eres el dueño? Reclama tu ficha" en la tarjeta de tu comercio o escribe a nuestro WhatsApp oficial (+51 925 475 034) para recibir una Auditoría 360° gratuita.`
                  }
                }
              ]
            })
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
