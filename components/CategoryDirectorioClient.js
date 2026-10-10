'use client';

import { useState, useMemo, useEffect } from 'react';
import BusinessCard from './BusinessCard.js';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Star, 
  X, 
  Clock, 
  CheckCircle2, 
  Award,
  AlertCircle,
  ChevronDown,
  Compass
} from 'lucide-react';
import { extractDistrict, LIMA_ZONES, getDistrictZone } from '../lib/districts.js';

export default function CategoryDirectorioClient({ businesses = [], categoryTitle = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [sortBy, setSortBy] = useState('ranking'); // 'ranking', 'rating', 'reviews', 'name'

  // Si cambia el parámetro de URL, actualizar el filtro
  useEffect(() => {
    const sync = () => setSelectedDistrict(new URLSearchParams(window.location.search).get('distrito') || 'all');
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  // Mapa de conteo por distrito en esta categoría
  const districtMap = useMemo(() => {
    const map = {};
    businesses.forEach(b => {
      const dist = extractDistrict(b.address);
      map[dist] = (map[dist] || 0) + 1;
    });
    return map;
  }, [businesses]);

  // Distritos ordenados por cantidad de negocios para las píldoras rápidas
  const topDistricts = useMemo(() => {
    return Object.entries(districtMap)
      .filter(([dist]) => dist !== 'Lima')
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [districtMap]);

  // Filtrar y ordenar negocios
  const filteredBusinesses = useMemo(() => {
    let result = businesses.filter(b => {
      const dist = extractDistrict(b.address);
      const matchesDistrict = selectedDistrict === 'all' || dist.toLowerCase() === selectedDistrict.toLowerCase();

      if (!searchQuery.trim()) return matchesDistrict;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        (b.name && b.name.toLowerCase().includes(q)) ||
        (b.address && b.address.toLowerCase().includes(q)) ||
        (b.category && b.category.toLowerCase().includes(q)) ||
        dist.toLowerCase().includes(q);

      return matchesDistrict && matchesSearch;
    });

    // Ordenamiento
    if (sortBy === 'rating') {
      result.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => (parseInt(b.reviewsCount) || 0) - (parseInt(a.reviewsCount) || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    // 'ranking' conserva el orden original auditado

    return result;
  }, [businesses, searchQuery, selectedDistrict, sortBy]);

  const activeZone = selectedDistrict !== 'all' ? getDistrictZone(selectedDistrict) : null;

  return (
    <section id="directorio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Controles de búsqueda y filtros */}
      <div className="bg-white dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900/85 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-7 shadow-xs dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] mb-8 transition-all backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Título de la sección */}
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Opciones para comparar
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-1">
              Información recogida de fuentes públicas. Confirma condiciones directamente con cada negocio.
            </p>
          </div>

          {/* Buscador de negocios en tiempo real */}
          <div className="relative w-full min-w-0 lg:max-w-sm">
            <Search className="w-4 h-4 text-sky-600 dark:text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              aria-label="Buscar negocios por nombre, distrito o dirección"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, distrito o dirección..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm font-medium text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:focus:border-sky-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Barra de Filtro de Distritos y Ordenamiento */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
          <div className="min-w-0">
            {/* Píldoras de Distritos Frecuentes */}
            <div data-testid="district-chips" className="flex min-w-0 w-full items-center gap-2 overflow-x-auto overscroll-x-contain pb-2 scrollbar-none" aria-label="Distritos frecuentes">
              <button
                onClick={() => setSelectedDistrict('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                  selectedDistrict === 'all'
                    ? 'bg-sky-600 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 text-white shadow-xs dark:shadow-[0_0_15px_rgba(14,165,233,0.35)]'
                    : 'bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 dark:border dark:border-slate-700/60 text-slate-700 dark:text-slate-200'
                }`}
              >
                Todos los distritos ({businesses.length})
              </button>

              {topDistricts.map(([dist, count]) => (
                <button
                  key={dist}
                  onClick={() => setSelectedDistrict(dist)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5 ${
                    selectedDistrict.toLowerCase() === dist.toLowerCase()
                      ? 'bg-sky-600 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 text-white shadow-xs dark:shadow-[0_0_15px_rgba(14,165,233,0.35)]'
                      : 'bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 dark:border dark:border-slate-700/60 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <MapPin className={`w-3 h-3 ${selectedDistrict.toLowerCase() === dist.toLowerCase() ? 'text-white' : 'text-rose-500 dark:text-rose-400'}`} />
                  <span>{dist}</span>
                  <span className={`text-[10px] ${selectedDistrict.toLowerCase() === dist.toLowerCase() ? 'text-sky-100' : 'text-slate-400 dark:text-slate-400'}`}>
                    ({count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selectores desplegables: Distrito Completo y Ordenamiento */}
          <div data-testid="directory-selectors" className="grid min-w-0 w-full grid-cols-1 gap-2 sm:grid-cols-2 xl:ml-auto xl:max-w-2xl">
              {/* Dropdown de todos los distritos agrupados por zonas */}
              <div className="relative min-w-0">
                <select
                  aria-label="Filtrar por distrito"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="block w-full min-w-0 truncate bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 text-xs font-bold py-2.5 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer transition-colors appearance-none"
                >
                  <option value="all">📍 Ver todos los distritos ({businesses.length})</option>
                  {Object.values(LIMA_ZONES).map(zone => {
                    const zoneDistricts = zone.districts
                      .map(d => ({ name: d, count: districtMap[d] || 0 }))
                      .filter(d => d.count > 0);

                    if (zoneDistricts.length === 0) return null;

                    const totalZoneCount = zoneDistricts.reduce((acc, curr) => acc + curr.count, 0);

                    return (
                      <optgroup key={zone.id} label={`${zone.name} (${totalZoneCount})`} className="dark:bg-slate-900">
                        {zoneDistricts.map(d => (
                          <option key={d.name} value={d.name} className="dark:bg-slate-900 dark:text-slate-200">
                            {d.name} ({d.count} negocios)
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Selector de ordenamiento */}
              <div className="relative min-w-0">
                <select
                  aria-label="Ordenar negocios"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full min-w-0 truncate bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 text-xs font-bold py-2.5 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer transition-colors appearance-none"
                >
                  <option value="ranking" className="dark:bg-slate-900">Orden del directorio</option>
                  <option value="rating" className="dark:bg-slate-900">Mayor Calificación (⭐)</option>
                  <option value="reviews" className="dark:bg-slate-900">Más Reseñas</option>
                  <option value="name" className="dark:bg-slate-900">Alfabético (A-Z)</option>
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
          </div>
        </div>
      </div>

      {/* Banner de Distrito Activo */}
      {selectedDistrict !== 'all' && (
        <div className="bg-sky-50/90 dark:bg-gradient-to-r dark:from-sky-950/60 dark:via-indigo-950/40 dark:to-slate-900/80 border border-sky-200/90 dark:border-sky-800/70 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs dark:shadow-[0_0_25px_rgba(14,165,233,0.12)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm dark:shadow-[0_0_12px_rgba(14,165,233,0.4)]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Especialistas en {selectedDistrict}</span>
                <span className="text-[11px] font-bold bg-sky-100 dark:bg-sky-900/80 text-sky-800 dark:text-sky-200 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-700">
                  {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'negocio' : 'negocios'}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5">
                Zona: <strong>{activeZone}</strong> • Consulta la fuente y los canales disponibles.
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedDistrict('all')}
            className="text-xs font-bold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-sky-100 dark:hover:bg-slate-800 border border-sky-300 dark:border-sky-700 py-1.5 px-3 rounded-xl transition-colors shrink-0 shadow-2xs"
          >
            Quitar filtro de distrito (Ver toda Lima)
          </button>
        </div>
      )}

      {/* Contador y Limpieza de Búsqueda */}
      <div className="flex flex-col items-start justify-between gap-2 mb-6 px-1 sm:flex-row sm:items-center">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Mostrando <span className="text-slate-900 dark:text-slate-100 font-extrabold">{filteredBusinesses.length}</span> de {businesses.length} especialistas
          {selectedDistrict !== 'all' && ` en ${selectedDistrict}`}
        </span>

        {(searchQuery || selectedDistrict !== 'all') && (
          <button
            onClick={() => { setSearchQuery(''); setSelectedDistrict('all'); }}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors"
          >
            Restablecer todos los filtros
          </button>
        )}
      </div>

      {/* Grid de Fichas de Negocios */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBusinesses.map((business, index) => (
            <BusinessCard
              key={business.entityId || business.url || business.id || index}
              business={business}
              rank={index + 1}
              onSelectDistrict={(dist) => setSelectedDistrict(dist)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900/95 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-200 dark:border-amber-800/60">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            No se encontraron negocios {selectedDistrict !== 'all' ? `en ${selectedDistrict}` : ''}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {selectedDistrict !== 'all'
              ? `No hay fichas para ${categoryTitle} con dirección identificada en ${selectedDistrict}. Puedes ampliar la búsqueda y confirmar la cobertura con cada proveedor.`
              : `No encontramos resultados para tu búsqueda "${searchQuery}". Prueba con otro término o limpia los filtros.`}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => { setSearchQuery(''); setSelectedDistrict('all'); }}
              className="font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-600 dark:hover:bg-sky-500 px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Ver todos los negocios de Lima ({businesses.length})
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
