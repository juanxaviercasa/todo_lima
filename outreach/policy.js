/**
 * Políticas operativas y de cumplimiento de WhatsApp Business Platform y Ley 32323
 * para Todo Lima (todolima.com).
 */

export const COMPLIANCE_POLICY = {
  timezone: 'America/Lima',
  
  // Horarios permitidos de envío para mensajes comerciales (Hora de Lima: UTC-5)
  allowedHours: {
    start: 9, // 09:00 AM
    end: 19   // 07:00 PM
  },

  // Días permitidos: 1=Lunes a 6=Sábado. 0=Domingo (PROHIBIDO)
  allowedDays: [1, 2, 3, 4, 5, 6],

  // Feriados nacionales en Perú para el año 2026 (YYYY-MM-DD en hora de Lima)
  peruHolidays2026: [
    '2026-01-01', // Año Nuevo
    '2026-04-02', // Jueves Santo
    '2026-04-03', // Viernes Santo
    '2026-05-01', // Día del Trabajo
    '2026-06-07', // Batalla de Arica y Día de la Bandera
    '2026-06-29', // San Pedro y San Pablo
    '2026-07-23', // Día de la Fuerza Aérea
    '2026-07-28', // Fiestas Patrias
    '2026-07-29', // Fiestas Patrias
    '2026-08-06', // Batalla de Junín
    '2026-08-30', // Santa Rosa de Lima
    '2026-10-08', // Combate de Angamos
    '2026-11-01', // Todos los Santos
    '2026-12-08', // Inmaculada Concepción
    '2026-12-09', // Batalla de Ayacucho
    '2026-12-25'  // Navidad
  ],

  // Límites de frecuencia publicitaria (Caps)
  frequencyCaps: {
    maxMarketingPerContact7Days: 1,
    maxMarketingPerContact30Days: 3,
    minHoursBetweenAnyMessage: 4
  },

  // Margen de seguridad sobre el Tier de mensajes de Meta (máx 80% de utilización)
  tierSafetyMarginPercent: 0.80,

  // Tiers de Meta (Unique Users per Rolling 24 Hours)
  tierLimits: {
    TIER_1: 250,
    TIER_2: 2000,
    TIER_3: 10000,
    TIER_4: 100000
  },

  // Ventana de atención al cliente (Customer Service Window)
  serviceWindowHours: 24,
  clickToWhatsAppWindowHours: 72,

  // Palabras clave de baja inmediata (Opt-out)
  optOutKeywords: [
    'baja',
    'stop',
    'no',
    'cancelar',
    'eliminar',
    'no molestar',
    'desuscribir',
    'ya no',
    'bloquear',
    'no deseo'
  ],

  // Palabras clave de consentimiento explícito (Opt-in)
  optInKeywords: [
    'acepto',
    'autorizo',
    'si acepto',
    'reclamo mi ficha',
    'reclamar mi ficha',
    'quiero mi auditoria',
    'deseo auditoria'
  ],

  // Umbrales de auto-pausa de seguridad
  autoPause: {
    blockRateThresholdPercent: 2.0, // Si los bloqueos/reportes superan el 2%
    pauseOnYellowQuality: true,     // Pausar campañas de marketing si la calidad cae a AMARILLO
    pauseOnRedQuality: true         // Pausar todos los mensajes iniciados por la empresa si cae a ROJO
  }
};

/**
 * Normaliza una cadena para comparaciones (sin acentos, minúsculas)
 */
export function normalizeText(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Determina si un mensaje contiene una orden de BAJA (Opt-Out)
 */
export function isOptOutMessage(messageText) {
  const norm = normalizeText(messageText);
  return COMPLIANCE_POLICY.optOutKeywords.some(keyword => {
    return (
      norm === keyword ||
      norm.startsWith(`${keyword} `) ||
      norm.endsWith(` ${keyword}`) ||
      norm.includes(` ${keyword} `)
    );
  });
}

/**
 * Determina si un mensaje contiene consentimiento explícito de contacto
 */
export function isOptInMessage(messageText) {
  const norm = normalizeText(messageText);
  return COMPLIANCE_POLICY.optInKeywords.some(keyword => norm.includes(keyword));
}
