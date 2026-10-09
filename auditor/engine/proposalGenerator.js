/**
 * Generador Inteligente de Propuestas Comerciales y Pitches de Venta para Todo Lima.
 * Crea mensajes persuasivos de WhatsApp, propuestas ejecutivas y guiones telefónicos
 * personalizados según la situación técnica real de cada negocio.
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
 * Genera la propuesta y pitches comerciales para un negocio auditado
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
  const reviews = business.reviewsCount ? `${business.reviewsCount} opiniones` : 'excelentes opiniones';
  const businessSlug = slugify(name);
  const suggestedSubdomain = `${businessSlug}.${categorySlug}.todolima.com`;

  let status = 'NEEDS_WEBSITE';
  let priority = 'MEDIUM';
  let proposalTitle = '';
  let whatsappPitch = '';
  let executiveSummary = '';
  let salesArguments = [];
  let callScript = '';

  // Determinar estatus de la oportunidad comercial y tier tecnológico
  const isHighVolume = (business.reviewsCount || 0) >= 40 || (business.rating || 0) >= 4.5;
  const isOperationalNiche = ['dentistas', 'doctores', 'veterinarias', 'talleres-mecanicos', 'escuelas-de-manejo', 'locales-de-eventos', 'alquiler-de-canchas', 'laboratorios-clinicos', 'traumatologos', 'podologos'].includes(categorySlug);

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
    // Negocio consolidado con alto flujo operativo -> Software a Medida, Agente IA & CRM
    status = 'AI_AGENT_CRM_SOFTWARE';
    priority = 'CRITICAL';
  } else if (webAudit.techStack && (webAudit.techStack.includes('WordPress') || webAudit.outdatedYear)) {
    // Riesgo de seguridad o CMS expuesto
    status = 'SECURITY_HARDENING';
    priority = 'HIGH';
  } else if (isHighVolume) {
    // Negocio de alto tráfico -> Marketing Digital, Paid Ads & Contenido
    status = 'GROWTH_MARKETING_ADS';
    priority = 'HIGH';
  } else {
    // Consultoría Tecnológica & Partner 360°
    status = 'ENTERPRISE_360';
    priority = 'MEDIUM';
  }

  // 1. CASO A: NO TIENEN PÁGINA WEB (Digitalización Express)
  if (status === 'NEEDS_WEBSITE') {
    proposalTitle = `Propuesta de Lanzamiento Web & Captación WhatsApp para ${name}`;

    salesArguments = [
      `Posicionamiento actual: Tienen ⭐ ${rating} en Google Maps (${reviews}), generando alta intención de búsqueda en ${district}.`,
      `Fuga de clientes: Al no contar con web propia, hasta un 70% de usuarios optan por competidores con catálogo y contacto rápido.`,
      `Solución inmediata: Landing page ultrarrápida (< 1s) conectada a su subdominio exclusivo en Todo Lima (${suggestedSubdomain}) y a su WhatsApp.`,
      `Captura directa: Botón de WhatsApp flotante con mensaje precargado para cerrar cotizaciones en segundos.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, los saluda el equipo de *Todo Lima* (todolima.com).

Vimos que son uno de los negocios con mejor reputación en Google Maps en *${district}* (⭐ *${rating}* con ${reviews}) ¡Felicitaciones por tan buen trabajo! 👏

Revisamos su ficha y notamos que *aún no cuentan con una página web oficial* donde sus clientes puedan consultar sus servicios y agendar directamente por WhatsApp.

En *Todo Lima* creamos landing pages ultrarrápidas pensadas para negocios locales:
✅ Subdominio verificado: *${suggestedSubdomain}*
✅ Botón de WhatsApp directo para recibir pedidos y citas al instante
✅ Mapa interactivo para que lleguen a su local en ${district}
✅ Carga en menos de 1 segundo en celulares
✅ Ficha destacada en el directorio todolima.com

Preparamos una demostración sin costo de cómo se vería la web de *${name}*. ¿Les gustaría que les comparta el enlace de prueba por aquí? 🚀`;

    executiveSummary = `El negocio ${name} cuenta con un excelente posicionamiento de confianza en ${district} con calificación ⭐ ${rating} y ${reviews}. Sin embargo, carece de presencia digital propietaria, dependiendo exclusivamente del perfil de Google Maps. Se propone la implementación de una página web de alta velocidad y conversión con botón directo a WhatsApp y presencia en todolima.com.`;

    callScript = `Hola buenos días/tardes, ¿me comunico con ${name}? Mucho gusto, mi nombre es [Tu Nombre] de Todo Lima. La razón de mi llamada es muy breve: vimos que tienen una de las calificaciones más altas de ${district} en Google con ${rating} estrellas, pero al buscar su web para que clientes nuevos coticen por WhatsApp vimos que no la tienen registrada. En Todo Lima estamos activando las webs oficiales de los 10 mejores negocios de la zona para que reciban clientes directos en su celular. ¿Con quién puedo coordinar 2 minutos para enviarles un enlace demo gratuito de cómo quedaría?`;
  }

  // 2. CASO B: TIENEN SOLO RED SOCIAL (Migración a Web Propia)
  else if (status === 'UPGRADE_SOCIAL') {
    proposalTitle = `Propuesta de Migración a Web Profesional y Captación Directa para ${name}`;

    salesArguments = [
      `Presencia actual limitada: Tienen su enlace apuntando a ${webAudit.provider}.`,
      `Limitación técnica: Las redes sociales obligan al cliente a iniciar sesión, muestran anuncios de la competencia y no posicionan en Google para búsquedas locales transaccionales.`,
      `Ventaja competitiva: Una web propia eleva el valor percibido y multiplica la conversión directa sin intermediarios.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, les escribe el equipo de *Todo Lima*.

Revisamos su destacada presencia en Google Maps en *${district}* (⭐ *${rating}* estrellas). Notamos que su enlace de contacto actual es un perfil de *${webAudit.provider}*.

Muchos clientes que buscan servicios en Google prefieren una web rápida donde ver catálogo, fotos y tarifas sin tener que entrar a una red social o ver distracciones de la competencia.

¿Les interesaría complementar su ${webAudit.provider} con una página web oficial (*${suggestedSubdomain}*) con botón directo a WhatsApp y presencia prioritaria en Todo Lima?

Tenemos una maqueta lista para mostrarles sin compromiso. ¿Se las comparto por este medio? 📲`;

    executiveSummary = `${name} utiliza un perfil de ${webAudit.provider} como único punto de aterrizaje web. Si bien genera interacción social, carece de independencia de marca y fricciona la conversión de usuarios que buscan en Google sin tener la aplicación abierta. Se propone dotar al negocio de un portal web propio de conversión instantánea.`;

    callScript = `Hola, ¿hablo con ${name}? Le saludo de Todo Lima. Vi que tienen excelentes recomendaciones en ${district}. Quería consultarles: vimos que en Google solo tienen vinculado su perfil de ${webAudit.provider}. ¿Han evaluado tener su propia web oficial con botón de WhatsApp directo para los clientes que buscan en Google? Les preparamos una demo sin costo. ¿Le puedo enviar el link a este WhatsApp?`;
  }

  // 3. CASO C: SITIO WEB DEFICIENTE O LENTO (Rediseño & Conversión)
  else if (status === 'REDESIGN_WEBSITE') {
    proposalTitle = `Auditoría y Plan de Optimización Web para ${name}`;

    const mainIssuesList = webAudit.issues.slice(0, 3).map(i => `• ${i}`).join('\n');

    salesArguments = [
      `Puntaje de rendimiento técnico actual: ${webAudit.score}/100.`,
      ...webAudit.issues.slice(0, 3),
      `Oportunidad: Modernizar la web hacia una arquitectura Next.js de carga instantánea con botón de WhatsApp para duplicar prospectos.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, gusto en saludarlos.

Les escribimos desde *Todo Lima*. Al revisar a los referentes de *${district}* (donde ustedes destacan con ⭐ *${rating}*), realizamos una auditoría técnica gratuita a su web actual (*${webAudit.url}*).

Detectamos algunos puntos críticos que podrían estar frenando sus consultas:
${mainIssuesList}

${!webAudit.hasWhatsApp ? '👉 *Dato clave:* El 65% de usuarios en Lima abandonan una web si no encuentran un botón flotante de WhatsApp para consultar en el momento.' : ''}
${webAudit.latencyMs > 3000 ? `👉 *Velocidad:* Su web tarda ${(webAudit.latencyMs / 1000).toFixed(1)}s en responder, cuando el estándar recomendado para móviles es menor a 1.5s.` : ''}

Podemos modernizar su web para que cargue al instante y multiplique sus contactos por WhatsApp. ¿Les gustaría que les enviemos el reporte técnico completo? 📊`;

    executiveSummary = `Auditoría técnica realizada sobre el dominio ${webAudit.url} de ${name}. Puntaje obtenido: ${webAudit.score}/100. Se identificaron fricciones clave en conversión y experiencia móvil (${webAudit.issues.join('; ')}). Se propone actualización y optimización a plataforma Next.js con embudo directo a WhatsApp.`;

    callScript = `Hola, buenos días, llamo de Todo Lima. Hicimos una auditoría de rendimiento a las páginas web de los mejores negocios de ${district} y vimos la web de ${name}. Detectamos que actualmente ${webAudit.issues[0] || 'tiene una velocidad de carga lenta en celulares'}. Queríamos hacerles llegar el reporte gratuito y una propuesta de optimización para que reciban más clientes en WhatsApp. ¿A qué número o correo se los podemos enviar?`;
  }

  // 4. CASO D: AGENTE IA, CRM & SOFTWARE A MEDIDA (Flujo Operativo Alto)
  else if (status === 'AI_AGENT_CRM_SOFTWARE') {
    proposalTitle = `Solución de Automatización con Agente IA 24/7 y Software CRM a Medida para ${name}`;

    salesArguments = [
      `Volumen comercial alto: Cuentan con ${reviews} y gran tracción en ${district}.`,
      `Pérdida de prospectos por tiempo de respuesta: Hasta el 45% de clientes cotizan fuera de horario comercial o en fines de semana.`,
      `Solución de IA: Agente de Inteligencia Artificial en WhatsApp que atiende en 5 segundos, responde precios, filtra clientes y agenda citas automáticamente.`,
      `Software y CRM a medida: Pipeline visual para organizar prospectos, citas confirmadas y seguimiento post-venta sin perder chats.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, los saludamos desde *Todo Lima* (todolima.com).

Revisamos su excelente reputación en *${district}* (⭐ *${rating}* con ${reviews}) y felicitamos a su equipo por su gran volumen de pacientes y clientes. 🏆

Viendo la alta demanda de su rubro, desarrollamos **Agentes de Inteligencia Artificial para WhatsApp y Software CRM a Medida** diseñados para empresas líderes:
🤖 **Asistente IA 24/7:** Responde consultas de servicios, precios y disponibilidad en segundos, incluso de noche o domingos.
📅 **Agendamiento y Reservas Automáticas:** Sincronizado en tiempo real sin requerir una persona atendiendo el celular todo el día.
📊 **CRM & Pipeline de Ventas:** Control de prospectos, recordatorios automáticos de citas (reduce inasistencias en 40%) y reactivación de clientes antiguos.
🛡️ **Software a Medida:** Adaptado 100% a la operativa de ${name}.

¿Les gustaría ver una demostración de 5 minutos de un Agente IA configurado para su negocio? Quedamos a su disposición. 🚀`;

    executiveSummary = `${name} posee un alto volumen de clientes en ${district}. La principal fuga de ingresos en este segmento se produce por retrasos en atención por WhatsApp y gestión manual de citas. Se propone la implementación de un Agente de Inteligencia Artificial conversacional 24/7 y un sistema CRM / Software a medida para automatizar el agendamiento y maximizar conversiones.`;

    callScript = `Hola, buenos días, me comunico con gerencia o administración de ${name}. Mi nombre es [Tu Nombre] de Todo Lima. Vemos que tienen una demanda altísima en ${district} con más de ${reviews} en Google. Les llamo porque ayudamos a las principales empresas de su sector a implementar Asistentes de Inteligencia Artificial en WhatsApp para que atiendan cotizaciones y agenden citas 24/7 sin que se les escape ningún cliente fuera de horario. ¿Con quién puedo coordinar una videollamada de 10 minutos para mostrarles una demo funcionando?`;
  }

  // 5. CASO E: CIBERSEGURIDAD, BLINDAJE & PROTECCIÓN ANTI-HACKING
  else if (status === 'SECURITY_HARDENING') {
    proposalTitle = `Auditoría de Ciberseguridad, Blindaje Web y Protección de Datos para ${name}`;

    salesArguments = [
      `Arquitectura vulnerable: Su sitio web está construido sobre ${webAudit.techStack?.join(', ') || 'tecnología CMS tradicional'} con riesgo de exposición.`,
      `Falta de cabeceras de seguridad: Sin políticas estrictas CSP/HSTS para frenar inyecciones de código y ataques de fuerza bruta.`,
      `Solución de Blindaje: Implementación de WAF (Web Application Firewall) en Cloudflare, cifrado de extremo a extremo, protección anti-DDoS y copias de seguridad automáticas.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, les escribe el área técnica de *Todo Lima*.

Al realizar un escaneo de seguridad a los portales web comerciales de *${district}*, detectamos que su sitio (*${webAudit.url}*) presenta vulnerabilidades en cabeceras HTTP y configuraciones de servidor que podrían exponerlo a ataques de inyección, spam masivo o bloqueos de Google por 'sitio no seguro'.

Contamos con un servicio de **Blindaje de Ciberseguridad & Hardening Web**:
🛡️ Implementación de Firewall WAF y protección anti-hacking en Cloudflare
🔒 Cifrado SSL de grado bancario y cabeceras de protección HSTS
⚡ Optimización de código y eliminación de brechas en su CMS
💾 Respaldos diarios automáticos en la nube

¿Les interesaría recibir el reporte de vulnerabilidades detallado sin costo? 📋`;

    executiveSummary = `Evaluación de ciberseguridad sobre ${webAudit.url} de ${name}. Se detectaron debilidades en políticas de seguridad perimetral y exposición potencial de gestores de contenido. Se propone un plan integral de blindaje técnico, protección WAF y mitigación de riesgos de ciberataques.`;

    callScript = `Hola, buenos días, me comunico con el área de sistemas o administración de ${name}. Los contacto de Todo Lima. Realizamos un monitoreo de ciberseguridad a sitios comerciales de ${district} y detectamos que su portal web tiene vulnerabilidades en cabeceras de protección que facilitan ataques automatizados. Queríamos hacerles llegar el informe de seguridad preventivo. ¿A qué correo o WhatsApp del responsable técnico se lo comparto?`;
  }

  // 6. CASO F: MARKETING DIGITAL, PAID ADS, BRANDING & CONTENIDO (Growth)
  else if (status === 'GROWTH_MARKETING_ADS') {
    proposalTitle = `Estrategia de Crecimiento 360°: Meta Ads, Google Ads y Producción de Contenido para ${name}`;

    salesArguments = [
      `Demanda insatisfecha: Gran reputación local (⭐ ${rating}) pero sin pauta activa para capturar búsquedas transaccionales en Google.`,
      `Falta de Píxel de Retargeting: Los usuarios que visitan su web y se van no vuelven a ver anuncios de su negocio.`,
      `Oportunidad de Contenido: Videos verticales (Reels y TikTok) para posicionar la marca como la autoridad número 1 de ${district}.`,
      `Escala comercial: Campañas de Meta Ads y Google Search directo a WhatsApp con retorno medible.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, les saluda el equipo de crecimiento de *Todo Lima*.

Revisamos su posicionamiento en *${district}* (⭐ *${rating}*) y vemos que cuentan con un gran servicio y reconocimiento. 🌟

Sin embargo, notamos que no están aprovechando al 100% la pauta publicitaria digital en su zona:
🎯 **Google Ads de Alta Intención:** Aparecer de primeros cuando alguien busca su servicio exacto en ${district}.
📱 **Meta Ads (Instagram & Facebook):** Anuncios geolocalizados dirigidos a su cliente ideal en su radio de atención.
🎬 **Producción de Contenido & Video:** Creación de videos verticales de alta calidad (Reels/TikTok) que generan confianza inmediata.
📈 **Embudo de Medición:** Medición exacta de costo por cliente y retorno de inversión publicitaria.

Podemos armar un plan para aumentar sus clientes calificados este mes. ¿Coordinamos una llamada breve para presentarles la estrategia? 📈`;

    executiveSummary = `${name} cuenta con la validación social y operativa para escalar. La oportunidad radica en la activación de pauta publicitaria pagada (Google Ads & Meta Ads) combinada con producción de contenido audiovisual y embudos de captación directa a WhatsApp.`;

    callScript = `Hola, buenas tardes, me comunico con la gerencia de marketing o dueños de ${name}. Los saludo de Todo Lima. Vemos que tienen una calificación excelente de ${rating} estrellas en ${district}. Nos comunicamos porque estamos seleccionando a una sola empresa líder de su rubro en la zona para gestionarles campañas de adquisición de clientes con Google Ads y videos para redes sociales con retorno garantizado. ¿Con quién puedo coordinar 5 minutos para explicarles los detalles?`;
  }

  // 7. CASO G: PARTNER TECNOLÓGICO 360° (Solución Integral)
  else {
    proposalTitle = `Alianza Tecnológica 360° y Posicionamiento Estratégico para ${name}`;

    salesArguments = [
      `Negocio referente en ${district} con calificación ⭐ ${rating} y presencia digital activa.`,
      `Oportunidad: Consultoría integral que une Software a Medida, Inteligencia Artificial, Ciberseguridad y Marketing Predictivo.`,
      `Presencia VIP en todolima.com como Negocio Verificado Oficial.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, los saludamos desde *Todo Lima* (todolima.com).

Auditamos su presencia digital en *${district}* y queremos felicitarlos: son un referente destacado en su categoría. 🌟

En *Todo Lima* trabajamos como **Partner Tecnológico y de Crecimiento 360°** para empresas líderes, implementando:
🤖 Agentes de IA en WhatsApp para atención y agendamiento 24/7
💻 Software web y CRM a medida para automatizar operaciones
🛡️ Auditoría de ciberseguridad y protección de datos
📈 Estrategia de GEO (posicionamiento en Google Maps) y campañas de atracción
⭐ Sello oficial de "Negocio Verificado" en todolima.com

Nos encantaría conversar sobre cómo potenciar la operativa y facturación de ${name}. ¿Podemos agendar una reunión virtual de 10 minutos? 🤝`;

    executiveSummary = `Alianza estratégica y tecnológica integral para ${name}. Se propone integrar soluciones de Agentes de IA, Software a Medida, Ciberseguridad y Posicionamiento GEO para blindar su liderazgo comercial en ${district}.`;

    callScript = `Hola, buenas tardes, me comunico con ${name}. Los contacto de Todo Lima. Felicitamos a su equipo por su liderazgo en ${district}. Queríamos presentarles nuestra consultoría tecnológica 360° en Inteligencia Artificial y software para empresas de su sector. ¿Con quién de gerencia o dirección puedo coordinar una reunión breve?`;
  }

  // Enlace directo de WhatsApp con mensaje preconfigurado si cuenta con móvil
  let whatsappUrl = null;
  if (phoneData.isMobile && phoneData.international) {
    const encodedText = encodeURIComponent(whatsappPitch);
    whatsappUrl = `https://wa.me/${phoneData.international}?text=${encodedText}`;
  }

  // Entregables personalizados según el tipo de propuesta
  const deliverablesByStatus = {
    NEEDS_WEBSITE: [
      'Desarrollo de Landing Page responsive de alta conversión (< 1s de carga)',
      'Alojamiento cloud de alta disponibilidad en Cloudflare Edge',
      'Integración de botón flotante de WhatsApp con mensaje pre-configurado',
      'Sello de Negocio Verificado en todolima.com',
      'Optimización SEO y ficha interactiva en Google Maps'
    ],
    UPGRADE_SOCIAL: [
      'Portal web independiente oficial sin fugas a redes de competidores',
      'Catálogo / Menú digital interactivo accesible con código QR',
      'Integración directa de pedidos y reservas a WhatsApp',
      'Posicionamiento orgánico en Google para búsquedas de compra local'
    ],
    REDESIGN_WEBSITE: [
      'Migración de arquitectura hacia Next.js 14 y Core Web Vitals optimizados',
      'Rediseño Mobile-First con llamadas a la acción directas',
      'Integración de botón flotante de WhatsApp e historial de métricas',
      'Certificado SSL grado A+ y velocidad de carga menor a 1.2 segundos'
    ],
    AI_AGENT_CRM_SOFTWARE: [
      'Desarrollo e implementación de Agente de IA para WhatsApp 24/7',
      'Configuración de CRM a medida con embudo de ventas Kanban',
      'Módulo de agendamiento automático de citas y reservas en tiempo real',
      'Sistema de recordatorios automáticos 24h antes por WhatsApp para evitar ausencias',
      'Dashboard de control y reportes de conversión para gerencia'
    ],
    SECURITY_HARDENING: [
      'Auditoría completa de vulnerabilidades y escaneo de puertos',
      'Implementación de Cloudflare WAF, anti-DDoS y cabeceras HSTS/CSP',
      'Blindaje de paneles de administración y protección de formularios con CAPTCHA',
      'Certificado de Seguridad y copias de respaldo automatizadas en la nube'
    ],
    GROWTH_MARKETING_ADS: [
      'Instalación y configuración de Meta Pixel y API de Conversiones',
      'Campañas de Google Ads Search para capturar búsquedas con intención de compra',
      'Producción y edición de videos verticales (Reels / TikTok) de alta calidad',
      'Estrategia de GEO y posicionamiento prioritario en Google Maps (Review Funnel)'
    ],
    ENTERPRISE_360: [
      'Consultoría tecnológica y de crecimiento integral 360°',
      'Desarrollo de Software y herramientas a medida para la empresa',
      'Automatización con Inteligencia Artificial y CRM corporativo',
      'Auditoría y blindaje de ciberseguridad continua',
      'Insignia de Empresa Verificada y posición destacada en Todo Lima'
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
    deliverables: deliverablesByStatus[status] || deliverablesByStatus.NEEDS_WEBSITE
  };
}
