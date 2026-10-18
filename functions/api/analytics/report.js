import { verifyToken, createClerkClient } from '@clerk/backend';
import { analyticsRpc, json } from './collect.js';

export async function authorizeAnalyticsAdmin(request, env, verify = verifyToken, getUser) {
  if (!env.CLERK_SECRET_KEY) throw new Error('configuration');
  const token = request.headers.get('Authorization')?.match(/^Bearer (\S+)$/)?.[1];
  if (!token) return false;
  try {
    const claims = await verify(token, { secretKey: env.CLERK_SECRET_KEY, authorizedParties: [new URL(request.url).origin] });
    if (!claims.sub || !claims.sid) return false;
    const user = await (getUser || (id => createClerkClient({ secretKey: env.CLERK_SECRET_KEY }).users.getUser(id)))(claims.sub);
    const primary = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId);
    return primary?.verification?.status === 'verified' && primary.emailAddress.toLowerCase() === (env.ANALYTICS_ADMIN_EMAIL || 'j76018445@gmail.com').toLowerCase();
  } catch { return false; }
}
export async function onRequestGet({ request, env }) {
  try {
    if (!await authorizeAnalyticsAdmin(request, env)) return json({ error: 'Acceso no autorizado.' }, 401);
    const days = Number(new URL(request.url).searchParams.get('days') || 7);
    if (![7, 30, 90].includes(days)) return json({ error: 'Periodo inválido.' }, 400);
    return json(await analyticsRpc(env, 'analytics_engagement_report', { period_days: days }));
  } catch { return json({ error: 'Analítica pendiente de configuración en el servidor.' }, 503); }
}
