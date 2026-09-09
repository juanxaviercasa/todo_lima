import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const ghlPage = pages.find(p => p.url().includes('funnels-websites/websites'));

  console.log('Clicking template library card...');
  await ghlPage.click('#create-template-library-card');
  await ghlPage.waitForTimeout(1000);

  const confirmBtn = ghlPage.locator('#modal-footer-confirm');
  console.log('Confirm button text:', await confirmBtn.innerText());
  console.log('Confirm button disabled?:', await confirmBtn.isDisabled());

  console.log('Clicking confirm button...');
  await confirmBtn.click();
  await ghlPage.waitForTimeout(3000);

  console.log('New URL:', ghlPage.url());

  // Let's see search inputs or category filters
  const inputs = await ghlPage.$$eval('input', els => 
    els.map(el => ({
      placeholder: el.placeholder,
      id: el.id,
      name: el.name,
      type: el.type,
      class: (el.className || '').toString().substring(0, 40)
    }))
  );
  console.log('Inputs on template screen:', JSON.stringify(inputs, null, 2));

  await browser.close();
}

main().catch(console.error);
