'use client';

import { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  MessageCircle, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { buildWhatsAppLink } from '../lib/contact.js';

export default function GHLConversionSections({ category }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: `¿Cómo se auditan a los mejores especialistas de ${category.slug} en Lima?`,
      a: `Analizamos de forma continua las fichas de Google Maps en Lima Metropolitana. Nuestro algoritmo filtra perfiles con puntuaciones destacadas (mínimo 4.5 estrellas), revisa la cantidad y veracidad de reseñas de usuarios peruanos y prioriza negocios con canales activos de atención inmediata.`
    },
    {
      q: '¿Todo Lima cobra alguna comisión o porcentaje por contactar a los negocios?',
      a: 'No, el servicio es 100% gratuito tanto para usuarios como para los clientes. Al hacer clic en los botones de WhatsApp o Llamada, te comunicas directamente con la línea oficial del profesional, sin intermediarios, comisiones ocultas ni registros obligatorios.'
    },
    {
      q: '¿Qué hacer si un número o dirección en Lima ha cambiado?',
      a: 'Nuestros sistemas se actualizan continuamente. Si detectas un número inactivo o un cambio de sede en Lima, puedes informarnos mediante WhatsApp para sincronizar la ficha en la siguiente ronda de auditoría.'
    },
    {
      q: '¿Puedo solicitar que mi negocio aparezca en el ranking de Todo Lima?',
      a: 'Sí. Si tu negocio o consultorio cuenta con perfil activo en Google Maps, excelente historial de atención y cobertura en distritos de Lima, puedes postular tu negocio gratuitamente usando nuestro botón de contacto comercial.'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-850 mt-20 transition-colors">
      {/* Sección 1: Tres Pilares de Confianza */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <img
            src="/images/badge-verified.jpg"
            alt="Sello de Calidad Verificada"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover mb-4 shadow-lg border border-slate-200/80 dark:border-slate-700 hover:scale-105 transition-transform"
          />
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 py-1.5 px-4 rounded-full border border-sky-200 dark:border-sky-800/60">
            Estándar de Calidad Todo Lima
          </span>
          <h2 className="mt-4 text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            ¿Por qué elegir profesionales desde este directorio?
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Elimina riesgos, informalidad y malas experiencias eligiendo especialistas verificados con datos abiertos y comprobables.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="open-card bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/80 p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 shadow-xs dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between dark:hover:border-sky-400/50">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-500/15 border border-sky-100 dark:border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-300 dark:shadow-[0_0_12px_rgba(14,165,233,0.25)] mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Reputación Comprobada
              </h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                Seleccionamos únicamente a profesionales con valoraciones sobresalientes y comentarios legítimos de pacientes o clientes en distritos limeños.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Calificaciones verificadas</span>
            </div>
          </div>

          <div className="open-card bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/80 p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 shadow-xs dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between dark:hover:border-emerald-400/50">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-100 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-300 dark:shadow-[0_0_12px_rgba(16,185,129,0.25)] mb-6">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Contacto Directo por WhatsApp
              </h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                Comunícate en un clic directo al teléfono del especialista. Sin formularios tediosos, sin intermediarios y con respuesta al instante.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Respuesta inmediata</span>
            </div>
          </div>

          <div className="open-card bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/80 p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 shadow-xs dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between dark:hover:border-indigo-400/50">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-100 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300 dark:shadow-[0_0_12px_rgba(99,102,241,0.25)] mb-6">
                <UserCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Transparencia Abierta
              </h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                Direcciones físicas exactas en Lima, enlace directo a las opiniones en Google Maps y páginas oficiales para una decisión con total tranquilidad.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Datos abiertos y auditables</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Acordeón de Preguntas Frecuentes con Open Design */}
      <section className="bg-white dark:bg-slate-950/40 border-y border-slate-200/80 dark:border-slate-850/80 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-400">
              Centro de Respuestas
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Preguntas Frecuentes sobre el Directorio
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Todo lo que necesitas saber antes de contactar a un especialista.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden transition-all duration-200 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    type="button"
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-50/60 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 pr-4 flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-3 bg-white dark:bg-slate-900/95 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sección 3: Banner de Conversión para Dueños de Negocios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 py-1.5 px-3.5 rounded-full border border-emerald-800">
                Oportunidad para Profesionales en Lima
              </span>
              <h3 className="mt-4 text-2xl sm:text-4xl font-black text-white leading-tight">
                ¿Ofreces servicios en este rubro en Lima?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Posiciona tu consultorio, clínica o empresa frente a miles de personas que buscan atención confiable a diario en los directorios de Todo Lima.
              </p>
            </div>

            <a
              href={buildWhatsAppLink('Hola Todo Lima, tengo un negocio en Lima y deseo postularme para publicarme en todolima.com.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base py-4 px-7 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0 w-full lg:w-auto text-center"
            >
              <span>Postular mi Negocio Gratis</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
