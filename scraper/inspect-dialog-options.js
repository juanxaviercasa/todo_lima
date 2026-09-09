import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const ghlPage = pages.find(p => p.url().includes('funnels-websites/websites'));

  const options = await ghlPage.evaluate(() => {
    const dialog = document.querySelector('.hr-dialog');
    if (!dialog) return [];
    
    return Array.from(dialog.querySelectorAll('*')).map(el => ({
      tag: el.tagName,
      id: el.id,
      className: (el.className || '').toString(),
      text: (el.innerText || '').trim(),
      role: el.getAttribute('role'),
      type: el.getAttribute('type')
    })).filter(x => x.text.includes('plantilla') || x.text === 'Crear' || x.text === 'Continuar');
  });

  console.log('Template options:', JSON.stringify(options, null, 2));

  await browser.close();
}

main().catch(console.error);
