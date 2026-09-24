/**
 * Extractor inteligente de distritos de Lima Metropolitana a partir de direcciones de Google Maps
 */

const LIMA_DISTRICTS = [
  'Miraflores',
  'San Isidro',
  'Santiago de Surco',
  'Surco',
  'La Molina',
  'San Borja',
  'Barranco',
  'Jesús María',
  'Jesus Maria',
  'Lince',
  'Magdalena del Mar',
  'Magdalena',
  'Pueblo Libre',
  'San Miguel',
  'Breña',
  'Cercado de Lima',
  'Lima',
  'San Martín de Porres',
  'San Martin de Porres',
  'Los Olivos',
  'Comas',
  'Independencia',
  'Carabayllo',
  'Puente Piedra',
  'San Juan de Lurigancho',
  'SJL',
  'Santa Anita',
  'Ate',
  'Ate Vitarte',
  'El Agustino',
  'Chorrillos',
  'San Juan de Miraflores',
  'SJM',
  'Villa María del Triunfo',
  'VMT',
  'Villa El Salvador',
  'VES',
  'Lurín',
  'Lurin',
  'Pachacámac',
  'Pachacamac',
  'Rímac',
  'Rimac',
  'Bellavista',
  'Callao',
  'La Perla',
  'La Punta',
  'Carmen de la Legua',
  'Ventanilla'
];

/**
 * Normaliza y extrae el distrito de Lima
 * @param {string} address Dirección completa (ej. "Av. José Larco 752, Miraflores LIMA 23")
 * @returns {string} Nombre del distrito o "Lima" por defecto
 */
export function extractDistrict(address) {
  if (!address || typeof address !== 'string') return 'Lima';

  const clean = address.replace(/[0-9]{5}/g, '').trim();

  for (const district of LIMA_DISTRICTS) {
    // Regex buscando palabra completa o separada por comas
    const regex = new RegExp(`\\b${district}\\b`, 'i');
    if (regex.test(clean)) {
      // Normalizar nombres equivalentes
      if (district.toLowerCase() === 'surco') return 'Santiago de Surco';
      if (district.toLowerCase() === 'jesus maria') return 'Jesús María';
      if (district.toLowerCase() === 'san martin de porres') return 'San Martín de Porres';
      if (district.toLowerCase() === 'sjl') return 'San Juan de Lurigancho';
      if (district.toLowerCase() === 'sjm') return 'San Juan de Miraflores';
      if (district.toLowerCase() === 'vmt') return 'Villa María del Triunfo';
      if (district.toLowerCase() === 'ves') return 'Villa El Salvador';
      if (district.toLowerCase() === 'lurin') return 'Lurín';
      if (district.toLowerCase() === 'rimac') return 'Rímac';
      if (district.toLowerCase() === 'pachacamac') return 'Pachacámac';
      if (district.toLowerCase() === 'cercado de lima') return 'Cercado de Lima';
      return district;
    }
  }

  return 'Lima';
}

/**
 * Limpia y normaliza el número de teléfono
 * @param {string} phone Cadena telefónica (ej. "tel:989676612", "tel:016311000", "+51 987 654 321")
 * @returns {{ raw: string, clean: string, isMobile: boolean, international: string, waLink: string|null }}
 */
export function parsePhone(phone) {
  if (!phone) {
    return { raw: null, clean: null, isMobile: false, international: null, waLink: null };
  }

  const raw = String(phone).replace(/^tel:/i, '').trim();
  const digits = raw.replace(/[^0-9]/g, '');

  let clean = digits;
  let isMobile = false;
  let international = null;

  // Si tiene código de país 51
  if (clean.startsWith('51') && clean.length === 11) {
    const local = clean.substring(2);
    if (local.startsWith('9')) {
      isMobile = true;
      clean = local;
      international = `51${local}`;
    }
  } else if (clean.length === 9 && clean.startsWith('9')) {
    isMobile = true;
    international = `51${clean}`;
  } else if (clean.length === 7 || (clean.length === 8 && clean.startsWith('1'))) {
    // Teléfono fijo de Lima
    isMobile = false;
    international = clean.startsWith('1') ? `51${clean}` : `511${clean}`;
  }

  const waLink = isMobile && international ? `https://wa.me/${international}` : null;

  return {
    raw,
    clean,
    isMobile,
    international,
    waLink
  };
}
