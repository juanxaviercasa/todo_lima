'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Menu, 
  X, 
  Search, 
  Sparkles, 
  PhoneCall, 
  ChevronRight,
  Stethoscope,
  Wrench,
  Scale,
  Car,
  PartyPopper,
  Sparkle,
  Laptop,
  Mail
} from 'lucide-react';
import { CATEGORIES } from '../scraper/config/categories.js';
import { TODOLIMA_EMAIL, TODOLIMA_WHATSAPP_DISPLAY, buildWhatsAppLink } from '../lib/contact.js';
import ThemeToggle from './ThemeToggle.js';

export default function Navbar({ categoryTitle = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando el drawer móvil esté abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const quickNiches = [
    { label: 'Salud', icon: Stethoscope, href: '/#directorios', color: 'text-rose-500 bg-rose-50' },
    { label: 'Hogar', icon: Wrench, href: '/#directorios', color: 'text-amber-500 bg-amber-50' },
    { label: 'Legal', icon: Scale, href: '/#directorios', color: 'text-indigo-500 bg-indigo-50' },
    { label: 'Autos', icon: Car, href: '/#directorios', color: 'text-blue-500 bg-blue-50' },
    { label: 'Eventos', icon: PartyPopper, href: '/#directorios', color: 'text-purple-500 bg-purple-50' },
    { label: 'Belleza', icon: Sparkle, href: '/#directorios', color: 'text-pink-500 bg-pink-50' },
    { label: 'Tecnología', icon: Laptop, href: '/#directorios', color: 'text-emerald-500 bg-emerald-50' }
  ];

  const publishWaLink = buildWhatsAppLink('Hola Todo Lima, deseo informacion sobre la publicacion o verificacion de mi negocio en todolima.com.');

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-sm' 
            : 'bg-white/80 backdrop-blur-md border-b border-slate-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo y Ubicación */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <img 
                  src="/images/logo.jpg" 
                  alt="Todo Lima Logo" 
                  className="w-10 h-10 rounded-2xl object-cover shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300 border border-slate-200/80"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-slate-900 leading-none group-hover:text-sky-600 transition-colors">
                  Todo<span className="text-sky-600">Lima</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1 flex items-center gap-1">
                  Directorio Oficial • Lima
                </span>
              </div>
            </Link>

            {/* Breadcrumb o Título de Categoría si aplica */}
            {categoryTitle && (
              <div className="hidden lg:flex items-center gap-2 ml-3 pl-3 border-l border-slate-200">
                <span className="text-xs text-slate-400">/</span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100/80 py-1 px-3 rounded-lg border border-slate-200/60 flex items-center gap-1.5 max-w-xs truncate">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{categoryTitle}</span>
                </span>
              </div>
            )}
          </div>

          {/* Enlaces de Escritorio */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link 
              href="/" 
              className="hover:text-sky-600 transition-colors py-1"
            >
              Inicio
            </Link>
            <a 
              href="/#directorios" 
              className="hover:text-sky-600 transition-colors py-1 flex items-center gap-1"
            >
              <span>Categorías</span>
              <span className="text-[10px] font-black bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full">
                {CATEGORIES.length}
              </span>
            </a>
            <a 
              href={publishWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 transition-colors py-1 flex items-center gap-1.5 text-emerald-600 font-bold"
            >
              <span>Publicar Negocio</span>
            </a>
          </nav>

          {/* Badges de Confianza y Acciones */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Badge de Verificación 2026 */}
            <div className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 py-1.5 px-3 rounded-xl shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Datos Verificados 2026</span>
            </div>

            {/* Toggle de Modo Oscuro / Claro */}
            <ThemeToggle />

            {/* CTA Publicar Negocio */}
            <a
              href={publishWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-slate-900 to-slate-800 hover:from-sky-700 hover:to-blue-700 transition-all duration-300 py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Publicar Negocio</span>
            </a>

            {/* Botón de Menú Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex md:hidden items-center justify-center p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 transition-colors focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Móvil con Open Design */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop oscurecido */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menú deslizable desde arriba/centro */}
          <div className="relative bg-white w-full max-h-[88vh] overflow-y-auto rounded-t-3xl shadow-2xl border-t border-slate-200 p-6 flex flex-col z-10 animate-in slide-in-from-bottom duration-300">
            {/* Header del drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/logo.jpg"
                  alt="Todo Lima"
                  className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <div className="font-extrabold text-base text-slate-900">Todo Lima</div>
                  <div className="text-[10px] text-slate-400 font-medium">Directorio Oficial</div>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de Tema en Móvil */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 my-2">
              <span className="text-xs font-bold text-slate-700">
                Tema de visualización
              </span>
              <ThemeToggle />
            </div>

            {/* Enlaces Principales */}
            <div className="py-2 space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 font-bold text-base transition-colors"
              >
                <span>Inicio</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <a
                href="/#directorios"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 font-bold text-base transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>Explorar Categorías</span>
                  <span className="text-xs bg-sky-100 text-sky-700 font-extrabold px-2 py-0.5 rounded-full">
                    {CATEGORIES.length}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href={publishWaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50 text-emerald-700 font-bold text-base transition-colors"
              >
                <span>Publicar mi Negocio</span>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
              </a>
              <a
                href={`mailto:${TODOLIMA_EMAIL}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-sky-50 text-slate-700 font-bold text-sm transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-500" />
                  <span>{TODOLIMA_EMAIL}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Rubros Populares en Móvil */}
            <div className="py-3 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Rubros Frecuentes
              </span>
              <div className="grid grid-cols-2 gap-2">
                {quickNiches.map((niche, i) => {
                  const Icon = niche.icon;
                  return (
                    <a
                      key={i}
                      href={niche.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
                    >
                      <span className={`p-1 rounded-lg ${niche.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span>{niche.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Call to Action Móvil */}
            <div className="pt-4 border-t border-slate-100 space-y-2 mt-auto">
              <a
                href={publishWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Publicar Negocio en Lima</span>
              </a>
              <div className="text-center text-[11px] text-slate-400 pt-1">
                Fichas auditadas directamente de Google Maps
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
