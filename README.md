# FundHuntr

> Funding, on autopilot. FundHuntr automatically finds, ranks, and applies to grants & scholarships for you — globally.

FundHuntr is a Tinder-style web app (and PWA / installable mobile app) that matches four audiences with funding opportunities worldwide:

- **Students** — scholarships, fellowships, bursaries
- **For-profit businesses** — grants, R&D credits, pitch competitions, innovation funds
- **Charities** — community funds, donor pools, programmatic grants
- **Non-profits / NGOs** — foundation grants, government funding, capacity awards

The end-state product applies on the user's behalf: profile in, auto-drafted application out.

## Status

Front-end prototype. No backend yet — all profile data and saved matches persist in `localStorage`. The discover feed uses sample global opportunities; in production these come from the matching engine.

## Stack

- Vanilla HTML, CSS, JS (zero build step)
- PWA — installable on iOS, Android, desktop
- Service worker for offline shell caching
- SVG icon library (no external icon font)
- Inter via Google Fonts (fallback to system)

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Minimal landing with auto-playing app demo + profile type selector |
| `profile-student.html` | 8-step student wizard |
| `profile-business.html` | 7-step for-profit wizard |
| `profile-charity.html` | 7-step charity wizard |
| `profile-nonprofit.html` | 7-step non-profit / NGO wizard |
| `discover.html` | Tinder-style swipe deck of matched opportunities |
| `saved.html` | Queue of opportunities for auto-apply |

## Design

- Green / white / red palette (`#15a36b` primary, `#e23a3a` accent)
- Mobile-first, responsive down to 320px
- Bottom nav on mobile, top nav on desktop
- Safe-area aware for notched devices

## Run locally

It's a static site — no build step.

```bash
# clone, then serve
python3 -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080`.

> The service worker requires `http://` or `https://` — opening `index.html` directly via `file://` skips PWA registration but everything else works.

## Project structure

```
FundHuntr/
├─ index.html               # landing
├─ profile-*.html           # 4 profile builders
├─ discover.html            # swipe feed
├─ saved.html               # auto-apply queue
├─ app.js                   # wizard engine, storage, bottom nav, SW reg
├─ icons.js                 # SVG icon library (currentColor)
├─ styles.css               # design system
├─ sw.js                    # offline shell service worker
├─ manifest.json            # PWA manifest
├─ favicon.svg, icon-*.svg  # app icons
└─ README.md
```

## Profile data shape

Stored in `localStorage` under `fundhuntr.profile`:

```json
{
  "type": "student | business | charity | nonprofit",
  "data": { "<fieldName>": "<value>", ... },
  "completedAt": "ISO timestamp"
}
```

Saved matches are under `fundhuntr.saved`, passed (skipped) IDs under `fundhuntr.passed`.

## Roadmap

- [ ] Backend API + persistent user accounts
- [ ] Live opportunity ingestion from registries (US grants.gov, UK gov, EU Horizon, etc.)
- [ ] Automatic matching engine (eligibility scoring)
- [ ] Auto-apply engine (form filling + essay drafting)
- [ ] Submission tracking & status updates
- [ ] Native iOS / Android wrappers (Capacitor / React Native)

## License

TBD — owned by the FundHuntr team.
