import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const ghlPage = pages.find(p => p.url().includes('funnels-websites/websites'));

  console.log('Clicking "Nuevo sitio web"...');
  const btn = ghlPage.locator('#create-new-button, #positive-empty-state, button:has-text("Nuevo sitio web")').first();
  await btn.click();
  await ghlPage.waitForTimeout(2000);

  // Check what popped up (modal, dropdown, dialog, new options)
  const popupElements = await ghlPage.$$eval('*', els => {
    return els
      .filter(el => {
        const text = (el.innerText || '').trim();
        const role = el.getAttribute('role');
        const tag = el.tagName;
        return (role === 'dialog' || role === 'menu' || el.classList.contains('modal') || el.classList.contains('dropdown') || (el.getAttribute('class') && el.getAttribute('class').includes('dialog')));
      })
      .map(el => ({
        tag: el.tagName,
        id: el.id,
        className: (el.className || '').toString().substring(0, 50),
        text: (el.innerText || '').trim().split('\n').slice(0, 10).join(' | ')
      }));
  });

  console.log('Dialog/Modal elements:', JSON.stringify(popupElements, null, 2));

  // Also check all visible text in options or buttons
  const visibleButtons = await ghlPage.$$eval('button, a, [role="menuitem"], [role="option"], li', els => 
    els.filter(e => e.offsetParent !== null && e.innerText && e.innerText.trim().length > 0)
       .map(e => ({ tag: e.tagName, text: e.innerText.trim(), class: (e.className || '').toString().substring(0, 40) }))
  );
  console.log('Visible actionable items:', JSON.stringify(visibleButtons.filter(b => 
    b.text.toLowerCase().includes('plantilla') ||
    b.text.toLowerCase().includes('template') ||
    b.text.toLowerCase().includes('blanco') ||
    b.text.toLowerCase().includes('nuevo') ||
    b.text.toLowerCase().includes('custom')
  ), null, 2));

  await browser.close();
}

main().catch(console.error);
