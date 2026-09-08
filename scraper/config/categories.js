/**
 * Matriz maestra de categorías para todolima.com
 * Cada entrada define:
 * - slug: subdominio en Next.js (ej. doctores.todolima.com)
 * - query: consulta para Google Maps
 * - title: título amigable para SEO
 * - niche: agrupación temática
 * - heroHook: copy persuasivo estilo Go High Level
 */
export const CATEGORIES = [
  // SALUD Y BIENESTAR
  {
    slug: 'doctores',
    query: 'doctores en Lima',
    title: 'Doctores y Médicos Especialistas en Lima',
    niche: 'salud',
    heroHook: 'Encuentra en minutos a los médicos mejor calificados de Lima para cuidar de ti y tu familia con atención de primera.'
  },
  {
    slug: 'dentistas',
    query: 'clinicas dentales en Lima',
    title: 'Dentistas y Clínicas Odontológicas en Lima',
    niche: 'salud',
    heroHook: 'Recupera tu sonrisa con los mejores odontólogos y clínicas dentales valoradas por cientos de pacientes en Lima.'
  },
  {
    slug: 'psicologos',
    query: 'psicologos en Lima',
    title: 'Psicólogos y Terapeutas en Lima',
    niche: 'salud',
    heroHook: 'Tu bienestar mental es prioridad. Conecta con psicólogos especialistas en terapia presencial y virtual en Lima.'
  },
  {
    slug: 'pediatras',
    query: 'pediatras en Lima',
    title: 'Pediatras y Especialistas Infantiles en Lima',
    niche: 'salud',
    heroHook: 'La salud de tus pequeños en manos de los pediatras más recomendados y con mayor vocación de Lima.'
  },
  {
    slug: 'dermatologos',
    query: 'dermatologos en Lima',
    title: 'Dermatólogos y Clínicas de la Piel en Lima',
    niche: 'salud',
    heroHook: 'Luce una piel sana y radiante con los mejores especialistas en dermatología clínica y estética de Lima.'
  },
  {
    slug: 'veterinarias',
    query: 'veterinarias 24 horas en Lima',
    title: 'Veterinarias y Clínicas de Mascotas en Lima',
    niche: 'salud',
    heroHook: 'Atención de urgencia y preventiva para tu engreído con las veterinarias mejor valoradas de Lima.'
  },
  {
    slug: 'fisioterapia',
    query: 'centros de fisioterapia y rehabilitacion en Lima',
    title: 'Centros de Fisioterapia y Rehabilitación en Lima',
    niche: 'salud',
    heroHook: 'Alivia el dolor y recupera tu movilidad con fisioterapeutas certificados en Lima.'
  },
  {
    slug: 'nutricionistas',
    query: 'nutricionistas en Lima',
    title: 'Nutricionistas y Asesoría Dietética en Lima',
    niche: 'salud',
    heroHook: 'Alcanza tu peso ideal y mejora tus hábitos con planes nutricionales personalizados en Lima.'
  },
  {
    slug: 'oftalmologos',
    query: 'oftalmologos y clinicas de ojos en Lima',
    title: 'Oftalmólogos y Clínicas de Ojos en Lima',
    niche: 'salud',
    heroHook: 'Protege tu visión con los mejores especialistas en salud ocular y cirugía láser de Lima.'
  },
  {
    slug: 'ginecologos',
    query: 'ginecologos en Lima',
    title: 'Ginecólogos y Salud de la Mujer en Lima',
    niche: 'salud',
    heroHook: 'Atención médica integral, segura y confidencial para la mujer en las mejores clínicas de Lima.'
  },

  // HOGAR Y REPARACIONES
  {
    slug: 'cerrajeros',
    query: 'cerrajeros 24 horas en Lima',
    title: 'Cerrajeros a Domicilio y Emergencias 24 Horas en Lima',
    niche: 'hogar',
    heroHook: '¿Te quedaste fuera de casa o tu auto? Cerrajeros de confianza listos para ayudarte en tiempo récord las 24 horas.'
  },
  {
    slug: 'gasfiteros',
    query: 'gasfiteros a domicilio en Lima',
    title: 'Gasfiteros y Plomeros Profesionales en Lima',
    niche: 'hogar',
    heroHook: 'Repara fugas, desatoros e instalaciones sanitarias con gasfiteros expertos y garantizados en todo Lima.'
  },
  {
    slug: 'electricistas',
    query: 'electricistas a domicilio en Lima',
    title: 'Electricistas Certificados y Emergencias en Lima',
    niche: 'hogar',
    heroHook: 'Soluciona cortocircuitos e instalaciones eléctricas con técnicos matriculados y seguros en Lima.'
  },
  {
    slug: 'pintores',
    query: 'pintores de casas y departamentos en Lima',
    title: 'Pintores de Casas y Edificios en Lima',
    niche: 'hogar',
    heroHook: 'Renueva tus ambientes con acabados impecables y cotizaciones justas de los mejores pintores de Lima.'
  },
  {
    slug: 'fumigacion',
    query: 'empresas de fumigacion en Lima',
    title: 'Empresas de Fumigación y Control de Plagas en Lima',
    niche: 'hogar',
    heroHook: 'Elimina cucarachas, roedores y plagas con servicios de fumigación certificados y seguros para tu familia.'
  },
  {
    slug: 'mudanzas',
    query: 'servicios de mudanza en Lima',
    title: 'Empresas de Mudanzas y Fletes en Lima',
    niche: 'hogar',
    heroHook: 'Múdate sin estrés con empresas de transporte seguras, puntuales y con servicio de embalaje en Lima.'
  },
  {
    slug: 'aire-acondicionado',
    query: 'mantenimiento de aire acondicionado en Lima',
    title: 'Técnicos de Aire Acondicionado y Climatización en Lima',
    niche: 'hogar',
    heroHook: 'Venta, instalación y mantenimiento preventivo para climatizar tu hogar u oficina en Lima.'
  },
  {
    slug: 'reparacion-lavadoras',
    query: 'reparacion de lavadoras a domicilio en Lima',
    title: 'Técnicos de Reparación de Lavadoras en Lima',
    niche: 'hogar',
    heroHook: 'Tu lavadora como nueva hoy mismo con técnicos a domicilio de todas las marcas en Lima.'
  },
  {
    slug: 'reparacion-refrigeradoras',
    query: 'reparacion de refrigeradoras a domicilio en Lima',
    title: 'Reparación de Refrigeradoras y Neveras en Lima',
    niche: 'hogar',
    heroHook: 'Servicio técnico urgente a domicilio con repuestos originales y garantía para tu refrigeradora.'
  },
  {
    slug: 'vidrierias',
    query: 'vidrierias en Lima',
    title: 'Vidrierías y Mamparas de Vidrio en Lima',
    niche: 'hogar',
    heroHook: 'Instalación de vidrio templado, espejos, ventanas y mamparas con los mejores talleres de Lima.'
  },
  {
    slug: 'carpinteros',
    query: 'carpinteros a domicilio en Lima',
    title: 'Carpinteros y Muebles de Melamina en Lima',
    niche: 'hogar',
    heroHook: 'Fabricación y reparación de muebles a medida, clósets y reposteros de cocina en Lima.'
  },

  // LEGAL Y FINANZAS
  {
    slug: 'abogados',
    query: 'estudios de abogados en Lima',
    title: 'Estudios de Abogados y Asesoría Legal en Lima',
    niche: 'legal',
    heroHook: 'Protege tus derechos e intereses con los estudios jurídicos y abogados más experimentados de Lima.'
  },
  {
    slug: 'notarias',
    query: 'notarias en Lima',
    title: 'Notarías Públicas en Lima',
    niche: 'legal',
    heroHook: 'Realiza tus trámites notariales, escrituras y poderes de forma rápida y segura en las mejores notarías de Lima.'
  },
  {
    slug: 'contadores',
    query: 'estudios contables en Lima',
    title: 'Contadores Públicos y Asesoría Tributaria en Lima',
    niche: 'legal',
    heroHook: 'Evita contingencias con SUNAT y optimiza tus finanzas con estudios contables de alto nivel en Lima.'
  },
  {
    slug: 'agentes-inmobiliarios',
    query: 'agentes inmobiliarios en Lima',
    title: 'Agentes Inmobiliarios y Venta de Propiedades en Lima',
    niche: 'legal',
    heroHook: 'Vende, compra o alquila tu propiedad al mejor precio de mercado con agentes expertos de Lima.'
  },

  // AUTOMOTRIZ
  {
    slug: 'talleres-mecanicos',
    query: 'talleres mecanicos automotriz en Lima',
    title: 'Talleres Mecánicos y Servicio Automotriz en Lima',
    niche: 'automotriz',
    heroHook: 'Mantenimiento preventivo, escaneo y reparación para tu vehículo en los talleres mecánicos más confiables de Lima.'
  },
  {
    slug: 'car-wash',
    query: 'car wash y car detailing en Lima',
    title: 'Car Wash y Detallado Automotriz en Lima',
    niche: 'automotriz',
    heroHook: 'Lavado de salón, tratamiento cerámico y pulido para dejar tu auto reluciente como de fábrica.'
  },
  {
    slug: 'llanterias',
    query: 'llanterias y vulcanizadoras en Lima',
    title: 'Llanterías y Venta de Neumáticos en Lima',
    niche: 'automotriz',
    heroHook: 'Cambio de llantas, alineación, balanceo y parchado de emergencia en Lima.'
  },
  {
    slug: 'auxilio-mecanico',
    query: 'auxilio mecanico y gruas en Lima',
    title: 'Grúas y Auxilio Mecánico 24 Horas en Lima',
    niche: 'automotriz',
    heroHook: '¿Te quedaste botado en la pista? Servicio de remolque con grúa y auxilio mecánico rápido en Lima.'
  },

  // EVENTOS Y FIESTAS
  {
    slug: 'catering',
    query: 'servicios de catering y banquetes en Lima',
    title: 'Empresas de Catering y Buffet en Lima',
    niche: 'eventos',
    heroHook: 'Haz inolvidable tu celebración con exquisita gastronomía y atención de primer nivel en Lima.'
  },
  {
    slug: 'tortas-personalizadas',
    query: 'tortas personalizadas en Lima',
    title: 'Pastelerías y Tortas Temáticas en Lima',
    niche: 'eventos',
    heroHook: 'Diseños espectaculares y sabores deliciosos para cumpleaños, bodas y aniversarios en Lima.'
  },
  {
    slug: 'fotografia-eventos',
    query: 'fotografos para eventos y bodas en Lima',
    title: 'Fotógrafos Profesionales y Cobertura de Eventos en Lima',
    niche: 'eventos',
    heroHook: 'Inmortaliza tus mejores momentos con fotógrafos galardonados en Lima.'
  },

  // BELLEZA Y ESTILO
  {
    slug: 'barberias',
    query: 'barberias en Lima',
    title: 'Barberías y Cortes de Cabello para Hombres en Lima',
    niche: 'belleza',
    heroHook: 'Cortes clásicos, degradados modernos y afeitado tradicional en las mejores barberías de Lima.'
  },
  {
    slug: 'salones-de-belleza',
    query: 'salones de belleza y peluquerias en Lima',
    title: 'Salones de Belleza y Peluquerías en Lima',
    niche: 'belleza',
    heroHook: 'Tintes, balayage, laceados y peinados de vanguardia con estilistas reconocidos en Lima.'
  },
  {
    slug: 'spas',
    query: 'spas y masajes relajantes en Lima',
    title: 'Spas y Centros de Masajes en Lima',
    niche: 'belleza',
    heroHook: 'Desconecta del estrés con masajes relajantes, faciales y circuitos de spa de lujo en Lima.'
  },

  // TECNOLOGÍA Y SEGURIDAD
  {
    slug: 'reparacion-celulares',
    query: 'servicio tecnico de celulares en Lima',
    title: 'Reparación de Celulares y Tablets en Lima',
    niche: 'tecnologia',
    heroHook: 'Cambio de pantalla, batería y solución a problemas de placa con repuestos originales al instante.'
  },
  {
    slug: 'reparacion-laptops',
    query: 'reparacion de laptops y computadoras en Lima',
    title: 'Servicio Técnico de Laptops y Computadoras en Lima',
    niche: 'tecnologia',
    heroHook: 'Mantenimiento, formateo y reparación exprés de computadoras y portátiles en Lima.'
  },
  {
    slug: 'camaras-de-seguridad',
    query: 'instalacion de camaras de seguridad en Lima',
    title: 'Instalación de Cámaras de Seguridad y Alarmas en Lima',
    niche: 'tecnologia',
    heroHook: 'Protege tu hogar y negocio con sistemas de videovigilancia y alarmas monitoreadas 24/7 en Lima.'
  }
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find(cat => cat.slug === slug);
}
