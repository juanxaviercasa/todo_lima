import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');
const dataDir = path.join(rootDir, 'data');

function generarNuevosAngulos(slug, topBiz) {
  const tituloNicho = slug.replace(/-/g, ' ').toUpperCase();
  const nombre = topBiz?.name || 'los mejores especialistas';
  const direccion = topBiz?.address || 'Lima';
  const rating = topBiz?.rating || '5';

  return [
    {
      id: "urgencia",
      headline: `¿Problemas urgentes? Encuentra ${tituloNicho} en Lima en menos de 15 Minutos`,
      subtitles: [
        `No dejes tu necesidad al azar ni pierdas semanas buscando referencias en la ciudad.`,
        `Garantiza resultados rápidos con especialistas validados. Destaca ${nombre} ubicado en ${direccion}.`
      ],
      ctas: ['Contactar al Especialista por WhatsApp', 'Ver Directorio Inmediato']
    },
    {
      id: "autoridad",
      headline: `El Directorio Definitivo: El Top 1% de ${tituloNicho} Validados en Lima`,
      subtitles: [
        `Contratar un servicio es una decisión crítica. Tomar una decisión equivocada sale muy caro.`,
        `Filtramos los negocios con mayor tasa de éxito. Conecta directo con líderes como ${nombre} (⭐ ${rating} estrellas).`
      ],
      ctas: ['Chatear con un Experto', 'Explorar Ranking de Especialistas']
    },
    {
      id: "prueba-social",
      headline: `Protege tu Inversión con los ${tituloNicho} Más Recomendados de Lima`,
      subtitles: [
        `Cientos de clientes en Lima ya validaron a estos profesionales. No seas el conejillo de indias de nadie.`,
        `Habla hoy mismo y sin intermediarios con los expertos mejor reseñados en Google Maps.`
      ],
      ctas: ['Solicitar Evaluación Gratis', 'Ver Reseñas Verificadas']
    }
  ];
}

console.log('🔄 Iniciando inyección de copy en frío...');

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // Extraemos la información del negocio top para inyectarla en el copy
  const topBiz = data.topBusinessContext || data.businesses[0] || {};
  
  // Reemplazamos el copy viejo por el nuevo catálogo de ganchos
  data.pageContent = generarNuevosAngulos(data.category, topBiz);
  
  // Guardamos el JSON
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
console.log(`✅ Se actualizaron los textos de ${files.length} categorías.`);

console.log('🚀 Sincronizando con GitHub y Vercel...');
try {
  execSync('git add data/*.json', { cwd: rootDir, stdio: 'pipe' });
  execSync('git commit -m "feat: inyeccion masiva de copy de respuesta directa"', { cwd: rootDir, stdio: 'pipe' });
  const currentBranch = execSync('git branch --show-current', { cwd: rootDir, encoding: 'utf-8' }).trim() || 'main';
  execSync(`git push origin ${currentBranch}`, { cwd: rootDir, stdio: 'pipe' });
  console.log('🎉 ¡Listo! Revisa tu Vercel, todos tus directorios se están actualizando con los nuevos textos.');
} catch (error) {
  console.log('⚠️ Los archivos se actualizaron localmente, pero debes hacer el git push manualmente.');
}