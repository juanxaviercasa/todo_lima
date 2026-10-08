import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

/**
 * Convierte cualquier imagen (JPG, PNG) a formato WebP optimizado (1376x768) con Playwright Canvas
 * @param {string} inputImagePath Ruta de la imagen origen
 * @param {string} outputWebpPath Ruta del archivo WebP de destino
 * @param {number} width Ancho deseado (default 1376)
 * @param {number} height Alto deseado (default 768)
 * @param {number} quality Calidad de compresión (0.85 recomendado para Web)
 */
export async function convertToWebp(inputImagePath, outputWebpPath, width = 1376, height = 768, quality = 0.85) {
  if (!fs.existsSync(inputImagePath)) {
    throw new Error(`Imagen origen no encontrada: ${inputImagePath}`);
  }

  const outDir = path.dirname(outputWebpPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const imgBase64 = fs.readFileSync(inputImagePath).toString('base64');
  const ext = path.extname(inputImagePath).toLowerCase().replace('.', '');
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const webpBase64 = await page.evaluate(async ({ b64, mime, w, h, q }) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/webp', q);
          resolve(dataUrl.split(',')[1]);
        };
        img.onerror = () => reject(new Error('Fallo al cargar imagen en canvas'));
        img.src = `data:${mime};base64,` + b64;
      });
    }, { b64: imgBase64, mime: mimeType, w: width, h: height, q: quality });

    fs.writeFileSync(outputWebpPath, Buffer.from(webpBase64, 'base64'));
    console.log(`✅ WebP generado con éxito: ${outputWebpPath} (${fs.statSync(outputWebpPath).size} bytes)`);
    return outputWebpPath;
  } finally {
    await browser.close();
  }
}

// Permite ejecutar desde CLI: node scripts/convert-to-webp.js <input> <output>
if (process.argv[1] && process.argv[1].endsWith('convert-to-webp.js')) {
  const input = process.argv[2];
  const output = process.argv[3];
  if (!input || !output) {
    console.error('Uso: node scripts/convert-to-webp.js <input> <output>');
    process.exit(1);
  }
  convertToWebp(input, output).then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
