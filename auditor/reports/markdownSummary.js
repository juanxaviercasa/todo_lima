/**
 * Generador de Resumen Ejecutivo en Markdown para Todo Lima
 */

import fs from 'fs';
import path from 'path';

export function generateMarkdownSummary(auditData, outputPath) {
  const { summary, categories } = auditData;
  const timestamp = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

  let md = `# REPORTE EJECUTIVO DE AUDITORÍA COMERCIAL — TODO LIMA
> **Fecha de ejecución:** ${timestamp}  
> **Total Categorías:** ${summary.totalCategories} | **Total Negocios Auditados:** ${summary.totalBusinesses}

---

## 📌 Métricas Clave de Oportunidad Comercial

| Métrica | Cantidad | % del Total | Interpretación Comercial |
| :--- | :---: | :---: | :--- |
| **Total Negocios Auditados** | **${summary.totalBusinesses}** | 100% | Negocios extraídos de Google Maps en Lima |
| **Sin Sitio Web (Oportunidad Máxima)** | **${summary.noWebsite}** | **${summary.noWebsitePct}%** | **Fuga masiva de clientes. Urgente propuesta web.** |
| **Solo Red Social (Facebook/IG)** | **${summary.socialOnly}** | **${summary.socialOnlyPct}%** | Dependencia de plataformas ajenas sin SEO local |
| **Con Sitio Web Propio** | **${summary.withWebsite}** | **${summary.withWebsitePct}%** | Candidatos a rediseño, optimización y afiliación |
| **Con WhatsApp Móvil Verificado** | **${summary.withMobilePhone}** | **${summary.withMobilePhonePct}%** | **Listos para prospección directa con 1 clic** |
| **Puntaje Promedio Web (0-100)** | **${summary.avgWebScore}/100** | — | Rendimiento técnico de los sitios existentes |

---

## 📊 Desglose por Categoría (Top Oportunidades de Venta)

| Categoría | Total Negocios | Sin Web (Leads) | Con WhatsApp Móvil | Web Propia | Score Promedio |
| :--- | :---: | :---: | :---: | :---: | :---: |
`;

  Object.keys(categories).sort().forEach(cat => {
    const c = categories[cat];
    md += `| **${cat}** | ${c.total} | **${c.noWebsite}** (${c.noWebsitePct}%) | 📲 **${c.withMobile}** | ${c.withWeb} | ${c.avgScore}/100 |\n`;
  });

  md += `
---

## 🎯 Plan de Acción de Prospección Comercial

1. **Fase 1: Prospección Inmediata a los ${summary.withMobilePhone} Negocios con WhatsApp Móvil:**
   - Enviar el mensaje persuasivo preconfigurado con el enlace de su subdominio sugerido en Todo Lima (ej. \`negocio.categoria.todolima.com\`).
   - Tasa de apertura esperada en WhatsApp: **85% - 95%**.
2. **Fase 2: Presentación de Maqueta Demo:**
   - Al responder positivamente, compartir el enlace dinámico en Next.js con el diseño pre-cargado de su rubro.
3. **Fase 3: Campaña de Modernización para Sitios Web Lentos:**
   - Contactar a los negocios con web propia cuyo puntaje es inferior a 65/100, compartiendo su auditoría de velocidad y ausencia de botón de WhatsApp.

---
*Generado automáticamente por el motor de auditoría de todolima.com.*
`;

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, md, 'utf-8');
  console.log(`📝 [Markdown Report] Resumen ejecutivo guardado en: ${outputPath}`);
}
