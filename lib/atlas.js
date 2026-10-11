import pillarsData from '../data/atlas/pilares.json';

/**
 * Retorna la lista completa de los 7 pilares referenciales del Atlas de Lima.
 */
export function getPillars() {
  return pillarsData;
}

/**
 * Retorna un pilar específico por su slug, o null si no existe.
 * @param {string} slug
 */
export function getPillarBySlug(slug) {
  if (!slug) return null;
  return pillarsData.find((p) => p.slug === slug) || null;
}

/**
 * Retorna todos los slugs de los pilares disponibles.
 */
export function getAllPillarSlugs() {
  return pillarsData.map((p) => p.slug);
}
