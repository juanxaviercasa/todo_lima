'use client';
import { useId, useRef, useState } from 'react';

export default function TutorialScreenshot({ image, number }) {
  const dialog = useRef(null);
  const titleId = useId();
  const [originalSize, setOriginalSize] = useState(false);
  if (!image) return null;
  return <figure className="my-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">
    <button type="button" onClick={() => { setOriginalSize(false); dialog.current.showModal(); }} aria-label={`Ampliar captura del paso ${number}`} className="block w-full text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-sky-500 focus-visible:-outline-offset-4">
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" className="w-full h-auto" />
      <span className="block px-4 py-3 text-sm font-semibold text-sky-700 dark:text-sky-300">Paso {number} · Ampliar captura ↗</span>
    </button>
    <figcaption className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-300">{image.caption} <span className="block mt-1 text-xs">Captura de Nube para Pymes · {image.capturedAt} · Datos ficticios de demostración.</span></figcaption>
    <dialog ref={dialog} aria-labelledby={titleId} onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }} className="w-[96vw] max-w-6xl max-h-[94vh] p-0 rounded-xl bg-white text-slate-900 backdrop:bg-slate-950/80">
      <div className="sticky top-0 flex justify-between items-center gap-3 p-3 bg-white border-b"><p id={titleId} className="font-semibold">Paso {number} · Vista ampliada</p><button autoFocus type="button" onClick={() => dialog.current.close()} className="min-h-11 px-4 rounded-lg bg-slate-900 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500">Cerrar</button></div>
      <div className="p-3"><button type="button" aria-pressed={originalSize} onClick={() => setOriginalSize(value => !value)} className="min-h-11 px-3 rounded-lg border border-slate-400 font-semibold text-sm">{originalSize ? 'Ajustar a la pantalla' : 'Ver tamaño original'}</button></div>
      <div className="max-w-full overflow-auto"><img src={image.src} alt={image.alt} width={image.width} height={image.height} style={{ width: originalSize ? image.width : '100%', maxWidth: originalSize ? 'none' : '100%' }} className="block h-auto" /></div>
      <p className="p-4 text-sm">{image.caption} En tamaño original puedes desplazarte por la captura para leer los controles. Cierra esta vista con Escape.</p>
    </dialog>
  </figure>;
}
