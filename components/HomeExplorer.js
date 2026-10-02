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
  ExternalLink
} from 'lucide-react';

const NICHE_CONFIG = {
  all: { label: 'Todos los Rubros', icon: Sparkles, color: 'sky' },
  salud: { label: 'Salud y Medicina', icon: Stethoscope, color: 'rose' },
  hogar: { label: 'Hogar y Reparaciones', icon: Wrench, color: 'amber' },
  legal: { label: 'Legal y Finanzas', icon: Scale, color: 'indigo' },
  automotriz: { label: 'Automotriz y Auxilio', icon: Car, color: 'blue' },
  eventos: { label: 'Eventos y Fiestas', icon: PartyPopper, color: 'purple' },
  belleza: { label: 'Belleza y Estilo', icon: Sparkle, color: 'pink' },
  tecnologia: { label: 'Tecnología y Seguridad', icon: Laptop, color: 'emerald' },
};

export default function HomeExplorer({ categories = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');

  // Filtrado reactivo en tiempo real
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesNiche = selectedNiche === 'all' || cat.niche === selectedNiche;
      
      if (!searchQuery.trim()) return matchesNiche;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        cat.title.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q) ||
        cat.heroHook.toLowerCase().includes(q) ||
        (cat.query && cat.query.toLowerCase().includes(q));

      return matchesNiche && matchesSearch;
    });
  }, [categories, searchQuery, selectedNiche]);

  const totalReady = categories.filter(c => c.hasData).length;

  return (
    <div className="w-full">
      {/* Barra de Búsqueda Interactiva & Filtros Rápidos */}
      <div className="relative max-w-4xl mx-auto -mt-8 sm:-mt-10 px-4 sm:px-6 z-20">
        <div className="bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-xl shadow-slate-900/10 border border-slate-200/90 transition-all">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-sky-600 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué servicio o especialista necesitas? (Ej. Gasfiteros, Dentistas, Notarías...)"
              className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filtros de Rubros / Píldoras Horizontales con scroll táctil */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none text-xs font-bold no-scrollbar">
            {Object.entries(NICHE_CONFIG).map(([key, config]) => {
              const Icon = config.icon;
              const isSelected = selectedNiche === key;
              const count = key === 'all' 
                ? categories.length 
                : categories.filter(c => c.niche === key).length;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedNiche(key)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl shrink-0 transition-all duration-200 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span>{config.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
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
      <section id="directorios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20">
        {/* Cabecera de resultados */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Directorios Disponibles en Lima
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {searchQuery || selectedNiche !== 'all' ? (
                <>Mostrando <span className="font-bold text-slate-800">{filteredCategories.length}</span> directorios para tu búsqueda</>
              ) : (
                <>Explora las 38 categorías sincronizadas con Google Maps</>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {(searchQuery || selectedNiche !== 'all') && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedNiche('all'); }}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 py-1.5 px-3 rounded-xl transition-colors"
              >
                Restablecer filtros
              </button>
            )}
            <div className="text-xs font-bold text-slate-600 bg-white border border-slate-200/90 py-1.5 px-3.5 rounded-xl shadow-xs">
              <span className="text-emerald-600 font-extrabold">{totalReady}</span> de {categories.length} categorías listas
            </div>
          </div>
        </div>

        {/* Tarjetas de Directorios */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => {
              const nicheData = NICHE_CONFIG[cat.niche] || NICHE_CONFIG.all;
              const NicheIcon = nicheData.icon;

              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="open-card bg-white rounded-3xl border border-slate-200/90 p-0 flex flex-col justify-between group relative overflow-hidden shadow-xs hover:border-sky-300 transition-all hover:shadow-md"
                >
                  {/* Image Header */}
                  <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={`/images/categories/${cat.slug}.webp`} 
                      alt={cat.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    
                    {/* Status badges absolute on top of image */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md py-1 px-2.5 rounded-lg text-slate-700 text-[11px] font-bold shadow-sm">
                        <NicheIcon className="w-3.5 h-3.5 text-sky-500" />
                        <span className="capitalize">{cat.niche}</span>
                      </div>

                      {cat.hasData ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Directorio listo
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-600 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                          Próximamente
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Título de la categoría */}
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {cat.title}
                    </h3>

                    {/* Hook persuasivo */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {cat.heroHook}
                    </p>

                    {/* Mini beneficios del rubro */}
                    <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>4.8+ Google</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>WhatsApp Directo</span>
                      </span>
                    </div>
                  </div>

                  {/* Footer de la tarjeta con subdominio y flecha de apertura */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-sky-600 transition-colors">
                      {cat.slug}.todolima.com
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-sky-50 text-slate-400 group-hover:text-sky-600 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-8 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-100">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              No encontramos directorios con "{searchQuery}"
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Prueba con otro término (por ejemplo: "dentistas", "gasfiteros", "abogados", "mecánicos") o restablece los filtros.
            </p>
            <div className="mt-6">
              <button
                onClick={() => { setSearchQuery(''); setSelectedNiche('all'); }}
                className="inline-flex items-center justify-center font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 px-5 py-3 rounded-xl transition-colors shadow-sm"
              >
                Ver todos los directorios (38)
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Sección de Distritos Populares en Lima (Open Design Grid) */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-50 py-1 px-3.5 rounded-full border border-sky-200">
              Cobertura en Lima Metropolitana
            </span>
            <h2 className="mt-4 text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Especialistas con Cobertura en Todos los Distritos
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-500">
              Encuentra atención rápida y servicio a domicilio en las principales zonas de la capital.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'Miraflores', label: 'Zona Central & Sur' },
              { name: 'San Isidro', label: 'Financiero & Clínicas' },
              { name: 'Santiago de Surco', label: 'Residencial Amplio' },
              { name: 'San Borja', label: 'Salud & Especialistas' },
              { name: 'La Molina', label: 'Atención a Domicilio' },
              { name: 'Magdalena del Mar', label: 'Zona Moderna' },
              { name: 'San Miguel', label: 'Comercial & Servicios' },
              { name: 'Jesús María', label: 'Zona Médica' },
              { name: 'Pueblo Libre', label: 'Tradición y Calidad' },
              { name: 'Barranco', label: 'Estilo & Arte' },
              { name: 'Los Olivos', label: 'Lima Norte Comercial' },
              { name: 'Lima Cercado', label: 'Centro Histórico & Legal' }
            ].map((dist, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200/80 p-4 transition-all duration-200 hover:shadow-md hover:border-sky-200 group"
              >
                <div className="flex items-center gap-1.5 text-rose-500 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                    {dist.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {dist.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Visual: Sectores Más Demandados en Lima */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-50 py-1 px-3.5 rounded-full border border-sky-200">
              Especialidades Líderes
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sectores Más Consultados en Lima
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Atención médica de élite y técnicos garantizados a domicilio.
            </p>
          </div>

          <Link
            href="/#directorios"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors self-start sm:self-auto"
          >
            <span>Ver todas las 38 categorías</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Salud y Medicina */}
          <div className="open-card relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white group flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/images/salud-feature.jpg"
                alt="Médicos y Especialistas en Lima"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-rose-500/90 text-white text-[11px] font-black px-3 py-1 rounded-xl backdrop-blur-md shadow-sm">
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
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                Doctores, dentistas, pediatras y dermatólogos con opiniones auditadas y citas inmediatas por WhatsApp.
              </p>

              <Link
                href="/doctores"
                className="shrink-0 inline-flex items-center gap-2 bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-colors shadow-sm"
              >
                <span>Ver Fichas Médicas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Hogar y Reparaciones */}
          <div className="open-card relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white group flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/images/hogar-feature.jpg"
                alt="Técnicos a Domicilio en Lima"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-amber-500/90 text-white text-[11px] font-black px-3 py-1 rounded-xl backdrop-blur-md shadow-sm">
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
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                Gasfiteros, electricistas, cerrajeros y técnicos de electrodomésticos con respuesta rápida en tu distrito.
              </p>

              <Link
                href="/gasfiteros"
                className="shrink-0 inline-flex items-center gap-2 bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-colors shadow-sm"
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 py-1 px-3.5 rounded-full border border-emerald-800">
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
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-black text-xl mb-5">
              1
            </div>
            <h3 className="text-lg font-black text-slate-900">100% Datos de Google Maps</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Analizamos de forma automática el volumen de reseñas, antigüedad y calificaciones reales otorgadas por clientes en Lima.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black text-xl mb-5">
              2
            </div>
            <h3 className="text-lg font-black text-slate-900">Contacto Directo sin Cobros</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              No somos un intermediario que te exige tarjetas ni datos personales. El botón de WhatsApp te conecta directo al teléfono del especialista.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-black text-xl mb-5">
              3
            </div>
            <h3 className="text-lg font-black text-slate-900">Actualización Permanente</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
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
                Aparece destacado en la red de subdominios de Todo Lima y recibe consultas directas de clientes potenciales todos los días.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full lg:w-auto">
              <a
                href="https://wa.me/51925475034?text=Hola,%20tengo%20un%20negocio%20en%20Lima%20y%20quiero%20publicarme%20en%20todolima.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all text-center"
              >
                <span>Postular mi Negocio por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/auditoria"
                className="inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold text-sm py-4 px-6 rounded-2xl border border-slate-700 transition-colors text-center"
              >
                <span>Ver Reporte de Auditoría</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
