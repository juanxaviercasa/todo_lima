'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Bot, 
  TrendingUp, 
  MessageSquare, 
  X, 
  ChevronRight,
  Lock,
  BarChart3
} from 'lucide-react';

export default function TodoLimaAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  // Número oficial de atención comercial Todo Lima
  const whatsappNumber = '51961277467';

  const handleAction = (tipo) => {
    let mensaje = '';
    if (tipo === 'auditoria') {
      mensaje = 'Hola Todo Lima 👋, tengo un negocio y deseo una Auditoría Técnica & Comercial 360° gratuita de mi presencia digital (Web, SEO en Google Maps, Ciberseguridad y Redes).';
    } else if (tipo === 'ia_crm') {
      mensaje = 'Hola Todo Lima 👋, me interesa implementar un Agente de IA para WhatsApp 24/7 y un CRM / software a medida para automatizar las ventas de mi empresa.';
    } else if (tipo === 'verificacion') {
      mensaje = 'Hola Todo Lima 👋, deseo postular a mi negocio para la insignia oficial de "Negocio Verificado" en el directorio todolima.com.';
    } else {
      mensaje = 'Hola equipo de Todo Lima 👋, deseo información sobre sus servicios de crecimiento y tecnología para negocios.';
    }

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 print:hidden font-sans">
      {/* Botón Flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl border border-sky-500/30 hover:border-sky-400 transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Abrir asistente para negocios de Todo Lima"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Para Negocios & Profesionales
            </div>
            <div className="text-sm font-bold text-slate-100 group-hover:text-white">
              Crecimiento 360° & Auditoría IA
            </div>
          </div>
        </button>
      )}

      {/* Modal / Panel Desplegable */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-slate-900 p-5 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-200 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> Consultoría Tecnológica & Crecimiento
            </div>
            <h3 className="text-xl font-black text-white leading-tight">
              Lleva tu empresa en Lima al siguiente nivel
            </h3>
            <p className="text-xs text-sky-100/90 mt-1">
              Desarrollamos tecnología, ciberseguridad, agentes de IA y marketing predictivo para empresas líderes.
            </p>
          </div>

          {/* Opciones de Servicio */}
          <div className="p-4 space-y-2.5">
            <button
              onClick={() => handleAction('auditoria')}
              className="w-full text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/60 hover:border-sky-500/50 transition-all group flex items-start gap-3.5"
            >
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors shrink-0 mt-0.5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
                  Auditoría Digital 360° Gratuita
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Evaluamos tu Google Maps, velocidad web, fallas y fugas de ventas.
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAction('ia_crm')}
              className="w-full text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/60 hover:border-emerald-500/50 transition-all group flex items-start gap-3.5"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0 mt-0.5">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
                  Agente IA 24/7 & Software a Medida
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Asistente inteligente para WhatsApp, CRM personalizado y automatización.
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAction('verificacion')}
              className="w-full text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/60 hover:border-amber-500/50 transition-all group flex items-start gap-3.5"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
                  Insignia de Negocio Verificado
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Posición preferencial en todolima.com y sello de confianza oficial.
                </div>
              </div>
            </button>
          </div>

          {/* Footer del Modal */}
          <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-center flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> Ciberseguridad & Confidencialidad
            </span>
            <button
              onClick={() => handleAction('general')}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chatear en WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
