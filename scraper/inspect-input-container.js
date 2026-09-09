import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const page = pages.find(p => p.url().includes('gohighlevel.com'));

  const inputInfo = await page.evaluate(() => {
    const input = document.querySelector('input[placeholder*="plantilla"]');
    if (!input) return 'No input found';
    
    // Find closest dialog or modal or parent
    let parent = input.parentElement;
    const path = [];
    while (parent && parent !== document.body) {
      path.push(`${parent.tagName}.${Array.from(parent.classList).join('.')}`);
      parent = parent.parentElement;
    }
    
    // Let's get parent container text
    const container = input.closest('.modal, .modal-dialog, [role="dialog"], .hr-dialog, div[class*="modal"]') || input.parentElement.parentElement.parentElement;
    return {
      placeholder: input.placeholder,
      containerTag: container ? container.tagName : null,
      containerClass: container ? container.className : null,
      containerText: container ? container.innerText : null,
      parentPath: path.slice(0, 5)
    };
  });

  console.log('Input info:', JSON.stringify(inputInfo, null, 2));

  await browser.close();
}

main().catch(console.error);
