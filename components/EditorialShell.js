import Link from 'next/link';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

export default function EditorialShell({ title, intro, children, trail = [], action, image }) {
  return <><Navbar /><main id="contenido" className="min-w-0 [overflow-wrap:anywhere] flex-grow">
    <header className="relative overflow-hidden bg-slate-950 text-white px-5 py-14 sm:py-20">
      {image && <><img src={image} alt="" width="1600" height="900" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover opacity-40" /><div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" /></>}
      <div className="relative max-w-5xl mx-auto">
      <nav aria-label="Ruta de navegación" className="flex flex-wrap gap-2 text-sm text-slate-300 mb-6"><Link href="/">Inicio</Link>{trail.map(([label, href]) => <span key={href}> / <Link href={href}>{label}</Link></span>)}</nav>
      <p className="text-sky-300 text-sm font-semibold mb-3">La ciudad, a tu alcance</p><h1 className="text-3xl sm:text-5xl font-black max-w-4xl">{title}</h1>
      {intro && <p className="mt-5 text-slate-300 text-lg max-w-3xl leading-relaxed">{intro}</p>}
      {action && <a href={action.href} className="inline-block rounded-xl bg-sky-500 text-white font-semibold px-5 py-3 mt-6">{action.label} →</a>}
    </div></header><div className="max-w-5xl mx-auto px-5 py-12 space-y-10">{children}</div>
  </main><Footer /></>;
}
