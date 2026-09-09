import fs from 'fs';
import path from 'path';

// Genera las rutas estáticas del directorio legado.
export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDir);
  return files.filter(f => f.endsWith('.json')).map(file => ({
    categoria: file.replace('.json', '')
  }));
}

export default async function DirectorioPage({ params }) {
  const { categoria } = params;
  const filePath = path.join(process.cwd(), 'data', `${categoria}.json`);

  if (!fs.existsSync(filePath)) {
    return <h1 className="text-center text-2xl mt-20">Directorio en construcción...</h1>;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const { pageContent, businesses } = data;

  const isArray = Array.isArray(pageContent);
  const activeCopy = isArray
    ? pageContent[Math.floor(Math.random() * pageContent.length)]
    : pageContent;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-900 text-white p-10 rounded-2xl shadow-lg mb-10 text-center">
          <span className="text-blue-300 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Gancho activo: {activeCopy?.id || 'Normal'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{activeCopy?.headline}</h1>

          {activeCopy?.subtitles?.map((sub, i) => (
            <p key={i} className="text-lg md:text-xl mb-3 text-blue-100">{sub}</p>
          ))}

          <a href="#" className="inline-block mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-transform transform hover:scale-105 shadow-xl">
            {activeCopy?.ctas?.[0] || 'Ver directorio'}
          </a>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Top {businesses.length} Especialistas Validados
        </h2>

        <div className="grid gap-6">
          {businesses.map((biz) => (
            <div key={biz.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{biz.name}</h3>
                <p className="text-gray-500 mt-1 flex items-center">
                  📍 {biz.address}
                </p>
                <span className="inline-block mt-3 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                  {biz.category}
                </span>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-yellow-500 text-xl font-black">
                  {biz.rating ? `⭐ ${biz.rating}` : '⭐ Nuevo'}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {biz.reviewsCount ? `${biz.reviewsCount} reseñas verificadas` : 'Sin reseñas aún'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}