import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const page = pages.find(p => p.url().includes('gohighlevel.com'));

  // Get text of visible modal
  const modalText = await page.$$eval('.modal.fade.in, .modal.show, .modal-dialog', els =>
    els.filter(e => e.offsetParent !== null).map(e => e.innerText)
  );
  console.log('Modal innerText:\n', modalText.join('\n---\n'));

  await browser.close();
}

main().catch(console.error);
