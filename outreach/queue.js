/**
 * Despachador de Mensajes con Throttling, Modo Simulación (Dry Run) y Registro en Base de Datos.
 */

import { canSend } from './compliance.js';
import { WHATSAPP_TEMPLATES } from './templates.js';

export class MessageDispatcher {
  constructor({
    dryRun = process.env.WHATSAPP_DRY_RUN !== 'false',
    token = process.env.WHATSAPP_TOKEN,
    phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID,
    apiVersion = process.env.WHATSAPP_API_VERSION || 'v21.0',
    dbClient = null
  } = {}) {
    this.dryRun = dryRun;
    this.token = token;
    this.phoneNumberId = phoneNumberId;
    this.apiVersion = apiVersion;
    this.dbClient = dbClient;
  }

  /**
   * Procesa y despacha un mensaje individual aplicando todas las reglas de cumplimiento
   */
  async dispatchMessage({
    contact,
    consent,
    isSuppressed,
    category,
    templateKey,
    templateVariables = [],
    health,
    history = []
  }) {
    const template = WHATSAPP_TEMPLATES[templateKey];
    if (!template) {
      return {
        success: false,
        blocked: true,
        reasons: [`Plantilla "${templateKey}" no encontrada en el catálogo.`]
      };
    }

    // 1. Verificación obligatoria de cumplimiento legal y políticas
    const check = canSend({
      contact,
      consent,
      isSuppressed,
      category: template.category === 'MARKETING' ? 'marketing' : 'utility',
      now: new Date(),
      history,
      health
    });

    if (!check.allowed) {
      return {
        success: false,
        blocked: true,
        reasons: check.reasons
      };
    }

    // 2. Ejecución (Dry Run o Real)
    if (this.dryRun) {
      console.log(`[DRY-RUN] Simulación de envío a ${contact.phone_e164}:`);
      console.log(`  • Plantilla: ${template.name} (${template.category})`);
      console.log(`  • Variables: ${JSON.stringify(templateVariables)}`);

      // Registrar en base de datos si hay cliente
      if (this.dbClient) {
        await this.dbClient.query(`
          INSERT INTO public.message_log (
            contact_id, phone_e164, direction, wa_message_id, template_name, category, status
          ) VALUES ($1, $2, 'outbound', $3, $4, $5, 'dry_run_simulated');
        `, [contact.id || null, contact.phone_e164, `sim_${Date.now()}`, template.name, template.category.toLowerCase()]);
      }

      return {
        success: true,
        blocked: false,
        mode: 'dry_run',
        messageId: `sim_${Date.now()}`
      };
    }

    // 3. Envío real a la API oficial de WhatsApp Cloud
    if (!this.token || !this.phoneNumberId) {
      return {
        success: false,
        blocked: true,
        reasons: ['Credenciales de WhatsApp Cloud API (WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID) no configuradas.']
      };
    }

    try {
      const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;
      
      const payload = {
        messaging_product: 'whatsapp',
        to: contact.phone_e164.replace(/\D/g, ''),
        type: 'template',
        template: {
          name: template.name,
          language: { code: template.language || 'es' },
          components: [
            {
              type: 'body',
              parameters: templateVariables.map(v => ({ type: 'text', text: String(v) }))
            }
          ]
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (!response.ok) {
        const errMessage = resData.error?.message || 'Error desconocido de WhatsApp API';
        if (this.dbClient) {
          await this.dbClient.query(`
            INSERT INTO public.message_log (
              contact_id, phone_e164, direction, template_name, category, status, error
            ) VALUES ($1, $2, 'outbound', $3, $4, 'failed', $5);
          `, [contact.id || null, contact.phone_e164, template.name, template.category.toLowerCase(), errMessage]);
        }

        return {
          success: false,
          blocked: false,
          error: errMessage
        };
      }

      const waMsgId = resData.messages?.[0]?.id;
      if (this.dbClient) {
        await this.dbClient.query(`
          INSERT INTO public.message_log (
            contact_id, phone_e164, direction, wa_message_id, template_name, category, status
          ) VALUES ($1, $2, 'outbound', $3, $4, $5, 'sent');
        `, [contact.id || null, contact.phone_e164, waMsgId, template.name, template.category.toLowerCase()]);
      }

      return {
        success: true,
        blocked: false,
        mode: 'live',
        messageId: waMsgId
      };

    } catch (err) {
      return {
        success: false,
        blocked: false,
        error: err.message
      };
    }
  }
}
