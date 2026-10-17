'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Copy, Check, ShieldCheck, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

export default function CategoryBuyerCopilot({
  categorySlug,
  categoryTitle,
  persona,
  scope = 'servicios especializados y atención en Lima',
  criteria = 'alcance del servicio, presupuesto detallado y condiciones de garantía',
  defaultDistrict = '',
}) {
  const cleanName = (categoryTitle || categorySlug).replace(' en Lima', '');
  const endAvatar = persona?.endCustomerAvatar || {};
  const icpB2B = persona?.icpB2B || {};

  const checklistItems = [
    `Alcance exacto requerido: ${scope}.`,
    `Criterios de comparación: confirmar ${criteria}.`,
    `Prevención de riesgo: validar por escrito cómo evitar ${endAvatar.visceralFear ? endAvatar.visceralFear.toLowerCase().replace(/\.$/, '') : 'cargos adicionales no acordados'}.`,
    `Objetivo esperado: asegurar ${endAvatar.burningDesire ? endAvatar.burningDesire.toLowerCase().replace(/\.$/, '') : 'condiciones claras de entrega y atención'}.`,
    `Ubicación, horarios de atención y comprobante o constancia del servicio acordado.`,
  ];

  const [checkedIndices, setCheckedIndices] = useState([0, 1]);
  const [selectedDistrict, setSelectedDistrict] = useState(defaultDistrict || 'Mi distrito en Lima');
  const [selectedModality, setSelectedModality] = useState('Cotización detallada y disponibilidad');
  const [copiedType, setCopiedType] = useState(null);

  const toggleItem = (idx) => {
    setCheckedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const progressPct = Math.round((checkedIndices.length / checklistItems.length) * 100);

  const whatsappTemplate = `Hola, vi las opciones de ${cleanName.toLowerCase()} en Todo Lima y deseo consultar por ${selectedModality.toLowerCase()} (${selectedDistrict}).\n\nPor favor, ¿podrían confirmarme:\n1. Disponibilidad de atención y horarios.\n2. Detalle sobre ${criteria}.\n3. Condiciones de presupuesto y garantía por escrito?\n\nMuchas gracias.`;

  const checklistSummaryText = `📋 *Mi Checklist Todo Lima para contratar ${cleanName}:*\n\n` +
    checklistItems.map((item, i) => `${checkedIndices.includes(i) ? '✅' : '⬜'} ${i + 1}. ${item}`).join('\n') +
    `\n\n💬 *Plantilla de consulta lista:*\n"${whatsappTemplate}"\n\n🔗 Directorio: https://todolima.com/${categorySlug}`;

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2600);
    } catch {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2600);
    }
  };

  const modalitySelectId = `copilot-modality-${categorySlug}`;
  const districtInputId = `copilot-district-${categorySlug}`;

  return (
    <section
      aria-labelledby={`copilot-heading-${categorySlug}`}
      className="editorial-card min-w-0 border-2 border-sky-500/30 dark:border-sky-400/30 bg-gradient-to-br from-white via-sky-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          Herramienta Gratuita para el Usuario · Regalo Todo Lima
        </span>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Preparación de consulta: <strong>{checkedIndices.length}/{checklistItems.length}</strong> ({progressPct}%)
        </span>
      </div>

      <h2 id={`copilot-heading-${categorySlug}`} className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Copiloto de Contratación Segura: {cleanName}
      </h2>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        Usa esta lista interactiva para comparar opciones con el mismo criterio y genera un mensaje estructurado de WhatsApp antes de solicitar presupuesto o coordinar una cita.
      </p>

      <div className="grid lg:grid-cols-2 gap-6 min-w-0">
        {/* Columna 1: Checklist Interactivo */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/70 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="font-bold text-base sm:text-lg flex items-center gap-2 text-slate-900 dark:text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>1. Tu Checklist Anti-Sorpresas</span>
            </h3>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-4" aria-hidden="true">
            <div
              className="h-full bg-emerald-500 transition-all duration-200"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <ul className="space-y-2.5">
            {checklistItems.map((item, idx) => {
              const isChecked = checkedIndices.includes(idx);
              const checkboxId = `chk-${categorySlug}-${idx}`;
              return (
                <li key={checkboxId} className="min-w-0">
                  <label
                    htmlFor={checkboxId}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      isChecked
                        ? 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(idx)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-sky-500"
                    />
                    <span className="text-xs sm:text-sm leading-relaxed">{item}</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCopy(checklistSummaryText, 'checklist')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {copiedType === 'checklist' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  <span>¡Checklist copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Copiar mi Checklist completo</span>
                </>
              )}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(checklistSummaryText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold"
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>Guardar en mi WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Columna 2: Generador de Consulta WhatsApp */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/70 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-base sm:text-lg flex items-center gap-2 text-slate-900 dark:text-white mb-3">
              <MessageSquare className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>2. Plantilla de Consulta para Proveedores</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="min-w-0">
                <label htmlFor={modalitySelectId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Motivo de tu consulta
                </label>
                <select
                  id={modalitySelectId}
                  value={selectedModality}
                  onChange={(e) => setSelectedModality(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white"
                >
                  <option value="Cotización detallada y disponibilidad">Cotización y disponibilidad</option>
                  <option value="Evaluación inicial o diagnóstico">Evaluación o diagnóstico</option>
                  <option value="Atención prioritaria hoy">Atención prioritaria</option>
                  <option value="Comparación de paquetes o tarifas">Comparación de tarifas</option>
                </select>
              </div>

              <div className="min-w-0">
                <label htmlFor={districtInputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Distrito o zona de referencia
                </label>
                <input
                  id={districtInputId}
                  type="text"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
              {whatsappTemplate}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => handleCopy(whatsappTemplate, 'template')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold cursor-pointer"
            >
              {copiedType === 'template' ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>¡Mensaje copiado para pegar en WhatsApp!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Copiar mensaje para consultar proveedores</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Puente B2B para el Decisor del Negocio */}
      <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
            Para titulares y gerentes ({icpB2B.decisionMaker || cleanName})
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
            ¿Diriges un negocio de <strong>{cleanName.toLowerCase()}</strong> en Lima? Usa nuestra calculadora gratuita MAPA para estimar cuántas consultas pierdes en WhatsApp y descarga el Kit de Recepción de tu rubro.
          </p>
        </div>
        <Link
          href={`/auditoria/${categorySlug}`}
          className="editorial-chip shrink-0 inline-flex items-center gap-2 text-xs sm:text-sm"
        >
          <span>Calculadora MAPA y Kit B2B</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
