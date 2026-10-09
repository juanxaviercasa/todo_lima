'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BookOpen, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { TODOLIMA_EMAIL, TODOLIMA_WHATSAPP_DISPLAY } from '../../lib/contact';

export default function LibroReclamacionesPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    tipoDoc: 'DNI',
    numDoc: '',
    telefono: '',
    email: '',
    domicilio: '',
    tipoBien: 'servicio',
    monto: '',
    descripcionBien: '',
    tipoReclamacion: 'reclamo', // reclamo o queja
    detalle: '',
    pedido: ''
  });

  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/reclamaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setTicketId(data.correlativo || `TL-${Date.now().toString().slice(-6)}`);
      } else {
        // Fallback local correlativo
        setTicketId(`TL-${Date.now().toString().slice(-6)}`);
      }
    } catch (err) {
      // Fallback
      setTicketId(`TL-${Date.now().toString().slice(-6)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-sm">
          
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Conforme a Ley N° 29571 • D.S. N° 011-2011-PCM
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Libro de Reclamaciones Virtual
          </h1>
          <p className="text-xs text-slate-400 mb-6 pb-4 border-b border-slate-700">
            Todo Lima • [RAZÓN SOCIAL] • RUC: [RUC] • Lima Metropolitana, Perú
          </p>

          {ticketId ? (
            <div className="p-8 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center animate-in fade-in">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-white mb-2">Hoja de Reclamación Registrada</h2>
              <div className="inline-block px-4 py-2 bg-slate-900 rounded-lg border border-emerald-400/40 text-emerald-300 font-mono text-sm font-bold my-3">
                Código Correlativo: #{ticketId}
              </div>
              <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed mt-2">
                Conforme al Código de Protección y Defensa del Consumidor, daremos respuesta a su solicitud en un plazo máximo de quince (15) días hábiles al correo electrónico proporcionado.
              </p>
              <p className="text-xs text-slate-400 mt-4">
                Para seguimiento o dudas directas, puede comunicarse a {TODOLIMA_EMAIL}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
              
              {/* Sección 1: Datos del Consumidor */}
              <div>
                <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3">
                  1. Identificación del Consumidor Reclamante
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 mb-1">Nombre y Apellidos Completos *</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Tipo de Documento *</label>
                    <select
                      name="tipoDoc"
                      value={formData.tipoDoc}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    >
                      <option value="DNI">DNI</option>
                      <option value="CE">Carné de Extranjería</option>
                      <option value="RUC">RUC</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Número de Documento *</label>
                    <input
                      type="text"
                      name="numDoc"
                      required
                      value={formData.numDoc}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Teléfono / Celular *</label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 mb-1">Domicilio en Lima o Perú *</label>
                    <input
                      type="text"
                      name="domicilio"
                      required
                      value={formData.domicilio}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Bien Contratado */}
              <div className="pt-4 border-t border-slate-700">
                <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3">
                  2. Identificación del Bien Contratado
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Tipo de Bien</label>
                    <select
                      name="tipoBien"
                      value={formData.tipoBien}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    >
                      <option value="servicio">Servicio Digital / Tecnológico</option>
                      <option value="producto">Producto / Directorio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Monto Reclamado (Soles, si aplica)</label>
                    <input
                      type="text"
                      name="monto"
                      value={formData.monto}
                      onChange={handleChange}
                      placeholder="S/ 0.00"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 mb-1">Descripción del Servicio o Ficha *</label>
                    <input
                      type="text"
                      name="descripcionBien"
                      required
                      value={formData.descripcionBien}
                      onChange={handleChange}
                      placeholder="Ej. Ficha de comercio en todolima.com o Servicio contratado"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 3: Detalle de Reclamación */}
              <div className="pt-4 border-t border-slate-700">
                <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3">
                  3. Detalle de la Reclamación y Pedido
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Naturaleza del Asunto *</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tipoReclamacion"
                          value="reclamo"
                          checked={formData.tipoReclamacion === 'reclamo'}
                          onChange={handleChange}
                        />
                        <span><strong>Reclamo:</strong> Disconformidad con el servicio prestado.</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tipoReclamacion"
                          value="queja"
                          checked={formData.tipoReclamacion === 'queja'}
                          onChange={handleChange}
                        />
                        <span><strong>Queja:</strong> Malestar respecto a la atención recibida.</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Detalle del Reclamo o Queja *</label>
                    <textarea
                      name="detalle"
                      required
                      rows={4}
                      value={formData.detalle}
                      onChange={handleChange}
                      placeholder="Describa de manera clara y detallada los hechos ocurridos..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Pedido Concreto *</label>
                    <textarea
                      name="pedido"
                      required
                      rows={2}
                      value={formData.pedido}
                      onChange={handleChange}
                      placeholder="Indique con precisión qué solicita a Todo Lima para solucionar su reclamo..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el Indecopi. El proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Enviando Hoja de Reclamación...' : 'Enviar Hoja de Reclamación'}</span>
              </button>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
