import { getAllCategoriesWithStatus } from '../lib/getData.js';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { Search, ArrowRight, ShieldCheck, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Todo Lima | Red Oficial de Directorios Locales en Lima, Perú',
  description: 'Encuentra y contacta en segundos a los profesionales, especialistas y negocios mejor calificados en Lima.',
};

export default function HomePage() {
  const categories = getAllCategoriesWithStatus();
  const readyCount = categories.filter(c => c.hasData).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        {/* Héroe del Portal Principal */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 sm:pt-20 sm:pb-28">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs sm:text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Red Masiva de Directorios Especializados para Lima</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Los Especialistas Mejor Calificados de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                Lima
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Accede a directorios independientes por rubro con valoraciones de Google Maps auditadas y contacto directo por WhatsApp.
            </p>

            {/* Métricas rápidas */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Más de 35 categorías mapeadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Sólo negocios con 4.5+ estrellas</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Extracción y actualización 24/7</span>
              </div>
            </div>
          </div>
        </section>

        {/* Directorio de Categorías */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Explora los Directorios por Rubro
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Haz clic en cualquier categoría para ver su subdominio y el Top 10 de negocios clasificados.
              </p>
            </div>

            <div className="text-xs font-bold text-slate-600 bg-white border border-slate-200 py-2 px-4 rounded-xl shadow-xs self-start">
              <span className="text-emerald-600 font-extrabold">{readyCount}</span> de {categories.length} categorías sincronizadas
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/${cat.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {cat.niche}
                    </span>
                    {cat.hasData ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Top 10 Listo
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                        En cola
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.heroHook}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-700">
                  <span>{cat.slug}.todolima.com</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
