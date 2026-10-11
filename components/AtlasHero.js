import Link from 'next/link';

export default function AtlasHero({image,title,intro,topic}) {
  return <header className="atlas-hero bg-slate-950 text-white">
    {image && <div className="atlas-hero-media"><img src={image.src} srcSet={image.srcSet} sizes="100vw" alt={image.alt} width="1440" height="810" fetchPriority="high"/><div className="atlas-hero-shade" aria-hidden="true"/></div>}
    <div className="atlas-hero-copy">
      <nav aria-label="Ruta de navegación" className="flex flex-wrap gap-2 text-base text-white mb-5"><Link className="hover:underline" href="/">Inicio</Link><span aria-hidden="true">/</span>{topic ? <Link className="hover:underline" href="/conoce-lima">Conoce Lima</Link> : <span>Conoce Lima</span>}</nav>
      <p className="text-sky-200 text-base sm:text-lg font-semibold mb-3">{topic || 'Historia, sabores y vida local'}</p>
      <h1>{title}</h1>
      <p className="atlas-hero-intro">{intro}</p>
      <a href={topic ? '#contenido-atlas' : '#temas-lima'} className="inline-flex gap-2 mt-6 px-6 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-base">{topic ? 'Empezar a leer' : 'Explorar los siete temas'} <span aria-hidden="true">↓</span></a>
      <p className="text-sm text-slate-200 mt-4">Imagen ilustrativa generada con IA.</p>
    </div>
  </header>;
}
