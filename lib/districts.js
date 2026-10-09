/**
 * Inteligencia Geográfica y Clasificación de Distritos para Todo Lima (todolima.com).
 * Cobertura de los 43 distritos de Lima Metropolitana + Callao.
 */

export const LIMA_ZONES = {
  top: {
    id: 'top',
    name: 'Lima Top',
    description: 'Residencial, corporativo y alta demanda',
    districts: ['Miraflores', 'San Isidro', 'Santiago de Surco', 'San Borja', 'La Molina', 'Barranco']
  },
  moderna: {
    id: 'moderna',
    name: 'Lima Moderna',
    description: 'Comercial, salud y servicios consolidados',
    districts: ['Jesús María', 'Magdalena del Mar', 'Lince', 'Pueblo Libre', 'San Miguel', 'Surquillo']
  },
  centro: {
    id: 'centro',
    name: 'Lima Centro',
    description: 'Histórico, legal y mayorista',
    districts: ['Cercado de Lima', 'Breña', 'La Victoria', 'Rímac']
  },
  norte: {
    id: 'norte',
    name: 'Lima Norte',
    description: 'Polo comercial e industrial',
    districts: ['Los Olivos', 'San Martín de Porres', 'Comas', 'Independencia', 'Carabayllo', 'Puente Piedra', 'Ancón', 'Santa Rosa']
  },
  este: {
    id: 'este',
    name: 'Lima Este',
    description: 'Gran población y emprendimientos',
    districts: ['San Juan de Lurigancho', 'Ate', 'Santa Anita', 'El Agustino', 'Chaclacayo', 'Lurigancho-Chosica', 'Cieneguilla']
  },
  sur: {
    id: 'sur',
    name: 'Lima Sur',
    description: 'Comercio, talleres y balnearios',
    districts: ['Chorrillos', 'San Juan de Miraflores', 'Villa María del Triunfo', 'Villa El Salvador', 'Lurín', 'Pachacámac', 'San Bartolo', 'Punta Hermosa', 'Punta Negra', 'Santa María del Mar', 'Pucusana']
  },
  callao: {
    id: 'callao',
    name: 'Callao & Puertos',
    description: 'Provincia constitucional',
    districts: ['Callao', 'Bellavista', 'La Perla', 'La Punta', 'Carmen de la Legua', 'Ventanilla', 'Mi Perú']
  }
};

/**
 * Distritos más consultados para acceso directo en cabeceras y píldoras rápidas
 */
export const POPULAR_DISTRICTS = [
  { name: 'Miraflores', zone: 'Lima Top', label: 'Zona Turística & Salud' },
  { name: 'San Isidro', zone: 'Lima Top', label: 'Financiero & Clínicas' },
  { name: 'Santiago de Surco', zone: 'Lima Top', label: 'Residencial Amplio' },
  { name: 'San Borja', zone: 'Lima Top', label: 'Salud & Especialistas' },
  { name: 'La Molina', zone: 'Lima Top', label: 'Atención a Domicilio' },
  { name: 'Jesús María', zone: 'Lima Moderna', label: 'Zona Médica Central' },
  { name: 'Magdalena del Mar', zone: 'Lima Moderna', label: 'Zona Moderna & Mar' },
  { name: 'San Miguel', zone: 'Lima Moderna', label: 'Comercial & Costanera' },
  { name: 'Lince', zone: 'Lima Moderna', label: 'Central & Negocios' },
  { name: 'Pueblo Libre', zone: 'Lima Moderna', label: 'Tradición y Calidad' },
  { name: 'Barranco', zone: 'Lima Top', label: 'Estilo & Arte' },
  { name: 'Los Olivos', zone: 'Lima Norte', label: 'Lima Norte Comercial' },
  { name: 'San Martín de Porres', zone: 'Lima Norte', label: 'Servicios & Talleres' },
  { name: 'San Juan de Lurigancho', zone: 'Lima Este', label: 'Gran Comercio Este' },
  { name: 'Ate', zone: 'Lima Este', label: 'Industrial & Servicios' },
  { name: 'Cercado de Lima', zone: 'Lima Centro', label: 'Centro Histórico & Legal' }
];

/**
 * Mapa de normalización de cadenas de texto y alias comunes
 */
const DISTRICT_ALIAS_MAP = {
  'miraflores': 'Miraflores',
  'san isidro': 'San Isidro',
  'santiago de surco': 'Santiago de Surco',
  'surco': 'Santiago de Surco',
  'san borja': 'San Borja',
  'la molina': 'La Molina',
  'barranco': 'Barranco',
  'jesus maria': 'Jesús María',
  'jesús maría': 'Jesús María',
  'lince': 'Lince',
  'magdalena del mar': 'Magdalena del Mar',
  'magdalena': 'Magdalena del Mar',
  'pueblo libre': 'Pueblo Libre',
  'san miguel': 'San Miguel',
  'surquillo': 'Surquillo',
  'brena': 'Breña',
  'breña': 'Breña',
  'cercado de lima': 'Cercado de Lima',
  'lima cercado': 'Cercado de Lima',
  'lima': 'Lima',
  'la victoria': 'La Victoria',
  'rimac': 'Rímac',
  'rímac': 'Rímac',
  'los olivos': 'Los Olivos',
  'san martin de porres': 'San Martín de Porres',
  'san martín de porres': 'San Martín de Porres',
  'smp': 'San Martín de Porres',
  'comas': 'Comas',
  'independencia': 'Independencia',
  'carabayllo': 'Carabayllo',
  'puente piedra': 'Puente Piedra',
  'san juan de lurigancho': 'San Juan de Lurigancho',
  'sjl': 'San Juan de Lurigancho',
  'santa anita': 'Santa Anita',
  'ate': 'Ate',
  'ate vitarte': 'Ate',
  'el agustino': 'El Agustino',
  'chorrillos': 'Chorrillos',
  'san juan de miraflores': 'San Juan de Miraflores',
  'sjm': 'San Juan de Miraflores',
  'villa maria del triunfo': 'Villa María del Triunfo',
  'villa maría del triunfo': 'Villa María del Triunfo',
  'vmt': 'Villa María del Triunfo',
  'villa el salvador': 'Villa El Salvador',
  'ves': 'Villa El Salvador',
  'lurin': 'Lurín',
  'lurín': 'Lurín',
  'pachacamac': 'Pachacámac',
  'pachacámac': 'Pachacámac',
  'chaclacayo': 'Chaclacayo',
  'chosica': 'Lurigancho-Chosica',
  'lurigancho': 'Lurigancho-Chosica',
  'cieneguilla': 'Cieneguilla',
  'ancon': 'Ancón',
  'ancón': 'Ancón',
  'santa rosa': 'Santa Rosa',
  'san bartolo': 'San Bartolo',
  'punta hermosa': 'Punta Hermosa',
  'punta negra': 'Punta Negra',
  'santa maria del mar': 'Santa María del Mar',
  'pucusana': 'Pucusana',
  'callao': 'Callao',
  'bellavista': 'Bellavista',
  'la perla': 'La Perla',
  'la punta': 'La Punta',
  'carmen de la legua': 'Carmen de la Legua',
  'ventanilla': 'Ventanilla',
  'mi peru': 'Mi Perú',
  'mi perú': 'Mi Perú'
};

/**
 * Quita acentos y pasa a minúsculas para comparaciones insensibles
 */
function normalizeStr(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Extrae y normaliza el distrito de Lima a partir de una dirección de Google Maps
 * @param {string} address Dirección en formato Google Maps
 * @returns {string} Nombre oficial del distrito o "Lima"
 */
export function extractDistrict(address) {
  if (!address || typeof address !== 'string') return 'Lima';

  // Quitar códigos postales (ej. LIMA 15036)
  const clean = address.replace(/[0-9]{5}/g, '').trim();
  const normalizedAddr = normalizeStr(clean);

  // Buscar coincidencia exacta por palabra delimitada
  for (const [alias, official] of Object.entries(DISTRICT_ALIAS_MAP)) {
    const normalizedAlias = normalizeStr(alias);
    const regex = new RegExp(`(?:^|[ ,.-])${normalizedAlias}(?:[ ,.-]|$)`, 'i');
    if (regex.test(normalizedAddr)) {
      return official;
    }
  }

  return 'Lima';
}

/**
 * Obtiene la zona a la que pertenece un distrito
 */
export function getDistrictZone(districtName) {
  if (!districtName) return null;
  const target = districtName.toLowerCase().trim();

  for (const [zoneKey, zoneData] of Object.entries(LIMA_ZONES)) {
    if (zoneData.districts.some(d => d.toLowerCase() === target)) {
      return zoneData.name;
    }
  }
  return 'Lima Metropolitana';
}

/**
 * Obtiene la lista completa de todos los distritos organizados por zonas
 */
export function getAllDistrictsByZone() {
  return Object.values(LIMA_ZONES).map(zone => ({
    name: zone.name,
    description: zone.description,
    districts: zone.districts
  }));
}
