# Чаты · премиум-разбор (/crm/chats)

Исходники макетов «до и после» для раздела «Чаты» (Telegram Business, `crm_chats.js` +
`public/crm-chats.html`). Каждый `.dc.html` — отдельный артборд канваса Claude Design.

| Файл | Что показывает |
|---|---|
| `Before.dc.html` | Страница как сейчас, с восемью помеченными местами |
| `Main.dc.html` | Премиум-версия на десктопе, те же восемь пунктов «стало» |
| `Mobile.dc.html` | Премиум-версия на телефоне: список и диалог, 390×844 |
| `Plan.dc.html` | Разбор «было → стало» по разделам и порядок работ тремя волнами |
| `canvas.json` | Раскладка артбордов на канвасе |

Значения взяты из живого кода платформы: палитра и чипы — `public/diary.html` (ADR-123),
роли кнопок — `BTN_ROLES` / `btnCss()` в `server.js`, сайдбар — `public/sidebar.js`,
общие компоненты — `public/ui.css`.

Собранный канвас (2 МБ, не хранится в репозитории):

```
node <skill>/seed-canvas.mjs --template <skill>/payload.template.html \
  --out chaty-premium.html --title "Чаты · премиум" \
  --artboard Main.dc.html --artboard Before.dc.html \
  --artboard Mobile.dc.html --artboard Plan.dc.html --canvas canvas.json
```
