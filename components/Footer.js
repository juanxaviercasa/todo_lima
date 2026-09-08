import Link from 'next/link';
import { CATEGORIES } from '../scraper/config/categories.js';

export default function Footer() {
  const popularCategories = CATEGORIES.slice(0, 16);

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-black text-sm">
                TL
              </span>
              <span className="font-black text-xl text-white tracking-tight">
                Todo<span className="text-sky-500">Lima</span>
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              La mayor red de directorios locales hiperespecializados para Lima, Perú. Conectamos usuarios que necesitan servicios urgentes y de calidad con los negocios y profesionales mejor calificados de la ciudad.
            </p>
            <div className="mt-4 text-xs text-slate-500">
              © {new Date().getFullYear()} Todo Lima Network. Todos los derechos reservados.
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Directorios Populares en Lima
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {popularCategories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="hover:text-sky-400 transition-colors py-1 truncate"
                >
                  {cat.title.split(' en Lima')[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
