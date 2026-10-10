'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';

const RUBROS = { salud: 'Salud y bienestar', hogar: 'Hogar y reparaciones', gastronomia: 'Gastronomía', educacion: 'Educación', fitness: 'Fitness y deportes', eventos: 'Eventos', belleza: 'Belleza', mascotas: 'Mascotas', comercio: 'Comercio', legal: 'Legal y notarías', finanzas: 'Finanzas', automotriz: 'Automotriz', tecnologia: 'Tecnología' };
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const control = 'rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-3 w-full min-w-0';

export default function HomeExplorer({ categories }) {
  const [query, setQuery] = useState('');
  const [niche, setNiche] = useState('all');
  const [district, setDistrict] = useState('all');
  const [letter, setLetter] = useState('all');
  const [sort, setSort] = useState('az');
  const count = c => district === 'all' ? c.count : (c.districtCounts[district] || 0);
  const districts = [...new Set(categories.flatMap(c => Object.keys(c.districtCounts)))].filter(d => d !== 'Lima').sort((a, b) => a.localeCompare(b, 'es'));
  const base = categories.filter(c => (niche === 'all' || c.niche === niche) && count(c) > 0 && normalize(`${c.title} ${c.niche} ${c.description}`).includes(normalize(query.trim())));
  const availableLetters = new Set(base.map(c => normalize(c.title)[0].toUpperCase()));
  const filtered = base.filter(c => letter === 'all' || normalize(c.title)[0].toUpperCase() === letter).sort((a, b) => sort === 'options' ? count(b) - count(a) || a.title.localeCompare(b.title, 'es') : (sort === 'za' ? -1 : 1) * a.title.localeCompare(b.title, 'es'));
  const reset = () => { setQuery(''); setNiche('all'); setDistrict('all'); setLetter('all'); setSort('az'); };
  return <section id="directorios" className="max-w-7xl mx-auto px-5 py-14 scroll-mt-24">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8"><div><p className="text-sky-600 font-semibold text-sm mb-2">ENCUENTRA TU PRÓXIMO SERVICIO</p><h2 className="text-3xl font-black">¿Qué necesitas en Lima?</h2><p className="mt-3 text-slate-500">Explora por rubro, distrito o nombre del servicio.</p></div><div className="relative w-full md:max-w-sm"><label htmlFor="category-search" className="sr-only">Buscar categoría</label><Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" /><input id="category-search" className={`${control} pl-12`} placeholder="Gasfiteros, dentistas, cafeterías…" type="search" value={query} onChange={e => { setQuery(e.target.value); setLetter('all'); }} /></div></div>
    <div className="editorial-card mb-7 space-y-5"><div className="grid sm:grid-cols-3 gap-4">
      <label className="text-sm font-semibold">Distrito<select aria-label="Distrito" className={`${control} mt-2`} value={district} onChange={e => { setDistrict(e.target.value); setLetter('all'); }}><option value="all">Todos los distritos</option>{districts.map(d => <option key={d}>{d}</option>)}</select></label>
      <label className="text-sm font-semibold">Ordenar categorías<select aria-label="Ordenar categorías" className={`${control} mt-2`} value={sort} onChange={e => setSort(e.target.value)}><option value="az">Nombre: A–Z</option><option value="za">Nombre: Z–A</option><option value="options">Más opciones disponibles</option></select></label>
      <div className="flex items-end"><button type="button" className={`${control} text-sky-600 font-semibold hover:border-sky-500`} onClick={reset}>Limpiar filtros</button></div>
    </div><div aria-label="Filtrar por rubro" className="flex flex-wrap gap-2">{[['all', 'Todos los rubros'], ...Object.entries(RUBROS).filter(([key]) => categories.some(c => c.niche === key))].map(([key, label]) => <button type="button" key={key} aria-pressed={niche === key} onClick={() => { setNiche(key); setLetter('all'); }} className={`rounded-full px-3 py-2 text-sm border ${niche === key ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 dark:border-slate-700 hover:border-sky-500'}`}>{label}</button>)}</div>
    <div aria-label="Filtrar por letra" className="flex flex-wrap gap-1">{['all', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(l => <button key={l} type="button" aria-label={l === 'all' ? 'Todas las letras' : `Letra ${l}`} aria-pressed={letter === l} disabled={l !== 'all' && !availableLetters.has(l)} onClick={() => setLetter(l)} className={`min-w-9 rounded-lg px-2 py-2 text-sm disabled:opacity-25 ${letter === l ? 'bg-sky-600 text-white' : 'hover:bg-sky-100 dark:hover:bg-slate-800'}`}>{l === 'all' ? 'Todas' : l}</button>)}</div>
    <p className="text-xs text-slate-500">El distrito se basa en la dirección publicada, no en la cobertura a domicilio. Las imágenes ilustran cada categoría.</p></div>
    <p role="status" className="text-sm text-slate-500 mb-5">{filtered.length} categorías disponibles{district !== 'all' && ` en ${district}`}</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{filtered.map(c => <Link key={c.slug} href={`/${c.slug}${district === 'all' ? '' : `?distrito=${encodeURIComponent(district)}`}`} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 group transition-colors"><div className="aspect-[16/10] overflow-hidden bg-slate-100"><img src={`/images/categories/${c.slug.replace(/-/g, '_')}.webp`} alt="" width="640" height="400" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="p-5"><p className="text-xs font-semibold text-sky-600 mb-2">{RUBROS[c.niche] || c.niche}</p><div className="flex justify-between gap-3"><h3 className="font-bold text-lg leading-snug">{c.title.replace(' en Lima', '')}</h3><ArrowUpRight className="w-5 h-5 shrink-0 text-sky-600" /></div><p className="text-sm text-slate-500 mt-3 leading-relaxed">{c.description}</p><p className="text-sm font-semibold mt-4">{count(c)} opciones · {district === 'all' ? 'Lima' : district}</p></div></Link>)}</div>
    {filtered.length === 0 && <div className="editorial-card"><p>No hay categorías para esta combinación. Prueba otro distrito o servicio.</p><button type="button" className="text-sky-600 font-semibold mt-3" onClick={reset}>Limpiar filtros</button></div>}
  </section>;
}
