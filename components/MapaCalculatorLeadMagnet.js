'use client';

import { useState } from 'react';
import { Calculator, MessageSquare, Copy, Check, TrendingUp, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { buildWhatsAppLink } from '../lib/contact.js';

export default function MapaCalculatorLeadMagnet({
  categorySlug,
  categoryTitle,
  persona,
  criteria = 'alcance del servicio, presupuesto y condiciones de garantía',
}) {
  const cleanName = (categoryTitle || categorySlug).replace(' en Lima', '');
  const vars = persona?.mapaVariables || {
    monthlyLeads: 150,
    avgTicketPEN: 350,
    baselineConvRate: 0.12,
    targetConvRate: 0.20,
    grossMargin: 0.40,
  };
  const econ = {
    avgMonthlyLeads: vars.monthlyLeads || 150,
    avgTicketPEN: vars.avgTicketPEN || 350,
    baselineConversion: vars.baselineConvRate || 0.12,
    targetConversion: vars.targetConvRate || 0.20,
    grossMargin: vars.grossMargin || 0.40,
  };

  const [monthlyLeads, setMonthlyLeads] = useState(econ.avgMonthlyLeads);
  const [avgTicket, setAvgTicket] = useState(econ.avgTicketPEN);
  const [baseConvPct, setBaseConvPct] = useState(Math.round(econ.baselineConversion * 100));
  const [targetConvPct, setTargetConvPct] = useState(Math.round(econ.targetConversion * 100));
  const [copiedScriptIdx, setCopiedScriptIdx] = useState(null);

  const effectiveTargetPct = Math.max(targetConvPct, baseConvPct + 2);
  const currentClients = Math.round(monthlyLeads * (baseConvPct / 100));
  const projectedClients = Math.round(monthlyLeads * (effectiveTargetPct / 100));
  const additionalClients = Math.max(1, projectedClients - currentClients);
  const additionalMonthlyPEN = Math.round(additionalClients * avgTicket);
  const additionalMarginPEN = Math.round(additionalMonthlyPEN * (econ.grossMargin || 0.4));
  const annualOpportunityPEN = additionalMonthlyPEN * 12;

  const endAvatarName = persona?.endCustomerAvatar?.archetypeName || 'el cliente potencial';
  const decisionMaker = persona?.icpB2B?.decisionMaker || `Titular de ${cleanName}`;

  const scripts = [
    {
      title: '1. Guion de Recepción Inmediata (< 60 seg)',
      subtitle: `Filtra la intención de ${endAvatarName} antes de que escriba a otros 3 competidores.`,
      text: `¡Hola! 👋 Bienvenido(a). Gracias por escribirnos.\n\nPara darte información exacta sobre nuestro servicio de ${cleanName.toLowerCase()} y confirmar disponibilidad hoy mismo, cuéntanos en 2 pasos:\n1️⃣ ¿En qué distrito te encuentras o qué modalidad necesitas?\n2️⃣ ¿Buscas atención inmediata esta semana o estás comparando opciones?\n\nCon eso te asignamos prioridad de inmediato.`,
    },
    {
      title: '2. Guion de Presentación de Valor y Presupuesto',
      subtitle: 'Evita que te comparen solo por precio desglosando garantía y alcance.',
      text: `Perfecto, gracias por los detalles. ✅\n\nPara tu caso, nuestra propuesta contempla ${criteria}.\n\nA diferencia de un servicio improvisado, garantizamos por escrito el alcance acordado para evitar sobrecostos o contratiempos.\n\n¿Te queda mejor coordinar para mañana en la mañana o en la tarde para reservar tu espacio?`,
    },
    {
      title: '3. Guion de Reactivación a las 48 Horas (Anti-Visto Azul)',
      subtitle: 'Recupera presupuestos y proformas que quedaron sin respuesta.',
      text: `Hola 👋, te escribimos brevemente porque hace 48 horas conversamos sobre tu requerimiento de ${cleanName.toLowerCase()}.\n\nEstamos cerrando la programación de esta semana y queríamos saber si aún necesitas reservar tu atención o si te quedó alguna duda sobre ${criteria}.\n\nQuedamos atentos para ayudarte.`,
    },
  ];

  const handleCopyScript = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedScriptIdx(idx);
      setTimeout(() => setCopiedScriptIdx(null), 2500);
    } catch {
      setCopiedScriptIdx(idx);
      setTimeout(() => setCopiedScriptIdx(null), 2500);
    }
  };

  const whatsappAuditText = `Hola Todo Lima y Hazlo Crecer, dirijo un negocio de ${cleanName} en Lima (${decisionMaker}).\n\nAcabo de usar la Calculadora MAPA en todolima.com/auditoria/${categorySlug} con mis datos aproximados:\n• Consultas mensuales (L): ${monthlyLeads}\n• Ticket promedio (T): S/ ${avgTicket}\n• Cierre actual estimado (c0): ${baseConvPct}% -> Meta (c1): ${effectiveTargetPct}%\n• Fuga mensual estimada: S/ ${additionalMonthlyPEN.toLocaleString('es-PE')}/mes (+${additionalClients} clientes/mes).\n\nDeseo coordinar una revisión estratégica MAPA (30-60-90 días) para mi negocio. Mi web o ficha es: `;

  const whatsappAuditHref = buildWhatsAppLink(whatsappAuditText);

  const maxTicketSlider = Math.max(avgTicket * 3, econ.avgTicketPEN * 3, 1000);
  const ticketStep = econ.avgTicketPEN >= 1000 ? 100 : econ.avgTicketPEN >= 200 ? 25 : 10;

  return (
    <div className="space-y-8 min-w-0">
      {/* REGALO B2B #1: CALCULADORA INTERACTIVA MAPA */}
      <section
        aria-labelledby={`mapa-calc-heading-${categorySlug}`}
        className="editorial-card min-w-0 border-2 border-emerald-500/30 dark:border-emerald-400/30"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            Regalo B2B #1 · Simulador Económico Método MAPA
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Ecuación: ΔClientes = L × (c1 - c0) · ΔIngresos = ΔClientes × T
          </span>
        </div>

        <h2 id={`mapa-calc-heading-${categorySlug}`} className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Calculadora de Fuga de Consultas en WhatsApp: {cleanName}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Ajusta los valores con la realidad de tu negocio en Lima para estimar cuánto ingreso mensual deja de entrar por demoras de respuesta en recepción o falta de seguimiento a cotizaciones.
        </p>

        <div className="grid lg:grid-cols-12 gap-6 items-start min-w-0">
          {/* Controles Deslizantes */}
          <div className="lg:col-span-7 space-y-5 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 min-w-0">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={`leads-input-${categorySlug}`} className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  1. Consultas mensuales por WhatsApp / llamadas (L)
                </label>
                <span className="text-base font-black text-sky-600 dark:text-sky-400">
                  {monthlyLeads} consultas/mes
                </span>
              </div>
              <input
                id={`leads-input-${categorySlug}`}
                type="range"
                min="20"
                max="1000"
                step="10"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>20/mes</span>
                <span>Promedio rubro en Lima: {econ.avgMonthlyLeads}/mes</span>
                <span>1,000/mes</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={`ticket-input-${categorySlug}`} className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  2. Ticket o valor promedio por cliente (T)
                </label>
                <span className="text-base font-black text-sky-600 dark:text-sky-400">
                  S/ {avgTicket.toLocaleString('es-PE')}
                </span>
              </div>
              <input
                id={`ticket-input-${categorySlug}`}
                type="range"
                min="20"
                max={maxTicketSlider}
                step={ticketStep}
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>S/ 20</span>
                <span>Referencia rubro: S/ {econ.avgTicketPEN.toLocaleString('es-PE')}</span>
                <span>S/ {maxTicketSlider.toLocaleString('es-PE')}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor={`c0-input-${categorySlug}`} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    3. Cierre actual sin seguimiento (c0)
                  </label>
                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400">{baseConvPct}%</span>
                </div>
                <input
                  id={`c0-input-${categorySlug}`}
                  type="range"
                  min="3"
                  max="35"
                  step="1"
                  value={baseConvPct}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setBaseConvPct(val);
                    if (targetConvPct <= val) setTargetConvPct(val + 5);
                  }}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor={`c1-input-${categorySlug}`} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    4. Meta con Recepción MAPA (c1)
                  </label>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{effectiveTargetPct}%</span>
                </div>
                <input
                  id={`c1-input-${categorySlug}`}
                  type="range"
                  min={baseConvPct + 2}
                  max="50"
                  step="1"
                  value={effectiveTargetPct}
                  onChange={(e) => setTargetConvPct(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Panel de Resultados Económicos */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
                Impacto Mensual Estimado
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                Hipótesis por validar
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-400">Facturación adicional recuperable al mes:</p>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                S/ {additionalMonthlyPEN.toLocaleString('es-PE')} <span className="text-base font-normal text-slate-300">/mes</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Clientes adicionales/mes</span>
                <strong className="text-base text-white">+{additionalClients} clientes</strong>
                <span className="block text-slate-400">({currentClients} → {projectedClients}/mes)</span>
              </div>
              <div>
                <span className="text-slate-400 block">Margen bruto estimado</span>
                <strong className="text-base text-sky-300">S/ {additionalMarginPEN.toLocaleString('es-PE')}/mes</strong>
                <span className="block text-slate-400">({Math.round((econ.grossMargin || 0.4) * 100)}% margen ref.)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Costo de inacción anual:</strong> No corregir el embudo de recepción equivale a dejar pasar hasta{' '}
                <strong>S/ {annualOpportunityPEN.toLocaleString('es-PE')} al año</strong> frente a competidores que responden y califican al instante.
              </span>
            </div>

            <a
              href={whatsappAuditHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 text-sm transition-colors"
            >
              <span>Solicitar mi Plan MAPA 30-60-90 por WhatsApp</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* REGALO B2B #2: KIT DE 3 GUIONES DE RECEPCIÓN EN WHATSAPP */}
      <section
        aria-labelledby={`scripts-heading-${categorySlug}`}
        className="editorial-card min-w-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Regalo B2B #2 · Kit de Respuesta Rápida para {cleanName}
          </span>
        </div>

        <h2 id={`scripts-heading-${categorySlug}`} className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Los 3 Guiones de WhatsApp para {decisionMaker}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Copia y configura estos 3 mensajes en las respuestas rápidas de tu WhatsApp Business hoy mismo para evitar dejar en visto a{' '}
          <strong>{endAvatarName}</strong> cuando estés ocupado en la operación.
        </p>

        <div className="grid md:grid-cols-3 gap-5 min-w-0">
          {scripts.map((sc, idx) => (
            <div
              key={sc.title}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 flex flex-col justify-between min-w-0"
            >
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" aria-hidden="true" />
                  <span>{sc.title}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{sc.subtitle}</p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed mb-4">
                  {sc.text}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyScript(sc.text, idx)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold cursor-pointer"
              >
                {copiedScriptIdx === idx ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>¡Guion {idx + 1} copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Copiar Guion {idx + 1}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
