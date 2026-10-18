import { normalizeAnalyticsSnapshot } from '../../../lib/analytics.js';

export const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
export async function readSmallJson(request) {
  if (Number(request.headers.get('Content-Length')) > 4096) throw new Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  let text = '', bytes = 0;
  const decoder = new TextDecoder();
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    bytes += value.length;
    if (bytes > 4096) { await reader.cancel(); throw new Error('size'); }
    text += decoder.decode(value, { stream: true });
  }
  return JSON.parse(text + decoder.decode());
}
export async function analyticsRpc(env, name, body, fetcher = fetch) {
  const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('configuration');
  const response = await fetcher(`${url}/rest/v1/rpc/${name}`, {
    method: 'POST', headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body), signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('storage');
  return response.json();
}
export async function onRequestPost({ request, env }) {
  if (request.headers.get('Origin') !== new URL(request.url).origin || request.headers.get('Sec-Fetch-Site') === 'cross-site') return json({ error: 'Origen no permitido.' }, 403);
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({ error: 'Formato inválido.' }, 415);
  if (request.headers.get('DNT') === '1' || request.headers.get('Sec-GPC') === '1') return json({ skipped: true });
  if (request.cf?.botManagement?.verifiedBot || request.cf?.botManagement?.score < 20) return json({ skipped: true });
  // Fail closed unless the distributed limiter is provisioned at deployment.
  if (!env.ANALYTICS_RATE_LIMITER) return json({ error: 'Medición pendiente de configuración.' }, 503);
  const limit = await env.ANALYTICS_RATE_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' });
  if (!limit.success) return json({ error: 'Límite temporal.' }, 429);
  let data;
  try { data = normalizeAnalyticsSnapshot(await readSmallJson(request)); } catch { return json({ error: 'Datos inválidos.' }, 400); }
  if (!data) return json({ error: 'Datos inválidos.' }, 400);
  try { await analyticsRpc(env, 'record_analytics_visit', { snapshot: data }); return json({ received: true }); }
  catch { return json({ error: 'Medición no disponible.' }, 503); }
}
