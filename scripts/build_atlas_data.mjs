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
        fuentes.push({
          publisher: cleanText(fMatch[1].replace(/:$/, '')),
          detail: cleanText(fMatch[2])
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
    crossLinks,
    sources: fuentes
  });
}

console.log(`Procesados ${pilares.length} pilares de contenido.`);
fs.writeFileSync(outPath, JSON.stringify(pilares, null, 2), 'utf8');
console.log(`Guardado exitosamente en: ${outPath}`);
