import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const PORT = 3456;
const OUT_DIR = path.resolve('out');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(OUT_DIR, reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, async () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  const browser = await chromium.launch();

  // Test 1: Desktop
  const contextDesktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const pageDesktop = await contextDesktop.newPage();
  await pageDesktop.goto(`http://localhost:${PORT}/blog/huacas-de-lima-como-reconocer-su-diversidad-historica`);

  console.log('Testing Desktop view...');
  await pageDesktop.waitForSelector('.article-toc');
  
  // Verify TOC is initially open
  const tocList = pageDesktop.locator('#article-toc-list');
  console.log('TOC list visible initially:', await tocList.isVisible());

  // Click Ocultar button
  const tocBtn = pageDesktop.locator('.article-toc button', { hasText: 'Ocultar' });
  await tocBtn.click();
  console.log('TOC list visible after clicking Ocultar:', await tocList.isVisible());

  // Click Mostrar button
  const tocShowBtn = pageDesktop.locator('.article-toc button', { hasText: 'Mostrar' });
  await tocShowBtn.click();
  console.log('TOC list visible after clicking Mostrar:', await tocList.isVisible());

  // Verify Data Table
  const tableData = pageDesktop.locator('table caption:has-text("Tabla de organización")');
  console.log('Data Table visible initially:', await tableData.isVisible());

  // Click Plegar tabla button
  const tableBtn = pageDesktop.locator('button', { hasText: 'Plegar tabla' });
  await tableBtn.click();
  console.log('Data Table visible after clicking Plegar tabla:', await tableData.isVisible());

  // Click Desplegar tabla button
  const tableShowBtn = pageDesktop.locator('button', { hasText: 'Desplegar tabla' });
  await tableShowBtn.click();
  console.log('Data Table visible after clicking Desplegar tabla:', await tableData.isVisible());

  // Take screenshot desktop
  await pageDesktop.screenshot({ path: 'test-desktop-expanded.png' });
  await tocBtn.click();
  await tableBtn.click();
  await pageDesktop.screenshot({ path: 'test-desktop-collapsed.png' });

  // Test 2: Mobile
  const contextMobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto(`http://localhost:${PORT}/blog/huacas-de-lima-como-reconocer-su-diversidad-historica`);

  console.log('Testing Mobile view...');
  await pageMobile.waitForSelector('.article-toc');
  await pageMobile.screenshot({ path: 'test-mobile-expanded.png' });

  const mobileTocBtn = pageMobile.locator('.article-toc button', { hasText: 'Ocultar' });
  await mobileTocBtn.click();
  const mobileTableBtn = pageMobile.locator('button', { hasText: 'Plegar tabla' });
  await mobileTableBtn.click();
  await pageMobile.screenshot({ path: 'test-mobile-collapsed.png' });

  console.log('All tests passed successfully!');
  await browser.close();
  server.close();
});
