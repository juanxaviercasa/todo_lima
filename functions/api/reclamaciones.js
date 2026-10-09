/**
 * Cloudflare Pages Function: API de Libro de Reclamaciones Virtual
 * Ruta: POST /api/reclamaciones
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const {
      nombre,
      tipoDoc,
      numDoc,
      telefono,
      email,
      domicilio,
      tipoBien = 'servicio',
      monto,
      descripcionBien,
      tipoReclamacion = 'reclamo',
      detalle,
      pedido
    } = body;

    if (!nombre || !numDoc || !email || !detalle || !pedido) {
      return new Response(JSON.stringify({ error: 'Campos requeridos incompletos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const timestamp = Date.now();
    const correlativoGenerado = `TL-REC-${timestamp.toString().slice(-6)}`;

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhpekavdwcezyzzgsdnn.supabase.co';
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/complaints`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tipo: tipoReclamacion,
          consumer_data: {
            nombre,
            tipoDoc,
            numDoc,
            telefono,
            email,
            domicilio,
            tipoBien,
            monto,
            descripcionBien
          },
          detalle,
          pedido,
          created_at: new Date().toISOString()
        })
      });
    }

    return new Response(JSON.stringify({
      success: true,
      correlativo: correlativoGenerado,
      message: 'Hoja de reclamación registrada conforme a normativa de Indecopi.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Error registrando la reclamación.',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
