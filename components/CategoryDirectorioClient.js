'use client';

import { useState, useMemo } from 'react';
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
  AlertCircle
} from 'lucide-react';

const COMMON_DISTRICTS = [
  'Miraflores', 'San Isidro', 'Surco', 'Santiago de Surco', 'San Borja', 'La Molina', 
  'Barranco', 'San Miguel', 'Magdalena', 'Jesús María', 'Lince', 'Pueblo Libre', 
  'Breña', 'Cercado de Lima', 'Lima', 'Los Olivos', 'Independencia', 'San Martín de Porres', 
  'Comas', 'San Juan de Lurigancho', 'Ate', 'Santa Anita', 'Chorrillos', 'San Juan de Miraflores', 
  'Villa El Salvador', 'Callao', 'Bellavista', 'La Perla', 'Ventanilla'
];

function getDistrict(address) {
  if (!address) return 'Lima';
  for (const dist of COMMON_DISTRICTS) {
    const regex = new RegExp(`\\b${dist}\\b`, 'i');
    if (regex.test(address)) {
      return dist === 'Santiago de Surco' ? 'Surco' : dist;
    }
  }
  return 'Lima';
}

export default function CategoryDirectorioClient({ businesses = [], categoryTitle = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [sortBy, setSortBy] = useState('ranking'); // 'ranking', 'rating', 'reviews', 'name'

  // Identificar los distritos presentes en esta lista de negocios
  const districtCounts = useMemo(() => {
    const counts = {};
    businesses.forEach(b => {
      const dist = getDistrict(b.address);
      counts[dist] = (counts[dist] || 0) + 1;
    });
    // Ordenar distritos por cantidad de negocios
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [businesses]);

  // Filtrar y ordenar negocios
  const filteredBusinesses = useMemo(() => {
    let result = businesses.filter(b => {
      const dist = getDistrict(b.address);
      const matchesDistrict = selectedDistrict === 'all' || dist === selectedDistrict;

      if (!searchQuery.trim()) return matchesDistrict;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        (b.name && b.name.toLowerCase().includes(q)) ||
        (b.address && b.address.toLowerCase().includes(q)) ||
        (b.category && b.category.toLowerCase().includes(q));

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

  return (
    <section id="directorio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Controles de búsqueda y filtros con Open Design */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs mb-10 transition-all">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Título de la sección */}
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Ranking de Fichas Verificadas
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Negocios seleccionados por reputación y opiniones reales en Google Maps Lima.
            </p>
          </div>

          {/* Buscador de negocios en tiempo real */}
          <div className="relative min-w-[280px] sm:min-w-[340px]">
            <Search className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o dirección..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filtros de Distritos y Ordenamiento */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Píldoras de Distritos */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedDistrict('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                selectedDistrict === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Todos los distritos ({businesses.length})
            </button>

            {districtCounts.slice(0, 7).map(([dist, count]) => (
              <button
                key={dist}
                onClick={() => setSelectedDistrict(dist)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors flex items-center gap-1 ${
                  selectedDistrict === dist
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>{dist}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            ))}
          </div>

          {/* Selector de ordenamiento */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto text-xs font-bold text-slate-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 text-xs font-bold py-1.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer transition-colors"
            >
              <option value="ranking">Ranking Oficial Todo Lima</option>
              <option value="rating">Mayor Calificación (⭐)</option>
              <option value="reviews">Más Reseñas</option>
              <option value="name">Alfabético (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contador de resultados activos */}
      <div className="flex items-center justify-between mb-6 px-1">
        <span className="text-xs font-bold text-slate-500">
          Mostrando <span className="text-slate-900">{filteredBusinesses.length}</span> especialistas encontrados
        </span>

        {(searchQuery || selectedDistrict !== 'all') && (
          <button
            onClick={() => { setSearchQuery(''); setSelectedDistrict('all'); }}
            className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grid de Fichas de Negocios */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBusinesses.map((business, index) => (
            <BusinessCard
              key={business.id || index}
              business={business}
              rank={index + 1}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            No se encontraron resultados
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            No encontramos ningún negocio para "{searchQuery}" {selectedDistrict !== 'all' ? `en ${selectedDistrict}` : ''}.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedDistrict('all'); }}
            className="mt-5 font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-colors"
          >
            Ver todos los negocios
          </button>
        </div>
      )}
    </section>
  );
}
