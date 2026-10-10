'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
const BusinessSupport = dynamic(() => import('./TodoLimaAssistant.js'), { ssr: false });
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export default function SiteEnhancements() {
  const pathname = usePathname();
  useEffect(() => {
    if (!/^G-[A-Z0-9]+$/.test(measurementId || '')) return;
    let active = false;
    function syncConsent() {
      try { active = localStorage.getItem('tl_cookie_consent') === 'accepted'; } catch { active = false; }
      if (!active) { if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' }); return; }
      if (!document.getElementById('tl-analytics')) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        window.gtag('js', new Date());
        window.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
        const script = document.createElement('script');
        script.id = 'tl-analytics'; script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);
      }
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      window.gtag('event', 'page_view', { page_location: `${window.location.origin}${pathname}`, page_title: document.title });
    }
    function click(event) {
      const link = event.target instanceof Element ? event.target.closest('[data-contact-event]') : null;
      if (active && link && window.gtag) window.gtag('event', link.dataset.contactEvent, { entity_id: link.dataset.entity || 'platform', page_path: pathname, transport_type: 'beacon' });
    }
    syncConsent();
    window.addEventListener('tl:consent', syncConsent);
    document.addEventListener('click', click);
    return () => { window.removeEventListener('tl:consent', syncConsent); document.removeEventListener('click', click); };
  }, [pathname]);
  return pathname === '/para-negocios' || pathname === '/auditoria' ? <BusinessSupport /> : null;
}
