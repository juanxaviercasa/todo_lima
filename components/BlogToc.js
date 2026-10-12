'use client';

import { useState } from 'react';
import { ListOrdered, ChevronDown } from 'lucide-react';

export default function BlogToc({ items = [] }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Tabla de contenidos del artículo" 
      className="article-toc my-6 transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="article-toc-list"
          className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-0.5 min-w-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0">
            <ListOrdered className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
              En este artículo
            </h2>
            <span className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
              {items.length} {items.length === 1 ? 'sección' : 'secciones'}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="article-toc-list"
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all cursor-pointer shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500"
          aria-label={isOpen ? 'Plegar tabla de contenidos' : 'Desplegar tabla de contenidos'}
        >
          <span>{isOpen ? 'Ocultar' : 'Mostrar'}</span>
          <ChevronDown 
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {isOpen ? (
        <ol id="article-toc-list" className="article-toc-list mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {items.map((b, i) => (
            <li key={b.id}>
              <a href={'#' + b.id} className="article-toc-link">
                <span className="article-toc-number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="article-toc-label">
                  {b.text.replace(/^\s*\d+(?:\.\d+)*[.)]\s*/, '')}
                </span>
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <div 
          onClick={() => setIsOpen(true)}
          className="mt-2 text-xs text-slate-500 dark:text-slate-400 cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          Índice plegado · Haz clic para ver las {items.length} secciones del artículo.
        </div>
      )}
    </nav>
  );
}
