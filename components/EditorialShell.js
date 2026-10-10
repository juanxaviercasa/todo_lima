import Link from 'next/link';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

export default function EditorialShell({ title, intro, children, trail = [], action }) {
  return <><Navbar /><main id="contenido" className="flex-grow">
    <header className="bg-slate-950 text-white px-5 py-14 sm:py-20"><div className="max-w-5xl mx-auto">
      <nav aria-label="Ruta de navegación" className="flex flex-wrap gap-2 text-sm text-slate-300 mb-6"><Link href="/">Inicio</Link>{trail.map(([label, href]) => <span key={href}> / <Link href={href}>{label}</Link></span>)}</nav>
      <p className="text-sky-300 text-sm font-semibold mb-3">La ciudad, a tu alcance</p><h1 className="text-3xl sm:text-5xl font-black max-w-4xl">{title}</h1>
      {intro && <p className="mt-5 text-slate-300 text-lg max-w-3xl leading-relaxed">{intro}</p>}
      {action && <a href={action.href} className="inline-block rounded-xl bg-sky-500 text-white font-semibold px-5 py-3 mt-6">{action.label} →</a>}
    </div></header><div className="max-w-5xl mx-auto px-5 py-12 space-y-10">{children}</div>
  </main><Footer /></>;
}
