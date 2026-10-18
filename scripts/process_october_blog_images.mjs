import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMAGENES_GEN = path.join(ROOT, 'imagenes_generadas');
const PUBLIC_EDITORIAL = path.join(ROOT, 'public', 'editorial');
const CATALOG_PATH = path.join(ROOT, 'data', 'blog', 'images.json');

const BLOG_IMAGES_TO_PROCESS = [
  // Post 1: Halloween y Canción Criolla
  {
    id: 'halloween-cancion-criolla-portada',
    source: 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79\\halloween_cancion_criolla_portada_1792288267774.jpg',
    role: 'portada',
    alt: 'Familias disfrazadas y transeúntes celebrando la noche del 31 de octubre frente a peñas tradicionales en Lima.',
    caption: 'La convivencia urbana del 31 de octubre: música criolla, disfraces y fiesta barrial en Lima.',
    article_id: 'TLB-OCT-01',
    article_slug: 'halloween-y-dia-de-la-cancion-criolla-en-lima-como-conviven-ambas-celebraciones'
  },
  {
    id: 'halloween-cancion-criolla-pena',
    source: 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79\\halloween_cancion_criolla_pena_1792288288170.jpg',
    role: 'interna-01',
    alt: 'Músicos criollos tocando cajón y guitarra acústica en una tradicional peña de Barranco.',
    caption: 'El fervor de la jarana criolla: compás de cajón y guitarra en las peñas limeñas.',
    article_id: 'TLB-OCT-01',
    article_slug: 'halloween-y-dia-de-la-cancion-criolla-en-lima-como-conviven-ambas-celebraciones'
  },
  {
    id: 'halloween-cancion-criolla-disfraces',
    source: 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79\\halloween_cancion_criolla_disfraces_1792288311849.jpg',
    role: 'interna-02',
    alt: 'Tienda de disfraces y artículos festivos para Halloween concurrida por familias en Lima.',
    caption: 'Comercio estacional: artículos festivos y disfraces para la celebración de Halloween en Lima.',
    article_id: 'TLB-OCT-01',
    article_slug: 'halloween-y-dia-de-la-cancion-criolla-en-lima-como-conviven-ambas-celebraciones'
  },

  // Post 2: Combate de Angamos
  {
    id: 'combate-angamos-feriado-portada',
    source: 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79\\combate_angamos_portada_1792288340708.jpg',
    role: 'portada',
    alt: 'Visitantes apreciando maquetas y reliquias navales en la sala histórica del Museo Naval del Callao.',
    caption: 'Museo Naval del Callao: salas de historia marítima y homenaje a los héroes de Angamos.',
    article_id: 'TLB-OCT-02',
    article_slug: 'combate-de-angamos-feriado-8-octubre-visitas-historicas-lima-callao'
  },
  {
    id: 'combate-angamos-cripta-heroes',
    source: 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79\\combate_angamos_cripta_heroes_1792288377350.jpg',
    role: 'interna-01',
    alt: 'Interior monumental en mármol de la Cripta de los Héroes en el Cementerio Presbítero Maestro de Lima.',
    caption: 'Cripta de los Héroes: reposo del Almirante Miguel Grau y memoria cívica en Lima.',
    article_id: 'TLB-OCT-02',
    article_slug: 'combate-de-angamos-feriado-8-octubre-visitas-historicas-lima-callao'
  },
  {
    id: 'combate-angamos-puerto-callao',
    source: 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79\\combate_angamos_puerto_callao_1792288418927.jpg',
    role: 'interna-02',
    alt: 'Vista soleada del puerto histórico del Callao y la península de La Punta durante el feriado cívico.',
    caption: 'La bahía del Callao y La Punta: circuitos patrimoniales durante el feriado del 8 de octubre.',
    article_id: 'TLB-OCT-02',
    article_slug: 'combate-de-angamos-feriado-8-octubre-visitas-historicas-lima-callao'
  }
];

async function run() {
  console.log('Procesando 6 imágenes de blog para octubre...');

  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

  for (const item of BLOG_IMAGES_TO_PROCESS) {
    if (!fs.existsSync(item.source)) {
      throw new Error(`Archivo no encontrado: ${item.source}`);
    }

    const baseName = `${item.id}.webp`;

    // 1440w
    await sharp(item.source)
      .resize({ width: 1440, height: 810, fit: 'cover', position: 'center' })
      .webp({ quality: 84 })
      .toFile(path.join(IMAGENES_GEN, baseName));

    // 768w
    await sharp(item.source)
      .resize({ width: 768, height: 432, fit: 'cover', position: 'center' })
      .webp({ quality: 82 })
      .toFile(path.join(IMAGENES_GEN, `${item.id}-768.webp`));

    // 480w
    await sharp(item.source)
      .resize({ width: 480, height: 270, fit: 'cover', position: 'center' })
      .webp({ quality: 80 })
      .toFile(path.join(IMAGENES_GEN, `${item.id}-480.webp`));

    // Copiar también a public/editorial
    fs.copyFileSync(path.join(IMAGENES_GEN, baseName), path.join(PUBLIC_EDITORIAL, baseName));
    fs.copyFileSync(path.join(IMAGENES_GEN, `${item.id}-768.webp`), path.join(PUBLIC_EDITORIAL, `${item.id}-768.webp`));
    fs.copyFileSync(path.join(IMAGENES_GEN, `${item.id}-480.webp`), path.join(PUBLIC_EDITORIAL, `${item.id}-480.webp`));

    // Registrar en catálogo
    catalog[item.id] = {
      src: `/editorial/${baseName}`,
      alt: item.alt,
      caption: item.caption,
      role: item.role,
      article_id: item.article_id,
      article_slug: item.article_slug
    };

    console.log(`Procesado y catalogado: ${item.id}`);
  }

  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf8');
  console.log('¡Catálogo data/blog/images.json actualizado con éxito!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
