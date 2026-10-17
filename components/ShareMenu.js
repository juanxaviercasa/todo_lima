'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Share2 } from 'lucide-react';

export default function ShareMenu() {
  const pathname = usePathname();
  const root = useRef(null);
  const trigger = useRef(null);
  const [open, setOpen] = useState(false);
  const [home, setHome] = useState(false);
  const [status, setStatus] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const url = `https://todolima.com${home ? '/' : pathname}`;
  const title = home ? 'Todo Lima | Negocios y servicios en Lima' : 'Todo Lima';
  useEffect(() => { setOpen(false); setStatus(''); setManualUrl(''); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    function dismiss(event) {
      if (event.type === 'keydown' && event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
      if (event.type === 'pointerdown' && !root.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', dismiss);
    return () => { document.removeEventListener('keydown', dismiss); document.removeEventListener('pointerdown', dismiss); };
  }, [open]);
  async function nativeShare() {
    try {
      if (!navigator.share) { await copy(); return; }
      await navigator.share({ title: home ? title : document.title, url });
      setStatus('Compartido.');
    } catch (error) { if (error.name !== 'AbortError') setStatus('Usa una red social o copia el enlace.'); }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(url); setStatus('Enlace copiado.'); }
    catch { setManualUrl(url); setStatus('Selecciona y copia el enlace.'); }
  }
  const item = 'block w-full rounded-lg px-3 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500';
  return <div ref={root} className="relative">
    <button ref={trigger} type="button" aria-label="Compartir Todo Lima" aria-expanded={open} aria-controls="share-options" onClick={() => setOpen(!open)} className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500"><Share2 size={18} aria-hidden="true" /><span className="hidden sm:inline">Compartir</span></button>
    {open && <div id="share-options" className="absolute right-0 top-full mt-2 w-64 max-h-[calc(100dvh-7rem)] overflow-y-auto max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 shadow-xl p-2 text-sm">
      <label className="block p-2 font-semibold">Qué compartir<select className="block w-full mt-2 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" value={home ? 'home' : 'page'} onChange={event => { setHome(event.target.value === 'home'); setStatus(''); setManualUrl(''); }}><option value="page">Esta página</option><option value="home">Todo Lima (portada)</option></select></label>
      <button className={item} onClick={nativeShare}>Compartir con otras apps</button>
      <a className={item} href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a className={item} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a className={item} href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">Telegram</a>
      <a className={item} href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">X</a>
      <button className={item} onClick={copy}>Copiar enlace</button>
      {manualUrl && <input aria-label="Enlace para copiar" readOnly value={manualUrl} onFocus={event => event.target.select()} className="w-full p-2 text-slate-900" />}
      <p role="status" className="px-3 text-sm">{status}</p>
    </div>}
  </div>;
}
