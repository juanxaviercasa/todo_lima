'use client';
import {useState} from 'react';
import Link from 'next/link';
import {CONTACT_TOPICS} from '../lib/contactTopics.js';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [notice, setNotice] = useState('');
  const inputClass = 'w-full min-w-0 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-500';
  async function submit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus('sending'); setNotice('');
    try {
      const response = await fetch('/api/contacto', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({...Object.fromEntries(fields), consent: fields.get('consent') === 'on'})});
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'No pudimos enviar el mensaje. Escríbenos a contacto@todolima.com.');
      setNotice(`Tu consulta fue enviada. Referencia: ${result.reference}. Conserva este código para el seguimiento.`);
      setStatus('sent'); form.reset();
    } catch (error) {
      setStatus('error'); setNotice(error instanceof SyntaxError ? 'El envío no está disponible. Escríbenos a contacto@todolima.com.' : error.message);
    }
  }
  return <section className="editorial-card min-w-0" id="formulario-contacto"><h2 className="text-2xl font-bold mb-2">Envíanos tu consulta</h2><p className="text-sm text-slate-500 mb-5">Cuéntanos cómo podemos ayudarte. * Campos obligatorios.</p>
    <form onSubmit={submit} className="space-y-4 text-sm">
      <div className="grid sm:grid-cols-2 gap-5"><label className="block space-y-2"><span>Nombre *</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} className={inputClass}/></label><label className="block space-y-2"><span>Correo electrónico *</span><input name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass}/></label></div>
      <div className="grid sm:grid-cols-2 gap-5"><label className="block space-y-2"><span>Tipo de consulta *</span><select name="topic" required defaultValue="" className={inputClass}><option value="" disabled>Selecciona un tema</option>{CONTACT_TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></label><label className="block space-y-2"><span>Asunto *</span><input name="subject" required minLength={4} maxLength={160} className={inputClass}/></label></div>
      <label className="block space-y-2"><span>Tu mensaje *</span><textarea name="message" required minLength={20} maxLength={5000} rows={4} className={inputClass}/><span className="block text-xs text-slate-500">Entre 20 y 5000 caracteres. No incluyas datos sensibles.</span></label>
      <details className="text-sm"><summary className="cursor-pointer text-sky-700 dark:text-sky-300 py-1">Añadir el enlace de una ficha o página (opcional)</summary><label className="block mt-3 space-y-2"><span>Enlace de referencia</span><input name="pageUrl" type="url" placeholder="https://todolima.com/..." maxLength={500} className={inputClass}/></label></details>
      <div className="hidden" aria-hidden="true"><label>Deja este campo vacío<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <label className="flex gap-3 items-start text-sm"><input type="checkbox" name="consent" required className="mt-1 shrink-0"/><span>He leído la <Link href="/privacidad#consultas-contacto" className="text-sky-700 dark:text-sky-300 underline">política de privacidad</Link> y autorizo el uso de mi nombre, correo y mensaje para atender esta consulta. Esto no me suscribe a publicidad.</span></label>
      <button type="submit" disabled={status === 'sending'} className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 font-semibold disabled:opacity-60">{status === 'sending' ? 'Enviando…' : 'Enviar consulta'}</button>
      <p role={status === 'error' ? 'alert' : 'status'} aria-live="polite" className={`text-sm break-words ${status === 'error' ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'}`}>{notice}</p>
    </form>
  </section>;
}
