import fs from 'fs';
import path from 'path';
import { CATEGORIES, getCategoryBySlug } from '../scraper/config/categories.js';

/**
 * Obtiene la información de una categoría específica y sus negocios desde el archivo JSON
 */
export function getCategoryData(slug) {
  const meta = getCategoryBySlug(slug) || {
    slug,
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} en Lima`,
    niche: 'servicios',
    query: `${slug} en Lima`,
    heroHook: `Encuentra a los mejores especialistas y negocios de ${slug} en Lima con valoraciones comprobadas y atención directa.`
  };

  const dataPath = path.join(process.cwd(), 'data', `${slug}.json`);

  let businesses = [];
  let pageContent = null;
  let updatedAt = null;
  let totalResults = 0;

  if (fs.existsSync(dataPath)) {
    try {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      businesses = parsed.businesses || [];
      pageContent = parsed.pageContent || null;
      updatedAt = parsed.updatedAt || null;
      totalResults = parsed.totalResults || businesses.length;
    } catch (err) {
      console.error(`Error leyendo JSON para ${slug}:`, err);
    }
  }

  return {
    meta,
    businesses,
    pageContent,
    updatedAt,
    totalResults,
    hasData: businesses.length > 0
  };
}

/**
 * Lista todas las categorías con el estado de su archivo JSON
 */
export function getAllCategoriesWithStatus() {
  return CATEGORIES.map(cat => {
    const dataPath = path.join(process.cwd(), 'data', `${cat.slug}.json`);
    const hasData = fs.existsSync(dataPath);
    return {
      ...cat,
      hasData
    };
  });
}
