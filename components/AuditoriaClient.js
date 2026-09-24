'use client';

import { useState, useMemo } from 'react';
import { 
  Building2, 
  Globe, 
  PhoneCall, 
  Send, 
  Copy, 
  Search, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  SlidersHorizontal,
  X,
  Sparkles,
  Zap,
  TrendingUp,
  MapPin,
  Star
} from 'lucide-react';

export default function AuditoriaClient({ initialData }) {
  const allBusinesses = initialData?.businesses || [];
  const summary = initialData?.summary || {};

  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOnly, setMobileOnly] = useState(false);
  const [selectedBiz, setSelectedBiz] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Obtener categorías únicas
  const categoriesList = useMemo(() => {
    const set = new Set(allBusinesses.map(b => b.categorySlug));
    return Array.from(set).sort();
  }, [allBusinesses]);

  // Filtrar negocios
  const filteredBusinesses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allBusinesses.filter(b => {
      if (categoryFilter && b.categorySlug !== categoryFilter) return false;
      if (statusFilter && b.proposal.status !== statusFilter) return false;
      if (mobileOnly && !b.phoneData?.isMobile) return false;
      if (q) {
        const text = `${b.name} ${b.district} ${b.categorySlug} ${b.phoneData?.raw || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [allBusinesses, categoryFilter, statusFilter, mobileOnly, searchQuery]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    showToast('¡Propuesta de WhatsApp copiada al portapapeles!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-2xl shadow-emerald-500/20 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal de Detalle */}
      {selectedBiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => setSelectedBiz(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {selectedBiz.categorySlug}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {selectedBiz.district}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">{selectedBiz.name}</h2>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>⭐ {selectedBiz.rating || '5.0'} ({selectedBiz.reviewsCount || 0} reseñas en Google Maps)</span>
            </p>

            <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm space-y-2">
              <div>
                <strong className="text-slate-300">Subdominio Sugerido Todo Lima:</strong>{' '}
                <span className="text-sky-400 font-mono font-medium">{selectedBiz.proposal.suggestedSubdomain}</span>
              </div>
              <div>
                <strong className="text-slate-300">Teléfono:</strong>{' '}
                <span className="text-slate-200">{selectedBiz.phoneData?.raw || 'No registrado'}</span>
                {selectedBiz.phoneData?.isMobile && (
                  <span className="ml-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Móvil WhatsApp Directo
                  </span>
                )}
              </div>
              <div>
                <strong className="text-slate-300">Sitio Web Actual:</strong>{' '}
                {selectedBiz.webAudit?.url ? (
                  <a href={selectedBiz.webAudit.url} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                    {selectedBiz.webAudit.url}
                  </a>
                ) : (
                  <span className="text-rose-400 font-semibold">Ninguno registrado</span>
                )}
              </div>
            </div>

            {/* Diagnóstico técnico */}
            {selectedBiz.webAudit?.issues && selectedBiz.webAudit.issues.length > 0 && (
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Fricciones y Oportunidades Detectadas</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-rose-300 bg-rose-500/5 border border-rose-500/20 p-3.5 rounded-xl">
                  {selectedBiz.webAudit.issues.map((iss, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{iss}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Propuesta de WhatsApp */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Mensaje de Prospección Directa para WhatsApp:
              </h4>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                {selectedBiz.proposal.whatsappPitch}
              </div>
            </div>

            {/* Botones de acción del Modal */}
            <div className="mt-6 flex flex-wrap gap-3">
              {selectedBiz.proposal.whatsappUrl && (
                <a
                  href={selectedBiz.proposal.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Abrir WhatsApp con Mensaje</span>
                </a>
              )}
              <button
                onClick={() => copyToClipboard(selectedBiz.proposal.whatsappPitch)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                <Copy className="w-4 h-4" />
                <span>Copiar Mensaje</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-sky-500/20">
              TL
            </div>
            <div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Auditoría Comercial & Generador de Propuestas</span>
                <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/25 px-2 py-0.5 rounded-full font-semibold">
                  38 Categorías
                </span>
              </h1>
              <p className="text-xs text-slate-400">Todo Lima (todolima.com) — Matriz de Prospección Local</p>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
            Base de datos sincronizada: <strong className="text-white">{allBusinesses.length} negocios</strong>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Total Negocios</span>
              <Building2 className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-black text-white">{summary.totalBusinesses || allBusinesses.length}</div>
            <div className="text-xs text-sky-400 mt-1 font-medium">Extraídos de Google Maps Lima</div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Sin Sitio Web</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-3xl font-black text-rose-400">{summary.noWebsite || 0}</div>
            <div className="text-xs text-rose-300 mt-1 font-medium">{summary.noWebsitePct || 93}% sin presencia web propia</div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>WhatsApp Móvil Listo</span>
              <PhoneCall className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{summary.withMobilePhone || 0}</div>
            <div className="text-xs text-emerald-300 mt-1 font-medium">Listos para prospección directa</div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Con Sitio Web</span>
              <Globe className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-indigo-400">{summary.withWebsite || 0}</div>
            <div className="text-xs text-indigo-300 mt-1 font-medium">Score Promedio: {summary.avgWebScore || 0}/100</div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-5 rounded-2xl mb-6 space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Categoría */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-3.5 py-2.5 outline-none focus:border-sky-500"
            >
              <option value="">Todas las 38 Categorías</option>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>

            {/* Estado */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-3.5 py-2.5 outline-none focus:border-sky-500"
            >
              <option value="">Todos los Estados</option>
              <option value="NEEDS_WEBSITE">Sin Página Web (Oportunidad Alta)</option>
              <option value="UPGRADE_SOCIAL">Solo Red Social (Facebook/IG)</option>
              <option value="REDESIGN_WEBSITE">Web con Fallas / Lenta</option>
              <option value="OPTIMIZE_WEBSITE">Web Buena</option>
            </select>

            {/* Buscador */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por negocio, distrito (ej. Miraflores), o teléfono..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl pl-9 pr-3.5 py-2.5 outline-none focus:border-sky-500"
              />
            </div>

            {/* Checkbox Móvil */}
            <label className="flex items-center gap-2 cursor-pointer bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2.5 rounded-xl text-emerald-300 text-xs font-semibold select-none">
              <input
                type="checkbox"
                checked={mobileOnly}
                onChange={(e) => setMobileOnly(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <span>Solo con WhatsApp Móvil 📲</span>
            </label>
          </div>
        </div>

        {/* Counter */}
        <div className="flex justify-between items-center text-xs text-slate-400 mb-4 px-1">
          <div>
            Mostrando <strong className="text-white">{filteredBusinesses.length}</strong> de <strong className="text-white">{allBusinesses.length}</strong> negocios
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBusinesses.slice(0, 120).map((b) => {
            const hasMobile = b.phoneData?.isMobile;
            const isNoWeb = b.webAudit?.type === 'NO_WEBSITE';
            const isSocial = b.webAudit?.type === 'SOCIAL_ONLY';

            return (
              <div
                key={b.id + b.name}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-white text-base leading-snug line-clamp-2">{b.name}</h3>
                    {isNoWeb ? (
                      <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        Sin Web
                      </span>
                    ) : isSocial ? (
                      <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        {b.webAudit.provider}
                      </span>
                    ) : (
                      <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/30">
                        Web {b.webAudit?.score || 0}/100
                      </span>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300">
                      {b.categorySlug}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      📍 {b.district}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      ⭐ {b.rating || '5.0'} ({b.reviewsCount || 0})
                    </span>
                    {hasMobile && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        📲 {b.phoneData.clean}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mb-3 truncate flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                    <span>{b.address || 'Lima, Perú'}</span>
                  </p>

                  {/* Mini Audit Preview */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs mb-4">
                    {isNoWeb ? (
                      <p className="text-rose-400 font-medium">
                        ❌ Sin web. Subdominio sugerido:{' '}
                        <span className="text-sky-400 font-mono text-[11px] block mt-0.5 truncate">
                          {b.proposal.suggestedSubdomain}
                        </span>
                      </p>
                    ) : isSocial ? (
                      <p className="text-amber-300 font-medium">
                        📱 Usa perfil de {b.webAudit.provider}. Oportunidad de migración a landing page propia.
                      </p>
                    ) : (
                      <p className="text-slate-300">
                        🌐 Score técnico: <strong>{b.webAudit.score}/100</strong>
                        {b.webAudit.latencyMs ? ` • ${b.webAudit.latencyMs}ms` : ''}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-slate-800/80">
                  {b.proposal.whatsappUrl ? (
                    <a
                      href={b.proposal.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                      title="Abrir chat en WhatsApp con el mensaje precargado"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-slate-800/40 text-slate-500 font-medium text-xs py-2.5 px-3 rounded-xl cursor-not-allowed"
                    >
                      Sin WhatsApp
                    </button>
                  )}

                  <button
                    onClick={() => copyToClipboard(b.proposal.whatsappPitch)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs py-2.5 px-3 rounded-xl border border-slate-700 transition"
                    title="Copiar mensaje de propuesta"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedBiz(b)}
                    className="bg-slate-800 hover:bg-slate-700 text-sky-400 font-medium text-xs py-2.5 px-3 rounded-xl border border-slate-700 transition"
                    title="Ver propuesta completa y auditoría"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBusinesses.length > 120 && (
          <div className="text-center py-10 text-sm text-slate-400">
            Mostrando los primeros 120 de {filteredBusinesses.length} resultados. Usa los filtros de categoría o búsqueda para refinar.
          </div>
        )}
      </main>
    </div>
  );
}
