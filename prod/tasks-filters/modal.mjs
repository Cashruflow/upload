import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 760 } });
await p.goto('file://' + process.cwd() + '/index.html');
await p.click('#flt-btn');
await p.evaluate(() => document.getElementById('modal').style.display = 'flex');
await p.waitForTimeout(350);
// какой элемент реально сверху в точке, где панель и оверлей модалки пересекаются
const top = await p.evaluate(() => {
  const e = document.elementFromPoint(1300, 400);
  return e ? (e.id || e.className || e.tagName) : null;
});
console.log('top element at panel area with modal open:', top);
await p.screenshot({ path: 'pc-modal.png' });
await b.close();
