'use client';
import {useState} from 'react';
export default function LimaMap() {
  const [loaded, setLoaded] = useState(false);
  return <section id="mapa-lima" className="editorial-card scroll-mt-28"><h2 className="text-2xl font-bold mb-3">Lima en el mapa</h2><p className="mb-5">Referencia geográfica de la ciudad; no señala una oficina de Todo Lima ni garantiza cobertura de los negocios.</p>
    <div className="w-full min-w-0 aspect-video min-h-[240px] rounded-xl overflow-hidden border border-slate-200 bg-sky-50 dark:bg-slate-900 flex items-center justify-center">
      {loaded ? <iframe title="Mapa interactivo de Lima, Perú" src="https://www.openstreetmap.org/export/embed.html?bbox=-77.20%2C-12.25%2C-76.80%2C-11.85&layer=mapnik" className="w-full h-full" loading="lazy" referrerPolicy="no-referrer"/> : <div className="p-6 text-center max-w-lg"><p className="text-sm mb-4">El mapa lo proporciona OpenStreetMap. Se conectará con ese servicio solo cuando lo actives.</p><button type="button" className="editorial-chip" onClick={() => setLoaded(true)}>Cargar mapa de Lima</button></div>}
    </div><p className="text-xs text-slate-500 mt-3">© <a href="https://www.openstreetmap.org/copyright" className="underline" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a> · <a href="https://www.openstreetmap.org/#map=11/-12.05/-77.04" className="underline" target="_blank" rel="noopener noreferrer">Abrir mapa en otra pestaña</a></p>
  </section>;
}
