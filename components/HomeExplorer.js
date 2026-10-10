'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
export default function HomeExplorer({ categories }) {
  const [query, setQuery] = useState('');
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const filtered = categories.filter(c => normalize(`${c.title} ${c.niche}`).includes(normalize(query)));
  return <section id="directorios" className="max-w-7xl mx-auto px-5 py-14 scroll-mt-24">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8"><div><p className="text-sky-600 font-semibold text-sm mb-2">ENCUENTRA TU PRÓXIMO SERVICIO</p><h2 className="text-3xl font-black">¿Qué necesitas en Lima?</h2><p className="mt-3 text-slate-500">Explora por rubro y consulta las opciones disponibles.</p></div><div className="relative w-full md:max-w-sm"><label htmlFor="category-search" className="sr-only">Buscar categoría</label><Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" /><input id="category-search" className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-3.5 pl-12 pr-4" placeholder="Gasfiteros, dentistas, cafeterías…" type="search" value={query} onChange={e => setQuery(e.target.value)} /></div></div>
    <p role="status" className="text-sm text-slate-500 mb-5">{filtered.length} categorías disponibles</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{filtered.map(c => <Link key={c.slug} href={`/${c.slug}`} className="editorial-card hover:border-sky-500 group"><div className="flex justify-between gap-3"><h3 className="font-bold text-lg leading-snug">{c.title.replace(' en Lima', '')}</h3><ArrowUpRight className="w-5 h-5 shrink-0 text-sky-600" /></div><p className="text-sm text-slate-500 mt-5">{c.count} opciones · Lima</p></Link>)}</div>
    {filtered.length === 0 && <p className="editorial-card">Prueba con otro servicio o nombre de categoría.</p>}
  </section>;
}
