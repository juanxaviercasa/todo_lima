export const ANALYTICS_ACTIONS = ['whatsapp', 'phone', 'email', 'map', 'website', 'search', 'filter', 'calculator', 'audio_play', 'video_play'];
export function publicAnalyticsPath(value) {
  return typeof value === 'string' && value.length <= 240 && /^\/(?:[a-z0-9-]+\/?)*$/.test(value)
    && !/^\/(admin|api|sign-in|sign-up|demo|derechos-arco|baja|libro-de-reclamaciones)(\/|$)/.test(value) ? value.replace(/\/$/, '') || '/' : null;
}
export function normalizeAnalyticsSnapshot(data) {
  if (!data || data.consent !== true || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.id || '')) return null;
  const pathname = publicAnalyticsPath(data.path);
  if (!pathname || !Number.isInteger(data.activeSeconds) || data.activeSeconds < 0 || data.activeSeconds > 14400
    || !Number.isInteger(data.scrollDepth) || data.scrollDepth < 0 || data.scrollDepth > 100) return null;
  const actions = {};
  for (const name of ANALYTICS_ACTIONS) {
    const count = data.actions?.[name] ?? 0;
    if (!Number.isInteger(count) || count < 0 || count > 100) return null;
    actions[name] = count;
  }
  return { id: data.id, path: pathname, active_seconds: data.activeSeconds, scroll_depth: data.scrollDepth, actions };
}
