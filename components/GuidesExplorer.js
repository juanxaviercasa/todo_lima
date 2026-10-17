'use client';
import { useState } from 'react';
import GuideCard from './GuideCard.js';

export default function GuidesExplorer({ guides }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('Todas');
  const groups = [...new Set(guides.map(g => g.group))];
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const visible = guides.filter(g => (selected === 'Todas' || g.group === selected) && normalize(`${g.title} ${g.description} ${g.group}`).includes(normalize(query)));
  return <div className="space-y-10">
    <div className="editorial-card space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="font-semibold">¿Qué necesitas resolver?<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Prueba: catering, laptop o mudanza" className="mt-2 block w-full rounded-xl border border-slate-400 bg-white dark:bg-slate-950 p-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500" /></label>
        <label className="font-semibold">Explora por tema<select value={selected} onChange={e => setSelected(e.target.value)} className="mt-2 block w-full rounded-xl border border-slate-400 bg-white dark:bg-slate-950 p-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500">{['Todas', ...groups].map(group => <option key={group}>{group}</option>)}</select></label>
      </div>
      <p role="status" className="text-sm text-slate-600 dark:text-slate-300">{visible.length} {visible.length === 1 ? 'guía disponible' : 'guías disponibles'} · Elige según la decisión que necesitas tomar.</p>
      {(query || selected !== 'Todas') && <button onClick={() => { setQuery(''); setSelected('Todas'); }} className="min-h-11 underline text-sky-700 dark:text-sky-300">Ver todas las guías</button>}
    </div>
    {visible.length === 0 && <p className="editorial-card">No encontramos guías para esa búsqueda. Prueba otra palabra o selecciona otro tema.</p>}
    {groups.map(group => {
      const entries = visible.filter(g => g.group === group);
      return entries.length ? <section key={group} aria-label={group} className="space-y-5"><div className="flex items-baseline gap-3 border-b border-slate-200 dark:border-slate-800 pb-3"><h2 className="text-2xl font-bold">{group}</h2><span className="text-sm text-slate-500">{entries.length} guías</span></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{entries.map(guide => <GuideCard key={guide.slug} guide={guide} />)}</div></section> : null;
    })}
  </div>;
}
