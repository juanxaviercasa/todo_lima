'use client';
import { useEffect, useRef, useState } from 'react';

export default function SidebarScrollArea({ open, children }) {
  const scroller = useRef(null);
  const drag = useRef(null);
  const [metrics, setMetrics] = useState({ height: 0, max: 0, position: 0 });
  useEffect(() => {
    const el = scroller.current;
    const update = () => setMetrics({ height: el.clientHeight, max: Math.max(0, el.scrollHeight - el.clientHeight), position: el.scrollTop });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    observer.observe(el.firstElementChild);
    el.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); el.removeEventListener('scroll', update); };
  }, []);
  const travel = Math.max(1, metrics.height - 72);
  return <aside id="directory-filter-panel" aria-label="Filtros del directorio" className={`${open ? 'block' : 'hidden'} lg:block lg:sticky lg:top-24 relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs`}>
    <div id="directory-filter-scroll" ref={scroller} tabIndex={0} aria-label="Contenido desplazable de filtros" className="filter-scroll-area lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:overscroll-y-contain rounded-2xl"><div className="p-5">{children}</div></div>
    {metrics.max > 0 && <button type="button" role="scrollbar" aria-label="Desplazar filtros" aria-controls="directory-filter-scroll" aria-orientation="vertical" aria-valuemin={0} aria-valuemax={Math.round(metrics.max)} aria-valuenow={Math.round(metrics.position)} className="hidden lg:flex absolute right-0.5 w-3 h-8 items-center justify-center touch-none cursor-grab active:cursor-grabbing rounded-full focus-visible:outline-sky-500" style={{ top: 20 + travel * metrics.position / metrics.max }}
      onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { y: e.clientY, position: scroller.current.scrollTop }; }}
      onPointerMove={e => { if (drag.current) scroller.current.scrollTop = drag.current.position + (e.clientY - drag.current.y) * metrics.max / travel; }}
      onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}
      onKeyDown={e => { const el = scroller.current; const shifts = { ArrowDown: 40, ArrowUp: -40, PageDown: el.clientHeight, PageUp: -el.clientHeight, Home: -el.scrollHeight, End: el.scrollHeight }; if (e.key in shifts) { e.preventDefault(); el.scrollTop += shifts[e.key]; } }}><span className="block w-[3px] h-8 rounded-full bg-slate-300 hover:bg-slate-400 dark:bg-slate-600" /></button>}
  </aside>;
}
