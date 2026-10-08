import ClerkProviderWrapper from '../components/ClerkProviderWrapper.js';
import './globals.css';

export const metadata = {
  title: 'Todo Lima | Directorio Oficial de Negocios y Especialistas en Lima',
  description: 'Red masiva e independiente de directorios locales con los profesionales, técnicos y negocios mejor calificados en Lima Metropolitana.',
  keywords: 'directorio lima, doctores lima, dentistas lima, gasfiteros lima, abogados lima, servicios tecnicos lima, negocios lima peru',
  authors: [{ name: 'Todo Lima Network' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
};

export default function RootLayout({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProviderWrapper publishableKey={publishableKey}>
      <html lang="es" className="scroll-smooth">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-sky-500/20 selection:text-sky-900">
          {children}
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
