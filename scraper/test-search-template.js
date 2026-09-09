import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const ghlPage = pages.find(p => p.url().includes('funnels-websites/websites'));

  // Inspect the template dialog or view
  const searchInput = ghlPage.locator('input[placeholder*="Buscar plantillas"], input[placeholder*="Search"]').first();
  console.log('Search input found:', await searchInput.isVisible());

  // Search for "Lawyer" or "Legal" or "Abogado"
  await searchInput.fill('Lawyer');
  await searchInput.press('Enter');
  await ghlPage.waitForTimeout(2000);

  // Check results or cards
  const cards = await ghlPage.$$eval('.hl_template-library--item, .template-card, div[class*="template"], div[class*="card"]', els =>
    els.filter(e => e.offsetParent !== null && e.innerText && e.innerText.length > 5 && e.innerText.length < 200)
       .slice(0, 10)
       .map(e => ({
         tag: e.tagName,
         class: (e.className || '').toString().substring(0, 50),
         text: e.innerText.trim().replace(/\n+/g, ' | ')
       }))
  );

  console.log('Template cards found for Lawyer:', JSON.stringify(cards, null, 2));

  // Check buttons inside the template view
  const buttons = await ghlPage.$$eval('button', els => 
    els.filter(e => e.offsetParent !== null && e.innerText && e.innerText.trim().length > 0)
       .slice(0, 15)
       .map(e => e.innerText.trim())
  );
  console.log('Visible buttons:', buttons);

  await browser.close();
}

main().catch(console.error);
