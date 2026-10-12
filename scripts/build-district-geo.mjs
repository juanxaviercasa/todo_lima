// Genera data/geo/lima-callao-distritos.json con límites distritales de OpenStreetMap (Nominatim).
// Uso: node scripts/build-district-geo.mjs
// Datos © OpenStreetMap contributors (ODbL). Respeta la política de uso de Nominatim: 1 petición/seg.
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'data', 'geo', 'lima-callao-distritos.json');
const UA = 'TodoLima/1.0 (https://todolima.com; contacto@todolima.com)';

// ubigeo INEI -> [nombre oficial Todo Lima, consulta Nominatim]
const DISTRICTS = {
  '150101': ['Cercado de Lima', 'Lima, Provincia de Lima'], '150102': ['Ancón', 'Ancón'], '150103': ['Ate', 'Ate'],
  '150104': ['Barranco', 'Barranco'], '150105': ['Breña', 'Breña'], '150106': ['Carabayllo', 'Carabayllo'],
  '150107': ['Chaclacayo', 'Chaclacayo'], '150108': ['Chorrillos', 'Chorrillos'], '150109': ['Cieneguilla', 'Cieneguilla'],
  '150110': ['Comas', 'Comas'], '150111': ['El Agustino', 'El Agustino'], '150112': ['Independencia', 'Independencia'],
  '150113': ['Jesús María', 'Jesús María'], '150114': ['La Molina', 'La Molina'], '150115': ['La Victoria', 'La Victoria'],
  '150116': ['Lince', 'Lince'], '150117': ['Los Olivos', 'Los Olivos'], '150118': ['Lurigancho-Chosica', 'Lurigancho'],
  '150119': ['Lurín', 'Lurín'], '150120': ['Magdalena del Mar', 'Magdalena del Mar'], '150121': ['Pueblo Libre', 'Pueblo Libre'],
  '150122': ['Miraflores', 'Miraflores'], '150123': ['Pachacámac', 'Pachacámac'], '150124': ['Pucusana', 'Pucusana'],
  '150125': ['Puente Piedra', 'Puente Piedra'], '150126': ['Punta Hermosa', 'Punta Hermosa'], '150127': ['Punta Negra', 'Punta Negra'],
  '150128': ['Rímac', 'Rímac'], '150129': ['San Bartolo', 'San Bartolo'], '150130': ['San Borja', 'San Borja'],
  '150131': ['San Isidro', 'San Isidro'], '150132': ['San Juan de Lurigancho', 'San Juan de Lurigancho'],
  '150133': ['San Juan de Miraflores', 'San Juan de Miraflores'], '150134': ['San Luis', 'San Luis'],
  '150135': ['San Martín de Porres', 'San Martín de Porres'], '150136': ['San Miguel', 'San Miguel'],
  '150137': ['Santa Anita', 'Santa Anita'], '150138': ['Santa María del Mar', 'Santa María del Mar'],
  '150139': ['Santa Rosa', 'Santa Rosa'], '150140': ['Santiago de Surco', 'Santiago de Surco'], '150141': ['Surquillo', 'Surquillo'],
  '150142': ['Villa El Salvador', 'Villa El Salvador'], '150143': ['Villa María del Triunfo', 'Villa María del Triunfo'],
  '070101': ['Callao', 'Callao, Provincia Constitucional del Callao'], '070102': ['Bellavista', 'Bellavista, Callao'],
  '070103': ['Carmen de la Legua', 'Carmen de la Legua Reynoso'], '070104': ['La Perla', 'La Perla, Callao'],
  '070105': ['La Punta', 'La Punta, Callao'], '070106': ['Ventanilla', 'Ventanilla'], '070107': ['Mi Perú', 'Mi Perú']
};

const sleep = ms => new Promise(r => setTimeout(r, ms));
const round = c => typeof c[0] === 'number' ? [Number(c[0].toFixed(5)), Number(c[1].toFixed(5))] : c.map(round);

async function fetchDistrict(query, province) {
  const params = new URLSearchParams({
    q: `${query}, ${province}, Perú`, format: 'jsonv2', polygon_geojson: '1', polygon_threshold: '0.0002',
    countrycodes: 'pe', limit: '10', addressdetails: '1'
  });
  const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const results = await res.json();
  return results.find(r => r.category === 'boundary' && r.type === 'administrative'
    && ['Polygon', 'MultiPolygon'].includes(r.geojson?.type)
    && ['city_district', 'suburb', 'municipality', 'city', 'town', 'village', 'county', 'district'].includes(r.addresstype));
}

const districts = [];
const failed = [];
for (const [ubigeo, [name, query]] of Object.entries(DISTRICTS)) {
  const province = ubigeo.startsWith('07') ? 'Callao' : 'Lima';
  try {
    const hit = await fetchDistrict(query, province);
    if (!hit) { failed.push(name); console.warn('✗', name); }
    else {
      const polys = hit.geojson.type === 'Polygon' ? [hit.geojson.coordinates] : hit.geojson.coordinates;
      districts.push({ ubigeo, name, osm: `${hit.osm_type}/${hit.osm_id}`, polygons: round(polys) });
      console.log('✓', name, `(${hit.addresstype}, ${hit.osm_type}/${hit.osm_id})`);
    }
  } catch (e) { failed.push(name); console.warn('✗', name, e.message); }
  await sleep(1200);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({
  source: 'Límites distritales de OpenStreetMap vía Nominatim. © OpenStreetMap contributors, ODbL 1.0.',
  generatedAt: new Date().toISOString().slice(0, 10),
  districts
}));
console.log(`\nDistritos: ${districts.length}/50 | Fallidos: ${failed.join(', ') || 'ninguno'}`);
console.log('Escrito', OUT, (fs.statSync(OUT).size / 1024).toFixed(0), 'KB');
