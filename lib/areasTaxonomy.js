/**
 * Arquitectura de Grandes Áreas y Categorías para todolima.com
 * Separa las áreas temáticas (exploración macro) de las categorías específicas (encuentro de negocios).
 * 
 * Principio: Cada categoría tiene un área principal canónica, pero puede recomendarse en otras áreas
 * sin duplicar URLs ni contenido.
 */

export const MACRO_AREAS = [
  {
    slug: 'comer-y-beber',
    title: 'Comer y beber',
    shortTitle: 'Gastronomía',
    icon: 'UtensilsCrossed',
    description: 'Cevicherías, pollerías, chifas, cafeterías y la gastronomía que define a Lima.',
    categorySlugs: [
      'cevicherias',
      'pollerias',
      'chifas',
      'pizzerias',
      'cafeterias',
      'restaurantes-criollos',
      'comida-regional',
      'anticucherias',
      'sangucherias',
      'carnes-y-parrillas',
      'restaurantes-vegetarianos',
      'restaurantes-nikkei',
      'panaderias-artesanales',
      'heladerias-artesanales',
      'dulcerias-tradicionales',
      'restaurantes-campestres'
    ],
    recommendedSlugs: [
      'tortas-personalizadas',
      'catering'
    ],
    upcomingCategories: [
      'Restaurantes criollos y regionales',
      'Anticucherías',
      'Panaderías',
      'Heladerías y dulcerías'
    ],
    editorial: {
      headline: 'Sabores, tradición y los mejores restaurantes de la capital',
      intro: 'Lima es la capital gastronómica de América Latina. Encuentra desde el ceviche fresco del día hasta el clásico pollo a la brasa, chifas emblemáticos, pizzas artesanales y cafeterías de especialidad.',
      buyingTip: 'Verifica el horario de atención, modalidad de reserva y si cuentan con servicio de recojo o delivery directo a tu distrito.'
    }
  },
  {
    slug: 'hogar-y-reparaciones',
    title: 'Hogar y reparaciones',
    shortTitle: 'Hogar',
    icon: 'Wrench',
    description: 'Gasfiteros, electricistas, cerrajeros, carpinteros, línea blanca y mantenimiento integral.',
    categorySlugs: [
      'gasfiteros',
      'electricistas',
      'cerrajeros',
      'carpinteros',
      'pintores',
      'vidrierias',
      'reparacion-lavadoras',
      'reparacion-refrigeradoras',
      'reparacion-celulares',
      'reparacion-laptops',
      'fumigacion',
      'lavanderias',
      'mudanzas',
      'aire-acondicionado',
      'camaras-de-seguridad',
      'reparacion-de-calzado',
      'sastrerias'
    ],
    recommendedSlugs: [
      'talleres-mecanicos'
    ],
    upcomingCategories: [
      'Servicios de limpieza profunda',
      'Reparación general de pequeños electrodomésticos'
    ],
    editorial: {
      headline: 'Soluciones técnicas y mantenimiento para tu casa o departamento',
      intro: 'Accede a técnicos calificados para resolver emergencias sanitarias, fallas eléctricas, reparaciones de cerrajería, electrodomésticos y mejoras en el hogar en todos los distritos de Lima.',
      buyingTip: 'Solicita siempre un presupuesto previo detallando si la visita incluye costo de diagnóstico y cuál es la garantía por mano de obra y repuestos.'
    }
  },
  {
    slug: 'construccion-y-remodelacion',
    title: 'Construcción y remodelación',
    shortTitle: 'Construcción',
    icon: 'HardHat',
    description: 'Arquitectura, acabados, remodelación de inmuebles y proyectos estructurales.',
    categorySlugs: [],
    recommendedSlugs: [
      'carpinteros',
      'pintores',
      'vidrierias',
      'electricistas',
      'gasfiteros'
    ],
    upcomingCategories: [
      'Arquitectura y planos',
      'Diseño de interiores',
      'Albañilería y obras civiles',
      'Remodelaciones integrales',
      'Impermeabilización',
      'Estructuras metálicas',
      'Jardinería y paisajismo'
    ],
    editorial: {
      headline: 'Profesionales para edificar, ampliar o renovar tus espacios',
      intro: 'Espacio dedicado a arquitectos, diseñadores de interiores y contratistas para obras residenciales y comerciales en Lima.',
      buyingTip: 'Revisa proyectos anteriores, cronograma de obra por hitos y contratos formales con póliza y garantías.'
    }
  },
  {
    slug: 'salud-y-bienestar',
    title: 'Salud y bienestar',
    shortTitle: 'Salud',
    icon: 'HeartPulse',
    description: 'Médicos especialistas, odontología, psicología, laboratorios clínicos y salud visual.',
    categorySlugs: [
      'doctores',
      'dentistas',
      'psicologos',
      'pediatras',
      'dermatologos',
      'oftalmologos',
      'ginecologos',
      'traumatologos',
      'podologos',
      'fisioterapia',
      'nutricionistas',
      'laboratorios-clinicos',
      'opticas'
    ],
    recommendedSlugs: [
      'spas',
      'veterinarias'
    ],
    upcomingCategories: [
      'Centros médicos integrales',
      'Especialidades pediátricas complementarias'
    ],
    editorial: {
      headline: 'Atención médica confiable y profesionales de la salud en Lima',
      intro: 'Compara consultorios, clínicas y especialistas colegiados para el cuidado de tu salud física, mental y visual con información verificada de ubicación y contacto.',
      buyingTip: 'Confirma la colegiatura médica (CMP / COP / etc.), modalidad de cita (presencial o teleconsulta) y cobertura de seguros particulares.'
    }
  },
  {
    slug: 'belleza-y-cuidado-personal',
    title: 'Belleza y cuidado personal',
    shortTitle: 'Belleza',
    icon: 'Sparkles',
    description: 'Barberías, peluquerías, salones de belleza, spas y relajación en la ciudad.',
    categorySlugs: [
      'barberias',
      'salones-de-belleza',
      'spas'
    ],
    recommendedSlugs: [
      'dermatologos',
      'grooming-canino'
    ],
    upcomingCategories: [
      'Manicure y pedicure especializada',
      'Maquillaje profesional',
      'Depilación definitiva',
      'Tatuajes y piercing'
    ],
    editorial: {
      headline: 'Estilo, imagen personal y espacios de bienestar en Lima',
      intro: 'Descubre los mejores estilistas, barberos y centros de relajación para consentirte con tratamientos capilares, masajes descontracturantes y cuidado facial.',
      buyingTip: 'Reserva tu cita con anticipación y consulta sobre los protocolos de bioseguridad y marcas profesionales utilizadas.'
    }
  },
  {
    slug: 'mascotas',
    title: 'Mascotas',
    shortTitle: 'Mascotas',
    icon: 'PawPrint',
    description: 'Veterinarias 24h, grooming canino y cuidado integral para tus engreídos.',
    categorySlugs: [
      'veterinarias',
      'grooming-canino',
      'tiendas-de-mascotas'
    ],
    recommendedSlugs: [],
    upcomingCategories: [
      'Tiendas de mascotas y alimentos',
      'Hospedajes y hoteles caninos',
      'Guarderías para mascotas',
      'Adiestramiento y etología',
      'Paseadores certificados'
    ],
    editorial: {
      headline: 'Cuidado médico, baño y bienestar para perros y gatos',
      intro: 'Tu engreído merece la mejor atención. Conecta con veterinarias de emergencia, vacunación, cirugías y spas caninos con movilidad en Lima.',
      buyingTip: 'Pregunta si la clínica veterinaria cuenta con hospitalización supervisada 24 horas y servicio de ambulancia para urgencias.'
    }
  },
  {
    slug: 'vehiculos-y-movilidad',
    title: 'Vehículos y movilidad',
    shortTitle: 'Vehículos',
    icon: 'Car',
    description: 'Talleres mecánicos, car wash, llanterías, grúas y escuelas de manejo en Lima.',
    categorySlugs: [
      'talleres-mecanicos',
      'car-wash',
      'llanterias',
      'auxilio-mecanico',
      'escuelas-de-manejo',
      'reparacion-de-bicicletas'
    ],
    recommendedSlugs: [],
    upcomingCategories: [
      'Servicios de grúas pesadas',
      'Talleres de conversión a GNV/GLP'
    ],
    editorial: {
      headline: 'Mantenimiento vehicular, emergencias en pista y conducción segura',
      intro: 'Mantén tu auto en óptimas condiciones con talleres certificados, detallado automotriz, auxilio mecánico en ruta y cursos para obtener tu brevete.',
      buyingTip: 'Exige orden de servicio por escrito con escaneo computarizado previo y repuestos originales con garantía.'
    }
  },
  {
    slug: 'compras-y-comercio-local',
    title: 'Compras y comercio local',
    shortTitle: 'Comercio',
    icon: 'ShoppingBag',
    description: 'Florerías, regalos, artículos para ocasiones especiales y tiendas locales.',
    categorySlugs: [
      'florerias',
      'productos-naturales',
      'tiendas-de-artesania',
      'librerias',
      'ferreterias',
      'tiendas-de-bicicletas',
      'zapaterias'
    ],
    recommendedSlugs: [
      'tortas-personalizadas',
      'opticas',
      'reparacion-celulares'
    ],
    upcomingCategories: [
      'Librerías y papelerías',
      'Ferreterías de barrio',
      'Zapaterías y calzado',
      'Productos naturales y bioferias',
      'Artesanía peruana',
      'Sastrerías y costura',
      'Reparación de calzado'
    ],
    editorial: {
      headline: 'Comercio de proximidad y compras directas en Lima',
      intro: 'Apoya el comercio local limeño y encuentra detalles únicos, arreglos florales y productos de calidad para entrega a domicilio.',
      buyingTip: 'Consulta el rango horario de entrega para envíos en el mismo día y políticas de cambio en productos frescos.'
    }
  },
  {
    slug: 'turismo-y-experiencias',
    title: 'Turismo y experiencias',
    shortTitle: 'Turismo',
    icon: 'Compass',
    description: 'Paseos, tours urbanos, hospedaje y vivencias culturales para redescubrir la capital.',
    categorySlugs: [
      'agencias-de-turismo',
      'tours-y-experiencias',
      'guias-de-turismo',
      'hoteles',
      'hostales-y-alojamientos',
      'alquiler-de-bicicletas',
      'penas-criollas'
    ],
    recommendedSlugs: [
      'cevicherias',
      'cafeterias',
      'alquiler-de-canchas'
    ],
    upcomingCategories: [
      'Agencias de viajes locales',
      'Guías turísticos certificados',
      'Recorridos y free walking tours',
      'Hoteles y apart-hoteles',
      'Hostales turísticos',
      'Peñas criollas y folclóricas',
      'Alquiler de bicicletas y scooters'
    ],
    editorial: {
      headline: 'Descubre Lima: historia viva, bahía y recorridos patrimoniales',
      intro: 'Conecta con experiencias turísticas, guiados por el Centro Histórico, Barranco, Miraflores y actividades al aire libre.',
      buyingTip: 'Verifica que la agencia o guía cuente con registro oficial de MINCETUR / Dircetur.'
    }
  },
  {
    slug: 'educacion-y-talleres',
    title: 'Educación y talleres',
    shortTitle: 'Educación',
    icon: 'GraduationCap',
    description: 'Institutos, academias, refuerzo escolar, idiomas y desarrollo de talentos.',
    categorySlugs: [
      'talleres-de-artesania'
    ],
    recommendedSlugs: [
      'escuelas-de-manejo'
    ],
    upcomingCategories: [
      'Institutos de idiomas',
      'Academias preuniversitarias',
      'Reforzamiento escolar y universitario',
      'Escuelas de música e instrumentos',
      'Academias de danza y marinera',
      'Talleres de arte y dibujo',
      'Talleres de cerámica y artesanía'
    ],
    editorial: {
      headline: 'Formación académica, destrezas prácticas y cultura para todas las edades',
      intro: 'Espacio para centros de enseñanza, docentes particulares y talleres de desarrollo artístico en Lima.',
      buyingTip: 'Pregunta por clases de prueba, tamaño de grupos y metodología presencial o híbrida.'
    }
  },
  {
    slug: 'deporte-y-actividad-fisica',
    title: 'Deporte y actividad física',
    shortTitle: 'Deporte',
    icon: 'Trophy',
    description: 'Gimnasios, canchas sintéticas, entrenamiento funcional y vida activa.',
    categorySlugs: [
      'gimnasios',
      'alquiler-de-canchas',
      'escuelas-de-surf'
    ],
    recommendedSlugs: [
      'fisioterapia',
      'nutricionistas',
      'traumatologos'
    ],
    upcomingCategories: [
      'Estudios de Yoga y Pilates',
      'Academias de natación',
      'Escuelas de fútbol formativo',
      'Academias de artes marciales y box',
      'Escuelas de surf en la Costa Verde',
      'Tiendas y talleres de bicicletas'
    ],
    editorial: {
      headline: 'Canchas sintéticas, gimnasios y centros de entrenamiento en Lima',
      intro: 'Reserva canchas de grass sintético para tu pichanga y entrena en los mejores gimnasios con máquinas modernas y entrenadores calificados.',
      buyingTip: 'Verifica los horarios de iluminación en canchas nocturnas y opciones de membresía flexible en gimnasios.'
    }
  },
  {
    slug: 'eventos-y-celebraciones',
    title: 'Eventos y celebraciones',
    shortTitle: 'Eventos',
    icon: 'PartyPopper',
    description: 'Locales, catering, ambientación, fotografía y pastelería fina para días inolvidables.',
    categorySlugs: [
      'locales-de-eventos',
      'catering',
      'decoracion-de-eventos',
      'fotografia-eventos',
      'tortas-personalizadas'
    ],
    recommendedSlugs: [
      'florerias',
      'alquiler-de-canchas'
    ],
    upcomingCategories: [
      'Música en vivo y orquestas para fiestas',
      'Animación infantil y shows temáticos',
      'Cabinas fotográficas y recuerdos'
    ],
    editorial: {
      headline: 'Planificación de matrimonios, cumpleaños, quinceañeros y fiestas corporativas',
      intro: 'Todo lo que necesitas para tu fiesta: salones elegantes, casas de campo, servicio de buffet, mesas de dulces y fotografía profesional.',
      buyingTip: 'Coordina degustación previa del catering y revisa el contrato de locación con hora máxima de música y capacidad permitida.'
    }
  },
  {
    slug: 'servicios-profesionales',
    title: 'Servicios profesionales',
    shortTitle: 'Profesionales',
    icon: 'Briefcase',
    description: 'Abogados, notarías públicas, contadores, agentes inmobiliarios y casas de cambio.',
    categorySlugs: [
      'abogados',
      'notarias',
      'contadores',
      'agentes-inmobiliarios',
      'casas-de-cambio'
    ],
    recommendedSlugs: [
      'fotografia-eventos'
    ],
    upcomingCategories: [
      'Tasadores y peritos inmobiliarios',
      'Consultores financieros para pymes'
    ],
    editorial: {
      headline: 'Asesoría jurídica, contable, notarial y patrimonial de confianza',
      intro: 'Protege tu patrimonio y formaliza tus operaciones con profesionales colegiados, notarías autorizadas y estudios contables en Lima.',
      buyingTip: 'Comprueba el número de colegiatura profesional y solicita una propuesta de honorarios desglosada con entregables claros.'
    }
  },
  {
    slug: 'proveedores-para-negocios',
    title: 'Proveedores para negocios',
    shortTitle: 'Negocios B2B',
    icon: 'Building2',
    description: 'Imprentas, seguridad, mantenimiento corporativo y soluciones para pymes.',
    categorySlugs: [],
    recommendedSlugs: [
      'contadores',
      'camaras-de-seguridad',
      'fumigacion',
      'mudanzas',
      'reparacion-refrigeradoras',
      'catering',
      'reparacion-laptops',
      'aire-acondicionado'
    ],
    upcomingCategories: [
      'Imprentas comerciales y gigantografías',
      'Señalética industrial y de seguridad',
      'Embalajes, cajas y empaques',
      'Uniformes corporativos y textiles',
      'Estampados y bordados industriales',
      'Servicio técnico de impresoras y fotocopiadoras',
      'Refrigeración comercial e industrial',
      'Equipamiento gastronómico para restaurantes',
      'Courier y mensajería express corporativa'
    ],
    editorial: {
      headline: 'Servicios e insumos B2B para potenciar empresas limeñas',
      intro: 'Conecta con proveedores confiables para la operación diaria, mantenimiento técnico y comercial de tu negocio en Lima.',
      buyingTip: 'Solicita cotizaciones formales con facturación electrónica y consulta sobre tiempos de entrega y descuentos por volumen.'
    }
  }
];

/**
 * Mapa de resolución rápida: de categorySlug -> área principal
 */
export const CATEGORY_TO_AREA_SLUG = {
  // Comer y beber (5)
  cevicherias: 'comer-y-beber',
  pollerias: 'comer-y-beber',
  chifas: 'comer-y-beber',
  pizzerias: 'comer-y-beber',
  cafeterias: 'comer-y-beber',

  // Hogar y reparaciones (15)
  gasfiteros: 'hogar-y-reparaciones',
  electricistas: 'hogar-y-reparaciones',
  cerrajeros: 'hogar-y-reparaciones',
  carpinteros: 'hogar-y-reparaciones',
  pintores: 'hogar-y-reparaciones',
  vidrierias: 'hogar-y-reparaciones',
  'reparacion-lavadoras': 'hogar-y-reparaciones',
  'reparacion-refrigeradoras': 'hogar-y-reparaciones',
  'reparacion-celulares': 'hogar-y-reparaciones',
  'reparacion-laptops': 'hogar-y-reparaciones',
  fumigacion: 'hogar-y-reparaciones',
  lavanderias: 'hogar-y-reparaciones',
  mudanzas: 'hogar-y-reparaciones',
  'aire-acondicionado': 'hogar-y-reparaciones',
  'camaras-de-seguridad': 'hogar-y-reparaciones',

  // Salud y bienestar (13)
  doctores: 'salud-y-bienestar',
  dentistas: 'salud-y-bienestar',
  psicologos: 'salud-y-bienestar',
  pediatras: 'salud-y-bienestar',
  dermatologos: 'salud-y-bienestar',
  oftalmologos: 'salud-y-bienestar',
  ginecologos: 'salud-y-bienestar',
  traumatologos: 'salud-y-bienestar',
  podologos: 'salud-y-bienestar',
  fisioterapia: 'salud-y-bienestar',
  nutricionistas: 'salud-y-bienestar',
  'laboratorios-clinicos': 'salud-y-bienestar',
  opticas: 'salud-y-bienestar',

  // Belleza y cuidado personal (3)
  barberias: 'belleza-y-cuidado-personal',
  'salones-de-belleza': 'belleza-y-cuidado-personal',
  spas: 'belleza-y-cuidado-personal',

  // Mascotas (2)
  veterinarias: 'mascotas',
  'grooming-canino': 'mascotas',

  // Vehículos y movilidad (5)
  'talleres-mecanicos': 'vehiculos-y-movilidad',
  'car-wash': 'vehiculos-y-movilidad',
  llanterias: 'vehiculos-y-movilidad',
  'auxilio-mecanico': 'vehiculos-y-movilidad',
  'escuelas-de-manejo': 'vehiculos-y-movilidad',

  // Compras y comercio local (1)
  florerias: 'compras-y-comercio-local',

  // Deporte y actividad física (2)
  gimnasios: 'deporte-y-actividad-fisica',
  'alquiler-de-canchas': 'deporte-y-actividad-fisica',

  // Eventos y celebraciones (5)
  'locales-de-eventos': 'eventos-y-celebraciones',
  catering: 'eventos-y-celebraciones',
  'decoracion-de-eventos': 'eventos-y-celebraciones',
  'fotografia-eventos': 'eventos-y-celebraciones',
  'tortas-personalizadas': 'eventos-y-celebraciones',

  // Servicios profesionales (5)
  abogados: 'servicios-profesionales',
  notarias: 'servicios-profesionales',
  contadores: 'servicios-profesionales',
  'agentes-inmobiliarios': 'servicios-profesionales',
  'casas-de-cambio': 'servicios-profesionales',
  'restaurantes-criollos': 'comer-y-beber',
  'comida-regional': 'comer-y-beber',
  'anticucherias': 'comer-y-beber',
  'sangucherias': 'comer-y-beber',
  'carnes-y-parrillas': 'comer-y-beber',
  'restaurantes-vegetarianos': 'comer-y-beber',
  'restaurantes-nikkei': 'comer-y-beber',
  'panaderias-artesanales': 'comer-y-beber',
  'heladerias-artesanales': 'comer-y-beber',
  'dulcerias-tradicionales': 'comer-y-beber',
  'productos-naturales': 'compras-y-comercio-local',
  'restaurantes-campestres': 'comer-y-beber',
  'agencias-de-turismo': 'turismo-y-experiencias',
  'tours-y-experiencias': 'turismo-y-experiencias',
  'guias-de-turismo': 'turismo-y-experiencias',
  'hoteles': 'turismo-y-experiencias',
  'hostales-y-alojamientos': 'turismo-y-experiencias',
  'alquiler-de-bicicletas': 'turismo-y-experiencias',
  'escuelas-de-surf': 'deporte-y-actividad-fisica',
  'penas-criollas': 'turismo-y-experiencias',
  'talleres-de-artesania': 'educacion-y-talleres',
  'tiendas-de-artesania': 'compras-y-comercio-local',
  'librerias': 'compras-y-comercio-local',
  'tiendas-de-mascotas': 'mascotas',
  'ferreterias': 'compras-y-comercio-local',
  'tiendas-de-bicicletas': 'compras-y-comercio-local',
  'reparacion-de-bicicletas': 'vehiculos-y-movilidad',
  'zapaterias': 'compras-y-comercio-local',
  'reparacion-de-calzado': 'hogar-y-reparaciones',
  'sastrerias': 'hogar-y-reparaciones'
};

/**
 * Obtener todas las áreas macro
 * @param {Object} options
 * @param {boolean} options.includeUpcoming - Si es false, solo devuelve áreas con categorías activas
 */
export function getMacroAreas({ includeUpcoming = false } = {}) {
  if (includeUpcoming) return MACRO_AREAS;
  return MACRO_AREAS.filter(area => area.categorySlugs.length > 0);
}

/**
 * Obtener un área por su slug
 */
export function getAreaBySlug(slug) {
  return MACRO_AREAS.find(a => a.slug === slug) || null;
}

/**
 * Obtener el área principal a la que pertenece una categoría
 */
export function getAreaForCategory(categorySlug) {
  const areaSlug = CATEGORY_TO_AREA_SLUG[categorySlug];
  if (!areaSlug) return null;
  return getAreaBySlug(areaSlug);
}

/**
 * Obtener áreas que recomiendan una categoría como secundaria
 */
export function getSecondaryAreasForCategory(categorySlug) {
  return MACRO_AREAS.filter(a => a.recommendedSlugs.includes(categorySlug));
}
