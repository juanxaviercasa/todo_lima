import ClerkProviderWrapper from '../components/ClerkProviderWrapper.js';
import TodoLimaAssistant from '../components/TodoLimaAssistant.js';
import CookieBanner from '../components/CookieBanner.js';
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
      'description': 'Plataforma líder y red independiente de directorios locales, tecnología y auditoría digital para negocios en Lima Metropolitana.',
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
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://todolima.com/?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ]
};

export default function RootLayout({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || DEFAULT_CLERK_KEY;

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
          {children}
          <TodoLimaAssistant />
          <CookieBanner />
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
