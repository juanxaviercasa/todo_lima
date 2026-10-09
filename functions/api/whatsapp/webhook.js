/**
 * Cloudflare Pages Function: Webhook de WhatsApp Cloud API
 * Ruta: /api/whatsapp/webhook (GET & POST)
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  const verifyToken = env.WHATSAPP_VERIFY_TOKEN || 'todolima_wa_verify_2026';

  if (mode === 'subscribe' && token === verifyToken) {
    return new Response(challenge, { status: 200 });
  }

  return new Response('Verificación fallida', { status: 403 });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const payload = await request.json();

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhpekavdwcezyzzgsdnn.supabase.co';
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Procesar entradas de WhatsApp
    const entries = payload.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        const value = change.value || {};
        const messages = value.messages || [];

        for (const msg of messages) {
          const fromPhone = `+${msg.from}`;
          const messageText = msg.text?.body || '';
          const messageId = msg.id;

          const norm = messageText
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

          const isOptOut = norm === 'baja' || norm.startsWith('baja ') || norm.endsWith(' baja') || norm === 'stop';
          const isOptIn = norm.includes('acepto') || norm.includes('reclamar') || norm.includes('auditoria');

          // Extraer business ID si vino en el texto (ej. "ID: dentistas_biz_12")
          const bizIdMatch = messageText.match(/ID:\s*([a-zA-Z0-9_\-]+)/i);
          const businessId = bizIdMatch ? bizIdMatch[1].trim() : null;

          if (supabaseKey) {
            // 1. Upsert contacto
            await fetch(`${supabaseUrl}/rest/v1/contacts`, {
              method: 'POST',
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates'
              },
              body: JSON.stringify({
                phone_e164: fromPhone,
                business_id: businessId,
                first_inbound_at: new Date().toISOString(),
                last_inbound_at: new Date().toISOString()
              })
            });

            // 2. Si es BAJA -> Registrar en lista de supresión y revocar consentimientos
            if (isOptOut) {
              await fetch(`${supabaseUrl}/rest/v1/suppression_list`, {
                method: 'POST',
                headers: {
                  'apikey': supabaseKey,
                  'Authorization': `Bearer ${supabaseKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'resolution=merge-duplicates'
                },
                body: JSON.stringify({
                  phone_e164: fromPhone,
                  reason: 'opt_out',
                  source: 'whatsapp_inbound_baja',
                  created_at: new Date().toISOString()
                })
              });

              await fetch(`${supabaseUrl}/rest/v1/consent_records?phone_e164=eq.${encodeURIComponent(fromPhone)}`, {
                method: 'PATCH',
                headers: {
                  'apikey': supabaseKey,
                  'Authorization': `Bearer ${supabaseKey}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  status: 'revoked',
                  revoked_at: new Date().toISOString()
                })
              });
            }

            // 3. Si contiene consentimiento explícito (Opt-in) -> Registrar en ledger inmutable
            if (isOptIn) {
              await fetch(`${supabaseUrl}/rest/v1/consent_records`, {
                method: 'POST',
                headers: {
                  'apikey': supabaseKey,
                  'Authorization': `Bearer ${supabaseKey}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  phone_e164: fromPhone,
                  channel: 'whatsapp',
                  purpose: 'marketing',
                  status: 'granted',
                  source: 'whatsapp_claim_or_request',
                  evidence: {
                    wa_message_id: messageId,
                    text: messageText,
                    timestamp: msg.timestamp
                  },
                  legal_basis: 'iniciativa_usuario_ley_32323',
                  captured_at: new Date().toISOString()
                })
              });
            }

            // 4. Log del mensaje entrante
            await fetch(`${supabaseUrl}/rest/v1/message_log`, {
              method: 'POST',
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                phone_e164: fromPhone,
                direction: 'inbound',
                wa_message_id: messageId,
                category: 'service',
                status: 'received',
                sent_at: new Date().toISOString()
              })
            });
          }
        }
      }
    }

    return new Response('EVENT_RECEIVED', { status: 200 });

  } catch (error) {
    console.error('Error procesando webhook de WhatsApp:', error);
    return new Response('EVENT_RECEIVED', { status: 200 }); // Siempre 200 a WhatsApp para evitar reintentos infinitos
  }
}
