import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  console.log('Total pages in context:', pages.length);
  for (let i = 0; i < pages.length; i++) {
    console.log(`[${i}] Title: "${await pages[i].title()}" | URL: ${pages[i].url()}`);
  }

  // Check the active page or GHL page
  const page = pages.find(p => p.url().includes('gohighlevel.com')) || pages[0];
  console.log('\nInspecting GHL page:', page.url());

  // Let's see what modals or headings are on this page
  const headings = await page.$$eval('h1, h2, h3, h4, h5, .modal-title, .hr-dialog__title', els =>
    els.map(e => e.innerText.trim()).filter(Boolean)
  );
  console.log('Headings/Titles found:', headings);

  // Check all inputs
  const inputs = await page.$$eval('input', els =>
    els.filter(e => e.offsetParent !== null)
       .map(e => ({ placeholder: e.placeholder, id: e.id, class: (e.className || '').toString() }))
  );
  console.log('Visible inputs:', inputs);

  await browser.close();
}

main().catch(console.error);
