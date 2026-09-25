'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  MessageCircle, 
  Phone, 
  Building, 
  Award, 
  Star, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function LuxuryHeader({
  logoImg = null,
  initials = 'SV',
  displayName = 'Silvana Verano',
  credentialTitle = 'Agente Inmobiliario Registrado',
  licenseNumber = 'PN-11229-MVCS',
  reviewsCount = 7,
  waLink = '',
  cleanPhone = '999958372'
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para ajustar sombra y estilo si es necesario
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll de fondo cuando el menú móvil está abierto
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

  const navLinks = [
    { label: 'Propiedades', href: '#propiedades' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Trayectoria', href: '#trayectoria' },
    { label: 'Metodología', href: '#metodologia' },
    { label: 'Reseñas', href: '#reseñas', badge: reviewsCount ? `${reviewsCount}` : null },
    { label: 'Contacto', href: '#contacto' }
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* HEADER PRINCIPAL STICKY */}
      <header 
        className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#EAE6DF] transition-all duration-300 ${
          scrolled ? 'shadow-md py-0' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* LOGOTIPO & IDENTIDAD EDITORIAL */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            {logoImg ? (
              <div className="w-11 h-11 border border-[#C5A880] overflow-hidden shadow-sm shrink-0 group-hover:scale-105 transition-transform bg-[#0A192F]">
                <img 
                  src={logoImg} 
                  alt={displayName} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ) : (
              <div className="w-10 h-10 sm:w-11 sm:h-11 border border-[#C5A880] bg-[#0A192F] flex items-center justify-center text-[#C5A880] font-serif font-black text-lg sm:text-xl shadow-sm tracking-wider group-hover:scale-105 transition-transform shrink-0">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <span 
                className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#0A192F] block leading-none truncate" 
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {displayName.toUpperCase()}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium text-[#8C7A6B] mt-1 block truncate">
                {licenseNumber ? `${licenseNumber} • MVCS` : 'Agente Inmobiliario • MVCS'}
              </span>
            </div>
          </a>

          {/* MENÚ DE NAVEGACIÓN DESKTOP (xl:flex para pantallas amplias donde no rompe) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-[#0A192F] hover:border-b-2 hover:border-[#C5A880] pb-1 transition-all whitespace-nowrap flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-[#0A192F] text-[#C5A880] text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* ACCIONES Y BOTÓN HAMBURGUESA RESPONSIVE */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Botón WhatsApp Desktop/Tablet */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="bg-[#0A192F] hover:bg-[#132A4A] text-[#F4EBD9] font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 border border-[#C5A880] transition-all hidden sm:inline-flex items-center gap-2 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>Contactar por WhatsApp</span>
            </a>

            {/* Botón WhatsApp Compacto para móviles muy pequeños */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2.5 rounded-full sm:hidden shadow-sm"
              aria-label="Escribir por WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>

            {/* BOTÓN HAMBURGUESA (Visible en Mobile y Tablet hasta 1279px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#0A192F] hover:text-[#9A7B4F] hover:bg-[#F3EFEA] rounded border border-[#EAE6DF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#0A192F]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0A192F]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER / OVERLAY DEL MENÚ MÓVIL Y TABLET */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] xl:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#0A192F] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Drawer */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/15">
                <div className="flex items-center gap-3">
                  {logoImg ? (
                    <div className="w-10 h-10 border border-[#C5A880] overflow-hidden bg-white/10 shrink-0">
                      <img src={logoImg} alt={displayName} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 border border-[#C5A880] bg-white/10 flex items-center justify-center text-[#C5A880] font-serif font-black text-base">
                      {initials}
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-base font-bold text-white leading-none">
                      {displayName}
                    </h3>
                    <p className="text-[10px] text-[#C5A880] uppercase tracking-wider font-mono mt-1">
                      {licenseNumber || 'PN-11229-MVCS'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Lista de Enlaces de Navegación */}
              <nav className="py-6 flex flex-col gap-1">
                {navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex items-center justify-between py-3.5 px-3 text-sm uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/10 rounded border-b border-white/5 transition-colors"
                  >
                    <span className="font-medium">{link.label}</span>
                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className="bg-[#C5A880] text-[#0A192F] text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {link.badge} reseñas
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                    </div>
                  </a>
                ))}
              </nav>
            </div>

            {/* Footer del Menú Móvil con Acciones Directas */}
            <div className="pt-6 border-t border-white/15 space-y-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                onClick={handleNavClick}
                className="w-full bg-[#C5A880] hover:bg-[#b5976e] text-[#0A192F] font-bold text-xs uppercase tracking-wider py-3.5 px-4 flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-[#0A192F]" />
                <span>Contactar por WhatsApp</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider py-3 px-4 flex items-center justify-center gap-2 border border-white/20 transition-all"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>Llamar: {cleanPhone}</span>
              </a>

              <div className="pt-2 text-center text-[10px] text-slate-400">
                <span>Atención en San Isidro • Google Maps 5.0 ⭐</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
