/**
 * Constantes y utilidades de contacto y cumplimiento normativo para Todo Lima.
 * Centraliza el número oficial de WhatsApp y los textos de consentimiento.
 */

export const TODOLIMA_WHATSAPP = '51925475034';
export const TODOLIMA_WHATSAPP_DISPLAY = '+51 925 475 034';
export const TODOLIMA_EMAIL = 'contacto@todolima.com';
export const TODOLIMA_SITE_URL = 'https://todolima.com';

export function businessPhone(raw = '') {
  const digits = String(raw).replace(/\D/g, '').replace(/^00/, '');
  const mobile = /^9\d{8}$/.test(digits) ? `51${digits}` : /^519\d{8}$/.test(digits) ? digits : null;
  const telephone = mobile || (/^\d{7}$/.test(digits) ? `511${digits}` : /^0?1\d{7}$/.test(digits) ? `51${digits.replace(/^0/, '')}` : /^511\d{7}$/.test(digits) ? digits : null);
  return { telephone: telephone ? `+${telephone}` : null, mobile };
}

// Identificación legal y societaria oficial
export const LEGAL_TITULAR = 'Xavier Cabello Salirrosas';
export const LEGAL_ENTITY_NAME = 'Todo Lima Network';
export const LEGAL_DOMICILE = 'Lima Metropolitana, República del Perú';
export const LEGAL_DEV_URL = 'https://xavier.cabellosalirosas.com';

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
  const text = `Hola Todo Lima, soy el titular o representante de "${businessName}" (ID: ${businessId || 'N/A'}).

Quiero solicitar la administración o corrección de la ficha de mi negocio en todolima.com.

Acepto ser contactado por Todo Lima a traves de este chat de WhatsApp para coordinar mi ficha. (Puedo escribir BAJA en cualquier momento).`;
  return buildWhatsAppLink(text);
}

/**
 * Genera el enlace para solicitud de baja de comunicaciones o datos
 */
export function buildOptOutLink(businessName = '') {
  const text = `BAJA - Solicito la exclusión de comunicaciones comerciales y/o actualización de ficha para: "${businessName}".`;
  return buildWhatsAppLink(text);
}
