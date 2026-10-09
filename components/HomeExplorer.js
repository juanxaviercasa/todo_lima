'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  X, 
  SlidersHorizontal,
  Stethoscope,
  Wrench,
  Scale,
  Car,
  PartyPopper,
  Sparkle,
  Laptop,
  Flame,
  MapPin,
  ExternalLink,
  UtensilsCrossed,
  GraduationCap,
  Dumbbell,
  Dog,
  Gift,
  Coins,
  ChevronDown,
  Compass,
  ArrowDownAZ,
  ArrowUpZA
} from 'lucide-react';
import { buildWhatsAppLink } from '../lib/contact.js';
import { LIMA_ZONES, POPULAR_DISTRICTS, getDistrictZone, extractDistrict } from '../lib/districts.js';

const NICHE_CONFIG = {
  all: { label: 'Todos los Rubros', icon: Sparkles, color: 'sky' },
  gastronomia: { label: 'Gastronomía y Comida', icon: UtensilsCrossed, color: 'orange' },
  salud: { label: 'Salud y Medicina', icon: Stethoscope, color: 'rose' },
  hogar: { label: 'Hogar y Reparaciones', icon: Wrench, color: 'amber' },
  educacion: { label: 'Educación y Manejo', icon: GraduationCap, color: 'teal' },
  fitness: { label: 'Fitness y Deportes', icon: Dumbbell, color: 'cyan' },
  eventos: { label: 'Eventos y Fiestas', icon: PartyPopper, color: 'purple' },
  belleza: { label: 'Belleza y Estilo', icon: Sparkle, color: 'pink' },
  mascotas: { label: 'Mascotas', icon: Dog, color: 'amber' },
  comercio: { label: 'Comercio y Regalos', icon: Gift, color: 'rose' },
  legal: { label: 'Legal y Notarías', icon: Scale, color: 'indigo' },
  finanzas: { label: 'Finanzas y Divisas', icon: Coins, color: 'emerald' },
  automotriz: { label: 'Automotriz y Auxilio', icon: Car, color: 'blue' },
  tecnologia: { label: 'Tecnología y Seguridad', icon: Laptop, color: 'emerald' },
};

const SPANISH_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

/**
 * Normaliza la primera letra del título para el índice alfabético (ej. Ópticas -> O)
 */
function getFirstLetter(title) {
  if (!title) return '';
  const first = title.trim().charAt(0).toUpperCase();
  return first.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default function HomeExplorer({ categories = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState('all');
  const [sortOrder, setSortOrder] = useState('az'); // 'az' (A-Z), 'za' (Z-A), 'popular'
  const [showAllDistricts, setShowAllDistricts] = useState(false);

  // Conteo de categorías disponibles por letra en el estado actual
  const letterCounts = useMemo(() => {
    const counts = {};
    categories.forEach(cat => {
      if (selectedNiche !== 'all' && cat.niche !== selectedNiche) return;
      const l = getFirstLetter(cat.title);
      counts[l] = (counts[l] || 0) + 1;
    });
    return counts;
  }, [categories, selectedNiche]);

  // Filtrado y ordenamiento reactivo en tiempo real
  const filteredCategories = useMemo(() => {
    let result = categories.filter((cat) => {
      const matchesNiche = selectedNiche === 'all' || cat.niche === selectedNiche;
      const catLetter = getFirstLetter(cat.title);
      const matchesLetter = selectedLetter === 'all' || catLetter === selectedLetter;
      
      if (!matchesNiche || !matchesLetter) return false;

      if (!searchQuery.trim()) return true;
      
      const q = searchQuery.toLowerCase().trim();
      return (
        cat.title.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q) ||
        cat.heroHook.toLowerCase().includes(q) ||
        (cat.query && cat.query.toLowerCase().includes(q))
      );
    });

    // Ordenamiento alfabético estricto o por popularidad
    if (sortOrder === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));
    } else if (sortOrder === 'za') {
      result.sort((a, b) => b.title.localeCompare(a.title, 'es', { sensitivity: 'base' }));
    }
    // 'popular' preserva el orden original auditado

    return result;
  }, [categories, searchQuery, selectedNiche, selectedLetter, sortOrder]);

  const totalReady = categories.filter(c => c.hasData).length;
  const activeZone = selectedDistrict !== 'all' ? getDistrictZone(selectedDistrict) : null;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedNiche('all');
    setSelectedDistrict('all');
    setSelectedLetter('all');
    setSortOrder('az');
  };

  const hasActiveFilters = searchQuery || selectedNiche !== 'all' || selectedDistrict !== 'all' || selectedLetter !== 'all';

  return (
    <div className="w-full">
      {/* Barra de Búsqueda Interactiva con Filtro de Distrito & Filtros Rápidos */}
      <div className="relative max-w-4xl mx-auto -mt-8 sm:-mt-10 px-4 sm:px-6 z-20">
        <div className="bg-white/95 dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/85 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-xl shadow-slate-900/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-slate-200/90 dark:border-slate-800/90 transition-all">
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            {/* Input de búsqueda por servicio o profesional */}
            <div className="relative flex-grow flex items-center">
              <Search className="w-5 h-5 text-sky-600 dark:text-sky-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué servicio o especialista necesitas? (Ej. Gasfiteros, Dentistas...)"
                className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 dark:focus:border-sky-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Selector de Distrito en el Buscador Principal */}
            <div className="relative shrink-0 sm:w-64">
              <div className="relative flex items-center h-full">
                <MapPin className="w-4 h-4 text-rose-500 absolute left-3.5 pointer-events-none z-10" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full h-full pl-9 pr-8 py-3 sm:py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100/80 dark:hover:bg-slate-750 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 cursor-pointer appearance-none transition-all shadow-2xs"
                >
                  <option value="all" className="dark:bg-slate-900">📍 Toda Lima Metropolitana</option>
                  {Object.values(LIMA_ZONES).map(zone => (
                    <optgroup key={zone.id} label={zone.name} className="dark:bg-slate-900">
                      {zone.districts.map(d => (
                        <option key={d} value={d} className="dark:bg-slate-900 dark:text-slate-200">{d}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filtros de Rubros / Píldoras con wrap */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 pb-1 text-xs font-bold">
            {Object.entries(NICHE_CONFIG).map(([key, config]) => {
              const Icon = config.icon;
              const isSelected = selectedNiche === key;
              const count = key === 'all' 
                ? categories.length 
                : categories.filter(c => c.niche === key).length;

              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedNiche(key);
                    setSelectedLetter('all');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl shrink-0 transition-all duration-200 ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 text-white shadow-sm dark:shadow-[0_0_15px_rgba(14,165,233,0.35)]'
                      : 'bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-750 dark:border dark:border-slate-700/60 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{config.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid de Directorios con Open Design */}
      <section id="directorios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 scroll-mt-20">
        {/* Banner de Distrito Seleccionado */}
        {selectedDistrict !== 'all' && (
          <div className="bg-sky-50/95 dark:bg-sky-950/40 border border-sky-200/90 dark:border-sky-800/60 rounded-3xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                  <span>Filtrando especialistas para: {selectedDistrict}</span>
                  <span className="text-xs font-bold bg-sky-200/70 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 px-2.5 py-0.5 rounded-full">
                    {activeZone}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  Las categorías abajo se encuentran ordenadas alfabéticamente para <strong>{selectedDistrict}</strong> con enlace directo a WhatsApp.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedDistrict('all')}
              className="text-xs font-extrabold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-sky-100 dark:hover:bg-slate-800 border border-sky-300 dark:border-sky-700 py-2.5 px-4 rounded-xl transition-colors shrink-0 shadow-2xs"
            >
              Quitar filtro (Ver toda Lima)
            </button>
          </div>
        )}

        {/* Cabecera de resultados con Controles de Orden Alfabético (A-Z / Z-A) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Directorios Disponibles en Lima
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {hasActiveFilters ? (
                <>Mostrando <span className="font-bold text-slate-800 dark:text-slate-200">{filteredCategories.length}</span> directorios para tu búsqueda {selectedDistrict !== 'all' ? `en ${selectedDistrict}` : ''}</>
              ) : (
                <>Explora las {categories.length} categorías sincronizadas en orden alfabético</>
              )}
            </p>
          </div>

          {/* Botones de Ordenamiento Alfabético */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs text-xs font-bold text-slate-700 dark:text-slate-300">
              <button
                onClick={() => setSortOrder('az')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  sortOrder === 'az'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Ordenar de la A a la Z"
              >
                <ArrowDownAZ className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>A → Z</span>
              </button>

              <button
                onClick={() => setSortOrder('za')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  sortOrder === 'za'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Ordenar de la Z a la A"
              >
                <ArrowUpZA className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Z → A</span>
              </button>

              <button
                onClick={() => setSortOrder('popular')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  sortOrder === 'popular'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Ordenar por mayor demanda y volumen de negocios"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Destacadas</span>
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800/60 py-2 px-3 rounded-xl transition-colors"
              >
                Restablecer filtros
              </button>
            )}
          </div>
        </div>

        {/* Barra de Abecedario Interactivo (Índice A - Z) */}
        <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/85 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 p-3 sm:p-4 mb-8 shadow-xs dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between gap-1 sm:gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedLetter('all')}
              className={`px-3 py-2 rounded-xl text-xs font-black shrink-0 transition-all ${
                selectedLetter === 'all'
                  ? 'bg-slate-900 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 text-white shadow-xs dark:shadow-[0_0_15px_rgba(14,165,233,0.35)]'
                  : 'bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 dark:border dark:border-slate-700/60'
              }`}
            >
              Todas (A-Z)
            </button>

            {SPANISH_ALPHABET.map((letter) => {
              const count = letterCounts[letter] || 0;
              const hasItems = count > 0;
              const isSelected = selectedLetter === letter;

              return (
                <button
                  key={letter}
                  disabled={!hasItems}
                  onClick={() => setSelectedLetter(isSelected ? 'all' : letter)}
                  title={hasItems ? `${count} categorías que empiezan con "${letter}"` : `Sin categorías con "${letter}"`}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-black shrink-0 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-sky-600 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 text-white shadow-md dark:shadow-[0_0_18px_rgba(14,165,233,0.4)] scale-105 ring-2 ring-sky-300 dark:ring-sky-400'
                      : hasItems
                      ? 'bg-slate-100 dark:bg-slate-800/90 hover:bg-sky-100 dark:hover:bg-sky-950/60 hover:text-sky-800 dark:hover:text-sky-300 text-slate-800 dark:text-slate-200 cursor-pointer hover:scale-105 dark:border dark:border-slate-700/60'
                      : 'bg-slate-50 dark:bg-slate-800/20 text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-35'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Banner de Letra Activa */}
          {selectedLetter !== 'all' && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-sky-500 text-white flex items-center justify-center font-black text-[11px] shadow-sm dark:shadow-[0_0_10px_rgba(14,165,233,0.4)]">
                  {selectedLetter}
                </span>
                <span>
                  Mostrando categorías que inician con <strong>"{selectedLetter}"</strong> ({filteredCategories.length} resultados)
                </span>
              </span>
              <button
                onClick={() => setSelectedLetter('all')}
                className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 underline text-xs"
              >
                Ver todas las letras
              </button>
            </div>
          )}
        </div>

        {/* Tarjetas de Directorios en Orden Alfabético */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => {
              const nicheData = NICHE_CONFIG[cat.niche] || NICHE_CONFIG.all;
              const NicheIcon = nicheData.icon;
              const categoryHref = selectedDistrict !== 'all'
                ? `/${cat.slug}?distrito=${encodeURIComponent(selectedDistrict)}`
                : `/${cat.slug}`;
              const firstLetter = getFirstLetter(cat.title);

              return (
                <Link
                  key={cat.slug}
                  href={categoryHref}
                  className="open-card bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/80 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 p-0 flex flex-col justify-between group relative overflow-hidden shadow-xs hover:border-sky-300 dark:hover:border-sky-400/60 transition-all hover:shadow-md dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_15px_35px_-5px_rgba(14,165,233,0.2)]"
                >
                  {/* Image Header */}
                  <div className="relative w-full h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={`/images/categories/${cat.slug.replace(/-/g, '_')}.webp`} 
                      alt={cat.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
                    
                    {/* Status badges absolute on top of image */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md py-1 px-2.5 rounded-lg text-slate-700 dark:text-slate-200 text-[11px] font-bold shadow-sm border border-slate-200/50 dark:border-slate-700/60">
                        <NicheIcon className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                        <span className="capitalize">{cat.niche}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Indicador de Letra Alfabética */}
                        <span className="bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-md text-white font-black text-[11px] px-2 py-1 rounded-lg border dark:border-slate-700/60">
                          {firstLetter}
                        </span>

                        {cat.hasData ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-emerald-500/90 dark:bg-emerald-500/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm dark:shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Directorio listo
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                            Próximamente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Título de la categoría */}
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                      {cat.title}
                    </h3>

                    {/* Hook persuasivo */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {cat.heroHook}
                    </p>

                    {/* Distrito Activo Badge en Card */}
                    {selectedDistrict !== 'all' && (
                      <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-rose-300 bg-sky-50 dark:bg-rose-500/15 px-2.5 py-1 rounded-xl border border-sky-200/80 dark:border-rose-500/30 dark:shadow-[0_0_10px_rgba(244,63,94,0.15)]">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        <span>Ver especialistas en {selectedDistrict}</span>
                        <ArrowRight className="w-3 h-3 text-sky-500 dark:text-rose-300" />
                      </div>
                    )}

                    {/* Mini beneficios del rubro */}
                    <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold text-slate-500 dark:text-slate-300">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>4.8+ Google</span>
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>WhatsApp Directo</span>
                      </span>
                    </div>
                  </div>

                  {/* Footer de la tarjeta con subdominio y flecha de apertura */}
                  <div className="mt-auto pt-4 pb-6 px-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      todolima.com/{cat.slug}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800/80 group-hover:bg-sky-50 dark:group-hover:bg-sky-500/20 text-slate-400 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-300 flex items-center justify-center transition-colors dark:border dark:border-slate-700/50">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/85 rounded-3xl border border-slate-200 dark:border-slate-800/90 p-12 text-center max-w-xl mx-auto my-8 shadow-sm dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-4 border border-sky-100 dark:border-sky-500/30 dark:shadow-[0_0_15px_rgba(14,165,233,0.2)]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              No encontramos directorios {selectedLetter !== 'all' ? `con la letra "${selectedLetter}"` : ''} {searchQuery ? `para "${searchQuery}"` : ''}
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Prueba cambiando la letra seleccionada, busca otro término (ej. "dentistas", "gasfiteros", "abogados") o restablece los filtros.
            </p>
            <div className="mt-6">
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center justify-center font-bold text-xs text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 px-5 py-3 rounded-xl transition-colors shadow-sm"
              >
                Ver todos los directorios en orden A-Z ({categories.length})
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Sección de Distritos Populares en Lima — Filtro Interactivo por Zona */}
      <section id="cobertura-distritos" className="bg-white dark:bg-slate-950/40 border-y border-slate-200/80 dark:border-slate-800/80 py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/15 py-1 px-3.5 rounded-full border border-sky-200 dark:border-sky-500/30 dark:shadow-[0_0_12px_rgba(14,165,233,0.2)]">
              Cobertura en Lima Metropolitana
            </span>
            <h2 className="mt-4 text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Especialistas con Cobertura en Todos los Distritos
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-500 dark:text-slate-300">
              Selecciona tu distrito para encontrar los especialistas y servicios mejor valorados cerca de ti en orden alfabético.
            </p>

            {selectedDistrict !== 'all' && (
              <div className="mt-4 inline-flex items-center gap-2 bg-sky-50 dark:bg-rose-500/15 border border-sky-200 dark:border-rose-500/30 px-4 py-2 rounded-2xl text-xs font-bold text-sky-800 dark:text-rose-200 shadow-2xs dark:shadow-[0_0_15px_rgba(244,63,94,0.18)]">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Distrito seleccionado: <strong>{selectedDistrict}</strong></span>
                <button
                  onClick={() => setSelectedDistrict('all')}
                  className="ml-2 text-rose-600 dark:text-rose-300 hover:text-rose-800 dark:hover:text-rose-100 underline font-bold"
                >
                  Quitar filtro
                </button>
              </div>
            )}
          </div>

          {/* Grid de Distritos Principales Interactivos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {POPULAR_DISTRICTS.map((dist, idx) => {
              const isSelected = selectedDistrict.toLowerCase() === dist.name.toLowerCase();
              return (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      setSelectedDistrict('all');
                    } else {
                      setSelectedDistrict(dist.name);
                      const el = document.getElementById('directorios');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`text-left rounded-2xl p-4 transition-all duration-200 group relative border cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 text-white border-sky-500 dark:border-sky-400 ring-2 ring-sky-400 shadow-md dark:shadow-[0_0_18px_rgba(14,165,233,0.35)]'
                      : 'bg-slate-50/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-850 border-slate-200/80 dark:border-slate-800/90 hover:shadow-md hover:border-sky-300 dark:hover:border-sky-500/50 dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.15)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white scale-110' : 'group-hover:scale-110'} transition-transform`} />
                      <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400'} transition-colors`}>
                        {dist.name}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <p className={`text-[11px] font-medium ${isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-400'}`}>
                    {dist.label}
                  </p>
                  <div className={`mt-2 text-[10px] font-bold ${isSelected ? 'text-white font-black' : 'text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5'} transition-transform`}>
                    {isSelected ? '✓ Distrito Activo' : 'Ver especialistas →'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Botón para expandir todos los 43 distritos por Zonas */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAllDistricts(!showAllDistricts)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 py-2.5 px-5 rounded-2xl transition-all shadow-2xs dark:shadow-md"
            >
              <Compass className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{showAllDistricts ? 'Ocultar mapa completo de distritos' : 'Explorar los 43 distritos de Lima Metropolitana por Zonas'}</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${showAllDistricts ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Desglose de los 43 distritos agrupados por Zonas */}
          {showAllDistricts && (
            <div className="mt-8 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/85 rounded-3xl border border-slate-200 dark:border-slate-800/90 p-6 sm:p-8 animate-in fade-in slide-in-from-top-2 duration-300 dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-6 text-center">
                Mapa Integral de Lima Metropolitana y Callao
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(LIMA_ZONES).map(zone => (
                  <div key={zone.id} className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs">
                    <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800/80 pb-2">
                      <h4 className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-500 dark:shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                        <span>{zone.name}</span>
                      </h4>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">{zone.description}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {zone.districts.map(d => {
                        const isSelected = selectedDistrict.toLowerCase() === d.toLowerCase();
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => {
                              setSelectedDistrict(isSelected ? 'all' : d);
                              const el = document.getElementById('directorios');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition-all ${
                              isSelected
                                ? 'bg-slate-900 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(14,165,233,0.35)]'
                                : 'bg-slate-100 dark:bg-slate-800/90 hover:bg-sky-50 dark:hover:bg-sky-950/60 hover:text-sky-700 dark:hover:text-sky-300 text-slate-700 dark:text-slate-200 dark:border dark:border-slate-700/60'
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hub de Servicios Rápidos para el Distrito Seleccionado */}
          {selectedDistrict !== 'all' && (
            <div className="mt-10 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl dark:shadow-[0_15px_40px_rgba(14,165,233,0.15)] border dark:border-slate-800">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 dark:shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                    Servicios Cercanos
                  </span>
                  <h3 className="text-lg sm:text-xl font-black mt-2">
                    Especialistas más solicitados en {selectedDistrict}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('directorios');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 underline"
                >
                  Ver todos los directorios para {selectedDistrict} ↓
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { slug: 'dentistas', label: 'Dentistas' },
                  { slug: 'doctores', label: 'Médicos y Clínicas' },
                  { slug: 'gasfiteros', label: 'Gasfiteros a Domicilio' },
                  { slug: 'abogados', label: 'Abogados & Notarías' },
                  { slug: 'veterinarias', label: 'Veterinarias' },
                  { slug: 'mecanicos', label: 'Talleres Mecánicos' },
                  { slug: 'electricistas', label: 'Electricistas' },
                  { slug: 'pediatras', label: 'Pediatras' },
                  { slug: 'psicologos', label: 'Psicólogos' },
                  { slug: 'gimnasios', label: 'Gimnasios' },
                  { slug: 'lavanderias', label: 'Lavanderías' }
                ].map(item => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}?distrito=${encodeURIComponent(selectedDistrict)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white py-2 px-3.5 rounded-xl border border-white/10 transition-colors"
                  >
                    <span>{item.label} en {selectedDistrict}</span>
                    <ArrowRight className="w-3 h-3 text-sky-400" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Showcase Visual: Sectores Más Demandados en Lima */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 py-1 px-3.5 rounded-full border border-sky-200 dark:border-sky-800/60">
              Especialidades Líderes
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Sectores Más Consultados en Lima
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Atención médica de élite y técnicos garantizados a domicilio.
            </p>
          </div>

          <Link
            href="/#directorios"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors self-start sm:self-auto"
          >
            <span>Ver todas las {categories.length} categorías</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Salud y Medicina */}
          <div className="open-card relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-sm dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/80 group flex flex-col justify-between dark:hover:border-sky-400/50">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/images/salud-feature.jpg"
                alt="Médicos y Especialistas en Lima"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-rose-500/90 text-white text-[11px] font-black px-3 py-1 rounded-xl backdrop-blur-md shadow-sm dark:shadow-[0_0_12px_rgba(244,63,94,0.35)]">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Salud & Medicina</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>4.9★ Promedio • San Isidro, Surco, Miraflores</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black leading-tight text-white">
                  Clínicas y Médicos Especialistas
                </h3>
              </div>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed max-w-sm">
                Doctores, dentistas, pediatras y dermatólogos con opiniones auditadas y citas inmediatas por WhatsApp.
              </p>

              <Link
                href={selectedDistrict !== 'all' ? `/doctores?distrito=${encodeURIComponent(selectedDistrict)}` : '/doctores'}
                className="shrink-0 inline-flex items-center gap-2 bg-slate-900 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 hover:bg-sky-600 dark:hover:from-sky-400 dark:hover:to-blue-500 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all shadow-sm dark:shadow-[0_0_18px_rgba(14,165,233,0.35)]"
              >
                <span>Ver Fichas Médicas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Hogar y Reparaciones */}
          <div className="open-card relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-sm dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/80 group flex flex-col justify-between dark:hover:border-amber-400/50">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/images/hogar-feature.jpg"
                alt="Técnicos a Domicilio en Lima"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-amber-500/90 text-white text-[11px] font-black px-3 py-1 rounded-xl backdrop-blur-md shadow-sm dark:shadow-[0_0_12px_rgba(245,158,11,0.35)]">
                <Wrench className="w-3.5 h-3.5" />
                <span>Hogar & Reparaciones</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Servicio de Emergencia 24/7 en Todo Lima</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black leading-tight text-white">
                  Técnicos y Gasfiteros a Domicilio
                </h3>
              </div>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed max-w-sm">
                Gasfiteros, electricistas, cerrajeros y técnicos de electrodomésticos con respuesta rápida en tu distrito.
              </p>

              <Link
                href={selectedDistrict !== 'all' ? `/gasfiteros?distrito=${encodeURIComponent(selectedDistrict)}` : '/gasfiteros'}
                className="shrink-0 inline-flex items-center gap-2 bg-slate-900 dark:bg-gradient-to-r dark:from-amber-500 dark:to-orange-600 hover:bg-amber-600 dark:hover:from-amber-400 dark:hover:to-orange-500 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all shadow-sm dark:shadow-[0_0_18px_rgba(245,158,11,0.35)]"
              >
                <span>Ver Técnicos Listos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: ¿Cómo funciona Todo Lima? (Open Design 3-Column con Sello 3D) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] border dark:border-slate-800">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 py-1 px-3.5 rounded-full border border-emerald-800 dark:shadow-[0_0_12px_rgba(16,185,129,0.25)]">
              Sello de Confianza Oficial
            </span>
            <h2 className="mt-4 text-2xl sm:text-4xl font-black text-white tracking-tight">
              Garantía de Auditoría Abierta en Google Maps
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
              Cada negocio listado en Todo Lima ha superado filtros de calificación, volumen de opiniones comprobadas y canales de contacto activos.
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <img
              src="/images/badge-verified.jpg"
              alt="Sello de Verificación Todo Lima"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-2xl border border-white/20 hover:scale-105 transition-transform"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/80 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 p-8 shadow-xs hover:shadow-md dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-300 dark:border dark:border-sky-500/30 dark:shadow-[0_0_12px_rgba(14,165,233,0.25)] flex items-center justify-center font-black text-xl mb-5">
              1
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">100% Datos de Google Maps</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
              Analizamos de forma automática el volumen de reseñas, antigüedad y calificaciones reales otorgadas por clientes en Lima.
            </p>
          </div>

          <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/80 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 p-8 shadow-xs hover:shadow-md dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 dark:border dark:border-emerald-500/30 dark:shadow-[0_0_12px_rgba(16,185,129,0.25)] flex items-center justify-center font-black text-xl mb-5">
              2
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Contacto Directo sin Cobros</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
              No somos un intermediario que te exige tarjetas ni datos personales. El botón de WhatsApp te conecta directo al teléfono del especialista.
            </p>
          </div>

          <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/80 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 p-8 shadow-xs hover:shadow-md dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 dark:border dark:border-indigo-500/30 dark:shadow-[0_0_12px_rgba(99,102,241,0.25)] flex items-center justify-center font-black text-xl mb-5">
              3
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Actualización Permanente</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
              Nuestros robots de Playwright auditan continuamente teléfonos, direcciones y estado de los locales en toda Lima Metropolitana.
            </p>
          </div>
        </div>
      </section>

      {/* Banner de Conversión para Negocios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-sky-400 bg-sky-950/80 py-1.5 px-3.5 rounded-full border border-sky-800">
                Directorio Oficial B2B
              </span>
              <h3 className="mt-4 text-2xl sm:text-4xl font-black text-white leading-tight">
                ¿Tienes un negocio o prestas servicios en Lima?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Aparece destacado en la red de directorios de Todo Lima y recibe consultas directas de clientes potenciales todos los días.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full lg:w-auto">
              <a
                href={buildWhatsAppLink('Hola Todo Lima, tengo un negocio en Lima y quiero publicarme en todolima.com.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all text-center"
              >
                <span>Postular mi Negocio por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#directorios"
                className="inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold text-sm py-4 px-6 rounded-2xl border border-slate-700 transition-colors text-center"
              >
                <span>Explorar las {categories.length} Categorías</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
