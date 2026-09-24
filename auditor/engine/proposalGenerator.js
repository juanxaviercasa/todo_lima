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

  // Determinar estatus de la oportunidad comercial
  if (webAudit.type === 'NO_WEBSITE' || webAudit.type === 'INVALID_URL') {
    status = 'NEEDS_WEBSITE';
    priority = (business.rating >= 4.5 && phoneData.isMobile) ? 'CRITICAL' : 'HIGH';
  } else if (webAudit.type === 'SOCIAL_ONLY') {
    status = 'UPGRADE_SOCIAL';
    priority = phoneData.isMobile ? 'HIGH' : 'MEDIUM';
  } else if (webAudit.score < 65 || !webAudit.accessible || !webAudit.hasWhatsApp) {
    status = 'REDESIGN_WEBSITE';
    priority = phoneData.isMobile ? 'HIGH' : 'MEDIUM';
  } else {
    status = 'OPTIMIZE_WEBSITE';
    priority = 'LOW';
  }

  // 1. CASO A: NO TIENEN PÁGINA WEB
  if (status === 'NEEDS_WEBSITE') {
    proposalTitle = `Propuesta de Lanzamiento Web & Captación WhatsApp para ${name}`;

    salesArguments = [
      `Posicionamiento actual: Tienen ⭐ ${rating} en Google Maps (${reviews}), lo que genera alta intención de búsqueda en ${district}.`,
      `Fuga de clientes: Al no contar con una web propia, hasta un 70% de usuarios que buscan en smartphone optan por competidores que ofrecen catálogo y contacto rápido.`,
      `Solución inmediata: Una landing page ultrarrápida (< 1s) conectada a su subdominio exclusivo en Todo Lima (${suggestedSubdomain}) y a su WhatsApp.`,
      `Captura de pacientes/clientes: Botón de WhatsApp flotante con mensaje precargado para cerrar cotizaciones en segundos.`
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

    executiveSummary = `El negocio ${name} cuenta con un excelente posicionamiento de confianza en ${district} con calificación ⭐ ${rating} y ${reviews}. Sin embargo, carece de presencia digital propietaria (sitio web), dependiendo exclusivamente del perfil de Google Maps. Esto provoca una fuga de clientes con alta intención de compra hacia competidores con botones de contacto directo. Proponemos la implementación de una página web de alta velocidad y conversión con botón directo a WhatsApp y presencia en todolima.com.`;

    callScript = `Hola buenos días/tardes, ¿me comunico con ${name}? Mucho gusto, mi nombre es [Tu Nombre] de Todo Lima. La razón de mi llamada es muy breve: vimos que tienen una de las calificaciones más altas de ${district} en Google con ${rating} estrellas, pero al buscar su web para que clientes nuevos coticen por WhatsApp vimos que no la tienen registrada. En Todo Lima estamos activando las webs oficiales de los 10 mejores negocios de la zona para que reciban clientes directos en su celular. ¿Con quién puedo coordinar 2 minutos para enviarles un enlace demo gratuito de cómo quedaría?`;
  }

  // 2. CASO B: TIENEN SOLO RED SOCIAL (Facebook, Instagram, etc.)
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

  // 3. CASO C: TIENEN SITIO WEB CON FALLAS TÉCNICAS O SIN WHATSAPP
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

  // 4. CASO D: SITIO WEB EN BUEN ESTADO (Propuesta de Alianza / Directorio Todo Lima)
  else {
    proposalTitle = `Invitación de Afiliación Destacada en Todo Lima para ${name}`;

    salesArguments = [
      `Sitio web calificado con puntaje óptimo: ${webAudit.score}/100.`,
      `Cuenta con soporte HTTPS y arquitectura de conversión adecuada.`,
      `Oportunidad: Posicionamiento preferencial en la categoría ${categorySlug} de todolima.com para capturar tráfico orgánico calificado adicional en ${district}.`
    ];

    whatsappPitch = `Hola equipo de *${name}* 👋, los saludamos desde *Todo Lima* (todolima.com).

Auditamos su portal web (*${webAudit.url}*) y queremos felicitarlos: cuentan con una excelente velocidad y presencia digital, a la altura de su gran calificación de ⭐ *${rating}* en Google Maps en *${district}*.

Estamos seleccionando al Top de negocios verificados para nuestra categoría de *${categorySlug}*. Nos encantaría incluir su enlace oficial y botón directo en nuestro directorio para enviarles tráfico calificado de pacientes y clientes de su zona.

¿Les gustaría conocer los detalles de la verificación oficial de Todo Lima? 🌟`;

    executiveSummary = `${name} cuenta con una infraestructura web sólida (${webAudit.score}/100). La oportunidad comercial radica en la afiliación VIP dentro de todolima.com para canalizar tráfico calificado del directorio local hacia su web y WhatsApp.`;

    callScript = `Hola, buenas tardes, me comunico con ${name}. Los contacto de Todo Lima. Los felicitamos porque su página web tiene uno de los mejores desempeños técnicos de ${district}. Los llamamos para invitarlos a figurar como Negocio Verificado en nuestro portal todolima.com. ¿Con quién del área comercial o gerencia puedo coordinar?`;
  }

  // Enlace directo de WhatsApp con mensaje preconfigurado si cuenta con móvil
  let whatsappUrl = null;
  if (phoneData.isMobile && phoneData.international) {
    const encodedText = encodeURIComponent(whatsappPitch);
    whatsappUrl = `https://wa.me/${phoneData.international}?text=${encodedText}`;
  }

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
    deliverables: [
      'Desarrollo de Landing Page responsive de alta conversión',
      'Alojamiento cloud de alta disponibilidad con carga en < 1 segundo',
      'Integración de botón flotante de WhatsApp con mensaje personalizado',
      'Sello de Negocio Verificado en el directorio Todo Lima',
      'Integración de ubicación exacta en Google Maps y Waze',
      'Optimización SEO on-page para búsquedas locales en Lima'
    ]
  };
}
