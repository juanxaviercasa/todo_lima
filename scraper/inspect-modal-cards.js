import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const page = pages.find(p => p.url().includes('gohighlevel.com'));

  const searchInput = page.locator('input[placeholder*="plantilla"], input[placeholder*="template"]').first();
  console.log('Search input exists:', await searchInput.count());
  
  // Fill search input
  await searchInput.fill('Lawyer');
  await page.waitForTimeout(2000);

  // Check what items/cards appear inside the modal
  const cards = await page.$$eval('.modal.show .card, .modal.show .template-item, .modal.show [class*="template"], .modal-dialog [class*="item"], .modal-dialog div', els =>
    els.filter(e => e.offsetParent !== null && e.innerText && e.innerText.trim().length > 3 && e.innerText.trim().length < 150)
       .map(e => ({ tag: e.tagName, text: e.innerText.trim().replace(/\n+/g, ' | '), class: (e.className || '').toString().substring(0, 40) }))
       .slice(0, 15)
  );
  console.log('Cards/Items in modal:', JSON.stringify(cards, null, 2));

  // Check buttons in modal
  const modalButtons = await page.$$eval('.modal.show button, .modal-dialog button', els =>
    els.map(b => ({ text: b.innerText.trim(), class: (b.className || '').toString().substring(0, 40) }))
  );
  console.log('Modal buttons:', modalButtons);

  await browser.close();
}

main().catch(console.error);
