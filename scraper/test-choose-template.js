import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  const page = pages.find(p => p.url().includes('gohighlevel.com'));

  console.log('Searching for "Lawyer"...');
  const input = page.locator('input[placeholder*="plantilla"]');
  await input.click();
  await input.fill('Lawyer');
  await input.press('Enter');
  await page.waitForTimeout(2500);

  // Find the first "Elija" button
  const chooseBtn = page.locator('button[id$="-btn-choose-template"], button:has-text("Elija")').first();
  console.log('Choose button found:', await chooseBtn.isVisible());
  
  await chooseBtn.click();
  console.log('Clicked "Elija". Waiting 4s...');
  await page.waitForTimeout(4000);

  console.log('Current URL after clicking Elija:', page.url());

  // Check if a modal or confirmation screen appeared, or if it navigated
  const textSample = await page.evaluate(() => document.body.innerText.substring(0, 1000));
  console.log('Body text sample:\n', textSample);

  await browser.close();
}

main().catch(console.error);
