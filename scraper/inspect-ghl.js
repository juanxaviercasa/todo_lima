import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  console.log('Connected to Chrome CDP!');
  const context = browser.contexts()[0];
  const pages = context.pages();
  
  let ghlPage = pages.find(p => p.url().includes('funnels-websites/websites'));
  if (!ghlPage) {
    console.log('GHL page not open, searching any GHL page...');
    ghlPage = pages.find(p => p.url().includes('gohighlevel.com'));
  }
  if (!ghlPage) {
    console.log('Opening new GHL page...');
    ghlPage = await context.newPage();
    await ghlPage.goto('https://app.gohighlevel.com/v2/location/92hgZ4Jf6CZtlDXR8z7z/funnels-websites/websites', { waitUntil: 'networkidle' });
  }

  console.log('Page URL:', ghlPage.url());
  console.log('Page Title:', await ghlPage.title());

  // Find candidate buttons
  const buttons = await ghlPage.$$eval('button, a, div[role="button"]', els => 
    els.map(el => ({
      tag: el.tagName,
      text: (el.innerText || '').trim(),
      role: el.getAttribute('role'),
      id: el.id,
      className: typeof el.className === 'string' ? el.className.substring(0, 50) : '',
      ariaLabel: el.getAttribute('aria-label')
    })).filter(b => b.text.length > 0 && (
      b.text.toLowerCase().includes('sitio') ||
      b.text.toLowerCase().includes('nuevo') ||
      b.text.toLowerCase().includes('website') ||
      b.text.toLowerCase().includes('new') ||
      b.text.includes('+')
    ))
  );

  console.log('Candidate buttons found:', JSON.stringify(buttons, null, 2));

  await browser.close();
}

main().catch(console.error);
