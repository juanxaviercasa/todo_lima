'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { publicAnalyticsPath } from '../lib/analytics.js';

// One random ID per page view, held in memory only; no visitor/session identity.
export default function InteractionAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (!publicAnalyticsPath(pathname)) return;
    let state, enabled = false, lastTick = performance.now(), lastInput = performance.now(), lastSend = 0, timer;
    const permitted = () => {
      try { return localStorage.getItem('tl_cookie_consent') === 'accepted' && navigator.globalPrivacyControl !== true && navigator.doNotTrack !== '1'; }
      catch { return false; }
    };
    const tick = () => {
      const now = performance.now();
      if (state && document.visibilityState === 'visible' && document.hasFocus() && now - lastInput < 60000) {
        state.activeMs = Math.min(14400000, state.activeMs + Math.min(now - lastTick, 5000));
      }
      lastTick = now;
    };
    const flush = () => {
      tick();
      if (!enabled || !state || !permitted()) return;
      const body = JSON.stringify({ ...state, activeMs: undefined, activeSeconds: Math.floor(state.activeMs / 1000), consent: true });
      // Cumulative snapshots make retries and pagehide duplicates idempotent.
      fetch('/api/analytics/collect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true, credentials: 'omit' }).catch(() => {});
      lastSend = performance.now();
    };
    const sync = () => {
      const next = permitted();
      if (next && !enabled) {
        state = { id: crypto.randomUUID(), path: pathname, activeMs: 0, scrollDepth: 0, actions: {} };
        lastTick = lastInput = performance.now(); enabled = true; flush();
      } else if (!next) { enabled = false; state = undefined; }
    };
    const input = () => { tick(); lastInput = performance.now(); };
    const scroll = () => {
      input();
      if (!enabled || !state) return;
      const height = document.documentElement.scrollHeight - innerHeight;
      state.scrollDepth = Math.max(state.scrollDepth, height > 0 ? Math.min(100, Math.round(scrollY / height * 100)) : 100);
    };
    const action = name => {
      input();
      if (enabled && state) { state.actions[name] = Math.min(100, (state.actions[name] || 0) + 1); flush(); }
    };
    const click = event => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!link) return;
      try {
        const url = new URL(link.href, location.origin);
        if (url.protocol === 'tel:') action('phone');
        else if (url.protocol === 'mailto:') action('email');
        else if (/(^|\.)(wa\.me|whatsapp\.com)$/.test(url.hostname)) action('whatsapp');
        else if (/(^|\.)(maps\.app\.goo\.gl|maps\.google\.com)$/.test(url.hostname) || /google\.[a-z.]+$/.test(url.hostname) && url.pathname.startsWith('/maps')) action('map');
        else if (url.origin !== location.origin && /^https?:$/.test(url.protocol)) action('website');
      } catch {}
    };
    const change = event => {
      const el = event.target;
      if (!(el instanceof Element)) return;
      if (el.matches('input[type="search"]')) action('search');
      else if (el.matches('select')) action('filter');
      else if (el.matches('#calculadora-mapa input')) action('calculator');
    };
    const play = event => { if (event.target instanceof HTMLMediaElement) action(event.target.tagName === 'AUDIO' ? 'audio_play' : 'video_play'); };
    const visibility = () => { flush(); lastTick = performance.now(); };
    sync();
    timer = setInterval(() => { tick(); if (performance.now() - lastSend >= 15000) flush(); }, 1000);
    window.addEventListener('tl:consent', sync);
    window.addEventListener('storage', sync);
    window.addEventListener('pagehide', flush);
    window.addEventListener('pageshow', sync);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('pointerdown', input, { passive: true });
    document.addEventListener('keydown', input);
    document.addEventListener('click', click);
    document.addEventListener('change', change);
    document.addEventListener('play', play, true);
    return () => {
      flush(); clearInterval(timer);
      window.removeEventListener('tl:consent', sync); window.removeEventListener('storage', sync);
      window.removeEventListener('pagehide', flush); window.removeEventListener('pageshow', sync);
      document.removeEventListener('visibilitychange', visibility); document.removeEventListener('scroll', scroll);
      document.removeEventListener('pointerdown', input); document.removeEventListener('keydown', input);
      document.removeEventListener('click', click); document.removeEventListener('change', change); document.removeEventListener('play', play, true);
    };
  }, [pathname]);
  return null;
}
