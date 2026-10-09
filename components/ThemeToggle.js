'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Leer el estado actual de la clase 'dark' en <html>
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('todolima_theme', 'dark');
      } catch (e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('todolima_theme', 'light');
      } catch (e) {}
    }
  };

  if (!mounted) {
    // Renderizado neutro para evitar saltos de hidratación SSR
    return (
      <div className={`w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center opacity-70 ${className}`} aria-hidden="true">
        <span className="w-4 h-4" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-xs active:scale-95 ${
        isDark
          ? 'bg-slate-800 text-amber-400 hover:bg-slate-700 border border-slate-700 hover:text-amber-300'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/90 hover:text-slate-900'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
