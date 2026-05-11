# FundHuntr

> Funding, on autopilot. FundHuntr automatically finds, ranks, and applies to grants & scholarships for you — globally.

A Tinder-style funding-discovery app for four audiences worldwide:

- 🎓 **Students** — scholarships, fellowships, bursaries
- 🚀 **For-profit businesses** — grants, R&D credits, pitch competitions
- 💖 **Charities** — community funds, donor pools, programmatic grants
- 🏛️ **Non-profits / NGOs** — foundation grants, government funding, capacity awards

The end-state product applies on the user's behalf: profile in, auto-drafted application out.

---

## Documentation

Documentation is split by platform. Pick the one you're working on:

| Platform | Guide | What's inside |
| --- | --- | --- |
| 🌐 **Web** | [`docs/WEB.md`](docs/WEB.md) | Run locally in a browser, deploy as a static site, PWA install, file layout, design system |
| 📱 **Mobile** | [`docs/MOBILE.md`](docs/MOBILE.md) | Build iOS + Android apps with Capacitor, configure splash/status bar, ship to App Store / Play Store |
| 🧱 **Architecture** | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Profile data shape, storage keys, matching engine plans, roadmap |
| 🚢 **Deploy** | [`docs/DEPLOY.md`](docs/DEPLOY.md) | GitHub setup, GitHub Pages, custom domain, CI |

---

## Quick start

```bash
# Web (browser)
npm install
npm start                    # → http://localhost:8080

# Mobile (after npm install)
npx cap add ios              # macOS + Xcode required
npx cap add android          # Android Studio required
npx cap sync
npx cap open ios             # or:  npx cap open android
```

Detailed instructions are in the platform guides linked above.

## License

TBD — owned by the FundHuntr team.
