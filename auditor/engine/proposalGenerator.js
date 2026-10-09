/**
 * Generador Inteligente de Propuestas Comerciales, Embudos de Conversión y RevOps para Todo Lima.
 * Integra metodologías de vanguardia: Sales Funnels, CRO, Speed-to-Lead, Conversational Commerce y GEO.
 */

import { getNicheTemplate } from '../config/nicheTemplates.js';

/**
 * Limpia y genera un slug amigable para subdominio
 */
function slugify(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 30);
}

/**
 * Genera la propuesta y diagnóstico comercial para un negocio auditado
 * @param {object} business Objeto del negocio desde el JSON
 * @param {string} categorySlug Slug de la categoría (ej. "dentistas")
 * @param {string} district Distrito de Lima identificado
 * @param {object} phoneData Objeto con información del teléfono
 * @param {object} webAudit Resultado de la auditoría técnica de la web
 */
export function generateProposal(business, categorySlug, district, phoneData, webAudit) {
  const niche = getNicheTemplate(categorySlug);
  const name = business.name || 'Estimado profesional';
  const rating = business.rating ? Number(business.rating).toFixed(1) : '5.0';
  const reviewsCount = business.reviewsCount || 0;
  const reviews = reviewsCount ? `${reviewsCount} opiniones` : 'excelentes opiniones';
  const businessSlug = slugify(name);
  const suggestedSubdomain = `${businessSlug}.${categorySlug}.todolima.com`;

  let status = 'NEEDS_WEBSITE';
  let priority = 'MEDIUM';
  let proposalTitle = '';
  let whatsappPitch = '';
  let executiveSummary = '';
  let salesArguments = [];
  let callScript = '';

  // Estimación de Fuga de Ingresos Mensual en Soles (Revenue Leakage)
  // Basada en tráfico estimado por volumen de reseñas en Google Maps
  const baseMonthlyLeads = Math.max(15, Math.min(300, Math.round(reviewsCount * 1.5)));
  const estimatedTicketSoles = ['dentistas', 'doctores', 'traumatologos', 'abogados', 'arquitectos'].includes(categorySlug) ? 250 : 80;
  const lostLeadsRate = (webAudit.type === 'NO_WEBSITE' || !webAudit.hasWhatsApp) ? 0.45 : 0.25;
  const monthlyLostRevenueSoles = Math.round(baseMonthlyLeads * lostLeadsRate * estimatedTicketSoles);

  const isHighVolume = reviewsCount >= 40 || (business.rating || 0) >= 4.5;
  const isOperationalNiche = [
    'dentistas', 'doctores', 'veterinarias', 'talleres-mecanicos', 
    'escuelas-de-manejo', 'locales-de-eventos', 'alquiler-de-canchas', 
    'laboratorios-clinicos', 'traumatologos', 'podologos'
  ].includes(categorySlug);

  // Clasificación por Oportunidad de Ecosistema & Embudo
  if (webAudit.type === 'NO_WEBSITE' || webAudit.type === 'INVALID_URL') {
    status = 'NEEDS_WEBSITE';
    priority = (business.rating >= 4.5 && phoneData.isMobile) ? 'CRITICAL' : 'HIGH';
  } else if (webAudit.type === 'SOCIAL_ONLY') {
    status = 'UPGRADE_SOCIAL';
    priority = phoneData.isMobile ? 'HIGH' : 'MEDIUM';
  } else if (webAudit.score < 60 || !webAudit.accessible || !webAudit.hasWhatsApp) {
    status = 'REDESIGN_WEBSITE';
    priority = phoneData.isMobile ? 'HIGH' : 'MEDIUM';
  } else if (isOperationalNiche && isHighVolume) {
    status = 'AI_AGENT_CRM_SOFTWARE';
    priority = 'CRITICAL';
  } else if (webAudit.techStack && (webAudit.techStack.includes('WordPress') || webAudit.outdatedYear)) {
    status = 'SECURITY_HARDENING';
    priority = 'HIGH';
  } else if (isHighVolume) {
    status = 'GROWTH_MARKETING_ADS';
    priority = 'HIGH';
  } else {
    status = 'ENTERPRISE_360';
    priority = 'MEDIUM';
  }

  // 1. CASO A: SIN PÁGINA WEB -> Lanzamiento de Embudo de Ventas & Conversión
  if (status === 'NEEDS_WEBSITE') {
    proposalTitle = `Ecosistema de Embudo de Ventas & Conversión WhatsApp para ${name}`;

    salesArguments = [
      `Fuga de facturación estimada: ~S/ ${monthlyLostRevenueSoles.toLocaleString()} al mes por falta de embudo propio y puntos de contacto friccionados.`,
      `Tracción local actual: ⭐ ${rating} en Google Maps (${reviews}) en ${district}, con alto interés de compra desperdiciado.`,
      `Solución de Embudo: Landing page ultrarrápida (< 1s) conectada a subdominio oficial (${suggestedSubdomain}) diseñada para convertir visitas en chats de WhatsApp.`,
      `Captura instantánea: Botón flotante con pre-calificación para cerrar ventas en segundos.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, les saluda el equipo de *Todo Lima* (todolima.com).

Vimos que tienen una excelente calificación en Google Maps en *${district}* (⭐ *${rating}* con ${reviews}) ¡Felicitaciones! 👏

Al auditar su presencia digital, identificamos que *no cuentan con un embudo web de ventas propio*. En Lima, hasta el 50% de clientes que buscan en Google abandonan si no encuentran una landing page con catálogo y botón directo para cotizar por WhatsApp (fuga estimada de ~S/ ${monthlyLostRevenueSoles.toLocaleString()}/mes).

En *Todo Lima* implementamos **Embudos de Alta Conversión para Negocios Locales**:
✅ Landing page móvil ultrarrápida (< 1 seg) bajo subdominio verificado: *${suggestedSubdomain}*
✅ Botón de WhatsApp directo con mensaje preconfigurado para acelerar el cierre
✅ Ficha oficial destacada en todolima.com
✅ Posicionamiento en motores de IA (AEO / GEO para ChatGPT y Google AI)

Preparamos una maqueta interactiva sin costo para *${name}*. ¿Les gustaría ver el enlace de prueba? 🚀`;

    executiveSummary = `${name} cuenta con sólida confianza en ${district} (⭐ ${rating}), pero pierde aproximadamente S/ ${monthlyLostRevenueSoles.toLocaleString()} mensuales al carecer de un embudo web propietario. Se propone el despliegue de una arquitectura de conversión mobile-first con canalización a WhatsApp.`;

    callScript = `Hola, buenos días, ¿me comunico con ${name}? Mi nombre es [Tu Nombre] de Todo Lima. Los contacto porque tienen una de las mejores calificaciones de ${district} en Google Maps, pero notamos que no cuentan con un embudo web para recibir y cotizar pacientes/clientes en WhatsApp. Estimamos que se están fugando varias cotizaciones al mes. Diseñamos un prototipo gratuito de cómo quedaría su embudo de conversión. ¿A qué WhatsApp puedo compartirles el enlace demo?`;
  }

  // 2. CASO B: SOLO RED SOCIAL -> Migración a Ecosistema Web Propio
  else if (status === 'UPGRADE_SOCIAL') {
    proposalTitle = `Migración a Ecosistema Web Propio y Reducción de Fricción para ${name}`;

    salesArguments = [
      `Dependencia de terceros: Actualmente dirigen a los clientes hacia su perfil de ${webAudit.provider}.`,
      `Fricción y distracción: Las redes sociales obligan a iniciar sesión y muestran publicidad de competidores directos en ${district}.`,
      `Fuga estimada: ~S/ ${monthlyLostRevenueSoles.toLocaleString()} al mes en clientes que prefieren cotizar rápido sin entrar a una red social.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, les escribe el área de crecimiento de *Todo Lima*.

Revisamos su excelente reputación en Google Maps en *${district}* (⭐ *${rating}*). Notamos que su único enlace web apunta a *${webAudit.provider}*.

Muchos clientes en Lima prefieren consultar tarifas y servicios en un portal independiente rápido, sin distracciones de la competencia ni la obligación de abrir una app social.

Podemos complementar su ${webAudit.provider} con un **Embudo de Conversión Web Propio** (*${suggestedSubdomain}*) integrado con WhatsApp directo y presencia destacada en Todo Lima.

Tenemos una demo lista para mostrarles sin compromiso. ¿Les comparto el acceso? 📲`;

    executiveSummary = `${name} depende exclusivamente de ${webAudit.provider}. Se propone migrar a un ecosistema web independiente con catálogo y captación directa para blindar la conversión y reducir el costo de adquisición de clientes.`;

    callScript = `Hola, ¿hablo con ${name}? Los saludo de Todo Lima. Vimos sus excelentes recomendaciones en ${district}. Les consulto: vimos que en Google solo tienen vinculado su perfil de ${webAudit.provider}. ¿Han evaluado tener su propia página web oficial con embudo de WhatsApp para clientes que buscan directamente en Google? Les preparamos una demo sin costo. ¿Se las comparto a este número?`;
  }

  // 3. CASO C: WEB CON FALLAS O LENTA -> Optimización de Embudo & CRO
  else if (status === 'REDESIGN_WEBSITE') {
    proposalTitle = `Auditoría CRO, Optimización de Embudo y Aceleración Web para ${name}`;

    const mainIssuesList = webAudit.issues.slice(0, 3).map(i => `• ${i}`).join('\n');

    salesArguments = [
      `Puntaje de conversión y velocidad: ${webAudit.score}/100.`,
      `Fuga por latencia: Su web tarda ${(webAudit.latencyMs / 1000).toFixed(1)}s en cargar. En celulares, cada segundo adicional reduce la conversión en 20%.`,
      ...webAudit.issues.slice(0, 2),
      `Optimización CRO: Rediseño del embudo con carga instantánea y botón de WhatsApp optimizado para duplicar contactos calificados.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, gusto en saludarlos.

Les escribimos desde *Todo Lima*. Al evaluar a los principales referentes de *${district}* (⭐ *${rating}*), realizamos una auditoría técnica y de conversión a su web (*${webAudit.url}*).

Detectamos puntos críticos que están frenando sus conversiones de compra:
${mainIssuesList}
${webAudit.latencyMs > 2500 ? `👉 *Velocidad:* Tarda ${(webAudit.latencyMs / 1000).toFixed(1)}s en cargar en celulares (el estándar recomendado es < 1.5s).` : ''}
${!webAudit.hasWhatsApp ? '👉 *Atención inmediata:* Carece de botón de WhatsApp flotante para cerrar cotizaciones en tiempo real.' : ''}

Podemos modernizar su web hacia un **Embudo de Alta Conversión (CRO)** que cargue al instante y multiplique sus contactos. ¿Les gustaría recibir el reporte completo? 📊`;

    executiveSummary = `Auditoría técnica y de conversión sobre ${webAudit.url} de ${name}. Puntaje: ${webAudit.score}/100. Se detectaron puntos críticos de fuga de prospectos (${webAudit.issues.join('; ')}). Se propone reconstrucción con arquitectura Next.js de alta velocidad y optimización de embudo de ventas.`;

    callScript = `Hola, buenos días, llamo de Todo Lima. Realizamos una auditoría de velocidad y conversión a las webs comerciales de ${district} y analizamos la página de ${name}. Detectamos que su web tiene lentitud de carga y problemas para convertir visitas móviles en WhatsApp. Queríamos hacerles llegar el reporte gratuito y una propuesta de optimización. ¿A qué contacto de gerencia se lo podemos enviar?`;
  }

  // 4. CASO D: AGENTE IA 24/7 & SPEED-TO-LEAD (Alto Flujo Operativo)
  else if (status === 'AI_AGENT_CRM_SOFTWARE') {
    proposalTitle = `Automatización con Agente IA 24/7, Speed-to-Lead y CRM para ${name}`;

    salesArguments = [
      `Regla de Oro Speed-to-Lead: Responder a un prospecto en menos de 2 minutos multiplica por 7 la tasa de cierre frente a responder en 30 minutos.`,
      `Alta demanda operativa: Cuentan con ${reviews} en ${district}, recibiendo consultas constantes.`,
      `Fuga fuera de horario: Hasta el 45% de consultas ocurren en noches o fines de semana sin personal activo.`,
      `Solución IA Conversacional: Asistente entrenado en WhatsApp que atiende en 5 segundos, responde dudas, filtra clientes y agenda citas en CRM.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, los saludamos desde *Todo Lima* (todolima.com).

Felicitamos a su equipo por su destacada reputación y demanda en *${district}* (⭐ *${rating}* con ${reviews}). 🏆

Viendo el alto flujo de su rubro, implementamos **Agentes de Inteligencia Artificial para WhatsApp con enfoque Speed-to-Lead**:
🤖 **Respuesta en 5 segundos (24/7):** Ningún cliente queda esperando, incluso de noche o domingos.
📅 **Agendamiento Inteligente:** Citas sincronizadas en Google Calendar sin requerir secretarias atendiendo el celular 24 horas.
📊 **CRM Centralizado:** Recordatorios automáticos 24h antes que reducen las inasistencias en 40%.
🔄 **Reactivación de Clientes:** Campañas automatizadas a su base histórica con un solo clic.

¿Les gustaría ver una demostración de 5 minutos de un Asistente IA configurado para ${name}? Quedamos a su disposición. 🚀`;

    executiveSummary = `${name} maneja alta demanda en ${district}. La mayor fuga de facturación ocurre por demoras en la atención de WhatsApp fuera de horario comercial. Se propone la implementación de un Asistente IA 24/7 con integración CRM y agendamiento automático.`;

    callScript = `Hola, me comunico con administración de ${name}. Mi nombre es [Tu Nombre] de Todo Lima. Vemos que tienen una demanda altísima en ${district} con ${reviews} en Google. Ayudamos a clínicas y negocios de su sector a implementar Asistentes de IA en WhatsApp para que atiendan en menos de 5 segundos, coticen y agenden citas 24/7 sin perder prospectos. ¿Con quién puedo coordinar 10 minutos para mostrarles una demo funcionando?`;
  }

  // 5. CASO E: CIBERSEGURIDAD, WAF & BLINDAJE
  else if (status === 'SECURITY_HARDENING') {
    proposalTitle = `Blindaje de Ciberseguridad, WAF en Cloudflare y Protección Web para ${name}`;

    salesArguments = [
      `Vulnerabilidad en CMS: Su sitio web utiliza ${webAudit.techStack?.join(', ') || 'tecnología CMS tradicional'} con exposición perimetral.`,
      `Falta de cabeceras de seguridad: Sin políticas HSTS o CSP para prevenir inyecciones y ataques de malware.`,
      `Solución Cloudflare WAF: Blindaje perimetral, mitigación anti-DDoS, certificado SSL bancario y respaldos automáticos.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, les escribe el área técnica de *Todo Lima*.

Al monitorear la infraestructura web en *${district}*, detectamos que su portal (*${webAudit.url}*) presenta vulnerabilidades en cabeceras HTTP y configuraciones de servidor que podrían exponerlo a inyecciones de código, malware o advertencias de seguridad en Google.

Contamos con un servicio especializado de **Blindaje Web & Ciberseguridad**:
🛡️ Implementación de Firewall WAF en Cloudflare y protección perimetral
🔒 Cabeceras estrictas HSTS y cifrado grado bancario
⚡ Mitigación de brechas en CMS y formularios
💾 Respaldos automáticos en la nube

¿Les interesaría recibir el reporte técnico de vulnerabilidades preventivo sin costo? 📋`;

    executiveSummary = `Escaneo de ciberseguridad sobre ${webAudit.url} de ${name}. Se detectaron riesgos de exposición perimetral en cabeceras y gestores de contenido. Se propone blindaje perimetral con Cloudflare WAF y cifrado HSTS.`;

    callScript = `Hola, me comunico con el área de sistemas o administración de ${name}. Los contacto de Todo Lima. Al realizar un monitoreo de seguridad en ${district}, detectamos que su portal web tiene vulnerabilidades en cabeceras que facilitan ataques automatizados. Queríamos hacerles llegar el informe preventivo. ¿A qué contacto técnico se lo comparto?`;
  }

  // 6. CASO F: PAUTA PUBLICITARIA, CLICK-TO-WHATSAPP ADS & CONTENIDO (Growth)
  else if (status === 'GROWTH_MARKETING_ADS') {
    proposalTitle = `Estrategia de Escala: Click-to-WhatsApp Ads, Tracking Server-Side y Video para ${name}`;

    salesArguments = [
      `Demanda no capturada: Excelente calificación (⭐ ${rating}), pero sin pauta activa para capturar búsquedas transaccionales en Google o Meta.`,
      `Falta de Conversions API: La pérdida de datos por bloqueadores de anuncios y cookies de terceros impide optimizar el costo por cliente.`,
      `Click-to-WhatsApp Ads: Campañas de Meta geolocalizadas en ${district} que abren chats con clientes con alta intención de compra.`,
      `Producción de Video Vertical: Reels y TikToks para consolidar la marca como la autoridad #1 de la zona.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, les saluda el equipo de crecimiento de *Todo Lima*.

Revisamos su posicionamiento en *${district}* (⭐ *${rating}*) y vemos que cuentan con un gran prestigio en su sector. 🌟

Sin embargo, notamos que no están aprovechando las estrategias avanzadas de captación digital:
🎯 **Anuncios Click-to-WhatsApp (Meta Ads):** Tráfico calificado directo a su chat de WhatsApp con ventana comercial prioritaria.
📈 **Tracking de Servidor (Conversions API):** Medición exacta de ventas sin depender de píxeles bloqueados.
🎬 **Producción de Contenido y Reels:** Videos verticales de alta autoridad que generan confianza inmediata.
⭐ **Flywheel de Reseñas:** Automatización para solicitar y publicar testimonios positivos en Google Maps.

¿Les gustaría evaluar un plan para incrementar sus clientes este mes con retorno medible? 📈`;

    executiveSummary = `${name} cuenta con validación social en ${district}. Se propone una estrategia de crecimiento basada en Click-to-WhatsApp Ads, tracking server-side y producción audiovisual vertical.`;

    callScript = `Hola, buenas tardes, me comunico con la gerencia de marketing de ${name}. Los saludo de Todo Lima. Vemos su calificación de ${rating} estrellas en ${district}. Ayudamos a empresas líderes de su sector a implementar campañas Click-to-WhatsApp Ads y videos con retorno de inversión medible. ¿Con quién puedo coordinar 5 minutos para explicarles los detalles?`;
  }

  // 7. CASO G: CONSULTORÍA INTEGRAL 360° & REVOPS
  else {
    proposalTitle = `Transformación Digital 360°, RevOps e Inteligencia Artificial para ${name}`;

    salesArguments = [
      `Empresa referente en ${district} con calificación ⭐ ${rating} y presencia digital activa.`,
      `Enfoque RevOps: Unificación de marketing, embudo de conversión, IA conversacional y retención en un solo sistema.`,
      `Visibilidad GEO & AEO: Posicionamiento prioritario en motores de respuesta con Inteligencia Artificial (ChatGPT, Perplexity, Google AI Overviews).`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, los saludamos desde *Todo Lima* (todolima.com).

Auditamos su presencia digital en *${district}* y queremos felicitarlos por ser un referente destacado en su categoría. 🌟

En *Todo Lima* trabajamos como **Partner Tecnológico y de Crecimiento Integral 360°**:
🤖 Agentes de IA en WhatsApp para atención y citas en < 5 segundos
💻 Embudos de conversión y software a medida para automatizar operaciones
🛡️ Auditoría de ciberseguridad continua y blindaje WAF
🔍 Posicionamiento en motores de IA (GEO & AEO para ChatGPT y Google AI)
⭐ Sello oficial de "Negocio Verificado" en todolima.com

Nos encantaría conversar sobre cómo optimizar la captación y rentabilidad de ${name}. ¿Podemos agendar una videollamada de 10 minutos? 🤝`;

    executiveSummary = `Alianza tecnológica integral para ${name}. Se propone integrar soluciones de Agentes de IA, Embudos de Conversión, Ciberseguridad y GEO para consolidar su liderazgo de mercado en ${district}.`;

    callScript = `Hola, me comunico con la gerencia general de ${name}. Los contacto de Todo Lima. Felicitamos a su equipo por su liderazgo en ${district}. Deseamos presentarles nuestra consultoría tecnológica 360° en IA y embudos de ventas. ¿Con quién de dirección puedo coordinar una reunión breve?`;
  }

  // Enlace directo de WhatsApp condicionado a política inbound
  let whatsappUrl = null;
  if (phoneData.isMobile && phoneData.international) {
    const encodedText = encodeURIComponent(whatsappPitch);
    whatsappUrl = `https://wa.me/${phoneData.international}?text=${encodedText}`;
  }

  const deliverablesByStatus = {
    NEEDS_WEBSITE: [
      'Desarrollo de Embudo Mobile-First de alta conversión (< 1s de carga)',
      'Alojamiento cloud de alta disponibilidad en Cloudflare Edge',
      'Botón directo a WhatsApp con pre-calificación de prospectos',
      'Estructuración SEO, AEO y GEO para Google Maps y motores de IA',
      'Insignia de Negocio Verificado en todolima.com'
    ],
    UPGRADE_SOCIAL: [
      'Ecosistema web independiente sin distracciones de competidores',
      'Catálogo / Carta digital interactiva accesible por QR',
      'Integración directa de pedidos y reservas a WhatsApp',
      'Posicionamiento orgánico para búsquedas de compra local en Google'
    ],
    REDESIGN_WEBSITE: [
      'Migración de arquitectura a Next.js 14 y Core Web Vitals en verde',
      'Optimización de tasa de conversión (CRO) y diseño Mobile-First',
      'Integración de botón flotante de WhatsApp y analítica de clics',
      'Certificado SSL bancario y velocidad de carga menor a 1.2 segundos'
    ],
    AI_AGENT_CRM_SOFTWARE: [
      'Agente de Inteligencia Artificial para WhatsApp 24/7 (Speed-to-Lead < 5s)',
      'Configuración de CRM visual tipo Kanban para control de prospectos',
      'Agendamiento automático de citas sincronizado en tiempo real',
      'Recordatorios automáticos 24h antes por WhatsApp para reducir ausencias',
      'Campañas de reactivación periódica a clientes inactivos'
    ],
    SECURITY_HARDENING: [
      'Auditoría completa de vulnerabilidades y escaneo perimetral',
      'Implementación de Cloudflare WAF, anti-DDoS y cabeceras HSTS/CSP',
      'Blindaje de formularios con protección anti-spam y CAPTCHA',
      'Copias de seguridad diarias automatizadas en la nube'
    ],
    GROWTH_MARKETING_ADS: [
      'Campañas de Click-to-WhatsApp Ads en Meta y Google Ads Search',
      'Instalación de Conversions API (CAPI) para tracking de servidor',
      'Producción y edición de videos verticales (Reels / TikTok) de alta autoridad',
      'Motor automatizado de solicitud de reseñas en Google Maps'
    ],
    ENTERPRISE_360: [
      'Consultoría integral de RevOps y crecimiento recurrente',
      'Desarrollo de Software y herramientas a medida para la empresa',
      'Automatización con Inteligencia Artificial y CRM corporativo',
      'Blindaje de ciberseguridad continua y monitoreo 24/7',
      'Posición preferencial y patrocinada en todolima.com'
    ]
  };

  return {
    status,
    priority,
    suggestedSubdomain,
    proposalTitle,
    salesArguments,
    whatsappPitch,
    whatsappUrl,
    executiveSummary,
    callScript,
    monthlyLostRevenueSoles,
    contactPolicy: 'INBOUND_ONLY',
    deliverables: deliverablesByStatus[status] || deliverablesByStatus.NEEDS_WEBSITE
  };
}
