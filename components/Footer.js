'use client';

import Link from 'next/link';
import { CATEGORIES } from '../scraper/config/categories.js';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowUp, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Mail
} from 'lucide-react';
import { TODOLIMA_EMAIL, TODOLIMA_WHATSAPP_DISPLAY, buildWhatsAppLink } from '../lib/contact.js';
import ThemeToggle from './ThemeToggle.js';

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
              Red Operativa: {CATEGORIES.length} Directorios Especializados en Lima Metropolitana
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

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={buildWhatsAppLink('Hola Todo Lima, deseo informacion sobre la publicacion o verificacion de mi negocio en todolima.com.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Negocios: {TODOLIMA_WHATSAPP_DISPLAY}</span>
              </a>
              <a
                href={`mailto:${TODOLIMA_EMAIL}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contacto Oficial: {TODOLIMA_EMAIL}</span>
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

        {/* Barra de cumplimiento normativo y legal 360° */}
        <div className="mt-12 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Marco Legal:</span>
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Privacidad & Datos
              </Link>
              <span>•</span>
              <Link href="/terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Política de Cookies
              </Link>
              <span>•</span>
              <Link href="/aviso-legal" className="hover:text-white transition-colors">
                Aviso Legal
              </Link>
              <span>•</span>
              <Link href="/derechos-arco" className="hover:text-white transition-colors">
                Derechos ARCO
              </Link>
              <span>•</span>
              <Link href="/politica-anti-spam" className="hover:text-white transition-colors">
                Política Anti-Spam
              </Link>
              <span>•</span>
              <Link href="/descargo-de-responsabilidad" className="hover:text-white transition-colors">
                Descargo de Responsabilidad
              </Link>
              <span>•</span>
              <Link href="/reembolsos-y-garantias" className="hover:text-white transition-colors">
                Garantías y Reembolsos
              </Link>
              <span>•</span>
              <Link href="/baja" className="text-rose-400 hover:text-rose-300 transition-colors font-medium">
                Baja / Opt-Out
              </Link>
              <span>•</span>
              <Link href="/libro-de-reclamaciones" className="text-amber-400 hover:text-amber-300 transition-colors font-semibold flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Libro de Reclamaciones
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-4 border-t border-slate-900">
              <div>
                © {new Date().getFullYear()} Todo Lima Network (todolima.com). Todos los derechos reservados. • Desarrollado por{' '}
                <a 
                  href="https://xavier.cabellosalirosas.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sky-400 hover:text-sky-300 font-bold underline transition-colors"
                >
                  Xavier Cabello
                </a>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
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
        </div>
      </div>
    </footer>
  );
}
