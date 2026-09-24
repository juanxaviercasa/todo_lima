/**
 * Motor de Generación de Prototipos Web Inteligentes para Negocios sin Sitio Web.
 * Crea la arquitectura de contenido, diseño, propuesta de valor y catálogo de servicios
 * personalizada para cada negocio de Lima Metropolitana.
 */

import { getCategoryRankInfo } from '../config/purchasingPowerRanking.js';

/**
 * Paletas de diseño y estilos visuales por nicho
 */
const THEME_PALETTES = {
  legal: {
    primary: '#1e3a8a', // Deep Blue
    accent: '#d97706',  // Warm Amber / Gold
    bg: '#090d16',
    cardBg: '#131b2e',
    textLight: '#f8fafc',
    styleName: 'Corporativo & Prestigio'
  },
  salud: {
    primary: '#0284c7', // Sky Blue
    accent: '#10b981',  // Emerald Green
    bg: '#0b1320',
    cardBg: '#13233a',
    textLight: '#f0fdf4',
    styleName: 'Clínico, Seguro & Luminoso'
  },
  hogar: {
    primary: '#ea580c', // Electric Orange / Amber
    accent: '#3b82f6',  // Blue
    bg: '#0f172a',
    cardBg: '#1e293b',
    textLight: '#f8fafc',
    styleName: 'Urgencia 24h & Confianza'
  },
  automotriz: {
    primary: '#dc2626', // High-energy Red
    accent: '#f59e0b',  // Amber
    bg: '#09090b',
    cardBg: '#18181b',
    textLight: '#fafafa',
    styleName: 'Potencia, Precisión & Garantía'
  },
  belleza: {
    primary: '#db2777', // Rose / Magenta
    accent: '#c084fc',  // Violet
    bg: '#180d1e',
    cardBg: '#2a1635',
    textLight: '#fdf2f8',
    styleName: 'Elegancia, Estética & Confort VIP'
  },
  eventos: {
    primary: '#7c3aed', // Royal Violet
    accent: '#f59e0b',  // Gold
    bg: '#120f24',
    cardBg: '#201b40',
    textLight: '#faf5ff',
    styleName: 'Celebración & Showroom Visual'
  },
  tecnologia: {
    primary: '#2563eb', // Cyber Blue
    accent: '#06b6d4',  // Cyan
    bg: '#050b14',
    cardBg: '#0f1c30',
    textLight: '#f0f9ff',
    styleName: 'Tecnológico, Seguro & Rápido'
  }
};

/**
 * Catálogo inteligente de servicios inferidos por categoría
 */
const SERVICES_MAP = {
  'agentes-inmobiliarios': [
    { title: 'Venta Exclusiva de Inmuebles', desc: 'Promoción estratégica en portales premium y base de inversionistas en Lima.' },
    { title: 'Alquiler Residencial y Corporativo', desc: 'Filtro riguroso de inquilinos, contratos blindados y cobranza puntual.' },
    { title: 'Tasación Comercial de Propiedades', desc: 'Estudio de mercado profesional para fijar el precio óptimo de venta en tu zona.' },
    { title: 'Asesoría Notarial y Registral', desc: 'Acompañamiento legal completo desde la minuta hasta la entrega de llaves.' }
  ],
  'notarias': [
    { title: 'Escrituras Públicas y Compraventas', desc: 'Formalización de transferencias vehiculares e inmuebles con máxima seguridad.' },
    { title: 'Poderes Notariales y Cartas Notariales', desc: 'Elaboración inmediata de poderes fuera de registro, por acta y cartas notariales.' },
    { title: 'Constitución Rápida de Empresas', desc: 'Asesoría integral para formalizar tu empresa con inscripción en SUNARP.' },
    { title: 'Legalizaciones de Firmas y Copias', desc: 'Atención ágil para trámites comerciales, laborales y académicos.' }
  ],
  'abogados': [
    { title: 'Defensa Legal y Litigios', desc: 'Estrategias jurídicas de alta efectividad para proteger tu patrimonio y libertad.' },
    { title: 'Derecho Corporativo y Empresas', desc: 'Blindaje contractual, resolución de conflictos comerciales y cobranzas.' },
    { title: 'Derecho Inmobiliario y Civil', desc: 'Saneamiento de propiedades, herencias, desalojos e indemnizaciones.' },
    { title: 'Asesoría y Consulta Confidencial', desc: 'Evaluación integral de tu caso con pronóstico legal claro y transparente.' }
  ],
  'dentistas': [
    { title: 'Diseño de Sonrisa y Carillas', desc: 'Luce una dentadura perfecta y natural con materiales de alta estética.' },
    { title: 'Implantes Dentales y Rehabilitación', desc: 'Recupera piezas perdidas con tecnología de vanguardia y sin dolor.' },
    { title: 'Ortodoncia Invisible y Brackets', desc: 'Alineación dental para niños y adultos con las técnicas más modernas.' },
    { title: 'Blanqueamiento y Limpieza Profunda', desc: 'Profilaxis con ultrasonido para dientes sanos y libres de manchas.' }
  ],
  'doctores': [
    { title: 'Consulta Médica Especializada', desc: 'Diagnóstico certero con enfoque humano y tecnología de última generación.' },
    { title: 'Chequeos Médicos Preventivos', desc: 'Evaluación integral de salud para prevenir enfermedades crónicas a tiempo.' },
    { title: 'Procedimientos Menores Ambulatorios', desc: 'Atención de calidad con estrictos protocolos de bioseguridad.' },
    { title: 'Seguimiento y Teleconsulta', desc: 'Monitoreo continuo de tu recuperación desde la comodidad de tu hogar.' }
  ],
  'oftalmologos': [
    { title: 'Cirugía Láser Refractiva (LASIK)', desc: 'Dile adiós a los lentes en minutos con tecnología láser indolora.' },
    { title: 'Tratamiento de Cataratas y Glaucoma', desc: 'Recupera tu nitidez visual con implantes de lentes intraoculares premium.' },
    { title: 'Examen Ocular Computarizado', desc: 'Descarte de miopía, astigmatismo y enfermedades de la retina.' },
    { title: 'Oftalmología Pediátrica', desc: 'Cuidado especializado para el correcto desarrollo visual de tus hijos.' }
  ],
  'dermatologos': [
    { title: 'Dermatología Estética y Rejuvenecimiento', desc: 'Tratamientos de toxina botulínica, ácido hialurónico y bioestimuladores.' },
    { title: 'Tratamiento de Acné y Cicatrices', desc: 'Planes médicos personalizados y tecnología láser para una piel limpia.' },
    { title: 'Control de Lunares y Manchas', desc: 'Dermatoscopía digital para prevención y tratamiento de lesiones pigmentadas.' },
    { title: 'Caída de Cabello y Tricología', desc: 'Protocolos clínicos avanzados para estimular el crecimiento capilar.' }
  ]
};

/**
 * Genera la especificación completa del prototipo web listo para desplegar
 * @param {object} business Datos del negocio desde el scraper
 * @param {string} categorySlug Categoría del negocio
 * @param {string} district Distrito identificado
 * @param {object} phoneData Datos del teléfono
 */
export function generatePrototypeBlueprint(business, categorySlug, district, phoneData) {
  const rankInfo = getCategoryRankInfo(categorySlug) || { niche: 'hogar', investmentCapacity: 'MEDIA' };
  const nicheKey = rankInfo.niche || 'hogar';
  const theme = THEME_PALETTES[nicheKey] || THEME_PALETTES.hogar;

  const name = business.name || 'Negocio Especializado';
  const rating = business.rating ? Number(business.rating).toFixed(1) : '4.9';
  const reviewsCount = business.reviewsCount || 48;
  const address = business.address || `Av. Principal, ${district}, Lima`;

  // Sanitizar nombre para subdominio
  const subSlug = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 32);

  const suggestedSubdomain = `${subSlug}.${categorySlug}.todolima.com`;

  // Servicios específicos o fallback inteligente
  const services = SERVICES_MAP[categorySlug] || [
    { title: `Servicio Especializado de ${categorySlug}`, desc: 'Atención personalizada con garantía por escrito y cobertura en Lima.' },
    { title: 'Diagnóstico y Cotización Inmediata', desc: 'Respuesta rápida vía WhatsApp con presupuestos claros sin costos ocultos.' },
    { title: 'Atención Prioritaria en ' + district, desc: 'Llegada rápida y atención en sede o a domicilio según tu necesidad.' },
    { title: 'Garantía Total de Satisfacción', desc: 'Profesionales calificados respaldados por cientos de opiniones positivas.' }
  ];

  // Mensaje pre-llenado de WhatsApp
  const waPreText = encodeURIComponent(
    `Hola ${name} 👋, vi su página web oficial en ${district} y deseo cotizar/agendar sus servicios.`
  );
  const waLink = phoneData.isMobile && phoneData.international
    ? `https://wa.me/${phoneData.international}?text=${waPreText}`
    : `https://wa.me/51999999999?text=${waPreText}`;

  // Blueprint Estructurado para Renderizado en Next.js
  return {
    businessId: business.id || subSlug,
    name,
    categorySlug,
    district,
    address,
    rating,
    reviewsCount,
    suggestedSubdomain,
    theme,
    phoneData,
    waLink,
    hero: {
      eyebrow: `⭐ ${rating} de 5.0 en Google Maps • Atención en ${district}`,
      title: `${name}`,
      headline: `Especialistas en ${rankInfo.name || categorySlug} con la Mayor Calificación en ${district}`,
      subtitle: `Respaldados por más de ${reviewsCount} opiniones verificadas en Lima. Consulta hoy mismo tus dudas o solicita cotización con atención directa a tu WhatsApp.`,
      primaryCta: 'Consultar por WhatsApp Ahora',
      secondaryCta: 'Ver Servicios y Ubicación'
    },
    valuePillars: [
      { icon: 'Award', title: 'Atención Verificada', desc: `Calificación destacada de ⭐ ${rating} en Google Maps.` },
      { icon: 'Clock', title: 'Respuesta Inmediata', desc: 'Atención ágil sin intermediarios vía WhatsApp.' },
      { icon: 'ShieldCheck', title: '100% de Confianza', desc: `Ubicación formal y acreditada en ${district}.` },
      { icon: 'MapPin', title: 'Cobertura Local', desc: `Céntrico acceso en ${district} y zonas aledañas.` }
    ],
    services,
    processSteps: [
      { step: '01', title: 'Escríbenos por WhatsApp', desc: 'Cuéntanos tu requerimiento o consulta en 1 minuto.' },
      { step: '02', title: 'Presupuesto o Cita', desc: 'Te brindamos la asesoría personalizada y tarifas claras.' },
      { step: '03', title: 'Solución Garantizada', desc: 'Recibe la atención de primera que tu caso merece.' }
    ],
    faqs: [
      {
        q: `¿En qué horarios atiende ${name}?`,
        a: `Atendemos de lunes a sábado con atención presencial en nuestro local de ${district} y coordinación directa por WhatsApp.`
      },
      {
        q: '¿Cómo puedo agendar una consulta o cotización?',
        a: 'Simplemente haz clic en el botón de WhatsApp de esta página y te responderemos al instante.'
      },
      {
        q: '¿Cuentan con garantía en sus servicios?',
        a: `Sí, todos nuestros trabajos y atenciones cuentan con el respaldo de nuestro equipo profesional y ⭐ ${rating} estrellas en Google Maps.`
      },
      {
        q: `¿Dónde están ubicados exactamente en ${district}?`,
        a: `Nos encontramos en ${address}. Puedes encontrarnos fácilmente con Google Maps o Waze.`
      }
    ],
    meta: {
      generatedAt: new Date().toISOString(),
      source: 'todolima.com Prototype Engine',
      priorityTier: rankInfo.tier || 'TIER_1_ELITE'
    }
  };
}
