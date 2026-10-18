'use client';
export default function CookieSettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event('tl:cookie-settings'))} className="rounded-xl px-5 py-3 bg-sky-800 hover:bg-sky-900 text-white font-semibold mt-4">Cambiar preferencias de analítica</button>;
}
