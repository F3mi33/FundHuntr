# FundHuntr — Deploy Guide

How to ship FundHuntr to production. Web first, mobile separately.

> Mobile shipping (App Store, Play Store) lives in [`MOBILE.md`](MOBILE.md) under "Shipping…".

---

## GitHub setup

The repo should live at: **https://github.com/F3mi33/FundHuntr** (or `fundhuntr` — your call).

### First push

If you haven't created the remote yet:

1. Go to https://github.com/new
2. Owner: `F3mi33`, Name: `FundHuntr` (or `fundhuntr`)
3. Leave README, `.gitignore`, and license **unchecked** (we already have them)
4. Click *Create repository*

Then from inside the project folder:

```bash
git init -b main          # if you haven't already
git add -A
git commit -m "Initial FundHuntr build"
git remote add origin https://github.com/F3mi33/FundHuntr.git
git push -u origin main
```

There's a helper script that does this for you:

```bash
./push-to-github.sh
```

### GitHub CLI shortcut

If you have `gh` installed and authenticated:

```bash
gh repo create F3mi33/FundHuntr --public --source=. --remote=origin --push
```

That single line creates the repo on GitHub and pushes everything.

---

## Deploy the web app (free hosts)

The site is fully static — every free static host works. Pick one:

### Option 1 — GitHub Pages (zero config)

1. Push to GitHub (above)
2. Repo → Settings → Pages
3. Source: `Deploy from a branch`, Branch: `main`, Folder: `/ (root)`
4. Save. Site lives at `https://f3mi33.github.io/FundHuntr/` in ~1 minute

Use a custom domain by adding a `CNAME` file at the root with your domain, then point DNS at `f3mi33.github.io`.

### Option 2 — Netlify

1. Sign in at https://app.netlify.com with your GitHub
2. *Add new site* → *Import an existing project* → pick `F3mi33/FundHuntr`
3. Build command: leave empty. Publish directory: `.`
4. Click *Deploy*. Done in ~30s.

### Option 3 — Vercel

```bash
npm install -g vercel
vercel
# follow prompts; accept defaults
```

### Option 4 — Cloudflare Pages

1. Cloudflare dash → Workers & Pages → Create application → Pages → Connect to Git
2. Pick the repo, build command empty, output directory `.`
3. Save and Deploy

---

## Service worker behavior in production

The service worker (`sw.js`) caches everything in the `ASSETS` array on first load. If you deploy frequently:

- Either bump `CACHE` (the cache name) in `sw.js` on every deploy so old caches are evicted
- Or implement a "new version available" prompt in `app.js`

Easiest pattern — append a hash:

```js
// sw.js
const CACHE = 'fundhuntr-v' + 'COMMIT_HASH_HERE';
```

If you're using GitHub Actions, replace `COMMIT_HASH_HERE` at build time with `$GITHUB_SHA`.

---

## CI (optional)

Add `.github/workflows/ci.yml`:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: node -c app.js && node -c icons.js && node -c mobile.js && node -c sw.js
      - run: |
          for f in *.html; do
            node -e "
              const c = require('fs').readFileSync('$f', 'utf8');
              const m = [...c.matchAll(/<script(?![^>]*src=)[^>]*>([\\s\\S]*?)<\\/script>/g)];
              m.forEach(s => new Function(s[1]));
            "
          done
```

This parses every JS file (top-level + inline) on every push.

---

## Mobile

For App Store / Play Store distribution, see [`MOBILE.md`](MOBILE.md) → "Shipping to the App Store" and "Shipping to Google Play".

---

## Custom domain & SSL

Every host above provides free Let's Encrypt SSL when you add a custom domain. The flow is:

1. Buy a domain (Namecheap, Cloudflare Registrar, etc.)
2. In the host's dashboard, add the domain
3. Update DNS at your registrar to point at the host's nameservers (or CNAME for subdomains)
4. Wait for cert provisioning (1–10 minutes)

Recommended hostname pattern: `fundhuntr.app` or `getfundhuntr.com`.

---

## Backend deployment (when we get there)

Out of scope for the current build. Recommended stack when the backend lands:

- **API**: Cloudflare Workers / Vercel Functions / Fly.io
- **DB**: Neon / Supabase / PlanetScale
- **Storage**: Cloudflare R2 / Supabase Storage
- **Auth**: Clerk / Supabase Auth / WorkOS

The frontend only needs `loadProfile()`, `saveProfile()`, `loadList()`, `saveList()` in `app.js` to be swapped from localStorage calls to `fetch()` calls. That's the one extension point.
