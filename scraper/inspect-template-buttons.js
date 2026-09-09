import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const page = pages.find(p => p.url().includes('gohighlevel.com'));

  // Inspect the "Elija" buttons or template card structure
  const templateButtons = await page.$$eval('.template-library-content button, .template-library-modal-content button, .template-library-content a', els =>
    els.filter(e => e.innerText && (e.innerText.includes('Elija') || e.innerText.includes('Select') || e.innerText.includes('Continuar')))
       .map(e => ({
         tag: e.tagName,
         id: e.id,
         text: e.innerText.trim(),
         class: (e.className || '').toString().substring(0, 50)
       }))
  );

  console.log('Template actionable buttons:', JSON.stringify(templateButtons, null, 2));

  await browser.close();
}

main().catch(console.error);
