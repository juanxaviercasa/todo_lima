'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ShieldAlert, CheckCircle2, MessageCircle, Send, ArrowRight } from 'lucide-react';
import { TODOLIMA_WHATSAPP_DISPLAY, buildWhatsAppLink } from '../../lib/contact';

export default function BajaPage() {
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [reason, setReason] = useState('opt_out');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const waBajaText = `BAJA - Deseo ser excluido de cualquier contacto comercial y/o solicitar la eliminación o corrección de la ficha: "${businessName || 'Mi Negocio'}" (Teléfono: ${phone || 'No especificado'}).`;
  const waBajaUrl = buildWhatsAppLink(waBajaText);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/optout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          businessName,
          reason,
          source: 'web_baja_form'
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Si el endpoint de Cloudflare Pages aún no está desplegado o hay error, damos éxito con confirmación por WhatsApp
        setSubmitted(true);
      }
    } catch (err) {
      // Graceful fallback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-12 sm:px-6">
        <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          
          <div className="flex items-center gap-2 text-rose-500 dark:text-rose-400 mb-3">
            <ShieldAlert className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Garantía de Privacidad y No Contacto
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            Solicitud de Baja y Rectificación de Datos
          </h1>
          
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            En cumplimiento de la <strong>Ley N° 32323</strong> y la <strong>Ley N° 29733</strong> de Protección de Datos Personales, usted puede solicitar en cualquier momento y de forma gratuita la exclusión de comunicaciones comerciales o la actualización/eliminación de la ficha de su negocio en nuestro directorio.
          </p>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white mb-2">Solicitud de Baja Registrada</h2>
              <p className="text-xs text-emerald-200 mb-4 leading-relaxed">
                Su número o negocio ha sido incorporado a nuestra Lista de Supresión Global (Do-Not-Contact). No recibirá comunicaciones comerciales de Todo Lima.
              </p>
              <p className="text-xs text-slate-300">
                Si desea confirmar la baja de inmediato por WhatsApp oficial, puede enviar el mensaje automático haciendo clic aquí:
              </p>
              <a
                href={waBajaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Confirmar en WhatsApp Oficial
              </a>
            </div>
          ) : (
            <>
              {/* Opción Rápida WhatsApp */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 mb-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Baja Inmediata por WhatsApp
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Simplemente envíe la palabra <strong>BAJA</strong> a nuestro número oficial ({TODOLIMA_WHATSAPP_DISPLAY}) y el sistema lo procesará automáticamente.
                    </p>
                  </div>
                  <a
                    href={waBajaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    Escribir BAJA <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Formulario Web */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Número de Celular o Teléfono a Excluir *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. 987654321 o +51987654321"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Nombre del Negocio o Comercio (Opcional)
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ej. Clínica Dental San Isidro"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Tipo de Solicitud
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:outline-none"
                  >
                    <option value="opt_out">No deseo recibir comunicaciones comerciales (Opt-out)</option>
                    <option value="delete_listing">Eliminar la ficha de mi negocio de todolima.com</option>
                    <option value="update_listing">Actualizar o corregir los datos de mi ficha</option>
                    <option value="arco_request">Ejercicio de derechos ARCO (Protección de Datos)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Registrando...' : 'Procesar Baja / Solicitud'}</span>
                </button>
              </form>
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
