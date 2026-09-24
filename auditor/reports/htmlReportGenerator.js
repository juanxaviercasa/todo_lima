/**
 * Generador de Reporte y Dashboard Interactivo HTML para el equipo comercial de Todo Lima.
 * Permite filtrar por las 38 categorías, buscar por distrito, copiar mensajes de WhatsApp
 * y contactar a los negocios con un solo clic.
 */

import fs from 'fs';
import path from 'path';

/**
 * Genera el archivo index.html interactivo
 * @param {object} auditData Resumen completo de la auditoría
 * @param {string} outputPath Ruta destino del archivo HTML
 */
export function generateHtmlReport(auditData, outputPath) {
  const jsonData = JSON.stringify(auditData);

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo Lima - Auditoría Comercial & Generador de Propuestas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(18, 24, 38, 0.7);
      --card-border: rgba(255, 255, 255, 0.08);
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --success: #10b981;
      --success-bg: rgba(16, 185, 129, 0.12);
      --warning: #f59e0b;
      --warning-bg: rgba(245, 158, 11, 0.12);
      --danger: #ef4444;
      --danger-bg: rgba(239, 68, 68, 0.12);
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --whatsapp: #25D366;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 24px;
      line-height: 1.5;
    }

    /* Container */
    .container {
      max-width: 1440px;
      margin: 0 auto;
    }

    /* Header */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--card-border);
      flex-wrap: wrap;
      gap: 16px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-logo {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 22px;
      box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
    }

    .brand-title h1 {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(to right, #fff, #93c5fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .brand-title p {
      font-size: 13px;
      color: var(--text-muted);
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.25);
      border-radius: 9999px;
      font-size: 13px;
      color: #93c5fd;
      font-weight: 600;
    }

    /* KPI Cards */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }

    .kpi-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      backdrop-filter: blur(12px);
      transition: transform 0.2s, border-color 0.2s;
    }

    .kpi-card:hover {
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.18);
    }

    .kpi-label {
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 500;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .kpi-value {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .kpi-sub {
      font-size: 12px;
      margin-top: 4px;
      font-weight: 600;
    }

    /* Filters Bar */
    .controls-panel {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 24px;
      backdrop-filter: blur(12px);
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
    }

    .filters-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      flex: 1;
    }

    .control-select, .search-input {
      background: rgba(10, 15, 26, 0.8);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      color: #fff;
      padding: 10px 14px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }

    .control-select:focus, .search-input:focus {
      border-color: var(--primary);
    }

    .search-input {
      min-width: 260px;
      flex: 1;
    }

    .checkbox-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      cursor: pointer;
      user-select: none;
      padding: 10px 14px;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 10px;
      color: #6ee7b7;
      font-weight: 600;
    }

    .checkbox-pill input {
      accent-color: var(--whatsapp);
      cursor: pointer;
      width: 16px;
      height: 16px;
    }

    /* Business Grid / Cards */
    .results-count {
      font-size: 14px;
      color: var(--text-muted);
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .biz-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 18px;
    }

    .biz-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .biz-card:hover {
      border-color: rgba(59, 130, 246, 0.4);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transform: translateY(-2px);
    }

    .biz-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }

    .biz-name {
      font-size: 17px;
      font-weight: 700;
      color: #fff;
      line-height: 1.3;
    }

    .biz-meta {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .badge-category { background: rgba(59, 130, 246, 0.15); color: #93c5fd; }
    .badge-district { background: rgba(139, 92, 246, 0.15); color: #c4b5fd; }
    .badge-rating { background: rgba(245, 158, 11, 0.15); color: #fcd34d; }
    .badge-critical { background: var(--danger-bg); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }
    .badge-high { background: var(--warning-bg); color: #fde047; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-ok { background: var(--success-bg); color: #86efac; border: 1px solid rgba(16, 185, 129, 0.3); }

    .biz-address {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Web Audit Block */
    .audit-status-box {
      background: rgba(10, 15, 26, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 16px;
      font-size: 13px;
    }

    .audit-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .audit-issues {
      color: #f87171;
      font-size: 12px;
      list-style: none;
      margin-top: 6px;
    }

    .audit-issues li {
      margin-bottom: 4px;
      display: flex;
      align-items: flex-start;
      gap: 4px;
    }

    /* Actions Footer */
    .biz-actions {
      display: flex;
      gap: 8px;
      margin-top: auto;
      padding-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      font-family: inherit;
      flex: 1;
    }

    .btn-whatsapp {
      background: #25D366;
      color: #052e16;
    }

    .btn-whatsapp:hover {
      background: #22c55e;
      transform: translateY(-1px);
    }

    .btn-copy {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      border: 1px solid var(--card-border);
    }

    .btn-copy:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .btn-details {
      background: transparent;
      color: #93c5fd;
      border: 1px solid rgba(59, 130, 246, 0.3);
      flex: 0 0 auto;
      padding: 10px 12px;
    }

    .btn-details:hover {
      background: rgba(59, 130, 246, 0.15);
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      max-width: 700px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 28px;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #fff;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .proposal-box {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      white-space: pre-wrap;
      color: #cbd5e1;
      margin-top: 14px;
      line-height: 1.6;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #10b981;
      color: #064e3b;
      padding: 12px 20px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 14px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 2000;
    }

    .toast.show {
      transform: translateY(0);
      opacity: 1;
    }
  </style>
</head>
<body>

<div class="container">
  <!-- Header -->
  <header>
    <div class="brand">
      <div class="brand-logo">TL</div>
      <div class="brand-title">
        <h1>Todo Lima — Auditoría Comercial & Generador de Propuestas</h1>
        <p>Motor de análisis de 38 categorías de Lima Metropolitana (todolima.com)</p>
      </div>
    </div>
    <div class="header-badge">
      <span>●</span> 38 Categorías Auditadas
    </div>
  </header>

  <!-- KPI Cards -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-label">Total Negocios Auditados <span>🏢</span></div>
      <div class="kpi-value" id="kpi-total">0</div>
      <div class="kpi-sub" style="color: #60a5fa;">Top rankings de Google Maps</div>
    </div>

    <div class="kpi-card">
      <div class="kpi-label">Sin Sitio Web (Oportunidad) <span>🚀</span></div>
      <div class="kpi-value" id="kpi-no-web" style="color: #f87171;">0</div>
      <div class="kpi-sub" id="kpi-no-web-pct" style="color: #fca5a5;">0% sin presencia propia</div>
    </div>

    <div class="kpi-card">
      <div class="kpi-label">Con WhatsApp Móvil Verificado <span>📲</span></div>
      <div class="kpi-value" id="kpi-whatsapp" style="color: #4ade80;">0</div>
      <div class="kpi-sub" style="color: #86efac;">Listos para prospección directa</div>
    </div>

    <div class="kpi-card">
      <div class="kpi-label">Con Sitio Web Propio <span>🌐</span></div>
      <div class="kpi-value" id="kpi-web" style="color: #38bdf8;">0</div>
      <div class="kpi-sub" id="kpi-score-avg" style="color: #7dd3fc;">Puntaje promedio: 0/100</div>
    </div>
  </div>

  <!-- Filters Panel -->
  <div class="controls-panel">
    <div class="filters-group">
      <!-- Categoria -->
      <select id="filter-category" class="control-select">
        <option value="">Todas las 38 Categorías</option>
      </select>

      <!-- Estado -->
      <select id="filter-status" class="control-select">
        <option value="">Todos los Estados</option>
        <option value="NEEDS_WEBSITE">Sin Página Web (Oportunidad Alta)</option>
        <option value="UPGRADE_SOCIAL">Solo Red Social (Facebook/Instagram)</option>
        <option value="REDESIGN_WEBSITE">Web con Fallas / Lenta (< 65 pts)</option>
        <option value="OPTIMIZE_WEBSITE">Web Buena (>= 65 pts)</option>
      </select>

      <!-- Buscador -->
      <input type="text" id="search-input" class="search-input" placeholder="Buscar por negocio, distrito (ej. Miraflores), o teléfono...">

      <!-- Checkbox WhatsApp -->
      <label class="checkbox-pill">
        <input type="checkbox" id="filter-mobile-only">
        <span>Solo con WhatsApp Móvil 📲</span>
      </label>
    </div>
  </div>

  <!-- Results Count -->
  <div class="results-count">
    <div>Mostrando <strong id="displayed-count">0</strong> de <strong id="total-count">0</strong> negocios filtrados</div>
    <div id="stats-badge" style="font-size: 13px; color: #94a3b8;"></div>
  </div>

  <!-- Business Cards Grid -->
  <div class="biz-grid" id="biz-container"></div>
</div>

<!-- Modal Detalle / Propuesta -->
<div class="modal-overlay" id="modal-overlay">
  <div class="modal-card">
    <button class="modal-close" onclick="closeModal()">&times;</button>
    <div id="modal-content"></div>
  </div>
</div>

<!-- Toast -->
<div class="toast" id="toast">¡Mensaje de propuesta copiado al portapapeles!</div>

<script>
  // Inyección de datos desde el auditor
  const DATA = ${jsonData};

  let allBusinesses = [];
  
  // Normalizar array plano
  if (DATA.businesses && Array.isArray(DATA.businesses)) {
    allBusinesses = DATA.businesses;
  } else if (DATA.categories) {
    Object.keys(DATA.categories).forEach(cat => {
      const items = DATA.categories[cat].businesses || [];
      allBusinesses.push(...items);
    });
  }

  // Poblar KPIs
  const total = allBusinesses.length;
  const noWeb = allBusinesses.filter(b => b.webAudit.type === 'NO_WEBSITE' || b.webAudit.type === 'INVALID_URL').length;
  const withWhatsApp = allBusinesses.filter(b => b.phoneData.isMobile).length;
  const withWeb = allBusinesses.filter(b => b.webAudit.type === 'CUSTOM_WEBSITE' || b.webAudit.type === 'FREE_PLATFORM').length;
  
  const scoredWebs = allBusinesses.filter(b => b.webAudit.tested && b.webAudit.score > 0);
  const avgScore = scoredWebs.length ? Math.round(scoredWebs.reduce((a, b) => a + b.webAudit.score, 0) / scoredWebs.length) : 0;

  document.getElementById('kpi-total').textContent = total.toLocaleString();
  document.getElementById('kpi-no-web').textContent = noWeb.toLocaleString();
  document.getElementById('kpi-no-web-pct').textContent = total ? Math.round((noWeb / total) * 100) + '% del total' : '0%';
  document.getElementById('kpi-whatsapp').textContent = withWhatsApp.toLocaleString();
  document.getElementById('kpi-web').textContent = withWeb.toLocaleString();
  document.getElementById('kpi-score-avg').textContent = 'Puntaje promedio: ' + avgScore + '/100';
  document.getElementById('total-count').textContent = total.toLocaleString();

  // Poblar select de categorías
  const categorySet = new Set(allBusinesses.map(b => b.categorySlug));
  const categorySelect = document.getElementById('filter-category');
  Array.from(categorySet).sort().forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ');
    categorySelect.appendChild(opt);
  });

  // Renderizar Tarjetas
  function renderBusinesses() {
    const catVal = document.getElementById('filter-category').value;
    const statusVal = document.getElementById('filter-status').value;
    const searchVal = document.getElementById('search-input').value.toLowerCase().trim();
    const mobileOnly = document.getElementById('filter-mobile-only').checked;

    const filtered = allBusinesses.filter(b => {
      if (catVal && b.categorySlug !== catVal) return false;
      if (statusVal && b.proposal.status !== statusVal) return false;
      if (mobileOnly && !b.phoneData.isMobile) return false;
      if (searchVal) {
        const text = (b.name + ' ' + b.district + ' ' + b.categorySlug + ' ' + (b.phoneData.raw || '')).toLowerCase();
        if (!text.includes(searchVal)) return false;
      }
      return true;
    });

    document.getElementById('displayed-count').textContent = filtered.length.toLocaleString();

    const container = document.getElementById('biz-container');
    container.innerHTML = '';

    const displaySlice = filtered.slice(0, 150); // Límite de renderizado para máxima fluidez

    displaySlice.forEach((b, idx) => {
      const card = document.createElement('div');
      card.className = 'biz-card';

      // Badge de prioridad / estado
      let statusBadge = '';
      if (b.proposal.status === 'NEEDS_WEBSITE') {
        statusBadge = '<span class="badge badge-critical">Sin Web (Oportunidad)</span>';
      } else if (b.proposal.status === 'UPGRADE_SOCIAL') {
        statusBadge = '<span class="badge badge-high">Solo ' + (b.webAudit.provider || 'Red Social') + '</span>';
      } else if (b.proposal.status === 'REDESIGN_WEBSITE') {
        statusBadge = '<span class="badge badge-high">Web ' + b.webAudit.score + '/100</span>';
      } else {
        statusBadge = '<span class="badge badge-ok">Web ' + b.webAudit.score + '/100</span>';
      }

      // Detalle de auditoría
      let auditDetailHtml = '';
      if (b.webAudit.type === 'NO_WEBSITE') {
        auditDetailHtml = \`
          <div class="audit-status-box">
            <div class="audit-title" style="color: #f87171;">
              <span>❌ Sin página web oficial</span>
              <span>Subdominio: \${b.proposal.suggestedSubdomain}</span>
            </div>
            <p style="font-size: 12px; color: #94a3b8;">Fuga de clientes hacia competidores con botón de WhatsApp.</p>
          </div>
        \`;
      } else if (b.webAudit.type === 'SOCIAL_ONLY') {
        auditDetailHtml = \`
          <div class="audit-status-box">
            <div class="audit-title" style="color: #fbbf24;">
              <span>📱 Usa perfil de \${b.webAudit.provider}</span>
            </div>
            <p style="font-size: 12px; color: #94a3b8;">Requiere migración a landing page propia para elevar conversión.</p>
          </div>
        \`;
      } else {
        const issuesPreview = b.webAudit.issues.slice(0, 2).map(i => '<li>⚠️ ' + i + '</li>').join('');
        auditDetailHtml = \`
          <div class="audit-status-box">
            <div class="audit-title" style="color: \${b.webAudit.score >= 65 ? '#4ade80' : '#f87171'};">
              <span>🌐 Web Score: \${b.webAudit.score}/100</span>
              <span style="font-size: 11px; color: #94a3b8;">\${b.webAudit.latencyMs ? b.webAudit.latencyMs + 'ms' : ''}</span>
            </div>
            <ul class="audit-issues">\${issuesPreview}</ul>
          </div>
        \`;
      }

      // Botón WhatsApp
      let whatsappBtnHtml = '';
      if (b.proposal.whatsappUrl) {
        whatsappBtnHtml = \`
          <a href="\${b.proposal.whatsappUrl}" target="_blank" class="btn btn-whatsapp" title="Abrir chat en WhatsApp con el mensaje precargado">
            <span>💬 Abrir WhatsApp</span>
          </a>
        \`;
      } else {
        whatsappBtnHtml = \`
          <button class="btn" style="background: rgba(255,255,255,0.05); color: #64748b; cursor: not-allowed;" title="No tiene celular móvil registrado">
            Sin WhatsApp
          </button>
        \`;
      }

      card.innerHTML = \`
        <div>
          <div class="biz-header">
            <h3 class="biz-name">\${b.name}</h3>
            \${statusBadge}
          </div>

          <div class="biz-meta">
            <span class="badge badge-category">\${b.categorySlug}</span>
            <span class="badge badge-district">\${b.district}</span>
            <span class="badge badge-rating">⭐ \${b.rating || '5.0'} (\${b.reviewsCount || 0})</span>
            \${b.phoneData.isMobile ? '<span class="badge" style="background: rgba(37,211,102,0.15); color: #86efac;">Móvil: ' + b.phoneData.clean + '</span>' : ''}
          </div>

          <div class="biz-address">
            <span>📍</span>
            <span>\${b.address || 'Lima, Perú'}</span>
          </div>

          \${auditDetailHtml}
        </div>

        <div class="biz-actions">
          \${whatsappBtnHtml}
          <button class="btn btn-copy" onclick="copyPitch(\${idx})" title="Copiar mensaje de propuesta para WhatsApp">
            📋 Copiar
          </button>
          <button class="btn btn-details" onclick="openDetails(\${idx})" title="Ver propuesta completa y auditoría">
            🔍
          </button>
        </div>
      \`;

      container.appendChild(card);
    });

    if (filtered.length > 150) {
      const more = document.createElement('div');
      more.style.gridColumn = '1 / -1';
      more.style.textAlign = 'center';
      more.style.padding = '20px';
      more.style.color = '#94a3b8';
      more.textContent = 'Mostrando los primeros 150 de ' + filtered.length + ' negocios. Afina tus filtros para ver el resto.';
      container.appendChild(more);
    }
  }

  // Event Listeners
  document.getElementById('filter-category').addEventListener('change', renderBusinesses);
  document.getElementById('filter-status').addEventListener('change', renderBusinesses);
  document.getElementById('search-input').addEventListener('input', renderBusinesses);
  document.getElementById('filter-mobile-only').addEventListener('change', renderBusinesses);

  // Copiar Pitch
  window.copyPitch = function(idx) {
    const biz = allBusinesses[idx];
    if (!biz) return;
    navigator.clipboard.writeText(biz.proposal.whatsappPitch).then(() => {
      showToast('¡Propuesta para WhatsApp copiada al portapapeles!');
    });
  };

  // Abrir Modal
  window.openDetails = function(idx) {
    const b = allBusinesses[idx];
    if (!b) return;

    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    let auditList = '';
    if (b.webAudit.issues && b.webAudit.issues.length) {
      auditList = '<h4>Fricciones y Oportunidades Detectadas:</h4><ul style="margin: 8px 0 16px 20px; color: #f87171;">' +
        b.webAudit.issues.map(i => '<li>' + i + '</li>').join('') + '</ul>';
    }

    content.innerHTML = \`
      <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 6px; color: #fff;">\${b.name}</h2>
      <p style="color: #94a3b8; font-size: 13px; margin-bottom: 16px;">
        \${b.categorySlug.toUpperCase()} en \${b.district} • ⭐ \${b.rating} (\${b.reviewsCount} opiniones)
      </p>

      <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 12px; margin-bottom: 16px;">
        <p><strong>Subdominio Sugerido Todo Lima:</strong> <code style="color: #93c5fd;">\${b.proposal.suggestedSubdomain}</code></p>
        <p style="margin-top: 4px;"><strong>Teléfono:</strong> \${b.phoneData.raw || 'No registrado'} \${b.phoneData.isMobile ? '(WhatsApp Móvil Directo ✅)' : ''}</p>
        <p style="margin-top: 4px;"><strong>Web Actual:</strong> \${b.webAudit.url ? '<a href="' + b.webAudit.url + '" target="_blank" style="color: #38bdf8;">' + b.webAudit.url + '</a>' : 'Ninguna'}</p>
      </div>

      \${auditList}

      <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin-top: 16px;">Mensaje de Prospección para WhatsApp:</h3>
      <div class="proposal-box">\${b.proposal.whatsappPitch}</div>

      <div style="display: flex; gap: 10px; margin-top: 20px;">
        \${b.proposal.whatsappUrl ? '<a href="' + b.proposal.whatsappUrl + '" target="_blank" class="btn btn-whatsapp">Abrir WhatsApp con Mensaje</a>' : ''}
        <button class="btn btn-copy" onclick="copyPitch(\${idx})">Copiar Mensaje</button>
      </div>
    \`;

    modal.classList.add('active');
  };

  window.closeModal = function() {
    document.getElementById('modal-overlay').classList.remove('active');
  };

  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  });

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // Render inicial
  renderBusinesses();
</script>

</body>
</html>`;

  // Asegurar que exista la carpeta
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, html, 'utf-8');
  console.log(`📊 [HTML Report] Dashboard generado exitosamente en: ${outputPath}`);
}
