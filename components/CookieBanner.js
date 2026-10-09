'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya registró su preferencia
    try {
      const consent = localStorage.getItem('tl_cookie_consent');
      if (!consent) {
        // Pequeño retardo para no interferir con la primera pintura visual
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Ignorar excepciones en entornos sin acceso a localStorage
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('tl_cookie_consent', 'accepted');
    } catch (e) {}
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem('tl_cookie_consent', 'essential');
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 border border-slate-700/90 text-slate-200 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1 flex items-center gap-1.5">
              <span>Privacidad & Cookies</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utilizamos cookies esenciales y analíticas anónimas para garantizar la seguridad del sitio y optimizar la navegación de acuerdo con nuestra{' '}
              <Link href="/cookies" className="text-sky-400 hover:text-sky-300 underline font-medium">
                Política de Cookies
              </Link>{' '}
              y la Ley N° 29733.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Aceptar todas
              </button>
              <button
                onClick={handleAcceptEssential}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors border border-slate-700"
              >
                Solo necesarias
              </button>
              <Link
                href="/privacidad"
                className="text-[11px] text-slate-400 hover:text-slate-300 underline ml-auto py-1"
              >
                Más info
              </Link>
            </div>
          </div>

          <button
            onClick={handleAcceptEssential}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1 -mr-2 -mt-2"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
