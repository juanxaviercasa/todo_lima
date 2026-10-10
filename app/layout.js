import ClerkProviderWrapper from '../components/ClerkProviderWrapper.js';
import SiteEnhancements from '../components/SiteEnhancements.js';
import CookieBanner from '../components/CookieBanner.js';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://todolima.com'),
  title: 'Todo Lima | Directorio de negocios y servicios en Lima',
  description: 'Explora negocios, compara ubicaciones y consulta directamente a proveedores de servicios en Lima.',
  keywords: 'directorio lima, doctores lima, dentistas lima, gasfiteros lima, abogados lima, servicios tecnicos lima, negocios lima peru',
  authors: [{ name: 'Todo Lima Network' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
};

const DEFAULT_CLERK_KEY = 'pk_test_ZW1pbmVudC1tb25rZXktNDI3MS5jbGVyay5hY2NvdW50cy5kZXYk';

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://todolima.com/#organization',
      'name': 'Todo Lima',
      'url': 'https://todolima.com',
      'logo': 'https://todolima.com/images/logo.jpg',
      'description': 'Directorio independiente y guías para elegir negocios y servicios en Lima.',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Lima',
        'addressRegion': 'Lima',
        'addressCountry': 'PE'
      }
    },
    {
      '@type': 'WebSite',
      '@id': 'https://todolima.com/#website',
      'url': 'https://todolima.com',
      'name': 'Todo Lima',
      'publisher': { '@id': 'https://todolima.com/#organization' },
    }
  ]
};

export default function RootLayout({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || DEFAULT_CLERK_KEY;

  return (
    <ClerkProviderWrapper publishableKey={publishableKey}>
      <html lang="es-PE" className="scroll-smooth" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var t = localStorage.getItem('todolima_theme');
                    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } catch(e) {}
                })();
              `
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
          />
        </head>
        <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-sky-500/20 selection:text-sky-900">
          <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:p-4 focus:text-slate-900">Saltar al contenido</a>
          {children}
          <SiteEnhancements />
          <CookieBanner />
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
