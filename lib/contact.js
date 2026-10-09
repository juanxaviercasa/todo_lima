/**
 * Constantes y utilidades de contacto y cumplimiento normativo para Todo Lima.
 * Centraliza el número oficial de WhatsApp y los textos de consentimiento.
 */

export const TODOLIMA_WHATSAPP = '51961277467';
export const TODOLIMA_WHATSAPP_DISPLAY = '+51 961 277 467';
export const TODOLIMA_EMAIL = 'contacto@todolima.com';
export const TODOLIMA_SITE_URL = 'https://todolima.com';

/**
 * Genera el enlace de WhatsApp oficial con texto prellenado y consentimiento explícito
 * @param {string} mensajeBase Texto del mensaje
 * @returns {string} Enlace directo wa.me
 */
export function buildWhatsAppLink(mensajeBase) {
  const cleanMsg = (mensajeBase || '').trim();
  return `https://wa.me/${TODOLIMA_WHATSAPP}?text=${encodeURIComponent(cleanMsg)}`;
}

/**
 * Genera el enlace para reclamo inbound de ficha de negocio
 */
export function buildClaimListingLink(businessName, businessId) {
  const text = `Hola Todo Lima 👋, soy el dueño/a o representante de "${businessName}" (ID: ${businessId || 'N/A'}).

Quiero reclamar la ficha oficial de mi negocio en todolima.com y recibir mi Diagnóstico 360° gratuito de Embudo y Crecimiento.

Acepto ser contactado por Todo Lima a través de este chat de WhatsApp para coordinar mi ficha. (Puedo escribir BAJA en cualquier momento).`;
  return buildWhatsAppLink(text);
}

/**
 * Genera el enlace para solicitud de baja de comunicaciones o datos
 */
export function buildOptOutLink(businessName = '') {
  const text = `BAJA - Solicito la exclusión de comunicaciones comerciales y/o actualización de ficha para: "${businessName}".`;
  return buildWhatsAppLink(text);
}
