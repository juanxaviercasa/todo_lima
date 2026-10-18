import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const TARGET_DIR = path.join(ROOT, 'public', 'images', 'atlas');

const IMAGES = [
  {
    id: 'calendario-hero',
    source: 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79\\calendario_hero_1792288237120.jpg',
    alt: 'Celebración cívica y cultural en la Plaza Mayor de Lima frente a la Catedral y el Palacio Municipal.'
  },
  {
    id: 'calendario-interiorA',
    source: 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79\\calendario_interiora_1792288256078.jpg',
    alt: 'Solemne procesión del Señor de los Milagros con sahumadoras, hábitos morados y andas en el Centro de Lima.',
    caption: 'Tradición viva del Mes Morado: sahumadoras y fieles acompañando al Cristo Moreno en Lima.'
  },
  {
    id: 'calendario-interiorB',
    source: 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79\\calendario_interiorb_1792288280738.jpg',
    alt: 'Ceremonia cívico-patriótica y conmemoración naval en la plaza costera del Callao.',
    caption: 'Memoria cívica naval: conmemoración del Combate de Angamos y el legado de Miguel Grau en el Callao.'
  }
];

async function run() {
  console.log('Procesando imágenes del pilar Calendario Cívico y Festivo...');
  for (const item of IMAGES) {
    if (!fs.existsSync(item.source)) {
      throw new Error(`Archivo no encontrado: ${item.source}`);
    }

    // 1440
    await sharp(item.source)
      .resize({ width: 1440, height: 810, fit: 'cover', position: 'center' })
      .webp({ quality: 84 })
      .toFile(path.join(TARGET_DIR, `${item.id}.webp`));

    // 768
    await sharp(item.source)
      .resize({ width: 768, height: 432, fit: 'cover', position: 'center' })
      .webp({ quality: 82 })
      .toFile(path.join(TARGET_DIR, `${item.id}-768.webp`));

    // 480
    await sharp(item.source)
      .resize({ width: 480, height: 270, fit: 'cover', position: 'center' })
      .webp({ quality: 80 })
      .toFile(path.join(TARGET_DIR, `${item.id}-480.webp`));

    console.log(`Procesado exitosamente: ${item.id} en 1440, 768, 480`);
  }
  console.log('¡Todas las imágenes del pilar de calendario fueron generadas exitosamente!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
