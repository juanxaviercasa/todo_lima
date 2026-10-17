import { FINANZAS_TOOLS } from './toolsData/finanzas.js';
import { OPERACIONES_TOOLS } from './toolsData/operaciones.js';
import { LEGAL_TOOLS } from './toolsData/legal.js';
import { MARKETING_TOOLS } from './toolsData/marketing.js';
import { TOOL_TUTORIAL_UPDATES } from './toolTutorialUpdates.js';

export const ALL_TOOLS = [
  ...FINANZAS_TOOLS,
  ...OPERACIONES_TOOLS,
  ...LEGAL_TOOLS,
  ...MARKETING_TOOLS
].map(tool => ({ ...tool, ...TOOL_TUTORIAL_UPDATES[tool.slug] }));

export const TOOL_CATEGORIES = [
  {
    id: 'finanzas',
    title: 'Finanzas y Rentabilidad',
    desc: 'Fija precios reales con IGV, simula sobrecostos laborales de planilla, compara cronogramas de crédito y proyecta tu flujo de caja.',
    icon: 'Calculator',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    tools: FINANZAS_TOOLS
  },
  {
    id: 'operaciones',
    title: 'Operaciones, Ventas y Logística',
    desc: 'Crea enlaces QR para WhatsApp con UTMs, cotiza fletes por peso volumétrico, emite proformas y gestiona tu pipeline comercial.',
    icon: 'Briefcase',
    iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    tools: OPERACIONES_TOOLS
  },
  {
    id: 'legal',
    title: 'Legal y Formalización',
    desc: 'Redacta contratos de servicios profesionales, acuerdos NDA, políticas de devolución y términos web conforme a la normativa peruana.',
    icon: 'Scale',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    tools: LEGAL_TOOLS
  },
  {
    id: 'marketing',
    title: 'Marketing Digital y Diseño',
    desc: 'Audita metaetiquetas SEO, optimiza fotos a WebP con marca de agua, analiza titulares persuasivos y diseña paletas accesibles.',
    icon: 'Search',
    iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    tools: MARKETING_TOOLS
  }
];

export function getAllToolSlugs() {
  return ALL_TOOLS.map(t => t.slug);
}

export function getToolBySlug(slug) {
  if (!slug) return null;
  return ALL_TOOLS.find(t => t.slug === slug) || null;
}

export function getRelatedTools(toolSlug, limit = 3) {
  const current = getToolBySlug(toolSlug);
  if (!current) return ALL_TOOLS.slice(0, limit);

  // If the tool defines explicit relatedToolSlugs, use them
  if (Array.isArray(current.relatedToolSlugs) && current.relatedToolSlugs.length > 0) {
    const explicit = current.relatedToolSlugs
      .map(s => getToolBySlug(s))
      .filter(Boolean);
    if (explicit.length >= limit) return explicit.slice(0, limit);
  }

  // Fallback to same category or other tools
  const sameCategory = ALL_TOOLS.filter(t => t.categoryId === current.categoryId && t.slug !== current.slug);
  const others = ALL_TOOLS.filter(t => t.categoryId !== current.categoryId && t.slug !== current.slug);
  return [...sameCategory, ...others].slice(0, limit);
}
