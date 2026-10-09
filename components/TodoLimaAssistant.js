'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Bot, 
  MessageSquare, 
  X, 
  ChevronRight, 
  Lock, 
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { buildWhatsAppLink } from '../lib/contact';

export default function TodoLimaAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (tipo) => {
    let mensaje = '';
    if (tipo === 'auditoria') {
      mensaje = 'Hola Todo Lima, tengo un negocio y solicito una Auditoria 360 Gratuita de mi embudo de ventas, posicionamiento en Google Maps y velocidad web.\n\nAcepto recibir mi diagnostico y coordinar por este chat de WhatsApp. (Puedo escribir BAJA en cualquier momento).';
    } else if (tipo === 'ia_crm') {
      mensaje = 'Hola Todo Lima, me interesa implementar un Asistente IA para WhatsApp 24/7 y un sistema CRM / Funnel a medida para automatizar las ventas de mi empresa.\n\nAcepto recibir informacion por este medio. (Puedo escribir BAJA en cualquier momento).';
    } else if (tipo === 'verificacion') {
      mensaje = 'Hola Todo Lima, deseo postular a mi negocio para la insignia oficial de "Negocio Verificado" en el directorio todolima.com.\n\nAcepto ser contactado por WhatsApp para validar los datos de mi ficha.';
    } else {
      mensaje = 'Hola equipo de Todo Lima, deseo informacion sobre sus servicios de crecimiento digital, embudos y tecnologia para negocios locales en Lima.\n\nAcepto ser contactado por este canal.';
    }

    const url = buildWhatsAppLink(mensaje);
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
        <div className="w-[360px] sm:w-[420px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
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
              Embudos de alta conversión, speed-to-lead con IA 24/7 y posicionamiento para empresas líderes.
            </p>
          </div>

          {/* Opciones de Servicio */}
          <div className="p-4 space-y-2.5">
            <button
              onClick={() => handleAction('auditoria')}
              className="w-full text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-sky-500/50 transition-all group flex items-start gap-3.5"
            >
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors shrink-0 mt-0.5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
                  Auditoría Digital & Embudo 360°
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Detección de fugas de ventas en Google Maps, velocidad web y conversión WhatsApp.
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAction('ia_crm')}
              className="w-full text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-emerald-500/50 transition-all group flex items-start gap-3.5"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0 mt-0.5">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
                  Asistente IA 24/7 & Speed-to-Lead
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Responde en &lt; 2 min, agenda citas en automático y centraliza chats en CRM.
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAction('verificacion')}
              className="w-full text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-amber-500/50 transition-all group flex items-start gap-3.5"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
                  Reclamar Ficha de Negocio Verificado
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Toma el control oficial de tu perfil en todolima.com y activa beneficios Pro.
                </div>
              </div>
            </button>
          </div>

          {/* Aviso Legal de Consentimiento Previo y Opt-Out (Ley 32323 / Ley 29733) */}
          <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 leading-snug">
            <div className="flex items-start gap-1.5 mb-1 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Al escribirnos por WhatsApp solicitas la atención de Todo Lima. Puedes escribir <strong>BAJA</strong> en cualquier momento para revocar el contacto. Conoce nuestra{' '}
                <Link href="/privacidad" className="text-sky-400 underline hover:text-sky-300">
                  Política de Privacidad
                </Link>.
              </span>
            </div>
          </div>

          {/* Footer del Modal */}
          <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Respuesta promedio: &lt; 5 min
            </span>
            <button
              onClick={() => handleAction('general')}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Abrir WhatsApp Oficial
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
