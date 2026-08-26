import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 760 } });
await p.goto('file://' + process.cwd() + '/before.html');
await p.fill('#f-project', 'Мясной олимп');
await p.selectOption('#f-priority', 'Срочная');
await p.waitForTimeout(300);
console.log(JSON.stringify(await p.evaluate(() => {
  const t = document.querySelector('#tasks-body tr');
  return {
    firstRowTop: Math.round(t.getBoundingClientRect().top),
    theadTop: Math.round(document.querySelector('thead th').getBoundingClientRect().top),
    rowsVisible: [...document.querySelectorAll('#tasks-body tr')].filter(r => r.getBoundingClientRect().bottom <= 760).length,
  };
})));
await p.screenshot({ path: 'before.png' });
await b.close();
