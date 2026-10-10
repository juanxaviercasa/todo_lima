'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle.js';
const links = [['Categorías', '/#directorios'], ['Guías', '/guias'], ['Cómo funciona', '/metodologia'], ['Para negocios', '/para-negocios']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = event => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  return <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800"><div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center gap-4">
    <Link href="/" className="flex gap-3 items-center"><img src="/images/logo.jpg" alt="" width="40" height="40" className="rounded-xl" /><span><span className="block font-black text-xl">Todo<span className="text-sky-600">Lima</span></span><span className="block text-xs text-slate-500">Tu guía local</span></span></Link>
    <nav aria-label="Navegación principal" className="hidden md:flex gap-7 items-center text-sm font-semibold">{links.map(([label, href]) => <Link className="hover:text-sky-600" key={href} href={href}>{label}</Link>)}</nav><div className="flex gap-3 items-center"><ThemeToggle /><button type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-menu" className="md:hidden p-2" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
  </div>{open && <nav id="mobile-menu" aria-label="Navegación móvil" className="md:hidden px-5 pb-5 space-y-2">{links.map(([label, href]) => <Link className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-900 font-semibold" key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav>}</header>;
}
