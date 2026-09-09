import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const ghlPage = pages.find(p => p.url().includes('funnels-websites/websites'));

  const dialogInfo = await ghlPage.evaluate(() => {
    const dialog = document.querySelector('.hr-dialog');
    if (!dialog) return 'No dialog found';
    
    return {
      innerHTML: dialog.innerHTML,
      text: dialog.innerText
    };
  });

  console.log('Dialog text:\n', dialogInfo.text);

  await browser.close();
}

main().catch(console.error);
