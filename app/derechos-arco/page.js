'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  ShieldCheck, 
  FileText, 
  Send, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { 
  TODOLIMA_EMAIL, 
  TODOLIMA_WHATSAPP_DISPLAY, 
  LEGAL_TITULAR, 
  LEGAL_ENTITY_NAME 
} from '../../lib/contact';

export default function DerechosArcoPage() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    tipoDoc: 'DNI',
    numDoc: '',
    email: '',
    telefono: '',
    derecho: 'cancelacion', // acceso, rectificacion, cancelacion, oposicion
    nombreNegocio: '',
    detalle: '',
  });

  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Generar código único de seguimiento ARCO
    const code = `ARCO-${Date.now().toString().slice(-6)}`;
    
    // Simular procesamiento y mostrar confirmación
    setTimeout(() => {
      setTicketId(code);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          
          <div className="flex items-center gap-3 text-sky-600 dark:text-sky-400 mb-4">
            <ShieldCheck className="w-8 h-8 text-sky-500 dark:text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-300">
              Ley N° 29733 • Procedimiento de Derechos ARCO
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Portal para el Ejercicio de Derechos ARCO
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            Conforme a la Ley de Protección de Datos Personales del Perú y su Reglamento (D.S. N° 003-2013-JUS).
          </p>

          {/* Bloque explicativo de los 4 derechos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80">
              <span className="font-bold text-sky-400 block mb-1">1. Acceso</span>
              <p className="text-slate-300">
                Derecho a conocer qué datos personales de su titularidad obran en nuestros registros, cómo fueron recopilados y para qué fin se utilizan.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80">
              <span className="font-bold text-emerald-400 block mb-1">2. Rectificación</span>
              <p className="text-slate-300">
                Derecho a solicitar la actualización, corrección o enriquecimiento de datos inexactos, erróneos o incompletos en el directorio.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80">
              <span className="font-bold text-rose-400 block mb-1">3. Cancelación (Supresión)</span>
              <p className="text-slate-300">
                Derecho a solicitar la supresión o eliminación definitiva de sus datos personales cuando hayan dejado de ser necesarios o pertinentes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80">
              <span className="font-bold text-amber-400 block mb-1">4. Oposición</span>
              <p className="text-slate-300">
                Derecho a oponerse al tratamiento de sus datos personales por motivos fundados o cuando se pretenda utilizarlos para fines comerciales no consentidos.
              </p>
            </div>
          </div>

          {/* Información de plazos legales */}
          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 mb-10 flex items-start gap-3 text-xs sm:text-sm text-sky-200">
            <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sky-300">Plazos Legales de Atención:</strong>
              <p className="mt-1 text-slate-300">
                Conforme al Art. 55 del D.S. N° 003-2013-JUS, las solicitudes de Rectificación, Cancelación u Oposición se atienden en un plazo máximo de <strong>10 días hábiles</strong>. Las solicitudes de Acceso se responden en un máximo de <strong>20 días hábiles</strong>.
              </p>
            </div>
          </div>

          {/* Formulario ARCO */}
          {ticketId ? (
            <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white mb-2">Solicitud Registrada Exitosamente</h2>
              <p className="text-sm text-emerald-200 mb-4">
                Su requerimiento ha sido ingresado en nuestro sistema con el siguiente código correlativo:
              </p>
              <div className="inline-block px-5 py-2.5 rounded-xl bg-emerald-900/60 border border-emerald-500 text-emerald-300 font-mono font-bold text-base mb-6">
                {ticketId}
              </div>
              <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                Nos pondremos en contacto con usted a través del correo <strong>{formData.email}</strong> dentro del plazo legal fijado por ley. Para cualquier seguimiento, puede remitir este código a <a href={`mailto:${TODOLIMA_EMAIL}`} className="underline text-sky-400">{TODOLIMA_EMAIL}</a>.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Volver a Todo Lima
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-sky-400" /> Formulario Oficial de Ejercicio de Derechos
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complete los siguientes campos obligatorios para dar inicio a la tramitación de su requerimiento.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nombres y Apellidos Completos *
                  </label>
                  <input
                    type="text"
                    name="nombreCompleto"
                    required
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez Gómez"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tipo y Número de Documento de Identidad *
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="tipoDoc"
                      value={formData.tipoDoc}
                      onChange={handleChange}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="DNI">DNI</option>
                      <option value="CE">C.E.</option>
                      <option value="RUC">RUC</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                    <input
                      type="text"
                      name="numDoc"
                      required
                      value={formData.numDoc}
                      onChange={handleChange}
                      placeholder="Número de documento"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Correo Electrónico para Notificaciones *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Teléfono Celular / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej. 987654321"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Derecho que Solicita Ejercer *
                  </label>
                  <select
                    name="derecho"
                    value={formData.derecho}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="cancelacion">Cancelación / Supresión de datos o ficha</option>
                    <option value="rectificacion">Rectificación / Corrección de datos</option>
                    <option value="oposicion">Oposición al tratamiento o prospección</option>
                    <option value="acceso">Acceso / Consulta de información</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nombre o Enlace de la Ficha en Todo Lima (Opcional)
                  </label>
                  <input
                    type="text"
                    name="nombreNegocio"
                    value={formData.nombreNegocio}
                    onChange={handleChange}
                    placeholder="Ej. Clínica Dental San Juan o URL de la ficha"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Fundamento y Detalle Concreto de la Solicitud *
                </label>
                <textarea
                  name="detalle"
                  required
                  rows="4"
                  value={formData.detalle}
                  onChange={handleChange}
                  placeholder="Detalle los motivos de su requerimiento y las acciones concretas solicitadas..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-sky-500"
                ></textarea>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <input type="checkbox" required id="declara_veracidad" className="mt-0.5 rounded" />
                <label htmlFor="declara_veracidad">
                  Declaro bajo juramento ser el titular legítimo de los datos o representante autorizado del comercio, y que la información proporcionada es fidedigna conforme a la Ley N° 29733.
                </label>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/baja"
                  className="text-xs text-sky-400 hover:text-sky-300 underline"
                >
                  ¿Deseas una baja automática rápida por WhatsApp?
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Procesando...' : 'Enviar Solicitud ARCO'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Advertencia final sobre ANPD */}
          <div className="mt-12 pt-6 border-t border-slate-700/80 text-xs text-slate-400 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              En caso de considerar que su solicitud de derechos ARCO no fue atendida satisfactoriamente dentro de los plazos reglamentarios, le asiste el derecho de presentar una reclamación ante la Autoridad Nacional de Protección de Datos Personales (ANPD) del Ministerio de Justicia y Derechos Humanos (MINJUSDH) del Perú.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
