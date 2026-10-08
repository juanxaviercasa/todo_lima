'use client';

import Link from 'next/link';
import { CATEGORIES } from '../scraper/config/categories.js';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowUp, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saludCategories = CATEGORIES.filter(c => c.niche === 'salud').slice(0, 6);
  const hogarCategories = CATEGORIES.filter(c => c.niche === 'hogar').slice(0, 6);
  const legalAutoCategories = CATEGORIES.filter(c => c.niche === 'legal' || c.niche === 'automotriz').slice(0, 6);
  const otrosCategories = CATEGORIES.filter(c => c.niche === 'eventos' || c.niche === 'belleza' || c.niche === 'tecnologia').slice(0, 6);

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800/80 mt-auto">
      {/* Barra superior del footer */}
      <div className="border-b border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-300">
              Red Operativa: 38 Directorios Sincronizados con Google Maps en Lima
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Lima Metropolitana, Perú</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Revisión 2026</span>
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal del Footer en Columnas Abiertas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Columna de Marca (2 columnas de ancho) */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img 
                src="/images/logo.jpg" 
                alt="Todo Lima Logo" 
                className="w-9 h-9 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tight">
                  Todo<span className="text-sky-500">Lima</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                  Directorio Oficial
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              La mayor red de directorios locales hiperespecializados para Lima, Perú. Conectamos directamente a familias y empresas con los especialistas y negocios mejor valorados de la ciudad.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href="https://wa.me/51925475034?text=Hola,%20deseo%20publicar%20mi%20negocio%20en%20todolima.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Negocios: +51 925 475 034</span>
              </a>
            </div>
          </div>

          {/* Columna: Salud y Medicina */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Salud y Medicina
            </h4>
            <ul className="space-y-2 text-xs">
              {saludCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="hover:text-sky-400 transition-colors block py-0.5"
                  >
                    {cat.title.split(' en Lima')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna: Hogar y Reparaciones */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Hogar & Técnicos
            </h4>
            <ul className="space-y-2 text-xs">
              {hogarCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="hover:text-sky-400 transition-colors block py-0.5"
                  >
                    {cat.title.split(' en Lima')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna: Legal y Automotriz */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Legal & Autos
            </h4>
            <ul className="space-y-2 text-xs">
              {legalAutoCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="hover:text-sky-400 transition-colors block py-0.5"
                  >
                    {cat.title.split(' en Lima')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna: Eventos, Belleza y Tech */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Eventos & Estilo
            </h4>
            <ul className="space-y-2 text-xs">
              {otrosCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="hover:text-sky-400 transition-colors block py-0.5"
                  >
                    {cat.title.split(' en Lima')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra inferior de copyright y botón volver arriba */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Todo Lima Network (`todolima.com`). Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-400 transition-colors">
              Inicio
            </Link>
            <a href="/#directorios" className="hover:text-slate-400 transition-colors">
              Categorías
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-xl"
              title="Volver arriba"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
