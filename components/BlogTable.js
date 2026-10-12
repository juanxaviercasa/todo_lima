'use client';

import { useState } from 'react';
import { Table as TableIcon, ChevronDown } from 'lucide-react';

function inline(text) {
  if (!text) return '';
  return text.split(/(\[[^\]]+\]\((?:https?:\/\/[^\s)]+|\/[^\s)]*)\)|\*\*[^*]+\*\*)/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} className="text-sky-700 dark:text-sky-300 underline underline-offset-4">
          {link[1]}
        </a>
      );
    }
    if (part.startsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function BlogTable({ block }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!block || !block.rows || block.rows.length === 0) return null;

  const headerRow = block.rows[0] || [];
  const bodyRows = block.rows.slice(1) || [];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 shadow-xs overflow-hidden my-6 transition-all duration-200">
      {/* Header bar con control de plegado / despliegue */}
      <div className="p-3 sm:p-4 bg-slate-50/90 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Plegar tabla de datos' : 'Desplegar tabla de datos'}
          className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-0.5"
        >
          <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0">
            <TableIcon className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-bold text-xs sm:text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors whitespace-nowrap">
              <span className="sm:hidden">Tabla de datos</span>
              <span className="hidden sm:inline">Tabla informativa y comparativa</span>
            </span>
            <span className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-medium whitespace-nowrap">
              <span className="sm:hidden">{bodyRows.length} f</span>
              <span className="hidden sm:inline">{bodyRows.length} {bodyRows.length === 1 ? 'fila' : 'filas'}</span>
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Plegar tabla' : 'Desplegar tabla'}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all cursor-pointer shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <span>
            {isOpen ? 'Plegar' : 'Desplegar'}
            <span className="hidden sm:inline"> tabla</span>
          </span>
          <ChevronDown 
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* Contenido de la tabla al estar desplegada */}
      {isOpen ? (
        <div>
          {/* Indicador sutil de scroll horizontal en móviles */}
          <div className="sm:hidden px-3.5 py-1.5 bg-sky-50/50 dark:bg-slate-900 text-[11px] text-slate-500 dark:text-slate-400 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <span>← Desliza horizontalmente para ver toda la tabla →</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <caption className="sr-only">Tabla de organización y datos del artículo</caption>
              <thead className="bg-sky-50/70 dark:bg-slate-800/80">
                <tr>
                  {headerRow.map((cell, idx) => (
                    <th 
                      scope="col" 
                      key={idx} 
                      className="p-3.5 sm:p-4 font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
                    >
                      {inline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {bodyRows.map((row, rowIdx) => (
                  <tr 
                    key={rowIdx} 
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {row.map((cell, colIdx) => (
                      <td 
                        key={colIdx} 
                        className="p-3.5 sm:p-4 align-top text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                      >
                        {inline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Vista resumida cuando está plegada */
        <div 
          onClick={() => setIsOpen(true)}
          className="p-4 text-center text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
        >
          <span>Tabla plegada para agilizar la lectura · Haz clic en <strong>Desplegar tabla</strong> para ver los datos ({bodyRows.length} filas).</span>
        </div>
      )}
    </div>
  );
}
