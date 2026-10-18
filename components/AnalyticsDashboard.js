'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

const labels = { whatsapp: 'WhatsApp', phone: 'Teléfono', email: 'Correo', map: 'Mapas', website: 'Enlaces externos', search: 'Búsquedas', filter: 'Filtros', calculator: 'Calculadora', audio_play: 'Reproducciones de audio', video_play: 'Reproducciones de vídeo' };
const number = value => Number(value || 0).toLocaleString('es-PE');
const duration = value => `${Math.floor(Number(value || 0) / 60)} min ${Math.round(Number(value || 0) % 60)} s`;

// Presentational component also enables QA without bypassing production auth.
export function AnalyticsReport({ report, sort = 'active_seconds', setSort = () => {} }) {
  const totals = report.totals;
  const contacts = ['whatsapp', 'phone', 'email'].reduce((sum, key) => sum + Number(report.actions[key] || 0), 0);
  const pages = [...report.pages].sort((a,b) => Number(b[sort]) - Number(a[sort]));
  return <div className="space-y-6">
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {[
        ['Páginas vistas', number(totals.views), 'Visitas a páginas; no personas únicas.'],
        ['Tiempo activo medio', duration(totals.avgSeconds), 'Pestaña visible, enfocada y actividad reciente.'],
        ['Lectura al 75 %', totals.views ? `${Math.round(totals.read75 / totals.views * 100)} %` : '—', 'Visitas que llegaron al 75 % del desplazamiento.'],
        ['Clics de contacto', number(contacts), 'WhatsApp, teléfono o correo; no ventas confirmadas.'],
      ].map(([label, value, note]) => <article key={label} className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><h2 className="text-sm text-slate-300">{label}</h2><p className="text-3xl font-black text-white my-3">{value}</p><p className="text-sm text-slate-400">{note}</p></article>)}
    </div>
    {!totals.views ? <p role="status" className="rounded-2xl p-6 bg-slate-900 border border-slate-700 text-slate-300">Todavía no hay visitas medidas en este periodo. Solo se incluyen las visitas con analítica aceptada; no se reconstruyen visitas anteriores a la activación.</p> : <>
      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5"><h2 className="text-xl font-bold text-white">Dónde encuentran más valor</h2><label className="text-sm text-slate-300">Ordenar por <select className="ml-2 rounded-lg bg-slate-950 border border-slate-600 p-2 text-white" value={sort} onChange={e => setSort(e.target.value)}><option value="active_seconds">Tiempo activo total</option><option value="avg_seconds">Tiempo medio</option><option value="views">Visitas</option><option value="contacts">Contactos</option></select></label></div>
        <p className="text-sm text-slate-400 mb-5">Hasta 100 páginas con mayor tiempo activo. Combina volumen, lectura y acciones: pasar más tiempo también puede indicar dificultad.</p>
        <div className="overflow-x-auto rounded-xl border border-slate-700" tabIndex={0} role="region" aria-label="Tabla de páginas; desplaza horizontalmente para ver todas las columnas">
          <table className="w-full text-sm text-left whitespace-nowrap"><caption className="sr-only">Interacciones por página durante el periodo seleccionado</caption><thead className="bg-slate-950 text-slate-300"><tr>{['Página', 'Visitas', 'Tiempo total', 'Tiempo medio', 'Lectura ≥75 %', 'Contactos'].map(t => <th key={t} scope="col" className="px-4 py-3">{t}</th>)}</tr></thead><tbody className="divide-y divide-slate-700">{pages.map(p => <tr key={p.path} className="hover:bg-slate-800"><th scope="row" className="px-4 py-4 font-medium"><a href={p.path} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline underline-offset-4">{p.path}</a></th><td className="px-4 py-4">{number(p.views)}</td><td className="px-4 py-4">{duration(p.active_seconds)}</td><td className="px-4 py-4">{duration(p.avg_seconds)}</td><td className="px-4 py-4">{Math.round(p.read75 / p.views * 100)} %</td><td className="px-4 py-4">{number(p.contacts)}</td></tr>)}</tbody></table>
        </div>
      </section>
      <div className="grid lg:grid-cols-2 gap-5">
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><h2 className="text-xl font-bold text-white mb-5">Acciones realizadas</h2><dl className="space-y-3">{Object.entries(labels).map(([key, label]) => <div className="flex justify-between gap-4 text-sm" key={key}><dt className="text-slate-300">{label}</dt><dd className="font-bold text-sky-300">{number(report.actions[key])}</dd></div>)}</dl><p className="text-sm text-slate-400 mt-5">Las búsquedas cuentan cambios confirmados del campo, sin guardar lo escrito. Audio y vídeo: controles HTML del sitio; no incluye reproducciones dentro de YouTube.</p></section>
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><h2 className="text-xl font-bold text-white mb-5">Actividad diaria · Lima</h2><div className="space-y-3 max-h-80 overflow-auto" tabIndex={0} role="region" aria-label="Actividad diaria">{report.daily.map(d => <div key={d.day} className="text-sm"><div className="flex justify-between gap-3 mb-1"><span>{d.day}</span><span className="text-slate-300">{number(d.views)} visitas</span></div><meter className="w-full h-3" min="0" max={Math.max(1,...report.daily.map(x => Number(x.views)))} value={Number(d.views)} aria-label={`Visitas el ${d.day}`} /></div>)}</div></section>
      </div>
    </>}
    <p className="text-sm text-slate-400">Actualizado: {new Date(report.generatedAt).toLocaleString('es-PE', { timeZone: 'America/Lima' })} (Lima). Los datos son orientativos y pueden excluir bloqueadores, rechazos de consentimiento y fallos de red.</p>
  </div>;
}

export default function AnalyticsDashboard() {
  const { getToken } = useAuth();
  const [days, setDays] = useState(7), [reload, setReload] = useState(0), [sort, setSort] = useState('active_seconds');
  const [state, setState] = useState({ loading: true });
  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true });
    (async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error('Inicia sesión de nuevo para consultar las métricas.');
        const response = await fetch(`/api/analytics/report?days=${days}`, { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal, cache: 'no-store' });
        if (!response.ok) throw new Error(response.status === 401 ? 'Tu cuenta no tiene acceso al informe.' : 'La analítica todavía no está disponible. Revisa la migración y las variables privadas del servidor.');
        const report = await response.json();
        if (!report.totals || !Array.isArray(report.pages)) throw new Error('El servidor devolvió un informe inválido.');
        if (!controller.signal.aborted) setState({ report });
      } catch (error) { if (!controller.signal.aborted) setState({ error: error.message }); }
    })();
    return () => controller.abort();
  }, [days, reload, getToken]);
  return <div className="space-y-6 text-slate-100">
    <header><p className="text-sky-300 text-sm font-semibold mb-2">ESCUCHAR PARA MEJORAR</p><h1 className="text-3xl sm:text-4xl font-black text-white">Uso e interacciones de la web</h1><p className="text-slate-300 mt-3 max-w-3xl leading-relaxed">Descubre qué contenidos se consultan, cuáles se leen y cuáles llevan a una acción. Usa estas señales para priorizar mejoras y temas editoriales.</p></header>
    <div className="flex flex-wrap items-center gap-4"><label className="text-sm">Periodo <select className="ml-2 bg-slate-900 border border-slate-600 rounded-xl p-3 text-white" value={days} onChange={e => setDays(Number(e.target.value))}>{[7,30,90].map(d => <option key={d} value={d}>Últimos {d} días</option>)}</select></label><button type="button" disabled={state.loading} onClick={() => setReload(n => n + 1)} className="rounded-xl px-5 py-3 bg-sky-700 hover:bg-sky-800 font-semibold text-white disabled:opacity-60">Actualizar</button></div>
    {state.loading && <p role="status" className="p-6 bg-slate-900 rounded-2xl">Consultando métricas…</p>}
    {state.error && <p role="alert" className="p-6 rounded-2xl border border-amber-700 bg-slate-900 text-amber-200">{state.error}</p>}
    {state.report && <AnalyticsReport report={state.report} sort={sort} setSort={setSort} />}
    <aside className="rounded-2xl p-6 border border-slate-700 text-sm text-slate-300 leading-relaxed"><h2 className="font-bold text-white mb-2">Cómo interpretar los datos</h2><p>Tiempo activo: máximo 60 segundos sin interacción, solo con la pestaña visible y enfocada. Se mide por página, sin identificar personas entre visitas. La profundidad de desplazamiento es una señal de lectura, no prueba de comprensión. Los clics de contacto muestran intención, no servicios contratados.</p></aside>
  </div>;
}
