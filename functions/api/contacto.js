import {CONTACT_TOPICS} from '../../lib/contactTopics.js';

const RECIPIENT = 'contacto@todolima.com';
const recent = new Map(); // Best-effort per-isolate limit, not a global anti-abuse guarantee.
const json = (body, status = 200) => Response.json(body, {status, headers: {'Cache-Control':'no-store', 'X-Robots-Tag':'noindex, nofollow'}});

async function handlePost({request, env}) {
  const origin = request.headers.get('origin');
  if (origin !== new URL(request.url).origin) return json({error:'Solicitud no permitida.'}, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({error:'Formato de solicitud incorrecto.'}, 415);
  if (Number(request.headers.get('content-length') || 0) > 20000) return json({error:'El mensaje es demasiado largo.'}, 413);
  let body;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 20000) return json({error:'El mensaje es demasiado largo.'}, 413);
    body = JSON.parse(raw);
  } catch { return json({error:'Revisa los datos del formulario.'}, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({error:'Revisa los datos del formulario.'}, 400);
  const string = key => typeof body[key] === 'string' ? body[key].trim() : '';
  const name = string('name'), email = string('email'), subject = string('subject'), message = string('message'), pageUrl = string('pageUrl');
  const topic = CONTACT_TOPICS.find(t => t.value === body.topic);
  if (string('website') || body.consent !== true || !topic || name.length < 2 || name.length > 100 || subject.length < 4 || subject.length > 160 || /[\r\n]/.test(subject + name + email) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 20 || message.length > 5000 || pageUrl.length > 500) return json({error:'Completa los campos y acepta el uso de tus datos para responder a tu consulta.'}, 400);
  if (pageUrl) { try { if (!['http:', 'https:'].includes(new URL(pageUrl).protocol)) throw new Error(); } catch { return json({error:'El enlace debe empezar por https:// o http://.'}, 400); } }
  if (!env.CLOUDFLARE_ACCOUNT_ID || !env.CLOUDFLARE_EMAIL_API_TOKEN) return json({error:'El envío del formulario aún no está habilitado. Escríbenos a contacto@todolima.com o usa WhatsApp.'}, 503);
  if (!/^[a-f0-9]{32}$/i.test(env.CLOUDFLARE_ACCOUNT_ID)) return json({error:'El envío no está disponible. Usa nuestro correo directo.'}, 503);
  const now = Date.now(), ip = request.headers.get('cf-connecting-ip') || 'unknown';
  for (const [key, entry] of recent) if (entry.until <= now) recent.delete(key);
  if (recent.size > 10000) return json({error:'Hay muchas solicitudes. Intenta más tarde.'}, 429);
  const entry = recent.get(ip) || {count:0, until:now + 600000};
  if (entry.count >= 3) return json({error:'Has enviado varias consultas. Intenta nuevamente en unos minutos.'}, 429);
  recent.set(ip, {...entry, count:entry.count + 1});
  const reference = `TL-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const text = `CONSULTA WEB TODO LIMA\nReferencia: ${reference}\nTipo: ${topic.label}\nNombre: ${name}\nCorreo para responder: ${email}\nAsunto: ${subject}\nPágina: ${pageUrl || 'No indicada'}\nFecha: ${new Date().toISOString()}\n\nMENSAJE\n${message}\n\nConsentimiento: autorizado para atender esta consulta; sin suscripción comercial.`;
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/sending/send`, {method:'POST', headers:{Authorization:`Bearer ${env.CLOUDFLARE_EMAIL_API_TOKEN}`, 'Content-Type':'application/json'}, body:JSON.stringify({to:RECIPIENT, from:env.CONTACT_FROM_EMAIL || RECIPIENT, reply_to:email, subject:`[Todo Lima · ${topic.label}] ${subject} · ${reference}`, text}), signal:AbortSignal.timeout(15000)});
    const result = await response.json();
    const accepted = [...(result.result?.delivered || []), ...(result.result?.queued || [])].includes(RECIPIENT);
    if (!response.ok || result.success !== true || !accepted) return json({error:'No se pudo entregar tu consulta al servicio de correo. Intenta más tarde o usa el correo directo.'}, 502);
    return json({ok:true, reference});
  } catch { return json({error:'No se pudo enviar el mensaje. Intenta más tarde o escribe al correo oficial.'}, 502); }
}

export function onRequest(context) {
  if (context.request.method === 'POST') return handlePost(context);
  return json({error:'Método no permitido.'}, 405);
}
