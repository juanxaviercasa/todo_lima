import './globals.css';

export const metadata = {
  title: 'Todo Lima | Directorio Oficial de Negocios y Profesionales en Lima',
  description: 'Red masiva de directorios locales con los profesionales y negocios mejor calificados en Lima, Perú.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
