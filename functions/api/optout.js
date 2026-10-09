/**
 * Cloudflare Pages Function: API de Baja y Supresión (Do-Not-Contact)
 * Ruta: POST /api/optout
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { phone, businessName, reason = 'opt_out', source = 'web_form' } = body;

    if (!phone || typeof phone !== 'string') {
      return new Response(JSON.stringify({ error: 'Número de teléfono es obligatorio.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    const phoneE164 = cleanPhone.startsWith('51') ? `+${cleanPhone}` : `+51${cleanPhone}`;

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhpekavdwcezyzzgsdnn.supabase.co';
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseKey) {
      // 1. Insertar en suppression_list
      await fetch(`${supabaseUrl}/rest/v1/suppression_list`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          phone_e164: phoneE164,
          reason,
          source: `${source} (${businessName || 'Desconocido'})`,
          created_at: new Date().toISOString()
        })
      });

      // 2. Revocar consentimientos previos si existían
      await fetch(`${supabaseUrl}/rest/v1/consent_records?phone_e164=eq.${encodeURIComponent(phoneE164)}`, {
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

    return new Response(JSON.stringify({
      success: true,
      message: 'Número incorporado a la Lista de Supresión Global (Do-Not-Contact).',
      phone: phoneE164
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Error interno procesando la solicitud de baja.',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
