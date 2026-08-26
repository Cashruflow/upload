import { readFileSync, writeFileSync } from 'node:fs';

const CSS = readFileSync('_common.css', 'utf8');
const SB  = readFileSync('_sidebar.html', 'utf8');

const page = (body) => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <style>
${CSS}  </style>
</helmet>

<div style="position:relative; width:1440px; height:760px; overflow:hidden; background:#0f0f0f;">

${SB}
${body}
</div>
</x-dc>
</body>
</html>
`;

// ---- данные строк: [id, статус, класс, тип, задача, факт, приоритет, дедлайн]
const ROWS = [
  [235,'Выполняется','s-progress','IT','Фильтры бэклога — в правую панель','85','Срочная','12.09'],
  [234,'Не начата','s-new','SEO','Карточки товара: h1 и мета по шаблону','—','Обычная','15.09'],
  [231,'Проверка','s-check','Клиент','Выгрузка остатков из 1С — сверить с сайтом','140','Обычная','10.09'],
  [229,'Выполняется','s-progress','Реклама','Директ: минус-слова по отчёту за август','60','Срочная','09.09'],
  [226,'Идея','s-idea','Research','Сравнить доставку с конкурентами по срокам','—','На будущее','—'],
  [224,'Не начата','s-new','IT','Форма обратного звонка — валидация телефона','—','Обычная','18.09'],
  [221,'Выполняется','s-progress','Create','Фотосессия новой линейки полуфабрикатов','210','Обычная','20.09'],
  [219,'Не начата','s-new','SEO','Пересобрать семантику по разделу «Колбасы»','—','Обычная','25.09'],
  [216,'Проверка','s-check','IT','Скорость каталога: отложенная загрузка картинок','95','Обычная','22.09'],
  [214,'Выполняется','s-progress','Клиент','Договор на сентябрь — согласовать приложение','40','Срочная','08.09'],
  [211,'Не начата','s-new','Реклама','Баннеры для акции «Шашлычный сезон»','—','Обычная','28.09'],
  [208,'Идея','s-idea','Research','Отзывы на Яндекс.Картах — схема сбора','—','На будущее','—'],
  [205,'Выполняется','s-progress','SEO','Перелинковка: блок «С этим покупают»','130','Обычная','30.09'],
  [203,'Не начата','s-new','IT','Экспорт заказов в CSV для бухгалтерии','—','Обычная','02.10'],
  [201,'Проверка','s-check','Create','Тексты на страницу «О производстве»','70','Обычная','05.10'],
  [198,'Не начата','s-new','IT','Оплата картой: вернуть чек в письме заказа','—','Срочная','07.09'],
  [192,'Проверка','s-check','SEO','301-е со старых адресов каталога','35','Срочная','06.09'],
];

const pr = (p) => `<td class="${p === 'Срочная' ? 'p-urgent' : 'p-normal'}">${p}</td>`;

// широкая таблица (панель закрыта): ID, ✎, CLD, Статус, Тип, Проект, Задача, Факт, Приоритет, Дедлайн
const wideRow = (r) => `<tr><td style="color:#6ab0f5">${r[0]}</td><td class="mut">✎</td><td class="mut">—</td>`
  + `<td><span class="badge ${r[2]}">${r[1]}</span></td><td class="mut">${r[3]}</td><td>Мясной олимп</td>`
  + `<td>${r[4]}</td><td class="mut">${r[5]}</td>${pr(r[6])}<td class="mut">${r[7]}</td></tr>`;

const wideCols = `<colgroup>
          <col style="width:54px"><col style="width:46px"><col style="width:44px"><col style="width:108px">
          <col style="width:82px"><col style="width:132px"><col><col style="width:76px">
          <col style="width:90px"><col style="width:92px">
        </colgroup>
        <thead><tr><th>ID</th><th></th><th>CLD</th><th>Статус</th><th>Тип</th><th>Проект</th><th>Задача</th><th>Факт</th><th>Приоритет</th><th>Дедлайн</th></tr></thead>`;

// узкая таблица (панель открыта): ID, ✎, Статус, Тип, Проект, Задача, Приоритет, Дедлайн
const narrowRow = (r) => `<tr><td style="color:#6ab0f5">${r[0]}</td><td class="mut">✎</td>`
  + `<td><span class="badge ${r[2]}">${r[1]}</span></td><td class="mut">${r[3]}</td><td>Мясной олимп</td>`
  + `<td>${r[4]}</td>${pr(r[6])}<td class="mut">${r[7]}</td></tr>`;

const narrowCols = `<colgroup>
          <col style="width:50px"><col style="width:40px"><col style="width:104px"><col style="width:78px">
          <col style="width:120px"><col><col style="width:88px"><col style="width:84px">
        </colgroup>
        <thead><tr><th>ID</th><th></th><th>Статус</th><th>Тип</th><th>Проект</th><th>Задача</th><th>Приоритет</th><th>Дедлайн</th></tr></thead>`;

const fade = (right) => `  <div style="position:absolute; left:230px; right:${right}px; bottom:0; height:56px; background:linear-gradient(to bottom, rgba(15,15,15,0), #0f0f0f); pointer-events:none;"></div>`;

const chev = `<svg class="ico" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>`;
const dl = `<svg class="ico" viewBox="0 0 24 24"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>`;
const sliders = `<svg class="ico" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>`;
const search = `<svg class="ico" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`;
const badge3 = `<span style="background:#00a0ff; color:#fff; font-size:11px; font-weight:700; border-radius:9px; min-width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center; padding:0 5px;">3</span>`;

const tabs = (pad) => `<div style="display:flex; gap:4px; padding:0 3px; height:${pad}px; align-items:center; background:rgba(255,255,255,.045); border:1px solid rgba(255,255,255,.06); border-radius:8px; box-sizing:border-box; flex:0 0 auto;">
        <span style="display:inline-flex; align-items:center; height:34px; padding:0 16px; font-size:13px; font-weight:600; border-radius:6px; background:#262626; color:#e8e8e8;">Задачи</span>
        <span style="display:inline-flex; align-items:center; height:34px; padding:0 16px; font-size:13px; font-weight:600; border-radius:6px; color:#8a8a93;">Спринты</span>
      </div>`;

/* ============================ ДО ============================
   69 (шапка) + 58 (вкладки) + 52 (проект+поиск) + 69 (селекты)
   + 81 (плитки) + 16 (отступ) + 37 (шапка таблицы) = 382 */
const before = `
  <div style="position:absolute; left:230px; top:0; right:0; bottom:0; display:flex; flex-direction:column; overflow:hidden;">

    <header style="display:flex; align-items:center; justify-content:space-between; gap:12px; height:69px; padding:0 24px; box-sizing:border-box; border-bottom:1px solid #222; flex:0 0 auto;">
      <h1 style="margin:0; font-size:18px; font-weight:600;">Бэклог задач <span style="color:#666; font-weight:400; font-size:11px;">128 задач</span></h1>
      <div style="display:flex; gap:10px; align-items:center;">
        <span class="tbtn">${dl}Выгрузить</span>
        <span class="btn1">+ Задача</span>
      </div>
    </header>

    <div style="margin:14px 0 4px 24px; width:max-content; flex:0 0 auto;">${tabs(40)}</div>

    <div style="display:flex; gap:12px; align-items:flex-start; height:52px; padding:16px 24px 0; box-sizing:border-box; flex:0 0 auto;">
      <div class="inp" style="width:170px; justify-content:space-between; color:#fff;">Мясной олимп <span style="color:#666; font-size:15px;">×</span></div>
      <div class="inp" style="flex:1 1 auto;">Поиск...</div>
    </div>

    <div style="display:flex; gap:12px; align-items:center; height:69px; padding:16px 24px; box-sizing:border-box; border-bottom:1px solid #1a1a1a; flex:0 0 auto;">
      <div class="sel" style="width:168px;">Все статусы ${chev}</div>
      <div class="sel" style="width:150px;">Все типы ${chev}</div>
      <div class="sel" style="width:186px;">Все приоритеты ${chev}</div>
      <div class="sel" style="width:210px;">Все постановщики ${chev}</div>
    </div>

    <div style="display:flex; gap:10px; align-items:center; height:81px; padding:14px 24px; box-sizing:border-box; border-bottom:1px solid #1a1a1a; flex:0 0 auto;">
      <div style="background:#161616; border:1px solid #262626; border-radius:8px; color:#6a6a6a; height:52px; padding:0 12px; display:flex; align-items:center; box-sizing:border-box;">
        <svg class="ico" viewBox="0 0 24 24" style="width:16px; height:16px;"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </div>
      ${[['128','Все',0],['41','В работе',1],['23','Идея',0],['64','Закрыто',0],['7','Важные',0],['12','Для Claude',0],['9','Клиенты',0]]
        .map(([v,l,on]) => `<div style="height:52px; min-width:90px; box-sizing:border-box; padding:8px 14px; border-radius:8px; font-size:12px; line-height:1.15; background:${on?'#0d1b26':'#161616'}; border:1px solid ${on?'#00a0ff':'#262626'}; color:${on?'#cfe6f5':'#888'};"><span style="font-size:18px; font-weight:700; color:#fff; display:block; line-height:1.2;">${v}</span>${l}</div>`).join('\n      ')}
    </div>

    <div style="padding:16px 24px 0; flex:1 1 auto; min-height:0; overflow:hidden;">
      <table>
        ${wideCols}
        <tbody>
          ${ROWS.slice(0, 10).map(wideRow).join('\n          ')}
        </tbody>
      </table>
    </div>
  </div>

  <div style="position:absolute; left:1104px; top:0; width:2px; height:382px; background:#e05252; border-radius:1px; z-index:5;"></div>
  <div style="position:absolute; left:1114px; top:150px; z-index:5; background:#2a1212; border:1px solid #e05252; color:#ff9a9a; font-size:12px; font-weight:600; border-radius:6px; padding:6px 10px; line-height:1.4;">382 px до первой задачи<br><span style="font-weight:500;">половина окна 1440×760</span></div>

  <div style="position:absolute; left:1104px; top:382px; width:2px; height:378px; background:#3a3a3a; border-radius:1px; z-index:5;"></div>
  <div style="position:absolute; left:1114px; top:560px; z-index:5; font-size:12px; color:#6a6a6a; font-weight:500; line-height:1.4;">378 px на задачи<br>10 строк</div>

${fade(0)}`;

/* ============================ ПОСЛЕ: панель закрыта ============================
   63 (шапка) + 45 (чипы) + 37 (шапка таблицы) = 145 */
const after = `
  <div style="position:absolute; left:230px; top:0; right:0; bottom:0; display:flex; flex-direction:column; overflow:hidden;">

    <header style="display:flex; align-items:center; gap:14px; height:63px; padding:0 24px; box-sizing:border-box; border-bottom:1px solid #222; flex:0 0 auto;">
      <h1 style="margin:0; font-size:18px; font-weight:600; white-space:nowrap;">Бэклог <span style="color:#666; font-weight:400; font-size:11px;">41 / 128</span></h1>
      ${tabs(40)}
      <div class="inp" style="flex:1 1 auto; min-width:0;">${search}Поиск по задачам, комментариям, ссылкам…</div>
      <span class="ibtn">${dl}</span>
      <span class="btn1">+ Задача</span>
      <span style="width:1px; height:34px; background:#222; margin:0 2px;"></span>
      <span class="tbtn" style="border-color:#00a0ff55; color:#e8e8e8; gap:8px; padding:0 12px;">
        ${sliders}Фильтры ${badge3}
        <svg class="ico" viewBox="0 0 24 24" style="color:#8a8a8a;"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
      </span>
    </header>

    <div style="display:flex; align-items:center; gap:8px; height:45px; padding:9px 24px 10px; box-sizing:border-box; flex:0 0 auto;">
      <span style="font-size:11px; color:#555; letter-spacing:.06em; text-transform:uppercase; margin-right:2px;">Срез</span>
      <span class="fchip view">Вид: <b>В работе</b> · 41</span>
      <span class="fchip">Проект: <b>Мясной олимп</b> <span class="x">×</span></span>
      <span class="fchip">Приоритет: <b>Срочная</b> <span class="x">×</span></span>
      <span style="font-size:12.5px; color:#6a6a6a; margin-left:4px;">Сбросить всё</span>
    </div>

    <div style="padding:0 24px; flex:1 1 auto; min-height:0; overflow:hidden;">
      <table>
        ${wideCols}
        <tbody>
          ${ROWS.map(wideRow).join('\n          ')}
        </tbody>
      </table>
    </div>
  </div>

  <div style="position:absolute; left:1104px; top:0; width:2px; height:145px; background:#4ade80; border-radius:1px; z-index:5;"></div>
  <div style="position:absolute; left:1114px; top:40px; z-index:5; background:#122a1c; border:1px solid #4ade80; color:#8ce8b4; font-size:12px; font-weight:600; border-radius:6px; padding:6px 10px; line-height:1.4;">145 px до первой задачи<br><span style="font-weight:500;">−237 px к прежнему</span></div>

  <div style="position:absolute; left:1104px; top:145px; width:2px; height:615px; background:#3a3a3a; border-radius:1px; z-index:5;"></div>
  <div style="position:absolute; left:1114px; top:600px; z-index:5; font-size:12px; color:#6a6a6a; font-weight:500; line-height:1.4;">615 px на задачи<br>16 строк вместо 10</div>

${fade(0)}`;

/* ============================ ПОСЛЕ: панель открыта ============================ */
const vw = (l, v, on) => `<div style="display:flex; align-items:center; justify-content:space-between; gap:8px; height:38px; box-sizing:border-box; padding:0 11px; border-radius:8px; font-size:13px; background:${on?'#0d1b26':'#141414'}; border:1px solid ${on?'#00a0ff':'#262626'}; color:${on?'#cfe6f5':'#bdbdbd'};">${l} <b style="font-weight:700; color:#fff;">${v}</b></div>`;
const fld = (txt, on, tail) => `<div style="display:flex; align-items:center; justify-content:space-between; gap:10px; height:38px; box-sizing:border-box; padding:0 11px; background:#1a1a1a; border:1px solid ${on?'#00a0ff':'#333333'}; border-radius:8px; font-size:13px; color:${on?'#fff':'#666'};">${txt} ${tail}</div>`;
const lbl = (t) => `<div style="font-size:12px; color:#8a8a8a; margin:0 0 5px;">${t}</div>`;

const afterOpen = `
  <div style="position:absolute; left:230px; top:0; right:340px; bottom:0; display:flex; flex-direction:column; overflow:hidden;">

    <header style="display:flex; align-items:center; gap:14px; height:63px; padding:0 24px; box-sizing:border-box; border-bottom:1px solid #222; flex:0 0 auto;">
      <h1 style="margin:0; font-size:18px; font-weight:600; white-space:nowrap;">Бэклог <span style="color:#666; font-weight:400; font-size:11px;">41 / 128</span></h1>
      ${tabs(40)}
      <div class="inp" style="flex:1 1 auto; min-width:0;">${search}Поиск…</div>
      <span class="ibtn">${dl}</span>
      <span class="btn1">+ Задача</span>
    </header>

    <div style="display:flex; align-items:center; gap:8px; height:45px; padding:9px 24px 10px; box-sizing:border-box; flex:0 0 auto;">
      <span class="fchip view">Вид: <b>В работе</b> · 41</span>
      <span class="fchip">Проект: <b>Мясной олимп</b> <span class="x">×</span></span>
      <span class="fchip">Приоритет: <b>Срочная</b> <span class="x">×</span></span>
    </div>

    <div style="padding:0 24px; flex:1 1 auto; min-height:0; overflow:hidden;">
      <table>
        ${narrowCols}
        <tbody>
          ${ROWS.map(narrowRow).join('\n          ')}
        </tbody>
      </table>
    </div>
  </div>

  <aside style="position:absolute; right:0; top:0; width:340px; height:100%; box-sizing:border-box; background:#0f0f0f; border-left:1px solid #1f1f1f; box-shadow:-18px 0 44px rgba(0,0,0,.45); display:flex; flex-direction:column;">

    <div style="display:flex; align-items:center; gap:10px; height:63px; padding:0 16px; box-sizing:border-box; border-bottom:1px solid #1f1f1f; flex:0 0 auto;">
      <span style="color:#8a8a8a; display:inline-flex;"><svg class="ico" viewBox="0 0 24 24" style="width:16px; height:16px;"><path d="M4 6h16M7 12h10M10 18h4"/></svg></span>
      <span style="font-size:14px; font-weight:600; color:#e8e8e8;">Фильтры</span>
      ${badge3}
      <span style="flex:1 1 auto;"></span>
      <span class="ibtn" style="border-color:#2a2a2a;"><svg class="ico" viewBox="0 0 24 24"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg></span>
    </div>

    <div style="flex:1 1 auto; min-height:0; overflow:hidden; padding:16px;">
      <div style="font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:#555; margin-bottom:9px;">Вид</div>
      <div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px;">
        ${vw('Все','128',0)}
        ${vw('В работе','41',1)}
        ${vw('Идея','23',0)}
        ${vw('Закрыто','64',0)}
        ${vw('Важные','7',0)}
        ${vw('Для Claude','12',0)}
      </div>
      <div style="margin-top:8px;">${vw('Клиенты','9',0)}</div>

      <div style="height:1px; background:#1a1a1a; margin:18px 0;"></div>

      <div style="font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:#555; margin-bottom:10px;">Срез</div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        <div>${lbl('Проект')}${fld('Мясной олимп', 1, '<span style="color:#666; font-size:15px;">×</span>')}</div>
        <div>${lbl('Статус')}${fld('Все статусы', 0, chev)}</div>
        <div>${lbl('Тип')}${fld('Все типы', 0, chev)}</div>
        <div>${lbl('Приоритет')}${fld('Срочная', 1, chev)}</div>
        <div>${lbl('Постановщик')}${fld('Все постановщики', 0, chev)}</div>
      </div>
    </div>

    <div style="flex:0 0 auto; border-top:1px solid #1f1f1f; padding:13px 16px; display:flex; align-items:center; gap:12px;">
      <span class="tbtn"><svg class="ico" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>Сбросить всё</span>
      <span style="font-size:11px; color:#555; line-height:1.35;">Применяется<br>сразу</span>
    </div>
  </aside>

${fade(340)}`;

writeFileSync('Before.dc.html', page(before));
writeFileSync('Main.dc.html', page(after));
writeFileSync('AfterOpen.dc.html', page(afterOpen));
console.log('built 3 artboards');
