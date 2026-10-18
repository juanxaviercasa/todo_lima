import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = path.resolve('out');
const server = http.createServer((req, res) => {
  let name = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!name.startsWith(root + path.sep) && name !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(name) && fs.statSync(name).isDirectory()) name = path.join(name, 'index.html');
  if (!fs.existsSync(name) && fs.existsSync(name + '.html')) name += '.html';
  if (!fs.existsSync(name)) { res.writeHead(404).end(); return; }
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
  res.setHeader('Content-Type', types[path.extname(name)] || 'application/octet-stream');
  res.end(fs.readFileSync(name));
});
await new Promise(r => server.listen(3198, '127.0.0.1', r));
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.QA_BROWSER_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage();
  const results = [];
  for (const route of ['/', '/sobre-nosotros', '/auditoria/gasfiteros', '/auditoria/cerrajeros']) {
    for (const dark of [false, true]) {
      for (const width of [1440, 375, 720]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto('http://127.0.0.1:3198' + route);
        await page.evaluate(d => document.documentElement.classList.toggle('dark', d), dark);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        if (overflow) throw new Error(`Overflow: ${route} ${width} ${dark}`);
        const inverse = page.locator('.editorial-card-inverse');
        if (await inverse.count()) {
          const colors = await inverse.evaluate(e => ({ bg: getComputedStyle(e).backgroundColor, fg: getComputedStyle(e).color }));
          if (colors.bg !== 'rgb(2, 6, 23)' || colors.fg !== 'rgb(255, 255, 255)') throw new Error(JSON.stringify(colors));
        } else if (await page.getByRole('heading', { name: 'Misión', exact: true }).count() !== 1) throw new Error('Missing mission');
        if (width !== 720) {
          const target = route.startsWith('/auditoria/') ? inverse : route === '/' ? page.locator('.brand-purpose') : page.locator('[aria-labelledby="brand-foundations"]');
          await target.screenshot({ path: `artifacts/visual-qa/${route.replaceAll('/', '-') || 'home'}-${width}-${dark ? 'dark' : 'light'}.png` });
        }
        results.push({ route, dark, width, overflow });
      }
    }
  }
  await page.goto('http://127.0.0.1:3198/auditoria/gasfiteros');
  const slider = page.locator('input[type="range"]').first();
  await slider.focus();
  const before = await slider.inputValue();
  await page.keyboard.press('ArrowRight');
  if (await slider.inputValue() === before) throw new Error('Slider keyboard failed');
  const focus = await slider.evaluate(e => getComputedStyle(e).outlineStyle);
  if (focus === 'none') throw new Error('Missing focus');
  fs.writeFileSync('artifacts/visual-qa/brand-audits-results.json', JSON.stringify({ results, keyboardSlider: 'passed', zoomEquivalent: '720 CSS px for 1440px at 200%' }, null, 2));
  console.log('24 theme/viewport checks passed; slider keyboard and focus passed.');
} finally { await browser?.close(); server.close(); }
