import fs from 'node:fs';
import path from 'node:path';
import { getDirectory } from './directory.js';
import { LIMA_ZONES, getDistrictZone } from './districts.js';

let cachedDistritos = null;

/**
 * Carga todos los expedientes de distritos disponibles en data/distritos/*.json
 */
export function getAllDistritos() {
  if (cachedDistritos) return cachedDistritos;
  const dir = path.join(process.cwd(), 'data', 'distritos');
  if (!fs.existsSync(dir)) return [];
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  cachedDistritos = files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    return JSON.parse(raw);
  });
  return cachedDistritos;
}

/**
 * Obtiene el expediente de un distrito por su slug (ej: 'miraflores')
 */
export function getDistritoBySlug(slug) {
  if (!slug) return null;
  const list = getAllDistritos();
  return list.find(d => d.slug === slug) || null;
}

/**
 * Obtiene métricas en vivo del directorio comercial para un distrito específico:
 * - Total de negocios verificados en Todo Lima para ese distrito.
 * - Categorías con presencia y cantidad de negocios por categoría.
 * - Categorías con oportunidad (rubros vacíos o con baja cobertura).
 */
export function getDistritoDirectoryStats(districtName) {
  if (!districtName) return { totalBusinesses: 0, categories: [], opportunities: [] };

  const directory = getDirectory();
  const normalizedTarget = districtName.toLowerCase().trim();

  const categoriesWithPresence = [];
  const categoriesOpportunities = [];
  let totalBusinesses = 0;

  for (const cat of directory) {
    const matching = cat.businesses.filter(b => b.district?.toLowerCase().trim() === normalizedTarget);
    if (matching.length > 0) {
      totalBusinesses += matching.length;
      categoriesWithPresence.push({
        slug: cat.meta.slug,
        title: cat.meta.title,
        count: matching.length,
        avgRating: (
          matching.reduce((acc, curr) => acc + (parseFloat(curr.rating) || 0), 0) / matching.length
        ).toFixed(1)
      });
    } else {
      categoriesOpportunities.push({
        slug: cat.meta.slug,
        title: cat.meta.title
      });
    }
  }

  // Ordenar categorías con mayor presencia
  categoriesWithPresence.sort((a, b) => b.count - a.count);

  return {
    totalBusinesses,
    categories: categoriesWithPresence,
    opportunities: categoriesOpportunities
  };
}
