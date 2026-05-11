# FundHuntr — Web Guide

Everything you need to run, develop, and deploy FundHuntr as a **web app** (and PWA).

> Looking for the iOS/Android app? See [`MOBILE.md`](MOBILE.md).

---

## Stack

- Vanilla HTML, CSS, JS — **zero build step**
- Service worker for offline-shell caching (`sw.js`)
- Installable as a **PWA** on iOS, Android, desktop (`manifest.json`)
- SVG icon library (`icons.js`) — no external icon font
- Inter via Google Fonts (system-font fallback)

There's no framework, no bundler, no transpilation. The browser runs the same files that live in the repo.

---

## Run locally

The site is fully static. Two ways to serve it:

### Option A — npm

```bash
npm install
npm start          # → http://localhost:8080
```

### Option B — Python

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

### Option C — Open the file directly

You can double-click `index.html` to open it in your browser, but the **service worker will not register** under the `file://` scheme. Everything else works fine, including all the swipe interactions and form persistence.

---

## File layout

```
FundHuntr/
├─ index.html               # landing — split layout, demo on right
├─ profile-student.html     # 8-step student wizard
├─ profile-business.html    # 7-step for-profit wizard
├─ profile-charity.html     # 7-step charity wizard
├─ profile-nonprofit.html   # 7-step non-profit / NGO wizard
├─ discover.html            # Tinder-style swipe feed
├─ saved.html               # auto-apply queue
├─ app.js                   # wizard engine, localStorage, bottom nav, SW reg
├─ icons.js                 # SVG icon library
├─ mobile.js                # native Capacitor hooks — no-op in browsers
├─ styles.css               # design system
├─ sw.js                    # service worker (offline shell)
├─ manifest.json            # PWA manifest
├─ favicon.svg, icon-*.svg  # app icons
└─ docs/                    # documentation (this file lives here)
```

---

## Design system

| | Value |
| --- | --- |
| Primary | Emerald green `#15a36b` (gradient → `#0f7a4e`) |
| Accent | Cherry red `#e23a3a` |
| Surface | White / `#f8fbf7` |
| Text | Ink `#0e2418` / soft `#4a5e4f` / muted `#7d8f82` |
| Type | Inter, 400/500/600/700/800 |
| Radius | 10 / 16 / 24 / 32 |
| Brand mark | Square app-icon on landing; plain "FundHuntr" wordmark inside the app |

All colors live in CSS custom properties at the top of `styles.css`.

### Layout

- Mobile-first, responsive down to 320px
- `viewport-fit=cover` + safe-area insets for notched phones
- Touch targets ≥ 44px throughout
- Bottom nav appears on viewports ≤ 720px
- Landing page uses a CSS-grid split (login + picker left, animated demo right)

---

## PWA install

The app is already a fully working PWA. To install:

- **iOS Safari**: Share → Add to Home Screen
- **Android Chrome**: ⋮ → Install app
- **Desktop Chrome/Edge**: install icon in the address bar

Once installed, it launches full-screen with the green theme color and the "Fund / Huntr" app icon.

The service worker (`sw.js`) caches the shell for offline access. On first visit it caches all HTML/CSS/JS/icons; subsequent visits are served from cache then revalidated.

---

## Customizing the design

### Change brand colors

Edit the top of `styles.css`:

```css
:root {
  --color-primary: #15a36b;       /* change me */
  --color-primary-dark: #0f7a4e;
  --color-accent: #e23a3a;
  --gradient-brand: linear-gradient(135deg, #15a36b 0%, #0f7a4e 100%);
}
```

### Replace the demo animation with a real video

`index.html` has a `<div class="demo-stage">…</div>` block holding the auto-playing phone-mockup. Swap it for a `<video>` tag:

```html
<aside class="landing-right">
  <video class="demo-video" autoplay loop muted playsinline
         poster="assets/demo-poster.jpg">
    <source src="assets/demo.mp4" type="video/mp4">
  </video>
</aside>
```

Then add CSS for `.demo-video` (max-width: 380px, border-radius, shadow).

### Add an icon

Add it to `icons.js`:

```js
I['my-icon'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ...>…</svg>`;
```

Then use it: `<div data-icon="my-icon"></div>` or `FH.icon('my-icon')` in JS.

---

## Profile data shape

Form data persists in `localStorage` under three keys:

```js
localStorage['fundhuntr.profile']  // { type, data, completedAt }
localStorage['fundhuntr.saved']    // [{ id, title, org, ..., savedAt }]
localStorage['fundhuntr.passed']   // [id, id, …]
```

The `data` object contains every answered field, keyed by the field's `name` in the schema (defined inline in each `profile-*.html`).

This local-first design lets the prototype work without a backend. When the backend lands, swap the read/write helpers in `app.js` (`loadProfile`, `saveProfile`, `loadList`, `saveList`) for API calls — nothing else has to change.

---

## Deploy

For a free production host (GitHub Pages, Netlify, Vercel, Cloudflare Pages), see [`DEPLOY.md`](DEPLOY.md).

---

## Browser support

Modern evergreens. Tested:

- Chrome 100+
- Safari 16+ (iOS 16+, macOS 13+)
- Firefox 100+
- Edge 100+

The service worker is skipped on older browsers; everything else degrades gracefully.
