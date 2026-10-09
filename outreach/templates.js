/**
 * Catálogo de Plantillas Oficiales de WhatsApp Business Platform para Todo Lima.
 * Todas las plantillas de marketing incluyen pie de baja mandatorio (Opt-out footer).
 */

export const WHATSAPP_TEMPLATES = {
  // 1. Diagnóstico Listo (UTILITY - Entregado tras solicitud del usuario)
  audit_ready: {
    name: 'todolima_diagnostico_listo',
    category: 'UTILITY',
    language: 'es',
    components: [
      {
        type: 'BODY',
        text: 'Hola {{1}} 👋, tu Diagnóstico Digital 360° para "{{2}}" en Todo Lima ya se encuentra listo.\n\nPuedes revisarlo en el siguiente enlace oficial:\nhttps://todolima.com/demo/{{3}}\n\nSi deseas coordinar una llamada de 10 minutos para revisar los hallazgos de velocidad y conversión, solo responde a este mensaje.'
      },
      {
        type: 'FOOTER',
        text: 'Todo Lima • Responde BAJA para no recibir más mensajes.'
      }
    ]
  },

  // 2. Confirmación de Cita / Demostración (UTILITY)
  appointment_confirmation: {
    name: 'todolima_confirmacion_cita',
    category: 'UTILITY',
    language: 'es',
    components: [
      {
        type: 'BODY',
        text: 'Hola {{1}} 👋, confirmamos tu videollamada para la demostración del Asistente IA y Embudo para "{{2}}".\n\n📅 Fecha: {{3}}\n⏰ Hora: {{4}} (Hora de Lima)\n🔗 Enlace de conexión: {{5}}\n\nSi necesitas reprogramar, indícanos por este medio.'
      },
      {
        type: 'FOOTER',
        text: 'Todo Lima • Responde BAJA para no recibir más mensajes.'
      }
    ]
  },

  // 3. Seguimiento de Auditoría Solicitada (MARKETING)
  audit_followup: {
    name: 'todolima_seguimiento_auditoria',
    category: 'MARKETING',
    language: 'es',
    components: [
      {
        type: 'BODY',
        text: 'Hola {{1}} 👋, queríamos saber si pudiste revisar el diagnóstico de embudo de ventas que preparó Todo Lima para "{{2}}".\n\nEstimamos que optimizar el tiempo de respuesta en WhatsApp a menos de 2 minutos y blindar tu velocidad web puede aumentar tus cotizaciones cerradas en un 35%.\n\n¿Te gustaría que te enviemos una propuesta personalizada?'
      },
      {
        type: 'FOOTER',
        text: 'Responde BAJA para darte de baja de cualquier comunicación.'
      }
    ]
  },

  // 4. Reactivación / Plan Crecimiento (MARKETING)
  reactivation_offer: {
    name: 'todolima_oferta_reactivacion',
    category: 'MARKETING',
    language: 'es',
    components: [
      {
        type: 'BODY',
        text: 'Hola {{1}} 👋, esperamos que tu negocio "{{2}}" siga creciendo con éxito en Lima.\n\nEn Todo Lima hemos liberado una nueva actualización del directorio con integración de Asistentes IA 24/7 y velocidad sub-segundo para negocios de tu categoría.\n\n¿Deseas activar la insignia de Negocio Verificado este mes?'
      },
      {
        type: 'FOOTER',
        text: 'Responde BAJA para no recibir más comunicaciones.'
      }
    ]
  }
};
