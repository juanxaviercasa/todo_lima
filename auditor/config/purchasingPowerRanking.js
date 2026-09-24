/**
 * Matriz de Clasificación por Poder Adquisitivo y Ticket Promedio
 * para las 38 categorías de Todo Lima (todolima.com).
 *
 * Criterios de ponderación:
 * 1. Ticket promedio por cliente / transacción en Lima.
 * 2. Margen de ganancia del negocio.
 * 3. Capacidad financiera para invertir en desarrollo web, marketing y digitalización ($300 - $2,500+ USD).
 * 4. Urgencia de autoridad digital (los clientes buscan y deciden por internet antes de contratar).
 */

export const PURCHASING_POWER_RANKING = [
  // ==========================================
  // TIER 1: PODER ADQUISITIVO ÉLITE / ALTO TICKET
  // Ticket de transacción: S/ 3,000 a $50,000+ USD
  // Capacidad de inversión digital: MUY ALTA ($500 - $3,000 USD)
  // ==========================================
  {
    rank: 1,
    slug: 'agentes-inmobiliarios',
    name: 'Agentes Inmobiliarios y Corretaje',
    niche: 'legal',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 25000,
    avgTicketUSD: 6800,
    investmentCapacity: 'MUY ALTA',
    digitalUrgency: 'CRÍTICA',
    reasoning: 'Comisiones de 3% a 5% por venta de departamentos y casas en distritos top (Miraflores, San Isidro, Surco, San Borja). Una sola captación paga 20 veces una página web. Necesitan portfolio de propiedades y captación de propietarios.',
    idealPitch: 'Embudo de captación de propietarios que quieren vender y catálogo de propiedades en venta.'
  },
  {
    rank: 2,
    slug: 'notarias',
    name: 'Notarías Públicas',
    niche: 'legal',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 3500,
    avgTicketUSD: 950,
    investmentCapacity: 'MUY ALTA',
    digitalUrgency: 'ALTA',
    reasoning: 'Alto flujo de ingresos por escrituras públicas, transferencias vehiculares e inmobiliarias, poderes y protocolizaciones. Requieren proyectar máxima solemnidad y agilizar consultas documentarias.',
    idealPitch: 'Portal notarial para seguimiento de trámites, cálculo de aranceles y agendamiento de firmas.'
  },
  {
    rank: 3,
    slug: 'abogados',
    name: 'Estudios de Abogados y Asesoría Legal',
    niche: 'legal',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 5000,
    avgTicketUSD: 1350,
    investmentCapacity: 'MUY ALTA',
    digitalUrgency: 'CRÍTICA',
    reasoning: 'Honorarios corporativos, civiles, laborales y penales de alto valor. Un cliente de litigio o asesoría corporativa jamás contrata sin verificar el prestigio de la web del estudio.',
    idealPitch: 'Web corporativa con perfil de socios, áreas de práctica, casos de éxito y filtro de consultas.'
  },
  {
    rank: 4,
    slug: 'oftalmologos',
    name: 'Oftalmólogos y Clínicas de Ojos',
    niche: 'salud',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 4500,
    avgTicketUSD: 1200,
    investmentCapacity: 'MUY ALTA',
    digitalUrgency: 'CRÍTICA',
    reasoning: 'Cirugías refractivas LASIK, cataratas, lentes intraoculares y tratamientos láser de alto ticket (S/ 3,000 a S/ 10,000 por ojo). Alto margen quirúrgico.',
    idealPitch: 'Landing page quirúrgica con cotizador de cirugía refractiva y evaluación de agudeza visual.'
  },
  {
    rank: 5,
    slug: 'dermatologos',
    name: 'Dermatólogos y Clínicas de la Piel',
    niche: 'salud',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 2800,
    avgTicketUSD: 750,
    investmentCapacity: 'MUY ALTA',
    digitalUrgency: 'CRÍTICA',
    reasoning: 'Dermatología estética, toxina botulínica, rellenos de ácido hialurónico, láser CO2 y tratamientos de acné. Clientes con alto poder de gasto y alta recurrencia.',
    idealPitch: 'Showroom estético antes/después, catálogo de tratamientos dermatológicos y reserva VIP por WhatsApp.'
  },
  {
    rank: 6,
    slug: 'ginecologos',
    name: 'Ginecólogos y Clínicas de la Mujer',
    niche: 'salud',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 3200,
    avgTicketUSD: 860,
    investmentCapacity: 'ALTA',
    digitalUrgency: 'ALTA',
    reasoning: 'Paquetes de maternidad, control prenatal, ecografías 5D/genéticas, partos y cirugías ginecológicas. El factor confianza y privacidad es decisivo.',
    idealPitch: 'Portal seguro de salud femenina con paquetes de maternidad y reserva confidencial de citas.'
  },
  {
    rank: 7,
    slug: 'dentistas',
    name: 'Clínicas Odontológicas y Dentistas',
    niche: 'salud',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 2500,
    avgTicketUSD: 680,
    investmentCapacity: 'ALTA',
    digitalUrgency: 'CRÍTICA',
    reasoning: 'Tratamientos de alta gama: implantes dentales, ortodoncia invisible (invisalign), carillas de porcelana y diseño de sonrisa (S/ 2,000 a S/ 15,000 por paciente).',
    idealPitch: 'Landing page odontológica con simulador de sonrisa, casos de éxito y diagnóstico inicial por WhatsApp.'
  },
  {
    rank: 8,
    slug: 'doctores',
    name: 'Médicos Especialistas y Policlínicos',
    niche: 'salud',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 1800,
    avgTicketUSD: 480,
    investmentCapacity: 'ALTA',
    digitalUrgency: 'ALTA',
    reasoning: 'Consultas privadas de especialistas (cardiología, traumatología, neurología, cirugía general). Buscan atraer pacientes particulares no afiliados a seguros públicos.',
    idealPitch: 'Directorio de médicos con credenciales verificadas y agendamiento directo a recepción.'
  },
  {
    rank: 9,
    slug: 'aire-acondicionado',
    name: 'Climatización y Aire Acondicionado',
    niche: 'hogar',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 4000,
    avgTicketUSD: 1080,
    investmentCapacity: 'ALTA',
    digitalUrgency: 'MEDIA',
    reasoning: 'Instalaciones industriales y corporativas para oficinas, edificios y locales comerciales. Proyectos de S/ 4,000 a S/ 50,000. Clientes B2B.',
    idealPitch: 'Web de ingeniería en climatización con cotizador de BTU/área y proyectos corporativos ejecutados.'
  },
  {
    rank: 10,
    slug: 'contadores',
    name: 'Estudios Contables y Asesoría Tributaria',
    niche: 'legal',
    tier: 'TIER_1_ELITE',
    avgTicketPEN: 1500,
    avgTicketUSD: 400,
    investmentCapacity: 'ALTA',
    digitalUrgency: 'MEDIA',
    reasoning: 'Modelos de suscripción mensual recurrente (igualas de S/ 500 a S/ 5,000/mes por empresa) más asesorías tributarias contra SUNAT. Alto LTV (Lifetime Value).',
    idealPitch: 'Web corporativa contable con calculadora de régimen tributario y asesoría inicial sin costo.'
  },

  // ==========================================
  // TIER 2: PODER ADQUISITIVO MEDIO-ALTO / PROYECTOS
  // Ticket de transacción: S/ 800 a S/ 15,000
  // Capacidad de inversión digital: MEDIA-ALTA ($300 - $800 USD)
  // ==========================================
  {
    rank: 11,
    slug: 'camaras-de-seguridad',
    name: 'Instalación de Cámaras y Seguridad Electrónica',
    niche: 'tecnologia',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 2200,
    avgTicketUSD: 600,
    investmentCapacity: 'MEDIA-ALTA',
    digitalUrgency: 'ALTA',
    reasoning: 'Paquetes de instalación de 4 a 16 cámaras para condominios, empresas y casas en Lima. Ticket de hardware + mano de obra.'
  },
  {
    rank: 12,
    slug: 'catering',
    name: 'Servicios de Catering y Buffet para Eventos',
    niche: 'eventos',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 6000,
    avgTicketUSD: 1600,
    investmentCapacity: 'ALTA',
    digitalUrgency: 'CRÍTICA',
    reasoning: 'Bodas, quinceañeros y eventos corporativos con presupuesto de S/ 5,000 a S/ 30,000. Los anfitriones exigen catálogo visual impecable.'
  },
  {
    rank: 13,
    slug: 'fotografia-eventos',
    name: 'Fotografía Profesional y Bodas',
    niche: 'eventos',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 2500,
    avgTicketUSD: 680,
    investmentCapacity: 'MEDIA-ALTA',
    digitalUrgency: 'CRÍTICA',
    reasoning: 'Paquetes completos de fotografía y video 4K/dron para bodas y marcas. Decisión 100% visual.'
  },
  {
    rank: 14,
    slug: 'vidrierias',
    name: 'Vidrierías y Mamparas de Vidrio Templado',
    niche: 'hogar',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 2200,
    avgTicketUSD: 600,
    investmentCapacity: 'MEDIA-ALTA',
    digitalUrgency: 'MEDIA',
    reasoning: 'Mamparas para baños, ventanas acústicas y fachadas de vidrio. Proyectos arquitectónicos de mediano ticket.'
  },
  {
    rank: 15,
    slug: 'carpinteros',
    name: 'Carpintería y Muebles de Melamina a Medida',
    niche: 'hogar',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 3000,
    avgTicketUSD: 800,
    investmentCapacity: 'MEDIA-ALTA',
    digitalUrgency: 'ALTA',
    reasoning: 'Cocinas empotradas, reposteros, clósets y centros de entretenimiento. Diseños en 3D y presupuesto elevado.'
  },
  {
    rank: 16,
    slug: 'mudanzas',
    name: 'Empresas de Mudanzas y Fletes',
    niche: 'hogar',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 1200,
    avgTicketUSD: 320,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'ALTA',
    reasoning: 'Mudanzas residenciales y traslados de oficinas. Clientes que buscan camiones cerrados y servicio de estiba profesional.'
  },
  {
    rank: 17,
    slug: 'fumigacion',
    name: 'Empresas de Fumigación y Control de Plagas',
    niche: 'hogar',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 900,
    avgTicketUSD: 240,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'MEDIA',
    reasoning: 'Certificados oficiales del MINSA para restaurantes, condominios, hoteles y empresas.'
  },
  {
    rank: 18,
    slug: 'talleres-mecanicos',
    name: 'Talleres Mecánicos Automotrices',
    niche: 'automotriz',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 1400,
    avgTicketUSD: 380,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'ALTA',
    reasoning: 'Reparaciones mecánicas de motor, suspensión, frenos y planchado/pintura. Ticket relevante.'
  },
  {
    rank: 19,
    slug: 'pediatras',
    name: 'Pediatras y Especialistas Infantiles',
    niche: 'salud',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 500,
    avgTicketUSD: 135,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'ALTA',
    reasoning: 'Padres primerizos que buscan seguridad y referencias médicas de primer nivel para sus hijos.'
  },
  {
    rank: 20,
    slug: 'fisioterapia',
    name: 'Centros de Fisioterapia y Rehabilitación',
    niche: 'salud',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 800,
    avgTicketUSD: 215,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'ALTA',
    reasoning: 'Paquetes de 10 a 20 sesiones de terapia física para columna, lesiones deportivas y post-operatorios.'
  },
  {
    rank: 21,
    slug: 'veterinarias',
    name: 'Veterinarias y Clínicas de Mascotas',
    niche: 'salud',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 600,
    avgTicketUSD: 160,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'ALTA',
    reasoning: 'Servicios médicos veterinarios, vacunas, cirugías, ecografías y emergencias 24h.'
  },
  {
    rank: 22,
    slug: 'psicologos',
    name: 'Psicólogos y Terapeutas',
    niche: 'salud',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 600,
    avgTicketUSD: 160,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'MEDIA',
    reasoning: 'Procesos terapéuticos de 4 a 12 sesiones presenciales y virtuales.'
  },
  {
    rank: 23,
    slug: 'nutricionistas',
    name: 'Nutricionistas y Asesoría Dietética',
    niche: 'salud',
    tier: 'TIER_2_MEDIUM_HIGH',
    avgTicketPEN: 450,
    avgTicketUSD: 120,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'MEDIA',
    reasoning: 'Planes nutricionales mensuales con seguimiento antropométrico.'
  },

  // ==========================================
  // TIER 3: TICKET MEDIO Y URGENCIAS OPERATIVAS
  // Ticket de transacción: S/ 100 a S/ 800
  // Capacidad de inversión digital: MEDIA ($150 - $400 USD)
  // ==========================================
  {
    rank: 24,
    slug: 'auxilio-mecanico',
    name: 'Grúas y Auxilio Mecánico 24h',
    niche: 'automotriz',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 350,
    avgTicketUSD: 95,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'CRÍTICA'
  },
  {
    rank: 25,
    slug: 'cerrajeros',
    name: 'Cerrajeros 24 Horas y Apertura de Autos',
    niche: 'hogar',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 200,
    avgTicketUSD: 55,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'CRÍTICA'
  },
  {
    rank: 26,
    slug: 'gasfiteros',
    name: 'Gasfiteros y Plomeros a Domicilio',
    niche: 'hogar',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 250,
    avgTicketUSD: 70,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'CRÍTICA'
  },
  {
    rank: 27,
    slug: 'electricistas',
    name: 'Electricistas a Domicilio',
    niche: 'hogar',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 250,
    avgTicketUSD: 70,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'CRÍTICA'
  },
  {
    rank: 28,
    slug: 'pintores',
    name: 'Pintores de Casas y Edificios',
    niche: 'hogar',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 1200,
    avgTicketUSD: 320,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'MEDIA'
  },
  {
    rank: 29,
    slug: 'spas',
    name: 'Spas y Centros de Masajes',
    niche: 'belleza',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 220,
    avgTicketUSD: 60,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'ALTA'
  },
  {
    rank: 30,
    slug: 'salones-de-belleza',
    name: 'Salones de Belleza y Estilistas',
    niche: 'belleza',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 180,
    avgTicketUSD: 50,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'ALTA'
  },
  {
    rank: 31,
    slug: 'barberias',
    name: 'Barberías y Grooming Masculino',
    niche: 'belleza',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 80,
    avgTicketUSD: 22,
    investmentCapacity: 'MEDIA-BAJA',
    digitalUrgency: 'MEDIA'
  },
  {
    rank: 32,
    slug: 'car-wash',
    name: 'Car Wash y Detallado Automotriz',
    niche: 'automotriz',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 150,
    avgTicketUSD: 40,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'MEDIA'
  },
  {
    rank: 33,
    slug: 'llanterias',
    name: 'Llanterías y Venta de Neumáticos',
    niche: 'automotriz',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 380,
    avgTicketUSD: 100,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'MEDIA'
  },
  {
    rank: 34,
    slug: 'reparacion-laptops',
    name: 'Servicio Técnico de Laptops y PC',
    niche: 'tecnologia',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 220,
    avgTicketUSD: 60,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'ALTA'
  },
  {
    rank: 35,
    slug: 'reparacion-celulares',
    name: 'Reparación de Celulares y Pantallas',
    niche: 'tecnologia',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 180,
    avgTicketUSD: 50,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'ALTA'
  },
  {
    rank: 36,
    slug: 'reparacion-refrigeradoras',
    name: 'Reparación de Refrigeradoras a Domicilio',
    niche: 'hogar',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 250,
    avgTicketUSD: 70,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'CRÍTICA'
  },
  {
    rank: 37,
    slug: 'reparacion-lavadoras',
    name: 'Reparación de Lavadoras a Domicilio',
    niche: 'hogar',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 220,
    avgTicketUSD: 60,
    investmentCapacity: 'MEDIA',
    digitalUrgency: 'CRÍTICA'
  },
  {
    rank: 38,
    slug: 'tortas-personalizadas',
    name: 'Tortas Personalizadas y Temáticas',
    niche: 'eventos',
    tier: 'TIER_3_OPERATIONAL',
    avgTicketPEN: 160,
    avgTicketUSD: 45,
    investmentCapacity: 'BAJA',
    digitalUrgency: 'MEDIA'
  }
];

export function getRankedCategories() {
  return [...PURCHASING_POWER_RANKING].sort((a, b) => a.rank - b.rank);
}

export function getCategoryRankInfo(slug) {
  return PURCHASING_POWER_RANKING.find(c => c.slug === slug) || null;
}
