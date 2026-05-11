# FundHuntr — Architecture

Cross-platform notes that apply to both the **web** and **mobile** builds.

> Platform-specific guides: [`WEB.md`](WEB.md) · [`MOBILE.md`](MOBILE.md)

---

## Status

Front-end prototype. **No backend yet.** All state lives in the browser / WebView via `localStorage`. Production will replace the storage layer with an API + auth, without changing the UI layer.

---

## Data model

### Profile

```ts
type ProfileType = 'student' | 'business' | 'charity' | 'nonprofit';

interface Profile {
  type: ProfileType;
  data: Record<string, string | string[]>;   // keyed by field name in schema
  completedAt?: string;                       // ISO timestamp on final submit
}
```

Stored at `localStorage['fundhuntr.profile']`.

Each profile schema lives inline in its respective `profile-*.html` file as a JS object passed to `FH.initWizard({ type, schema })`. The schema is the source of truth for which fields exist, their labels, types, and option lists.

### Saved opportunities

```ts
interface SavedOpportunity {
  id: string;
  title: string;
  org: string;
  amount: string;
  deadline: string;
  type: string;
  country: string;
  match: number;
  banner: string;
  icon: string;
  tags: string[];
  desc: string;
  savedAt: string;        // ISO
  priority?: boolean;     // true if super-liked (★)
  status?: 'queued' | 'drafted' | 'submitted';
}
```

Stored at `localStorage['fundhuntr.saved']` as a `SavedOpportunity[]`.

### Passed (skipped) opportunities

Stored at `localStorage['fundhuntr.passed']` as a `string[]` of opportunity IDs, so the discover feed doesn't show them again.

---

## Module map

| File | Responsibility |
| --- | --- |
| `app.js` → `FH` | Wizard engine, storage helpers, bottom nav, service-worker registration |
| `icons.js` → `FH.icon`, `FH.hydrateIcons` | SVG icon library, auto-hydrates `data-icon` attributes on DOMContentLoaded |
| `mobile.js` | Native (Capacitor) enhancements — status bar, splash, haptics, back button. No-op in browsers |
| `sw.js` | Service worker — caches the shell on first install, serves stale-while-revalidate |
| `manifest.json` | PWA + Capacitor app metadata |
| `capacitor.config.json` | iOS / Android wrapper config |

`FH` is the single global namespace. Everything attached to it is intentionally exported.

---

## Page flow

```
        ┌─────────────────┐
        │  index.html     │  (no profile yet)
        │  landing        │
        └──────┬──────────┘
               │ pick profile type
               ▼
   ┌──────────────────────────┐
   │  profile-{type}.html     │
   │  8 / 7-step wizard       │
   └──────┬───────────────────┘
          │ save profile → localStorage
          ▼
   ┌──────────────────────────┐
   │  discover.html           │
   │  swipe deck              │◄────────┐
   └──────┬──────────┬────────┘         │
          │ ♥ save   │ ✕ pass           │ (return after viewing saved)
          ▼          ▼                  │
   ┌──────────────┐                     │
   │  saved.html  │─────────────────────┘
   │  auto-apply  │
   │  queue       │
   └──────────────┘
```

---

## Matching (current behavior)

The discover feed in `discover.html` is currently driven by a hardcoded `OPPORTUNITIES` array. It filters by `audience` (matching `profile.type`) and sorts by the static `match` score on each item.

```js
let deckData = OPPORTUNITIES
  .filter(o => o.audience.includes(profileType))
  .filter(o => !passed.includes(o.id))
  .filter(o => !saved.find(s => s.id === o.id))
  .sort((a, b) => b.match - a.match);
```

In production, the matching engine runs server-side and returns this list pre-scored per user.

---

## Roadmap (engine + backend)

### Phase 1 — backend skeleton

- Auth: email magic-link (or Sign in with Apple / Google for mobile)
- Users API: CRUD profile, sync `saved` + `passed` lists
- Storage: Postgres for relational data, S3-equivalent for any uploaded docs

### Phase 2 — opportunity ingestion

Active funding registries to ingest:

| Region | Source |
| --- | --- |
| US | grants.gov, SBIR.gov, individual foundation feeds (Candid) |
| UK | gov.uk grants, UKRI, Innovate UK |
| EU | Horizon Europe, Erasmus+, EIC |
| India | MyGov, Startup India, DST |
| Australia | GrantConnect |
| Canada | Open Government data, IRAP |
| Africa | Tony Elumelu Foundation, AfDB, Mastercard Foundation, country-level |
| Global | UN agencies, Open Society Foundations, Gates, Wellcome, Bezos Earth |

Ingestion writes to a normalized `opportunities` table.

### Phase 3 — matching engine

- Generate a profile embedding (vector)
- Generate an opportunity embedding
- Score = vector similarity × rule-based eligibility filters (country, demographics, amount window)
- Returned to the client sorted descending

### Phase 4 — auto-apply

- For each saved opportunity, scrape the application form
- Map form fields to profile fields (LLM-assisted)
- Draft long-form essays from profile + opportunity-specific prompts
- Surface to user for one-click review + submit
- Submit via authenticated browser session or partner API

### Phase 5 — submission tracking

- Status polling from funder portals
- Email/push notifications for funder decisions
- Aggregate win-rate dashboards per user

---

## Privacy & data handling

- Profile data contains demographic info (ethnicity, gender, income, disability, etc.) — sensitive by definition
- Local-first design: until backend exists, data never leaves the device
- When backend lands:
  - Encryption at rest (column-level for sensitive fields)
  - Per-user data export + delete (GDPR / CCPA)
  - Demographic fields explicitly opt-in (current form already marks them optional)
  - No selling, no ad-targeting

---

## Performance budget

| Metric | Target |
| --- | --- |
| First contentful paint | < 1.5s on 4G |
| Time to interactive | < 2.5s on 4G |
| Cold start (native) | < 1.0s after splash dismiss |
| `npx cap sync` | < 2s |
| Total transferred (uncached) | < 200 KB |

The zero-build vanilla stack makes hitting these trivial today; the main risk is when we add a backend SDK or analytics. Stay vigilant.

---

## Testing

Not yet wired. Plan:

- **Unit**: Vitest for `app.js` storage + wizard logic
- **Integration**: Playwright covering the four wizard flows + swipe interactions
- **Native**: Detox for iOS/Android end-to-end inside the Capacitor wrapper
- **Accessibility**: axe-core in Playwright

---

## License

TBD — owned by the FundHuntr team.
