'use client';
import {useEffect} from 'react';
import Link from 'next/link';
import {CONTACT_TOPICS} from '../lib/contactTopics.js';

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/contact.js?v=20261011';
    document.body.append(script);
    return () => script.remove();
  }, []);
  const inputClass = 'w-full min-w-0 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-500';
  return <section className="editorial-card min-w-0" id="formulario-contacto"><h2 className="text-2xl font-bold mb-2">Envíanos tu consulta</h2><p className="text-sm text-slate-500 mb-5">Cuéntanos cómo podemos ayudarte. * Campos obligatorios.</p>
    <form id="npp-contact-form" action="/api/contact" method="post" data-language="es" data-contact-email="contacto@todolima.com" className="space-y-4 text-sm">
      <div className="grid sm:grid-cols-2 gap-5"><label className="block space-y-2"><span>Nombre *</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} className={inputClass}/></label><label className="block space-y-2"><span>Correo electrónico *</span><input name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass}/></label></div>
      <div className="grid sm:grid-cols-2 gap-5"><label className="block space-y-2"><span>Tipo de consulta *</span><select name="category" required defaultValue="" className={inputClass}><option value="" disabled>Selecciona un tema</option>{CONTACT_TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></label><label className="block space-y-2"><span>Asunto *</span><input name="subject" required minLength={4} maxLength={160} className={inputClass}/></label></div>
      <label className="block space-y-2"><span>Tu mensaje *</span><textarea id="contact-message" aria-describedby="contact-message-help" name="message" required minLength={20} maxLength={5000} rows={4} className={inputClass}/><span id="contact-message-help" className="block text-xs text-slate-500">Entre 20 y 5000 caracteres. No incluyas datos sensibles.</span></label>
      <details className="text-sm"><summary className="cursor-pointer text-sky-700 dark:text-sky-300 py-1">Añadir el enlace de una ficha o página (opcional)</summary><label className="block mt-3 space-y-2"><span>Enlace de referencia</span><input name="reference" type="url" placeholder="https://todolima.com/..." maxLength={500} className={inputClass}/></label></details>
      <div className="hidden" aria-hidden="true"><label>Deja este campo vacío<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <label className="flex gap-3 items-start text-sm"><input type="checkbox" name="consent" required className="mt-1 shrink-0"/><span>He leído la <Link href="/privacidad#consultas-contacto" className="text-sky-700 dark:text-sky-300 underline">política de privacidad</Link> y autorizo el uso de mi nombre, correo y mensaje para atender esta consulta. Esto no me suscribe a publicidad.</span></label>
      <div id="npp-turnstile"/><button id="npp-submit-btn" type="submit" disabled className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 font-semibold disabled:opacity-60">Enviar consulta</button>
      <p id="npp-form-msg" role="status" aria-live="polite" tabIndex={-1} className="text-sm break-words">Preparando el envío…</p><noscript>Escríbenos a contacto@todolima.com.</noscript>
    </form>
  </section>;
}
