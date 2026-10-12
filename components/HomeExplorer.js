'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, X, ChevronRight, Sparkles, Filter } from 'lucide-react';
import AreaIcon from './AreaIcon.js';
import { MACRO_AREAS, CATEGORY_TO_AREA_SLUG, getAreaBySlug } from '../lib/areasTaxonomy.js';

const normalize = text => (text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const control = 'rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-3 w-full min-w-0 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500';

export default function HomeExplorer({ categories }) {
  const [query, setQuery] = useState('');
  const [areaSlug, setAreaSlug] = useState('all');
  const [district, setDistrict] = useState('all');
  const [letter, setLetter] = useState('all');
  const [sort, setSort] = useState('az');
  const [showUpcoming, setShowUpcoming] = useState(false);

  // Mapeo enriquecido de categorías con su área principal
  const enrichedCategories = useMemo(() => {
    return categories.map(c => {
      const area = getAreaBySlug(CATEGORY_TO_AREA_SLUG[c.slug]) || null;
      return {
        ...c,
        areaSlug: area?.slug || 'otros',
        areaTitle: area?.title || 'Servicios'
      };
    });
  }, [categories]);

  // Lista de áreas activas con conteo real de categorías presentes
  const activeAreas = useMemo(() => {
    return MACRO_AREAS.filter(area => area.categorySlugs.length > 0).map(area => {
      const areaCats = enrichedCategories.filter(c => c.areaSlug === area.slug);
      return {
        ...area,
        realCount: areaCats.length,
        totalBusinesses: areaCats.reduce((sum, c) => sum + (c.count || 0), 0)
      };
    });
  }, [enrichedCategories]);

  // Áreas futuras en desarrollo (sin categorías activas todavía)
  const upcomingAreas = useMemo(() => {
    return MACRO_AREAS.filter(area => area.categorySlugs.length === 0);
  }, []);

  // Función para obtener negocios por categoría considerando distrito
  const countBusinesses = c => (district === 'all' ? c.count : (c.districtCounts[district] || 0));

  // Lista única de distritos disponibles
  const districts = useMemo(() => {
    return [...new Set(categories.flatMap(c => Object.keys(c.districtCounts)))]
      .filter(d => d !== 'Lima')
      .sort((a, b) => a.localeCompare(b, 'es'));
  }, [categories]);

  // Categorías base filtradas por área principal, texto y distrito
  const baseCategories = useMemo(() => {
    const q = normalize(query.trim());
    return enrichedCategories.filter(c => {
      const matchesArea = areaSlug === 'all' || c.areaSlug === areaSlug;
      const hasBusinessesInDistrict = countBusinesses(c) > 0;
      const matchesSearch = !q || normalize(`${c.title} ${c.areaTitle} ${c.description}`).includes(q);
      return matchesArea && hasBusinessesInDistrict && matchesSearch;
    });
  }, [enrichedCategories, areaSlug, query, district]);

  // Letras disponibles para el filtro alfabético
  const availableLetters = useMemo(() => {
    return new Set(baseCategories.map(c => normalize(c.title)[0].toUpperCase()));
  }, [baseCategories]);

  // Categorías ordenadas y filtradas por letra
  const filteredCategories = useMemo(() => {
    return baseCategories
      .filter(c => letter === 'all' || normalize(c.title)[0].toUpperCase() === letter)
      .sort((a, b) => {
        if (sort === 'options') {
          return countBusinesses(b) - countBusinesses(a) || a.title.localeCompare(b.title, 'es');
        }
        return (sort === 'za' ? -1 : 1) * a.title.localeCompare(b.title, 'es');
      });
  }, [baseCategories, letter, sort, district]);

  // Categorías recomendadas secundarias cuando se selecciona un área específica
  const recommendedCategories = useMemo(() => {
    if (areaSlug === 'all') return [];
    const currentArea = MACRO_AREAS.find(a => a.slug === areaSlug);
    if (!currentArea || !currentArea.recommendedSlugs.length) return [];
    return enrichedCategories.filter(c => currentArea.recommendedSlugs.includes(c.slug));
  }, [areaSlug, enrichedCategories]);

  const activeAreaObj = activeAreas.find(a => a.slug === areaSlug);

  const resetFilters = () => {
    setQuery('');
    setAreaSlug('all');
    setDistrict('all');
    setLetter('all');
    setSort('az');
  };

  return (
    <section id="directorios" className="max-w-7xl mx-auto px-5 py-14 scroll-mt-24">
      {/* Encabezado Principal y Buscador de Categorías */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
        <div>
          <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm mb-2 uppercase tracking-wide">
            EXPLORA POR ÁREA O SERVICIO
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            ¿Qué necesitas encontrar?
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl">
            Explora las grandes áreas de Lima o busca directamente servicios específicos con profesionales y negocios verificados.
          </p>
        </div>

        {/* Campo de búsqueda "¿Qué necesitas encontrar?" */}
        <div className="relative w-full md:max-w-md">
          <label htmlFor="category-search" className="sr-only">
            ¿Qué necesitas encontrar?
          </label>
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            id="category-search"
            className={`${control} pl-12 pr-10`}
            placeholder="Gasfiteros, cevicherías, dentistas, notarías…"
            type="search"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setLetter('all');
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Borrar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* SELECTOR EN MÓVIL Y TABLET (Evita filas interminables de botones horizontales) */}
      <div className="lg:hidden mb-6">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
          Área de servicios:
        </label>
        <div className="relative">
          <select
            value={areaSlug}
            onChange={e => {
              setAreaSlug(e.target.value);
              setLetter('all');
            }}
            aria-label="Seleccionar área de servicios"
            className={`${control} font-medium appearance-none pr-10`}
          >
            <option value="all">Todas las áreas ({categories.length} categorías)</option>
            {activeAreas.map(area => (
              <option key={area.slug} value={area.slug}>
                {area.title} ({area.realCount} categorías)
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-3.5 pointer-events-none text-slate-400">
            <Filter className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* TARJETAS DE ÁREAS EN ESCRITORIO (Grid de exploración por grandes áreas con icono y conteo real) */}
      <div className="hidden lg:block mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Grandes Áreas de Lima ({activeAreas.length} activas)
          </span>
          {areaSlug !== 'all' && (
            <button
              type="button"
              onClick={() => setAreaSlug('all')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Ver todas las áreas ({categories.length} categorías) →
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5" role="tablist" aria-label="Grandes áreas">
          <button
            type="button"
            role="tab"
            aria-selected={areaSlug === 'all'}
            onClick={() => {
              setAreaSlug('all');
              setLetter('all');
            }}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              areaSlug === 'all'
                ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/40 shadow-sm ring-2 ring-sky-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className={`p-2 rounded-xl ${areaSlug === 'all' ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="font-bold text-sm text-slate-900 dark:text-white">Todas las áreas</span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-1">Explora todo el directorio</p>
            <span className="inline-block mt-2 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
              {categories.length} categorías
            </span>
          </button>

          {activeAreas.map(area => {
            const isSelected = areaSlug === area.slug;
            return (
              <button
                key={area.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setAreaSlug(area.slug);
                  setLetter('all');
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/40 shadow-sm ring-2 ring-sky-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`p-2 rounded-xl ${isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <AreaIcon name={area.icon} className="w-4 h-4" />
                  </span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                    {area.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{area.description}</p>
                <span className="inline-block mt-2 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                  {area.realCount} categorías
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BANNER INFORMATIVO DEL ÁREA SELECCIONADA */}
      {activeAreaObj && (
        <div className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 p-5 mb-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <span className="p-3 rounded-2xl bg-sky-500 text-white shrink-0 shadow-sm">
              <AreaIcon name={activeAreaObj.icon} className="w-6 h-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeAreaObj.title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
                  {activeAreaObj.realCount} categorías activas
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {activeAreaObj.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/categorias/${activeAreaObj.slug}`}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 inline-flex items-center gap-1 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-sky-200 dark:border-slate-800"
            >
              <span>Ver página del área</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setAreaSlug('all')}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:underline px-2"
            >
              Cerrar área
            </button>
          </div>
        </div>
      )}

      {/* FILTROS ADICIONALES (Distrito, Orden, Letra) */}
      <div className="editorial-card mb-7 space-y-5">
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="text-sm font-semibold">
            Distrito de Lima
            <select
              aria-label="Distrito de Lima"
              className={`${control} mt-2`}
              value={district}
              onChange={e => {
                setDistrict(e.target.value);
                setLetter('all');
              }}
            >
              <option value="all">Todos los distritos</option>
              {districts.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold">
            Ordenar categorías
            <select
              aria-label="Ordenar categorías"
              className={`${control} mt-2`}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="az">Nombre: A–Z</option>
              <option value="za">Nombre: Z–A</option>
              <option value="options">Más negocios registrados</option>
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              className={`${control} text-sky-600 dark:text-sky-400 font-semibold hover:border-sky-500`}
              onClick={resetFilters}
            >
              Limpiar todos los filtros
            </button>
          </div>
        </div>

        {/* Filtro alfabético por letra */}
        <div aria-label="Filtrar por letra" className="flex flex-wrap gap-1">
          {['all', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(l => (
            <button
              key={l}
              type="button"
              aria-label={l === 'all' ? 'Todas las letras' : `Letra ${l}`}
              aria-pressed={letter === l}
              disabled={l !== 'all' && !availableLetters.has(l)}
              onClick={() => setLetter(l)}
              className={`min-w-9 rounded-lg px-2 py-2 text-sm disabled:opacity-25 transition-colors ${
                letter === l
                  ? 'bg-sky-600 text-white font-bold'
                  : 'hover:bg-sky-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {l === 'all' ? 'Todas' : l}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-500">
          El distrito se basa en la dirección verificada del negocio, no en su cobertura de entrega a domicilio.
        </p>
      </div>

      {/* ESTADO DE CONTEO */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <p role="status" className="text-sm text-slate-500 dark:text-slate-400">
          <strong className="text-slate-900 dark:text-white">{filteredCategories.length}</strong>{' '}
          {filteredCategories.length === 1 ? 'categoría disponible' : 'categorías disponibles'}
          {areaSlug !== 'all' && activeAreaObj && ` en ${activeAreaObj.title}`}
          {district !== 'all' && ` con presencia en ${district}`}
        </p>

        {(areaSlug !== 'all' || district !== 'all' || query || letter !== 'all') && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            Restablecer vista completa
          </button>
        )}
      </div>

      {/* GRILLA DE CATEGORÍAS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCategories.map(c => {
          const bizCount = countBusinesses(c);
          return (
            <Link
              key={c.slug}
              href={`/${c.slug}${district === 'all' ? '' : `?distrito=${encodeURIComponent(district)}`}`}
              className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 dark:hover:border-sky-400 group transition-all flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img
                  src={`/images/categories/${c.slug.replace(/-/g, '_')}.webp`}
                  alt=""
                  width="640"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur text-[11px] font-semibold text-white">
                  {c.areaTitle}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-bold text-lg leading-snug text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {c.title.replace(' en Lima', '')}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-2">
                  {c.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                  <span>{bizCount} negocios</span>
                  <span className="text-sky-600 dark:text-sky-400">{district === 'all' ? 'Lima' : district}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CATEGORÍAS RECOMENDADAS CRUZADAS (Sin duplicar URLs) */}
      {recommendedCategories.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Servicios relacionados recomendados en {activeAreaObj?.title}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-5">
            Especialidades complementarias recomendadas para esta búsqueda. Te llevarán a la misma página oficial del servicio.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedCategories.map(rc => (
              <Link
                key={rc.slug}
                href={`/${rc.slug}`}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 dark:hover:border-sky-400 transition-colors group flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Área: {rc.areaTitle}
                  </span>
                  <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    {rc.title.replace(' en Lima', '')}
                  </p>
                  <span className="text-xs text-slate-500">{rc.count} opciones</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-sky-600 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ESTADO VACÍO CUANDO NO HAY RESULTADOS */}
      {filteredCategories.length === 0 && (
        <div className="editorial-card text-center py-12">
          <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
            No hay categorías que coincidan con los filtros seleccionados.
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Prueba buscando con otro término, seleccionando otro distrito o limpiando los filtros.
          </p>
          <button
            type="button"
            className="rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 mt-5 transition-colors"
            onClick={resetFilters}
          >
            Limpiar filtros y ver todas las categorías
          </button>
        </div>
      )}

      {/* SECCIÓN TRANSPARENTE DE PRÓXIMAS ÁREAS (Roadmap sin secciones vacías para visitantes) */}
      <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setShowUpcoming(!showUpcoming)}
          className="flex items-center justify-between w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200/70 dark:hover:bg-slate-800/80 transition-colors text-left"
          aria-expanded={showUpcoming}
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <AreaIcon name="HardHat" className="w-4 h-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Próximas áreas en preparación para Lima ({upcomingAreas.length} áreas planificadas)
              </p>
              <p className="text-xs text-slate-500">
                Se activan conforme verifiquemos fichas y negocios de calidad.
              </p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showUpcoming ? 'rotate-90' : ''}`} />
        </button>

        {showUpcoming && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {upcomingAreas.map(up => (
              <div
                key={up.slug}
                className="p-5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AreaIcon name={up.icon} className="w-4 h-4 text-sky-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{up.title}</h4>
                </div>
                <p className="text-xs text-slate-500 mb-3">{up.description}</p>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                    Categorías previstas:
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5 list-disc list-inside">
                    {up.upcomingCategories.slice(0, 4).map(c => (
                      <li key={c} className="line-clamp-1">{c}</li>
                    ))}
                    {up.upcomingCategories.length > 4 && (
                      <li className="text-[11px] text-sky-600 list-none pt-1">
                        +{up.upcomingCategories.length - 4} más…
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
