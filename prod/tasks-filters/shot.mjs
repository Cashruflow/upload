import { chromium } from 'playwright';
const url = 'file://' + process.cwd() + '/index.html';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function pc(name, fn) {
  const p = await b.newPage({ viewport: { width: 1440, height: 760 } });
  await p.goto(url); await p.waitForTimeout(150);
  if (fn) { await fn(p); await p.waitForTimeout(400); }
  const m = await p.evaluate(() => {
    const t = document.querySelector('#tasks-body tr');
    const th = document.querySelector('thead th');
    return {
      firstRowTop: t ? Math.round(t.getBoundingClientRect().top) : null,
      theadTop: th ? Math.round(th.getBoundingClientRect().top) : null,
      rowsVisible: [...document.querySelectorAll('#tasks-body tr')].filter(r => r.getBoundingClientRect().bottom <= 760).length,
      bodyPadRight: getComputedStyle(document.body).paddingRight,
      docScrollW: document.documentElement.scrollWidth,
      searchInHeader: !!document.querySelector('header #f-search'),
      tabsInHeader: !!document.querySelector('header #tt-tabs'),
      panelHas: [...document.querySelectorAll('#flt-body > *')].map(e => e.id),
      chips: [...document.querySelectorAll('.flt-chip')].map(e => e.textContent.trim()),
      badge: (document.getElementById('flt-btn-n') || {}).textContent,
      btnShown: getComputedStyle(document.getElementById('flt-btn')).display,
    };
  });
  console.log(name, JSON.stringify(m));
  await p.screenshot({ path: name + '.png' });
  await p.close();
}

async function mob(name) {
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto(url); await p.waitForTimeout(200);
  const m = await p.evaluate(() => ({
    order: [...document.getElementById('pane-tasks').children].map(e => e.id || e.className),
    searchInSearchRow: !!document.querySelector('#search-row #f-search'),
    tabsAtBody: document.getElementById('tt-tabs').parentElement.tagName,
    btn: getComputedStyle(document.getElementById('flt-btn')).display,
    panel: getComputedStyle(document.getElementById('flt-panel')).display,
    chips: getComputedStyle(document.getElementById('flt-chips')).display,
    sep: getComputedStyle(document.querySelector('.flt-sep')).display,
    docScrollW: document.documentElement.scrollWidth,
  }));
  console.log(name, JSON.stringify(m));
  await p.screenshot({ path: name + '.png', fullPage: false });
  await p.close();
}

// 1. ПК, панель закрыта, фильтров нет кроме вида по умолчанию
await pc('pc-closed');
// 2. ПК, панель открыта + выбраны проект и приоритет
await pc('pc-open', async p => {
  await p.fill('#f-project', 'Мясной олимп');
  await p.selectOption('#f-priority', 'Срочная');
  await p.click('#flt-btn');
});
// 3. ПК, вкладка Спринты при открытой панели
await pc('pc-sprints', async p => { await p.click('#flt-btn'); await p.click('#tt-sprints'); });
// 4. мобилка — раскладка должна остаться прежней
await mob('mobile');

// 5. resize ПК -> мобилка -> обратно: узлы должны вернуться и снова уехать
{
  const p = await b.newPage({ viewport: { width: 1440, height: 760 } });
  await p.goto(url); await p.waitForTimeout(150);
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(250);
  const back = await p.evaluate(() => ({
    order: [...document.getElementById('pane-tasks').children].map(e => e.id || e.className),
    searchInSearchRow: !!document.querySelector('#search-row #f-search'),
    tabsAtBody: document.getElementById('tt-tabs').parentElement.tagName,
    padRight: getComputedStyle(document.body).paddingRight,
  }));
  console.log('resize->mobile', JSON.stringify(back));
  await p.setViewportSize({ width: 1440, height: 760 }); await p.waitForTimeout(250);
  const fwd = await p.evaluate(() => ({
    panelHas: [...document.querySelectorAll('#flt-body > *')].map(e => e.id),
    searchInHeader: !!document.querySelector('header #f-search'),
    tabsInHeader: !!document.querySelector('header #tt-tabs'),
  }));
  console.log('resize->pc', JSON.stringify(fwd));
  await p.close();
}
await b.close();
