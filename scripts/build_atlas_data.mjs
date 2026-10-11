import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const mdPath = path.join(ROOT, 'Investigación Atlas Conoce Lima.md');
const outPath = path.join(ROOT, 'data', 'atlas', 'pilares.json');

const raw = fs.readFileSync(mdPath, 'utf8');

// Función para limpiar caracteres escapados de markdown
function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/\\([()[\].,;:'"-])/g, '$1')
    .trim();
}

// Definir los 7 pilares con metadatos base
const pillarDefs = [
  {
    slug: 'historia-de-lima',
    shortTitle: 'Historia y Territorio',
    icon: 'Landmark',
    headerMatch: 'Historia y Evolución Territorial de Lima',
    heroImage: 'historia-hero',
    interiorA: 'historia-interiorA',
    interiorB: 'historia-interiorB'
  },
  {
    slug: 'gastronomia-limena',
    shortTitle: 'Gastronomía y Mestizaje',
    icon: 'UtensilsCrossed',
    headerMatch: 'Gastronomía Limeña y Mestizaje Culinario',
    heroImage: 'gastronomia-hero',
    interiorA: 'gastronomia-interiorA',
    interiorB: 'gastronomia-interiorB'
  },
  {
    slug: 'cultura-y-tradiciones',
    shortTitle: 'Cultura y Tradiciones',
    icon: 'Sparkles',
    headerMatch: 'Cultura Viva, Expresiones Populares y Tradiciones',
    heroImage: 'cultura-hero',
    interiorA: 'cultura-interiorA',
    interiorB: 'cultura-interiorB'
  },
  {
    slug: 'geografia-y-clima',
    shortTitle: 'Geografía y Clima',
    icon: 'Compass',
    headerMatch: 'Geografía, Clima y Ecosistemas Costeros',
    heroImage: 'geografia-hero',
    interiorA: 'geografia-interiorA',
    interiorB: 'geografia-interiorB'
  },
  {
    slug: 'movilidad-y-transporte',
    shortTitle: 'Movilidad y Transporte',
    icon: 'Bus',
    headerMatch: 'Movilidad Metropolitana y Transporte Urbano',
    heroImage: 'movilidad-hero',
    interiorA: 'movilidad-interiorA',
    interiorB: 'movilidad-interiorB'
  },
  {
    slug: 'las-5-limas-y-callao',
    shortTitle: 'Las 5 Limas y el Callao',
    icon: 'MapPin',
    headerMatch: 'Antropología Territorial',
    heroImage: 'antropologia-hero',
    interiorA: 'antropologia-interiorA',
    interiorB: 'antropologia-interiorB'
  },
  {
    slug: 'emporios-comerciales',
    shortTitle: 'Emporios Comerciales',
    icon: 'ShoppingBag',
    headerMatch: 'Economía Local, Clústeres y Emporios Comerciales',
    heroImage: 'emporios-hero',
    interiorA: 'emporios-interiorA',
    interiorB: 'emporios-interiorB'
  }
];

const SOURCE_URLS = {
  'Congreso de la República': 'https://busquedas.elperuano.pe/dispositivo/NL/2253462-1',
  'Ministerio de Economía y Finanzas / El Peruano': 'https://busquedas.elperuano.pe/dispositivo/NL/2463050-7',
  'Municipalidad Metropolitana de Lima (MML)': 'https://portal.imp.gob.pe/planificacion/centro-historico/',
  'Ministerio de Cultura (MINCUL)': 'https://www.gob.pe/cultura',
  'Ministerio de Cultura / PromPerú': 'https://peru.info/es-pe/gastronomia',
  'Archivo General de la Nación (AGN)': 'https://www.gob.pe/agn',
  'Colegio de Arquitectos del Perú': 'https://cap.org.pe/',
  'Ministerio de Educación (MINEDU)': 'https://www.casadelaliteratura.gob.pe/',
  'Congreso de la República / El Peruano': 'https://busquedas.elperuano.pe/dispositivo/NL/1517457-1',
  'Ministerio del Ambiente (MINAM) / SERNANP': 'https://www.gob.pe/sernanp',
  'Servicio Nacional de Meteorología e Hidrología del Perú (SENAMHI)': 'https://www.senamhi.gob.pe/',
  'Instituto Nacional de Estadística e Informática (INEI)': 'https://www.inei.gob.pe/',
  'Autoridad de Transporte Urbano (ATU) / MTC': 'https://www.gob.pe/atu',
  'Organismo Supervisor de la Inversión en Infraestructura de Transporte de Uso Público (OSITRAN)': 'https://www.gob.pe/ositran',
  'Superintendencia de Transporte Terrestre (SUTRAN)': 'https://www.gob.pe/sutran',
  'Gobierno Regional del Callao': 'https://www.regioncallao.gob.pe/',
  'Ministerio de la Producción (PRODUCE)': 'https://www.gob.pe/produce',
  'Cámara de Comercio de Lima (CCL)': 'https://www.camaralima.org.pe/',
  'Municipalidad Metropolitana de Lima (MML) / Gerencia de Desarrollo Económico': 'https://www.munlima.gob.pe/'
};

const PILLAR_FAQS = {
  'historia-de-lima': [
    {
      q: '¿Cuándo se fundó la ciudad de Lima y cuál fue su nombre original?',
      a: 'Lima fue fundada el 18 de enero de 1535 por Francisco Pizarro con el nombre oficial de "Ciudad de los Reyes", sobre el valle del río Rímac gobernado ancestralmente por el curaca Taulichusco del señorío Ichma.'
    },
    {
      q: '¿Qué canales prehispánicos abastecieron de agua a Lima durante siglos?',
      a: 'Los canales milenarios Huatica, Surco y Maranga, diseñados por las culturas Lima e Ichma, domesticaron el desierto costero y continuaron regando haciendas, huertas y la trama urbana de la capital hasta bien entrado el siglo XX.'
    },
    {
      q: '¿Qué establece la Ley 31980 respecto al Centro Histórico de Lima?',
      a: 'Crea un régimen legal y tributario especial para el Centro Histórico de Lima que otorga beneficios fiscales por inversión privada y mecenazgo cultural, alineado con el Plan Maestro 2019-2035 de PROLIMA para la recuperación del Patrimonio de la Humanidad.'
    }
  ],
  'gastronomia-limena': [
    {
      q: '¿Qué raíces culturales dieron forma a la gastronomía criolla limeña?',
      a: 'La cocina limeña es resultado del mestizaje entre ingredientes prehispánicos (ajíes, maíz, papas, pescados), la tradición hispano-morisca, el aporte afroperuano (anticuchos, cau cau), la migración china cantonesa (chifa) y la influencia japonesa (nikkei).'
    },
    {
      q: '¿Cómo evolucionó la técnica del cebiche tradicional en Lima?',
      a: 'Antiguamente el pescado se maceraba durante horas en jugo de naranja agria. Con la influencia de los cocineros nikkei a mediados del siglo XX, se consolidó la técnica contemporánea de marinado instantáneo en segundos con limón sutil fresco y ají limo.'
    },
    {
      q: '¿Cuáles son los postres tradicionales más representativos de Lima?',
      a: 'Destacan el suspiro a la limeña, los picarones con miel de chancaca e higo, la mazamorra morada combinada con arroz con leche ("el clásico"), y el tradicional turrón de Doña Pepa consumido especialmente durante el mes morado.'
    }
  ],
  'cultura-y-tradiciones': [
    {
      q: '¿Por qué octubre se conoce como el "Mes Morado" en Lima?',
      a: 'Porque se realiza la festividad del Señor de los Milagros (Cristo Moreno o de Pachacamilla), congregando multitudinarias procesiones donde los fieles visten túnicas moradas nazarenas, acompañadas de sahumadoras y cantos tradicionales.'
    },
    {
      q: '¿Qué instrumentos musicales definen la música criolla limeña?',
      a: 'La instrumentación esencial combina la guitarra acústica española con el cajón peruano de madera, la quijada de burro y las castañuelas o palmas, estructurando géneros emblemáticos como el vals criollo, la marinera limeña y el festejo.'
    },
    {
      q: '¿Qué importancia histórica tienen las catacumbas de San Francisco en Lima?',
      a: 'Ubicadas bajo la Basílica y Convento de San Francisco, funcionaron como el principal cementerio de la ciudad durante el virreinato, albergando los restos de más de 25,000 personas hasta la creación del Cementerio Presbítero Maestro en 1808.'
    }
  ],
  'geografia-y-clima': [
    {
      q: '¿Por qué el cielo de Lima es gris la mayor parte del año ("panza de burro")?',
      a: 'Se debe a la corriente fría de Humboldt en el Océano Pacífico, que produce una inversión térmica que condensa una capa permanente de estratocúmulos bajos y neblina ("garúa"), impidiendo la lluvia intensa y moderando las temperaturas.'
    },
    {
      q: '¿Qué son las lomas costeras de Lima y en qué época del año reverdecen?',
      a: 'Son ecosistemas estacionales únicos del desierto que captan la humedad de las nieblas marinas entre junio y octubre, reverdeciendo colinas áridas con flores como el Amancay en Lúcumo (Pachacámac), Lachay, Mangomarca y Villa María del Triunfo.'
    },
    {
      q: '¿Cuáles son las tres cuencas hidrográficas que sustentan a Lima Metropolitana?',
      a: 'Las cuencas de los ríos Rímac (el principal proveedor de agua potable a través de la planta de La Atarjea), Chillón al norte y Lurín al sur, las cuales forman los valles agrícolas y urbanos sobre los que se expandió la ciudad.'
    }
  ],
  'movilidad-y-transporte': [
    {
      q: '¿Qué sistemas de transporte masivo operan formalmente en Lima Metropolitana?',
      a: 'El sistema articulado por la ATU comprende la Línea 1 del Metro de Lima (tren eléctrico elevado de Villa El Salvador a San Juan de Lurigancho), el Metropolitano (buses articulados en vía segregada de norte a sur) y los Corredores Complementarios (Rojo, Azul, Morado).'
    },
    {
      q: '¿Cómo se paga el transporte público en el Metro y en el Metropolitano?',
      a: 'Se emplean tarjetas electrónicas sin contacto recargables en estaciones y puntos autorizados: la Tarjeta Lima Pass / Metropolitano para buses y la Tarjeta Línea 1 para el tren eléctrico, con avance hacia un sistema de recaudo unificado.'
    },
    {
      q: '¿Qué es la Vía Expresa Paseo de la República y por qué es emblemática?',
      a: 'Conocida popularmente como "El Zanjón", es una autopista urbana en trinchera inaugurada a finales de la década de 1960 que conecta el Centro de Lima con el sur (Lince, San Isidro, Miraflores, Barranco), integrando carriles vehiculares y la troncal del Metropolitano.'
    }
  ],
  'las-5-limas-y-callao': [
    {
      q: '¿Cómo se divide territorial y demográficamente "Las 5 Limas"?',
      a: 'Se agrupan en Lima Centro (eje administrativo e histórico), Lima Norte (polo comercial y demográfico dinámico), Lima Sur (productiva y litoral de balnearios), Lima Este (industrial y residencial extensa) y Lima Moderna / Top (centros corporativos y financieros).'
    },
    {
      q: '¿Cuál es el distrito más poblado de Lima y de todo el Perú?',
      a: 'San Juan de Lurigancho, ubicado en Lima Este, con más de 1.2 millones de habitantes, concentrando una vasta actividad comercial, cultural y comunitaria mayor que la de varias regiones enteras del país.'
    },
    {
      q: '¿Por qué el Callao tiene un estatus administrativo diferente al de Lima?',
      a: 'El Callao fue declarado Provincia Constitucional en 1857 y cuenta con su propio Gobierno Regional y Municipalidad Provincial independiente, aunque forma con Lima un continuo urbano y metropolitano indivisible de más de 10 millones de personas.'
    }
  ],
  'emporios-comerciales': [
    {
      q: '¿Qué es el emporio comercial de Gamarra y cuál es su impacto económico?',
      a: 'Ubicado en el distrito de La Victoria, Gamarra es el conglomerado textil y de confecciones más grande de Sudamérica, agrupando a más de 30,000 unidades productivas y comerciales que generan miles de empleos directos y abastecen a todo el mercado nacional y regional.'
    },
    {
      q: '¿Dónde se encuentra Mesa Redonda y qué tipo de comercio concentra?',
      a: 'Situado en el Cercado de Lima entre los jirones Cusco, Andahuaylas y Puno, es el principal centro mayorista y minorista de importaciones, artículos escolares, juguetes, decoración y menaje para hogares y comerciantes de todo el país.'
    },
    {
      q: '¿Qué otros clústeres comerciales especializados destacan en Lima?',
      a: 'Destacan el Centro Comercial Polvos Azules (calzado, indumentaria deportiva y electrónica), el conglomerado de Las Malvinas (ferretería, repuestos y tecnología) y el Parque Industrial de Villa El Salvador (muebles de madera, metalmecánica y calzado).'
    }
  ]
};

// Separar las citas bibliográficas al final si existen
let worksCitedText = '';
let mainText = raw;
const wcMatch = raw.indexOf('#### **Works cited**');
if (wcMatch !== -1) {
  worksCitedText = raw.slice(wcMatch);
  mainText = raw.slice(0, wcMatch);
}

// Extraer bloques de pilares dividiendo por encabezados H1
const h1Indices = [];
const lines = mainText.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('# **')) {
    h1Indices.push({ lineIndex: i, titleLine: line });
  }
}

console.log(`Encontrados ${h1Indices.length} encabezados H1.`);

const pilares = [];

for (let i = 0; i < h1Indices.length; i++) {
  const curr = h1Indices[i];
  const next = h1Indices[i + 1];
  const start = curr.lineIndex;
  const end = next ? next.lineIndex : lines.length;

  const blockLines = lines.slice(start, end);
  const blockText = blockLines.join('\n');

  const pDef = pillarDefs[i];
  const fullTitle = curr.titleLine.replace(/^#\s*\*\*/, '').replace(/\*\*.*$/, '').trim();

  // 1. Extraer Meta Description
  let metaDesc = '';
  const mDescMatch = blockText.match(/\*\s*\*\*Meta Description SEO:\*\*\s*(.+)/i);
  if (mDescMatch) {
    metaDesc = cleanText(mDescMatch[1]);
  }

  // 2. Extraer Definición Canónica
  let canonDef = '';
  const cDefMatch = blockText.match(/\*\s*\*\*Definición Canónica:\*\*\s*(.+)/i);
  if (cDefMatch) {
    canonDef = cleanText(cDefMatch[1]);
  }

  // 3. Extraer Entidades de Wikidata
  let entities = [];
  const entMatch = blockText.match(/\*\s*\*\*Entidades de Wikidata\/Wikipedia vinculadas:\*\*\s*(.+)/i);
  if (entMatch) {
    const rawEnt = entMatch[1].trim();
    // Parse Q numbers and names: Q2868 (Lima), Q5263 (Centro Histórico de Lima)
    const matches = [...rawEnt.matchAll(/(Q\d+)\s*\(([^)]+)\)/g)];
    if (matches.length > 0) {
      entities = matches.map(m => ({ id: m[1], name: cleanText(m[2]), url: `https://www.wikidata.org/wiki/${m[1]}` }));
    } else {
      entities = rawEnt.split(',').map(s => ({ name: cleanText(s) }));
    }
  }

  // 4. Extraer Tabla Maestra Estructural
  let table = { headers: [], rows: [] };
  const tableStart = blockText.indexOf('| Periodo');
  const tableAltStart = tableStart !== -1 ? tableStart : blockText.indexOf('| Elemento');
  const tableFinalStart = tableAltStart !== -1 ? tableAltStart : blockText.indexOf('| Expresión');
  const tableStartEff = tableFinalStart !== -1 ? tableFinalStart : blockText.indexOf('| Sistema');
  const tableStartEff2 = tableStartEff !== -1 ? tableStartEff : blockText.indexOf('| Macrozona');
  const tableStartEff3 = tableStartEff2 !== -1 ? tableStartEff2 : blockText.indexOf('| Emporio');

  if (tableStartEff3 !== -1) {
    const tableSub = blockText.slice(tableStartEff3);
    const tableLines = tableSub.split('\n').filter(l => l.trim().startsWith('|'));
    if (tableLines.length >= 3) {
      const parseRow = l => l.split('|').map(c => cleanText(c)).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
      table.headers = parseRow(tableLines[0]);
      // tableLines[1] is separator :---
      for (let r = 2; r < tableLines.length; r++) {
        const row = parseRow(tableLines[r]);
        if (row.length === table.headers.length) {
          table.rows.push(row);
        }
      }
    }
  }

  // 5. Extraer Secciones H2
  const sections = [];
  const h2Matches = [];
  for (let j = 0; j < blockLines.length; j++) {
    const bl = blockLines[j];
    if (bl.startsWith('## **') && !bl.includes('Ficha Técnica') && !bl.includes('Tabla Maestra') && !bl.includes('Matriz de Enlaces') && !bl.includes('Expediente de Fuentes')) {
      h2Matches.push({ index: j, title: cleanText(bl.replace(/^##\s*\*\*/, '').replace(/\*\*.*$/, '')) });
    }
  }

  for (let k = 0; k < h2Matches.length; k++) {
    const curH2 = h2Matches[k];
    const nxtH2 = h2Matches[k + 1];
    const sStart = curH2.index + 1;
    let sEnd = nxtH2 ? nxtH2.index : blockLines.length;

    // Detenerse antes de Matriz de Enlaces si es la última sección
    for (let m = sStart; m < sEnd; m++) {
      if (blockLines[m].includes('## **Matriz de Enlaces') || blockLines[m].includes('## **Expediente de Fuentes')) {
        sEnd = m;
        break;
      }
    }

    const secParagraphs = blockLines.slice(sStart, sEnd)
      .join('\n')
      .split('\n\n')
      .map(p => cleanText(p))
      .filter(p => p.length > 0 && !p.startsWith('##') && !p.startsWith('|'));

    // Generar slug limpio para ID
    const secId = 'seccion-' + curH2.title.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    sections.push({
      id: secId,
      title: curH2.title,
      paragraphs: secParagraphs
    });
  }

  // 6. Extraer Matriz de Enlaces Cruzados
  let crossLinks = { districts: [], categories: [] };
  const distMatch = blockText.match(/\*\s*\*\*Hacia distritos de Lima:\*\*\s*(.+)/i);
  if (distMatch) {
    crossLinks.districts = distMatch[1].split(',').map(d => {
      const clean = cleanText(d).replace(/\.$/, '');
      const match = clean.match(/^([^(]+)(?:\(([^)]+)\))?/);
      const name = match ? match[1].trim() : clean;
      const desc = match && match[2] ? match[2].trim() : '';
      const slug = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return { name, desc, slug, url: `/directorio?distrito=${slug}` };
    });
  }

  const catMatch = blockText.match(/\*\s*\*\*Hacia categorías del directorio comercial:\*\*\s*(.+)/i);
  if (catMatch) {
    crossLinks.categories = catMatch[1].split(',').map(c => {
      const clean = cleanText(c).replace(/\.$/, '');
      return { name: clean };
    });
  }

  // 7. Extraer Expediente de Fuentes Verificadas
  const fuentes = [];
  const fuentesIdx = blockText.indexOf('## **Expediente de Fuentes Verificadas**');
  if (fuentesIdx !== -1) {
    const fLines = blockText.slice(fuentesIdx).split('\n').filter(l => l.trim().startsWith('* **'));
    for (const fl of fLines) {
      const fMatch = fl.match(/\*\s*\*\*([^*]+)\*\*:?\s*(.+)/);
      if (fMatch) {
        const pub = cleanText(fMatch[1].replace(/:$/, ''));
        fuentes.push({
          publisher: pub,
          detail: cleanText(fMatch[2]),
          url: SOURCE_URLS[pub] || 'https://www.gob.pe'
        });
      }
    }
  }

  pilares.push({
    order: i + 1,
    slug: pDef.slug,
    title: fullTitle,
    shortTitle: pDef.shortTitle,
    icon: pDef.icon,
    metaDescription: metaDesc,
    canonicalDefinition: canonDef,
    wikidataEntities: entities,
    images: {
      hero: pDef.heroImage,
      interiorA: pDef.interiorA,
      interiorB: pDef.interiorB
    },
    table,
    sections,
    faq: PILLAR_FAQS[pDef.slug] || [],
    crossLinks,
    sources: fuentes
  });
}

console.log(`Procesados ${pilares.length} pilares de contenido.`);
fs.writeFileSync(outPath, JSON.stringify(pilares, null, 2), 'utf8');
console.log(`Guardado exitosamente en: ${outPath}`);
