export default function LimaMap({provider = 'openstreetmap'}) {
  const google = provider === 'google';
  const source = google ? 'https://www.google.com/maps?ll=-12.0464%2C-77.0428&z=11&output=embed' : 'https://www.openstreetmap.org/export/embed.html?bbox=-77.20%2C-12.25%2C-76.80%2C-11.85&layer=mapnik';
  return <section id="mapa-lima" className="editorial-card scroll-mt-28"><h2 className="text-2xl font-bold mb-3">Lima en el mapa</h2><p className="mb-5">Referencia geográfica de la ciudad; no señala una oficina de Todo Lima ni garantiza cobertura de los negocios.</p>
    <div className="w-full min-w-0 h-[260px] sm:h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-sky-50 dark:bg-slate-900">
      <iframe title={`Mapa referencial de Lima, Perú — ${google ? 'Google Maps' : 'OpenStreetMap'}`} src={source} className="block w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer" allowFullScreen/>
    </div><p className="text-xs text-slate-500 mt-3">{google ? 'Mapa proporcionado por Google Maps.' : <>© <a href="https://www.openstreetmap.org/copyright" className="underline" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a></>} · <a href={google ? 'https://www.google.com/maps/@-12.0464,-77.0428,11z' : 'https://www.openstreetmap.org/#map=11/-12.05/-77.04'} className="underline" target="_blank" rel="noopener noreferrer">Abrir mapa en otra pestaña</a> · <a href="/privacidad#consultas-contacto" className="underline">Privacidad del mapa</a></p>
  </section>;
}
