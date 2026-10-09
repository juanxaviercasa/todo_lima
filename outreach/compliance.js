/**
 * Motor de Validación y Cumplimiento Normativo Previo al Envío (Deterministic Compliance Gate)
 * Garantiza que NINGÚN mensaje sea enviado si no cumple con la Ley 32323, Ley 29733 y Meta Policy.
 */

import { COMPLIANCE_POLICY } from './policy.js';

/**
 * Obtiene la fecha y hora actual en la zona horaria de Lima (UTC-5)
 * @param {Date} date
 */
export function getLimaDateTime(date = new Date()) {
  const limaString = date.toLocaleString('en-US', { timeZone: COMPLIANCE_POLICY.timezone });
  const limaDate = new Date(limaString);
  
  const y = limaDate.getFullYear();
  const m = String(limaDate.getMonth() + 1).padStart(2, '0');
  const d = String(limaDate.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${d}`;

  return {
    dayOfWeek: limaDate.getDay(), // 0=Domingo, 1=Lunes, ...
    hour: limaDate.getHours(),
    minute: limaDate.getMinutes(),
    dateStr
  };
}

/**
 * Valida determinísticamente si un mensaje puede ser enviado a un contacto.
 * 
 * @param {object} params
 * @param {object} params.contact Objeto del contacto con historial
 * @param {object|null} params.consent Registro de consentimiento más reciente
 * @param {boolean} params.isSuppressed True si está en la lista de supresión
 * @param {string} params.category 'service' | 'utility' | 'marketing'
 * @param {Date} params.now Fecha de evaluación (opcional, default new Date())
 * @param {Array} params.history Historial de envíos previos
 * @param {object} params.health Estado de salud de la cuenta Meta
 * @returns {{ allowed: boolean, reasons: string[] }}
 */
export function canSend({
  contact,
  consent,
  isSuppressed = false,
  category = 'marketing',
  now = new Date(),
  history = [],
  health = { quality_rating: 'GREEN', messaging_limit_tier: 250 }
}) {
  const reasons = [];

  // 1. REGLA SUPREMA: Lista de Supresión Global (Do-Not-Contact)
  if (isSuppressed) {
    reasons.push('BLOQUEO_SUPRESION: El número se encuentra en la lista global de exclusión/baja (Do-Not-Contact).');
  }

  // 2. REGLA LEY 32323 (PERÚ): Prohibición estricta de primer contacto en frío
  // Solo se permite enviar si el usuario tomó la iniciativa y contamos con consentimiento previo
  if (category === 'marketing') {
    if (!contact || !contact.first_inbound_at) {
      reasons.push('BLOQUEO_LEY_32323: El usuario nunca ha iniciado contacto previo con Todo Lima. Prohibido contacto en frío.');
    }

    if (!consent || consent.status !== 'granted') {
      reasons.push('BLOQUEO_CONSENTIMIENTO: No existe registro de consentimiento explícito vigente para marketing.');
    } else if (consent.purpose !== 'marketing') {
      reasons.push('BLOQUEO_FINALIDAD: El consentimiento otorgado no abarca comunicaciones de marketing comercial.');
    }
  }

  // 3. REGLA DE SALUD DE CUENTA META (Portfolio Quality Health)
  if (health.quality_rating === 'RED') {
    reasons.push('BLOQUEO_SALUD_CUENTA: La cuenta de WhatsApp está en estado ROJO por Meta. Todos los envíos salientes están pausados.');
  } else if (health.quality_rating === 'YELLOW' && category === 'marketing') {
    reasons.push('BLOQUEO_SALUD_CUENTA: La cuenta está en estado AMARILLO. Las campañas de marketing están pausadas para proteger la línea.');
  }

  // 4. REGLA DE HORARIOS PERMITIDOS (Hora de Lima: 09:00 - 19:00, no domingos ni feriados)
  if (category === 'marketing') {
    const limaTime = getLimaDateTime(now);

    if (limaTime.dayOfWeek === 0) {
      reasons.push('BLOQUEO_HORARIO: Prohibido enviar mensajes de marketing los domingos.');
    }

    if (COMPLIANCE_POLICY.peruHolidays2026.includes(limaTime.dateStr)) {
      reasons.push(`BLOQUEO_FERIADO: Prohibido enviar mensajes comerciales en días feriados en Perú (${limaTime.dateStr}).`);
    }

    if (limaTime.hour < COMPLIANCE_POLICY.allowedHours.start || limaTime.hour >= COMPLIANCE_POLICY.allowedHours.end) {
      reasons.push(`BLOQUEO_HORARIO_NOCTURNO: Hora de Lima fuera del rango permitido (${limaTime.hour}:${String(limaTime.minute).padStart(2, '0')}). Permitido solo 09:00 a 19:00.`);
    }
  }

  // 5. REGLA DE LÍMITES DE FRECUENCIA (Frequency Caps)
  if (category === 'marketing' && Array.isArray(history)) {
    const nowMs = now.getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

    const marketingPast7Days = history.filter(h => {
      const sentTime = new Date(h.sent_at).getTime();
      return h.category === 'marketing' && (nowMs - sentTime) < sevenDaysMs;
    }).length;

    const marketingPast30Days = history.filter(h => {
      const sentTime = new Date(h.sent_at).getTime();
      return h.category === 'marketing' && (nowMs - sentTime) < thirtyDaysMs;
    }).length;

    if (marketingPast7Days >= COMPLIANCE_POLICY.frequencyCaps.maxMarketingPerContact7Days) {
      reasons.push('BLOQUEO_FRECUENCIA_7D: El contacto ya recibió un mensaje publicitario en los últimos 7 días.');
    }

    if (marketingPast30Days >= COMPLIANCE_POLICY.frequencyCaps.maxMarketingPerContact30Days) {
      reasons.push('BLOQUEO_FRECUENCIA_30D: El contacto superó el límite máximo de 3 mensajes publicitarios en 30 días.');
    }
  }

  // 6. REGLA DE VENTANA DE SERVICIO DE 24 HORAS (Customer Service Window)
  if (category === 'service') {
    if (!contact || !contact.last_inbound_at) {
      reasons.push('BLOQUEO_VENTANA_SERVICIO: No hay mensaje entrante previo del usuario.');
    } else {
      const lastInboundMs = new Date(contact.last_inbound_at).getTime();
      const elapsedHours = (now.getTime() - lastInboundMs) / (1000 * 60 * 60);
      
      const maxWindow = contact.is_click_to_whatsapp 
        ? COMPLIANCE_POLICY.clickToWhatsAppWindowHours 
        : COMPLIANCE_POLICY.serviceWindowHours;

      if (elapsedHours > maxWindow) {
        reasons.push(`BLOQUEO_VENTANA_EXPIRADA: Han transcurrido ${elapsedHours.toFixed(1)} horas desde el último mensaje del usuario (límite: ${maxWindow}h). Debe utilizar una plantilla aprobada por Meta.`);
      }
    }
  }

  return {
    allowed: reasons.length === 0,
    reasons
  };
}
