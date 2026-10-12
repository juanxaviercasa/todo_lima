/**
 * Asignación de distrito por coordenadas (punto dentro de polígono).
 * Solo servidor: lee data/geo/lima-callao-distritos.json con fs para no enviar polígonos al navegador.
 * Límites: © OpenStreetMap contributors (ODbL). Regenerar con `node scripts/build-district-geo.mjs`.
 */
import fs from 'node:fs';
import path from 'node:path';

let index;

function loadIndex() {
  if (index) return index;
  const file = path.join(process.cwd(), 'data', 'geo', 'lima-callao-distritos.json');
  if (!fs.existsSync(file)) return (index = []);
  const { districts } = JSON.parse(fs.readFileSync(file, 'utf8'));
  index = districts.map(d => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const poly of d.polygons) for (const [x, y] of poly[0]) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    return { ...d, bbox: [minX, minY, maxX, maxY] };
  });
  return index;
}

function inRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function inPolygon(x, y, polygon) {
  if (!inRing(x, y, polygon[0])) return false;
  for (let h = 1; h < polygon.length; h++) if (inRing(x, y, polygon[h])) return false;
  return true;
}

/**
 * Devuelve el nombre oficial del distrito que contiene el punto, o null si cae fuera de Lima y Callao.
 */
export function districtFromCoords(lat, lng) {
  const y = Number(lat);
  const x = Number(lng);
  if (!Number.isFinite(x) || !Number.isFinite(y) || (x === 0 && y === 0)) return null;
  for (const d of loadIndex()) {
    const [minX, minY, maxX, maxY] = d.bbox;
    if (x < minX || x > maxX || y < minY || y > maxY) continue;
    if (d.polygons.some(p => inPolygon(x, y, p))) return d.name;
  }
  return null;
}

/** Ubigeo INEI del distrito, si existe en el índice. */
export function districtUbigeo(name) {
  return loadIndex().find(d => d.name === name)?.ubigeo || null;
}

/**
 * Coordenadas reales del lugar según su URL de Google Maps (`!3d<lat>!4d<lng>`).
 * No se usan los campos latitude/longitude guardados: algunos registros no extraídos
 * por el scraper traen valores de relleno (p. ej. -12.07,-77.02) que ubican mal el negocio.
 * @returns {{latitude: number, longitude: number} | null}
 */
export function mapsPlaceCoords(url) {
  const m = typeof url === 'string' && url.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  return m ? { latitude: Number(m[1]), longitude: Number(m[2]) } : null;
}
