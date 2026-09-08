import Link from 'next/link';
import { ShieldCheck, MapPin } from 'lucide-react';

export default function Navbar({ categoryTitle }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              TL
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                Todo<span className="text-sky-600">Lima</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-0.5">
                Directorio Oficial
              </span>
            </div>
          </Link>

          {categoryTitle && (
            <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 py-1 px-2.5 rounded-full">
                Lima, Perú
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Datos Verificados 2026</span>
          </div>

          <a
            href="https://wa.me/51999999999?text=Hola,%20deseo%20publicar%20mi%20negocio%20en%20todolima.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors py-2 px-3.5 sm:px-4 rounded-xl shadow-sm"
          >
            Publicar Negocio
          </a>
        </div>
      </div>
    </header>
  );
}
