import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const BRAIN_DIR = 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79';
const IMAGENES_GEN = path.join(ROOT, 'imagenes_generadas');
const TARGET_DIR = path.join(ROOT, 'public', 'images', 'atlas');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const IMAGE_MAPPINGS = [
  // 0. Hub
  {
    id: 'atlas-hub-hero',
    source: path.join(BRAIN_DIR, 'atlas_hub_hero_1791728684837.jpg'),
    alt: 'Panorámica crepuscular de los acantilados de la Costa Verde y el perfil urbano de Lima Metropolitana.'
  },
  // 1. Historia
  {
    id: 'historia-hero',
    source: path.join(BRAIN_DIR, 'historia_hero_1791728710739.jpg'),
    alt: 'Casonas virreinales y balcones de cajón de cedro en el Centro Histórico de Lima.'
  },
  {
    id: 'historia-interiorA',
    source: path.join(BRAIN_DIR, 'historia_huaca_1791728738734.jpg'),
    alt: 'Estructuras de adobe prehispánico en Huaca Pucllana en contraste con la metrópoli moderna.',
    caption: 'Muros de adobe con técnica sismorresistente del librero en el valle de Lima.'
  },
  {
    id: 'historia-interiorB',
    source: path.join(BRAIN_DIR, 'historia_archivo_1791728772779.jpg'),
    alt: 'Especialista en conservación documental examinando cartografía histórica de Lima virreinal.',
    caption: 'Taller de restauración documental y custodia de la memoria cartográfica de Lima.'
  },
  // 2. Gastronomía
  {
    id: 'gastronomia-hero',
    source: path.join(BRAIN_DIR, 'gastronomia_hero_1791728819654.jpg'),
    alt: 'Preparación artesanal de cebiche clásico con pesca del día, ají limo y choclo desgranado.'
  },
  {
    id: 'gastronomia-interiorA',
    source: path.join(BRAIN_DIR, 'gastronomia_chifa_1791728862975.jpg'),
    alt: 'Salteado al wok a fuego vivo en una cocina tradicional de chifa en Lima.',
    caption: 'Técnica de salteado cantonés fusionada con insumos peruanos en el Barrio Chino de Lima.'
  },
  {
    id: 'gastronomia-interiorB',
    source: path.join(BRAIN_DIR, 'gastronomia_anticuchos_1791728907253.jpg'),
    alt: 'Picantera tradicional preparando anticuchos a las brasas de carbón en una esquina limeña.',
    caption: 'Herencia afroperuana: anticuchos a las brasas y aderezo criollo en una noche de Lima.'
  },
  // 3. Cultura y Tradiciones
  {
    id: 'cultura-hero',
    source: path.join(BRAIN_DIR, 'cultura_hero_1791728956515.jpg'),
    alt: 'Multitudinaria procesión del Señor de los Milagros con sahumadoras y hábitos morados en Lima Centro.'
  },
  {
    id: 'cultura-interiorA',
    source: path.join(BRAIN_DIR, 'cultura_musica_criolla_1791729030660.jpg'),
    alt: 'Músicos interpretando valses criollos con guitarra acústica y cajón de madera en Barrios Altos.',
    caption: 'Peña tradicional criolla: el pulso de la guitarra y el cajón en Barrios Altos.'
  },
  {
    id: 'cultura-interiorB',
    source: path.join(BRAIN_DIR, 'cultura_festividad_1791729099571.jpg'),
    alt: 'Danzantes con trajes bordados en una festividad comunitaria regional en Lima.',
    caption: 'Danzas patronales y recreación de identidades regionales en clubes urbanos de Lima.'
  },
  // 4. Geografía y Clima
  {
    id: 'geografia-hero',
    source: path.join(BRAIN_DIR, 'geografia_hero_1791729162486.jpg'),
    alt: 'Paisaje verde de las lomas costeras cubiertas por neblina estacional en el desierto limeño.'
  },
  {
    id: 'geografia-interiorA',
    source: path.join(BRAIN_DIR, 'geografia_costa_verde_1791729231424.jpg'),
    alt: 'Surfistas en las olas del Pacífico frente a los acantilados geológicos de la Costa Verde.',
    caption: 'Acantilados de canto rodado y borde marítimo de la Costa Verde frente al Océano Pacífico.'
  },
  {
    id: 'geografia-interiorB',
    source: path.join(BRAIN_DIR, 'geografia_valle_rimac_1791729302282.jpg'),
    alt: 'Cauce del río Rímac fluyendo desde las estribaciones andinas hacia el valle de Lima.',
    caption: 'Cuenca del río Rímac: eje hidrográfico esencial y transición hacia las estribaciones andinas.'
  },
  // 5. Movilidad y Transporte
  {
    id: 'movilidad-hero',
    source: path.join(IMAGENES_GEN, 'tarjetas-del-transporte-publico-de-lima-donde-funcionan-y-que-confirmar-portada-estacion.webp'),
    alt: 'Infraestructura y terminal de pasajeros del sistema de transporte urbano en Lima.'
  },
  {
    id: 'movilidad-interiorA',
    source: path.join(IMAGENES_GEN, 'tarjetas-del-transporte-publico-de-lima-donde-funcionan-y-que-confirmar-plataforma-pasajeros.webp'),
    alt: 'Plataforma de abordaje y flujo ordenado de usuarios en el transporte metropolitano.',
    caption: 'Operación diaria y distribución de flujos en las troncales masivas de transporte limeño.'
  },
  {
    id: 'movilidad-interiorB',
    source: path.join(IMAGENES_GEN, 'clubes-metropolitanos-de-serpar-como-comparar-espacios-y-requisitos-paradero-corredor.webp'),
    alt: 'Paradero de corredores complementarios y conexión multimodal urbana.',
    caption: 'Corredores complementarios y transporte intermodal en las avenidas radiales de Lima.'
  },
  // 6. Las 5 Limas y el Callao
  {
    id: 'antropologia-hero',
    source: path.join(IMAGENES_GEN, 'los-olivos-como-consultar-espacios-y-actividades-del-distrito-portada-distrito-limeno.webp'),
    alt: 'Centralidad urbana, comercio y dinamismo vecinal en Lima Norte y las macrozonas.'
  },
  {
    id: 'antropologia-interiorA',
    source: path.join(IMAGENES_GEN, 'como-organizar-un-traslado-al-aeropuerto-y-confirmar-el-punto-de-encuentro-portada-aeropuerto.webp'),
    alt: 'Conexión logística y puerto/aeropuerto del Callao integrados a la metrópoli.',
    caption: 'La Provincia Constitucional del Callao: puerto marítimo y nodo internacional conectado a Lima.'
  },
  {
    id: 'antropologia-interiorB',
    source: path.join(IMAGENES_GEN, 'barranco-a-pie-patrimonio-arte-y-pausas-para-comer-portada-patrimonio-arquitectura.webp'),
    alt: 'Arquitectura tradicional y escala barrial en los balnearios históricos de Lima.',
    caption: 'Convivencia barrial, patrimonio histórico y nuevos polos residenciales en Lima tradicional.'
  },
  // 7. Emporios Comerciales
  {
    id: 'emporios-hero',
    source: path.join(IMAGENES_GEN, 'artesania-en-lima-materiales-oficios-y-lugares-de-encuentro-feria-artesanias-textiles.webp'),
    alt: 'Talleres textiles, confección y artesanía en los emporios productivos de Lima.'
  },
  {
    id: 'emporios-interiorA',
    source: path.join(IMAGENES_GEN, 'artesania-en-lima-materiales-oficios-y-lugares-de-encuentro-portada-mercado-artesanal-lima.webp'),
    alt: 'Galerías comerciales especializadas y distribución mayorista en el corazón económico de Lima.',
    caption: 'Comercio mayorista y cadenas de valor locales en los conglomerados comerciales de la ciudad.'
  },
  {
    id: 'emporios-interiorB',
    source: path.join(IMAGENES_GEN, 'que-informacion-debe-tener-una-ficha-de-negocio-para-ayudar-al-cliente-comercio-local-vecinos-confianza.webp'),
    alt: 'Comercio local, atención al cliente y emprendimiento cotidiano en Lima.',
    caption: 'Micro y pequeña empresa: el motor de empleo y abastecimiento vecinal en la economía limeña.'
  }
];

async function processAll() {
  console.log(`Iniciando procesamiento de ${IMAGE_MAPPINGS.length} imágenes para el Atlas Conoce Lima...`);

  const catalog = {};

  for (const img of IMAGE_MAPPINGS) {
    if (!fs.existsSync(img.source)) {
      console.error(`ERROR: Archivo origen no encontrado: ${img.source}`);
      continue;
    }

    const baseName = img.id;
    const dest1440 = path.join(TARGET_DIR, `${baseName}.webp`);
    const dest768 = path.join(TARGET_DIR, `${baseName}-768.webp`);
    const dest480 = path.join(TARGET_DIR, `${baseName}-480.webp`);

    // Procesar resolución máxima (hasta 1440w)
    await sharp(img.source)
      .resize({ width: 1440, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(dest1440);

    // Procesar resolución tablet (768w)
    await sharp(img.source)
      .resize({ width: 768, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest768);

    // Procesar resolución móvil (480w)
    await sharp(img.source)
      .resize({ width: 480, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dest480);

    catalog[img.id] = {
      src: `/images/atlas/${baseName}.webp`,
      srcSet: `/images/atlas/${baseName}-480.webp 480w, /images/atlas/${baseName}-768.webp 768w, /images/atlas/${baseName}.webp 1440w`,
      alt: img.alt,
      caption: img.caption || null
    };

    console.log(`✓ Procesada: ${img.id}`);
  }

  // Generar archivo lib/atlasImages.js
  const libContent = `// Catálogo centralizado de imágenes ilustrativas del Atlas Conoce Lima
// Generadas y optimizadas en WebP con responsive srcSet
export const ATLAS_IMAGES = ${JSON.stringify(catalog, null, 2)};
`;

  fs.writeFileSync(path.join(ROOT, 'lib', 'atlasImages.js'), libContent, 'utf8');
  console.log(`Catálogo guardado en: lib/atlasImages.js`);
}

processAll().catch(err => {
  console.error('Fallo en el procesamiento:', err);
  process.exit(1);
});
