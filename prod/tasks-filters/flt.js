const FLT_MQ = window.matchMedia('(min-width: 769px)');
let FLT_HOME = null;
let FLT_OPEN = false;

function fltRemember() {
  if (FLT_HOME) return;
  FLT_HOME = ['tt-tabs', 'search-row', 'toolbar', 'stats-bar', 'f-search']
    .map(id => { const el = document.getElementById(id); return el ? { el, parent: el.parentNode, next: el.nextSibling } : null; })
    .filter(Boolean);
}
function fltApplyOpen() {
  const pane = document.getElementById('pane-tasks');
  const onTasks = !pane || pane.style.display !== 'none';
  document.body.classList.toggle('flt-open', FLT_OPEN && FLT_MQ.matches && onTasks);
}
function fltToggle() {
  FLT_OPEN = !FLT_OPEN;
  try { localStorage.setItem('tasks-flt-open', FLT_OPEN ? '1' : '0'); } catch (e) {}
  fltApplyOpen();
}
function fltLayout() {
  fltRemember();
  const body = document.getElementById('flt-body');
  const hdr = document.getElementById('hdr-actions');
  if (!body || !hdr) return;
  if (FLT_MQ.matches) {
    const tabs = document.getElementById('tt-tabs');
    const q = document.getElementById('f-search');
    if (tabs) hdr.insertBefore(tabs, hdr.firstChild);
    if (q) hdr.insertBefore(q, document.getElementById('hdr-export-btn'));
    ['stats-bar', 'search-row', 'toolbar'].forEach(id => {
      const el = document.getElementById(id); if (el) body.appendChild(el);
    });
  } else {
    FLT_HOME.forEach(h => h.parent.insertBefore(h.el, h.next));
  }
  fltApplyOpen();
}
function fltActive() {
  const val = id => ((document.getElementById(id) || {}).value || '').trim();
  const out = [];
  if (VIEW !== 'all') out.push({ vw: 1, l: 'Вид', v: VIEW_LABELS[VIEW] || VIEW, off: "setView('all')" });
  if (val('f-project')) out.push({ l: 'Проект', v: val('f-project'), off: 'clearProject()' });
  if (val('f-status')) out.push({ l: 'Статус', v: val('f-status'), off: "fltClear('f-status')" });
  if (val('f-type')) out.push({ l: 'Тип', v: val('f-type'), off: "fltClear('f-type')" });
  if (val('f-priority')) out.push({ l: 'Приоритет', v: val('f-priority'), off: "fltClear('f-priority')" });
  if (val('f-setter')) {
    const s = document.getElementById('f-setter');
    const t = ((s.options[s.selectedIndex] || {}).text || '').replace(/\s*\(\d+\)\s*$/, '');
    out.push({ l: 'Постановщик', v: t, off: "fltClear('f-setter')" });
  }
  return out;
}
function fltClear(id) {
  const e = document.getElementById(id); if (!e) return;
  e.value = '';
  syncUrl();
  loadTasks();
}
function fltChips() {
  const box = document.getElementById('flt-chips');
  const a = fltActive();
  const n = document.getElementById('flt-btn-n');
  if (n) { n.textContent = a.length ? String(a.length) : ''; n.style.display = a.length ? 'inline-flex' : 'none'; }
  const btn = document.getElementById('flt-btn');
  if (btn) btn.classList.toggle('on', a.length > 0);
  if (!box) return;
  box.classList.toggle('has', a.length > 0);
  box.innerHTML = a.length
    ? a.map(c => '<button class="flt-chip' + (c.vw ? ' vw' : '') + '" onclick="' + c.off + '" title="Снять фильтр">'
        + escapeHtml(c.l) + ': <b>' + escapeHtml(c.v) + '</b>'
        + '<svg><use href="#i-x"></use></svg></button>').join('')
      + '<button class="flt-reset" onclick="resetView()">Сбросить всё</button>'
    : '';
}
try { FLT_OPEN = localStorage.getItem('tasks-flt-open') === '1'; } catch (e) {}
fltLayout();
FLT_MQ.addEventListener('change', fltLayout);
