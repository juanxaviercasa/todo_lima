'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  ExternalLink, 
  Compass, 
  ShieldCheck,
  Building,
  Sparkles
} from 'lucide-react';

export default function LuxuryContactSection({
  displayName = 'Silvana Verano',
  licenseNumber = 'PN-11229-MVCS',
  address = 'Calle Alberto del Campo 411, San Isidro, Lima',
  cleanPhone = '999958372',
  intlPhone = '51999958372',
  district = 'San Isidro',
  googleMapsUrl = 'https://www.google.com/maps/place/Silvana+Verano+Agente+Inmobiliario+Registrado+PN-11229-MVCS/data=!4m7!3m6!1s0x9105c98fcb71ada7:0xd647b67738d89f2c!8m2!3d-12.0971697!4d-77.0577323!16s%2Fg%2F11m49pn7l0!19sChIJp61xy4_JBZERLJ_YOHe2R9Y?hl=es',
  latitude = -12.0971697,
  longitude = -77.0577323
}) {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    operation: 'comprar',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || (!formState.phone && !formState.email)) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const operationLabels = {
    comprar: 'Deseo Comprar / Invertir',
    vender: 'Deseo Vender / Tasar Inmueble',
    alquilar: 'Alquiler Residencial o Corporativo',
    legal: 'Asesoría Notarial & Registral Sunarp'
  };

  const waPreText = encodeURIComponent(
    `Hola ${displayName} 👋, le escribo desde su página web oficial.\n` +
    `*Nombre:* ${formState.name || 'Cliente'}\n` +
    `*Teléfono:* ${formState.phone || 'No especificado'}\n` +
    `*Email:* ${formState.email || 'No especificado'}\n` +
    `*Interés:* ${operationLabels[formState.operation] || 'Consulta General'}\n` +
    `*Mensaje:* ${formState.message || 'Deseo coordinar una asesoría personalizada.'}`
  );

  const waDirectLink = `https://wa.me/${intlPhone}?text=${waPreText}`;
  const mailtoLink = `mailto:contacto@${displayName.toLowerCase().replace(/\s+/g, '')}.todolima.com?subject=${encodeURIComponent(`Consulta Inmobiliaria - ${formState.name || 'Cliente'}`)}&body=${waPreText}`;

  // URL del iframe interactivo de Google Maps
  const mapEmbedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=16&output=embed`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

  return (
    <section id="contacto" className="py-24 bg-[#F7F5F0] border-t border-[#EAE6DF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#9A7B4F] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
            Atención Personalizada
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0A192F]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Contacto Directo & Ubicación
          </h2>
          <p className="text-[#718096] text-sm mt-3 font-light">
            Déjanos tus datos para coordinar una reunión presencial en nuestra sede de {district} o comunícate al instante por WhatsApp o correo electrónico.
          </p>
        </div>

        {/* CONTENEDOR DE 2 COLUMNAS (FORMULARIO + MAPA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* COLUMNA 1: FORMULARIO DE CONTACTO POR CORREO & MENSAJE DIRECTO (7 COLS) */}
          <div className="lg:col-span-7 bg-white border border-[#EAE6DF] p-8 sm:p-10 shadow-lg relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#F0ECE1]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7B4F] block">
                  Mensaje Directo
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0A192F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Enviar Consulta Inmobiliaria
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-medium border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Respuesta en menos de 2h</span>
              </div>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#0A192F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  ¡Mensaje Enviado con Éxito!
                </h4>
                <p className="text-xs sm:text-sm text-[#718096] max-w-md mx-auto font-light leading-relaxed">
                  Gracias <strong>{formState.name}</strong>. Silvana Verano ha recibido tus datos y revisará tu consulta sobre <em>{operationLabels[formState.operation]}</em> a la brevedad.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={waDirectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Continuar conversación por WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', phone: '', email: '', operation: 'comprar', message: '' });
                    }}
                    className="text-xs text-[#0A192F] hover:text-[#9A7B4F] underline font-medium py-2"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A192F] uppercase tracking-wider mb-1.5">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Roberto Benavides"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#FDFBF7] border border-[#EAE6DF] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] p-3 text-xs sm:text-sm text-[#0A192F] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0A192F] uppercase tracking-wider mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 999 123 456"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-[#FDFBF7] border border-[#EAE6DF] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] p-3 text-xs sm:text-sm text-[#0A192F] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] uppercase tracking-wider mb-1.5">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="Ej. rbenavides@empresa.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#FDFBF7] border border-[#EAE6DF] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] p-3 text-xs sm:text-sm text-[#0A192F] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] uppercase tracking-wider mb-1.5">
                    Tipo de Operación o Interés
                  </label>
                  <select
                    value={formState.operation}
                    onChange={(e) => setFormState({ ...formState, operation: e.target.value })}
                    className="w-full bg-[#FDFBF7] border border-[#EAE6DF] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] p-3 text-xs sm:text-sm text-[#0A192F] outline-none transition-colors"
                  >
                    <option value="comprar">Deseo Comprar / Invertir en {district}</option>
                    <option value="vender">Deseo Vender mi Inmueble (Solicitar Tasación)</option>
                    <option value="alquilar">Alquiler Residencial o Corporativo</option>
                    <option value="legal">Asesoría Notarial & Estudio Registral Sunarp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] uppercase tracking-wider mb-1.5">
                    Mensaje o Detalles del Inmueble
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos brevemente las características del inmueble que buscas o que deseas vender (zona, metraje, presupuesto aproximado)..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#FDFBF7] border border-[#EAE6DF] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] p-3 text-xs sm:text-sm text-[#0A192F] outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:flex-1 bg-[#0A192F] hover:bg-[#132A4A] text-[#F4EBD9] font-bold text-xs uppercase tracking-widest py-4 px-6 border border-[#C5A880] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-xl disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-[#C5A880]" />
                    <span>{loading ? 'Enviando consulta...' : 'Enviar Consulta Directa'}</span>
                  </button>

                  <a
                    href={waDirectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider py-4 px-5 flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Enviar por WhatsApp</span>
                  </a>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#718096] border-t border-[#F0ECE1]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Confidencialidad notarial 100%
                  </span>
                  <span>Sin costo ni compromiso</span>
                </div>
              </form>
            )}
          </div>

          {/* COLUMNA 2: MAPA INTERACTIVO GOOGLE MAPS ("UBÍCANOS / ENCUÉNTRANOS") (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contenedor del Mapa Google Maps */}
            <div className="bg-white border border-[#EAE6DF] p-3 shadow-lg">
              <div className="flex items-center justify-between p-2 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-serif text-lg font-bold text-[#0A192F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Ubicación en Google Maps
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-[#0A192F] text-[#C5A880] px-2 py-0.5 font-bold">
                  {district}
                </span>
              </div>

              {/* Iframe interactivo embebido */}
              <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden bg-slate-100 border border-[#EAE6DF]">
                <iframe
                  title={`Ubicación de ${displayName} en Google Maps`}
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Botones de navegación GPS */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-[#F0ECE1]">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold py-2.5 px-3 text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Google Maps ↗</span>
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#29B6F6] hover:bg-[#0288D1] text-white text-xs font-semibold py-2.5 px-3 text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Abrir en Waze ↗</span>
                </a>
              </div>
            </div>

            {/* Ficha de Información de la Oficina */}
            <div className="bg-[#0A192F] text-white p-6 border border-[#C5A880]/30 shadow-md space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-9 h-9 border border-[#C5A880] bg-white/10 flex items-center justify-center text-[#C5A880] font-serif font-black text-sm shrink-0">
                  SV
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-white leading-none">
                    Oficina de Atención Presencial
                  </h4>
                  <p className="text-[10px] text-[#C5A880] uppercase tracking-wider font-mono mt-1">
                    {licenseNumber || 'PN-11229-MVCS'}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 font-light">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>{address}</span>
                </p>

                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Teléfono / WhatsApp: <strong className="text-white font-mono">{cleanPhone}</strong></span>
                </p>

                <p className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Lunes a Sábado: 9:00 AM – 7:00 PM (Previa Cita)</span>
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={waDirectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#C5A880] hover:bg-[#b5976e] text-[#0A192F] font-bold text-xs uppercase tracking-wider py-3 px-4 flex items-center justify-center gap-2 transition-all shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-[#0A192F]" />
                  <span>Agendar Cita en Oficina</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
