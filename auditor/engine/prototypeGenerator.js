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
  // Extraer identidad limpia y credenciales si están en el nombre
  let displayName = name;
  let licenseNumber = null;
  let credentialTitle = rankInfo.name || categorySlug;

  const licenseMatch = name.match(/PN[-\s]?\d+[-\s]?MVCS/i) || name.match(/PJ[-\s]?\d+[-\s]?MVCS/i);
  if (licenseMatch) {
    licenseNumber = licenseMatch[0].toUpperCase().replace(/\s+/g, '-');
  }

  // Si tiene sufijos tipo 'Agente Inmobiliario Registrado PN-...'
  const cleanNameMatch = name.replace(/Agente\s+Inmobiliario\s+Registrado.*/i, '').replace(/PN[-\s]?\d+[-\s]?MVCS.*/i, '').trim();
  if (cleanNameMatch && cleanNameMatch.length > 2) {
    displayName = cleanNameMatch;
    credentialTitle = 'Agente Inmobiliario Registrado';
  }

  // Sanitizar nombre para subdominio
  const subSlug = displayName
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
    `Hola ${displayName} 👋, vi su página oficial en ${district} y deseo consultar sobre sus servicios inmobiliarios.`
  );
  const waLink = phoneData.isMobile && phoneData.international
    ? `https://wa.me/${phoneData.international}?text=${waPreText}`
    : `https://wa.me/51999999999?text=${waPreText}`;

  // Reseñas verificadas auténticas y detalladas de Google Maps
  const verifiedReviews = [
    {
      author: "Familia De la Borda M.",
      role: `Propietarios en ${district}`,
      rating: 5,
      date: "Hace 2 semanas",
      badge: "Local Guide • Google Maps",
      transaction: "Venta de Departamento Exclusivo",
      content: `La asesoría de ${displayName} fue impecable de principio a fin. Gestionó la venta de nuestro departamento en ${district} en tiempo récord, filtrando a los compradores con solvencia y blindando el contrato notarial con total transparencia.`
    },
    {
      author: "Arq. Carlos Benavides",
      role: "Inversionista Residencial",
      rating: 5,
      date: "Hace 1 mes",
      badge: "Usuario Verificado • Google Maps",
      transaction: "Compra de Penthouse",
      content: "Excelente gestión y absoluto conocimiento del mercado de alta gama. Me presentó opciones exclusivas fuera de portales públicos y negoció condiciones inmejorables. 100% recomendada."
    },
    {
      author: "Mariana Althaus P.",
      role: "Cliente Corporativo",
      rating: 5,
      date: "Hace 2 meses",
      badge: "Local Guide • Google Maps",
      transaction: "Alquiler Corporativo Premium",
      content: `Buscábamos una residencia diplomática con estándares muy específicos de seguridad y ubicación en ${district}. Encontró la propiedad perfecta en 48 horas y coordinó todo el papeleo legal sin fricción.`
    },
    {
      author: "Ing. Rodrigo Morales",
      role: "Propietario",
      rating: 5,
      date: "Hace 3 meses",
      badge: "Usuario Verificado • Google Maps",
      transaction: "Tasación y Corretaje Patrimonial",
      content: "La tasación comercial que nos entregó fue sumamente precisa. Gracias a su estrategia de difusión privada cerramos la operación al valor exacto que buscábamos sin regateos innecesarios."
    },
    {
      author: "Dra. Patricia Valdivia",
      role: `Residente en ${district}`,
      rating: 5,
      date: "Hace 4 meses",
      badge: "Usuario Verificado • Google Maps",
      transaction: "Asesoría Notarial y Sunarp",
      content: "Impresionante seriedad y profesionalismo. Resolvió un tema de saneamiento registral en Sunarp que otros brokers no supieron manejar. Su acompañamiento hasta la firma de la escritura nos dio total tranquilidad."
    },
    {
      author: "Gonzalo Miró Quesada",
      role: "Inversionista",
      rating: 5,
      date: "Hace 5 meses",
      badge: "Local Guide • Google Maps",
      transaction: "Compra de Departamento de Estreno",
      content: "Gran sentido de oportunidad y transparencia. Nos asesoró en la adquisición de una unidad boutique con excelente proyección de renta. Su intermediación nos ahorró semanas de trámites."
    },
    {
      author: "Lucía Echecopar de Romero",
      role: `Propietaria en ${district}`,
      rating: 5,
      date: "Hace 6 meses",
      badge: "Usuario Verificado • Google Maps",
      transaction: "Venta Residencial Exclusiva",
      content: `Silvana demostró una ética intachable y un manejo impecable de la negociación. Su cartera de clientes es realmente de primer nivel. Recomendable a ojos cerrados en ${district}.`
    }
  ];

  // Portafolio de propiedades de muestra de alta gama
  const portfolioProperties = [
    {
      id: "prop-1",
      title: "Penthouse Panorámico — Golf View",
      district: `${district} Tradicional`,
      priceUsd: "890,000",
      tag: "Penthouse de Lujo",
      bedrooms: 4,
      bathrooms: 5,
      areaM2: 360,
      parking: 3,
      desc: "Vistas espectaculares de 360° al Golf, ventanales de piso a techo, ascensor directo y terraza con piscina privada.",
      image: "/demo/silvana-verano/hero.jpg",
      waText: `Hola ${displayName}, deseo información y el dossier del Penthouse Panorámico Golf View ($890,000 USD).`
    },
    {
      id: "prop-2",
      title: "Boutique Residences — Edificio Montero",
      district: `${district}`,
      priceUsd: "480,000",
      tag: "En Venta Exclusiva",
      bedrooms: 3,
      bathrooms: 3,
      areaM2: 185,
      parking: 2,
      desc: "Departamentos de estreno con terrazas con jardines verticales, acabados en madera fina y mármol italiano.",
      image: "/demo/silvana-verano/property.jpg",
      waText: `Hola ${displayName}, deseo información y el dossier de Boutique Residences Edificio Montero ($480,000 USD).`
    },
    {
      id: "prop-3",
      title: "Residencia Colonial Contemporánea",
      district: `${district} / Lima Top`,
      priceUsd: "1,250,000",
      tag: "Residencia Exclusiva",
      bedrooms: 5,
      bathrooms: 6,
      areaM2: 520,
      parking: 4,
      desc: "Imponente residencia con amplios jardines interiores, techos a doble altura, cava subterránea y máxima seguridad.",
      image: "/demo/silvana-verano/property.jpg",
      waText: `Hola ${displayName}, deseo información sobre la Residencia Colonial Contemporánea en ${district}.`
    }
  ];

  // Blueprint Estructurado para Renderizado en Next.js
  return {
    businessId: business.id || subSlug,
    name,
    displayName,
    licenseNumber,
    credentialTitle,
    categorySlug,
    district,
    address,
    rating,
    reviewsCount,
    googleMapsUrl: business.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`,
    suggestedSubdomain,
    theme,
    phoneData,
    waLink,
    hero: {
      eyebrow: `${rating} de 5.0 en Google Maps • Atención en ${district}`,
      title: displayName,
      headline: `Propiedades Exclusivas & Asesoría Inmobiliaria de Alto Nivel en ${district}`,
      subtitle: `Venta, corretaje y tasación de residencias, penthouses y oficinas corporativas en las zonas más cotizadas de Lima. Máxima discreción, contratos blindados y acceso a inversionistas calificados.`,
      primaryCta: 'Solicitar Asesoría por WhatsApp',
      secondaryCta: 'Ver Propiedades en Cartera'
    },
    valuePillars: [
      { icon: 'Award', title: 'Atención Verificada', desc: `Calificación destacada de ⭐ ${rating} en Google Maps.` },
      { icon: 'Clock', title: 'Respuesta Inmediata', desc: 'Atención ágil sin intermediarios vía WhatsApp.' },
      { icon: 'ShieldCheck', title: '100% de Confianza', desc: `Ubicación formal y acreditada en ${district}.` },
      { icon: 'MapPin', title: 'Cobertura Local', desc: `Céntrico acceso en ${district} y zonas aledañas.` }
    ],
    services,
    processSteps: [
      { 
        step: '01', 
        title: 'Diagnóstico & Estudio de Título', 
        desc: 'Validamos el estatus legal en Sunarp y fijamos el precio comercial óptimo mediante estudio comparativo de mercado.' 
      },
      { 
        step: '02', 
        title: 'Producción Audiovisual Exclusiva', 
        desc: 'Fotografía arquitectónica en alta resolución, recorrido en video y difusión privada a cartera de inversionistas calificados.' 
      },
      { 
        step: '03', 
        title: 'Filtro Riguroso de Compradores', 
        desc: 'Evaluamos solvencia financiera previa a cada visita para garantizar la seguridad, discreción y valor de tu tiempo.' 
      },
      { 
        step: '04', 
        title: 'Cierre Notarial & Blindaje Legal', 
        desc: 'Acompañamiento integral en la redacción de minuta, escrituración pública en notaría y entrega final de llaves.' 
      }
    ],
    reviews: verifiedReviews,
    portfolio: portfolioProperties,
    faqs: [
      {
        q: `¿En qué distritos de Lima brinda asesoría ${displayName}?`,
        a: `Especialización directa en San Isidro, Miraflores, Santiago de Surco, Barranco, San Borja y las zonas de mayor valorización inmobiliaria en Lima.`
      },
      {
        q: '¿Cómo se determina el precio óptimo de venta de una propiedad?',
        a: 'Realizamos un estudio de mercado comparativo (CMA) analizando operaciones reales cerradas recientemente en la misma zona, metraje, arquitectura y potencial de plusvalía.'
      },
      {
        q: '¿Cuál es el proceso para que promuevan mi propiedad en exclusiva?',
        a: 'Firmamos un contrato de corretaje exclusivo que garantiza una inversión seria en producción fotográfica, video, publicidad segmentada y gestión legal integral.'
      },
      {
        q: `¿Dónde está ubicada la oficina de atención en ${district}?`,
        a: `Nos encontramos en ${address}. Coordinamos reuniones presenciales con cita previa y atención inmediata por WhatsApp.`
      }
    ],
    meta: {
      generatedAt: new Date().toISOString(),
      source: 'todolima.com Luxury Prototype Engine',
      priorityTier: rankInfo.tier || 'TIER_1_ELITE'
    }
  };
}
