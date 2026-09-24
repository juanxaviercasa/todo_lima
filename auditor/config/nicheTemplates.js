/**
 * Plantillas y argumentos persuasivos especializados por nicho para el mercado de Lima, Perú.
 * Enfocados en conversión comercial, psicología de compra y ventas vía WhatsApp.
 */

export const NICHE_TEMPLATES = {
  // SALUD Y BIENESTAR
  salud: {
    targetAudience: 'pacientes que buscan atención confiable y rápida para su salud o la de su familia',
    painPoint: 'los pacientes en celular dudan si no ven un sitio web profesional con horarios, especialidades y testimonios, y terminan agendando con otra clínica que sí tiene botón de WhatsApp inmediato',
    valueProposition: 'una página web médica de alta conversión con agendamiento directo por WhatsApp, mapa de ubicación, tarifas de consulta y galería de testimonios',
    benefits: [
      'Agendamiento de citas 24/7 directo a tu WhatsApp comercial',
      'Perfil de médicos especialistas con cédula y experiencia visible',
      'Integración con Google Maps para que los pacientes lleguen sin perderse',
      'Carga ultrarrápida en menos de 1 segundo en celulares'
    ],
    whatsappHook: 'notamos que tienen una excelente reputación con ⭐ {rating} estrellas en Google Maps en {district}, pero cuando un paciente los busca en su celular, no encuentra una web oficial para agendar cita directamente por WhatsApp.'
  },

  // HOGAR Y REPARACIONES DE URGENCIA
  hogar: {
    targetAudience: 'vecinos con urgencias domiciliarias (fugas, cerraduras trabadas, fallas eléctricas)',
    painPoint: 'un cliente con una emergencia domiciliaria tiene entre 10 y 30 segundos de paciencia: si no ve un botón grande de "Llamar Ahora" o "WhatsApp Emergencia 24h", salta de inmediato al siguiente técnico',
    valueProposition: 'una landing page de respuesta inmediata (< 0.8s) diseñada para emergencias en Lima con geolocalización por distrito y botones de llamada y WhatsApp en 1 toque',
    benefits: [
      'Botón de llamada de emergencia en 1 solo clic',
      'Identificación inmediata de distritos con cobertura rápida',
      'Presupuesto inmediato vía WhatsApp',
      'Posicionamiento local para búsquedas urgentes en tu zona'
    ],
    whatsappHook: 'vimos que son uno de los servicios más solicitados de {category} en {district} con ⭐ {rating} en Google, pero están perdiendo clientes que buscan servicio urgente en la madrugada o fin de semana por no tener una página web rápida con botón de auxilio inmediato.'
  },

  // LEGAL Y CORPORATIVO
  legal: {
    targetAudience: 'empresas, emprendedores y personas que buscan asesoría jurídica y contable de máxima confianza',
    painPoint: 'un cliente que va a pagar honorarios profesionales exige validar la reputación y seriedad del estudio o notaría en un sitio web formal antes de transferir o contratar',
    valueProposition: 'un sitio web corporativo de prestigio con presentación de socios, áreas de práctica, casos de éxito y canal de consulta confidencial',
    benefits: [
      'Proyección de máxima seriedad y respaldo institucional',
      'Formulario de consulta confidencial y filtro previo de clientes',
      'Presentación clara de servicios legales/contables y tarifas de consulta',
      'Presencia destacada y verificada en el directorio Todo Lima'
    ],
    whatsappHook: 'revisando su destacada trayectoria como {category} en {district} (⭐ {rating} en Google), vimos que aún no cuentan con un portal web corporativo donde sus clientes puedan revisar sus áreas de práctica y agendar consultas confidenciales.'
  },

  // AUTOMOTRIZ
  automotriz: {
    targetAudience: 'conductores que necesitan mantenimiento, auxilio en ruta o reparación mecánica garantizada',
    painPoint: 'los dueños de autos desconfían de talleres informales; una página web con fotos del taller, lista de marcas atendidas y garantía por escrito duplica el cierre de citas mecánicas',
    valueProposition: 'una web de taller moderno con cotizador rápido por WhatsApp, fotos de instalaciones, diagnóstico computarizado y mapa de ubicación',
    benefits: [
      'Recepción de cotizaciones mecánicas con fotos por WhatsApp',
      'Catálogo de servicios preventivos y correctivos por marca',
      'Ubicación exacta con Waze y Google Maps',
      'Reseñas verificadas visibles para generar confianza inmediata'
    ],
    whatsappHook: 'notamos que tienen una excelente valoración de ⭐ {rating} estrellas como taller en {district}, pero muchos conductores que buscan especialistas desde su celular no encuentran su web para pedir cotización o auxilio mecánico rápido.'
  },

  // BELLEZA Y CUIDADO PERSONAL
  belleza: {
    targetAudience: 'clientes que buscan verse y sentirse bien, exigiendo calidad estética y trato VIP',
    painPoint: 'el 90% de los clientes de belleza deciden con la vista: quieren ver fotos reales de trabajos anteriores, lista de precios y poder agendar turno por WhatsApp sin esperar',
    valueProposition: 'un catálogo web visual y elegante con portafolio de trabajos, lista de precios/servicios y reserva de turnos directa a WhatsApp',
    benefits: [
      'Portafolio visual de alta calidad adaptado a móviles',
      'Menú interactivo de servicios y tratamientos',
      'Botón de reserva de turnos con mensaje predefinido en WhatsApp',
      'Promociones del mes actualizables fácilmente'
    ],
    whatsappHook: 'vimos que son uno de los espacios de belleza más recomendados de {district} con ⭐ {rating} estrellas. Queríamos felicitarlos y consultarles si les gustaría tener una web moderna con catálogo de servicios y agenda directa a su WhatsApp.'
  },

  // EVENTOS Y GASTRONOMÍA
  eventos: {
    targetAudience: 'personas y empresas que organizan matrimonios, cumpleaños, eventos corporativos y celebraciones',
    painPoint: 'los organizadores de eventos necesitan cotizar rápido y ver fotos de banquetes o montajes reales; sin una web organizada, descartan el proveedor por falta de formalidad',
    valueProposition: 'un showroom digital para eventos con galería fotográfica, paquetes de cotización descargables y contacto directo',
    benefits: [
      'Galería fotográfica de montajes y eventos realizados',
      'Calculadora / solicitud de cotización por número de invitados',
      'Enlace directo a WhatsApp para atención ejecutiva de eventos',
      'Respaldo de reseñas de clientes satisfechos'
    ],
    whatsappHook: 'vimos sus increíbles calificaciones como {category} en {district} (⭐ {rating}). Notamos que no tienen una página web donde los clientes puedan explorar su catálogo completo y cotizar su evento directamente por WhatsApp.'
  },

  // TECNOLOGÍA Y SERVICIO TÉCNICO
  tecnologia: {
    targetAudience: 'usuarios que necesitan reparar celulares, laptops o instalar cámaras de seguridad con repuestos garantizados',
    painPoint: 'el miedo a que cambien piezas o estafen hace que los clientes busquen desesperadamente talleres con web formal y garantía escrita',
    valueProposition: 'una landing page tecnológica con consulta de presupuesto express por modelo, mapa de local y política de garantía transparente',
    benefits: [
      'Consulta de presupuesto por modelo y falla en WhatsApp',
      'Certificado de garantía y repuestos originales a la vista',
      'Ubicación céntrica y horarios de atención actualizados',
      'Insignia de servicio técnico verificado Todo Lima'
    ],
    whatsappHook: 'vimos su gran reputación técnica en {district} con ⭐ {rating} en Google Maps. Sin embargo, no tienen una web donde el cliente pueda consultar el costo de reparación de su equipo antes de visitar la tienda.'
  }
};

/**
 * Mapeo de cada slug de categoría a su nicho macro
 */
export const CATEGORY_NICHE_MAP = {
  // Salud
  'doctores': 'salud',
  'dentistas': 'salud',
  'psicologos': 'salud',
  'pediatras': 'salud',
  'dermatologos': 'salud',
  'veterinarias': 'salud',
  'fisioterapia': 'salud',
  'nutricionistas': 'salud',
  'oftalmologos': 'salud',
  'ginecologos': 'salud',

  // Hogar
  'cerrajeros': 'hogar',
  'gasfiteros': 'hogar',
  'electricistas': 'hogar',
  'pintores': 'hogar',
  'carpinteros': 'hogar',
  'vidrierias': 'hogar',
  'fumigacion': 'hogar',
  'mudanzas': 'hogar',
  'aire-acondicionado': 'hogar',
  'reparacion-lavadoras': 'hogar',
  'reparacion-refrigeradoras': 'hogar',

  // Legal
  'abogados': 'legal',
  'notarias': 'legal',
  'contadores': 'legal',
  'agentes-inmobiliarios': 'legal',

  // Automotriz
  'talleres-mecanicos': 'automotriz',
  'auxilio-mecanico': 'automotriz',
  'llanterias': 'automotriz',
  'car-wash': 'automotriz',

  // Belleza
  'barberias': 'belleza',
  'salones-de-belleza': 'belleza',
  'spas': 'belleza',

  // Eventos
  'catering': 'eventos',
  'fotografia-eventos': 'eventos',
  'tortas-personalizadas': 'eventos',

  // Tecnología
  'reparacion-celulares': 'tecnologia',
  'reparacion-laptops': 'tecnologia',
  'camaras-de-seguridad': 'tecnologia'
};

/**
 * Obtiene la plantilla de nicho correspondiente para una categoría
 * @param {string} categorySlug
 */
export function getNicheTemplate(categorySlug) {
  const nicheKey = CATEGORY_NICHE_MAP[categorySlug] || 'hogar';
  return {
    nicheKey,
    ...NICHE_TEMPLATES[nicheKey]
  };
}
