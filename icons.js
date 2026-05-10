/* FundHuntr — SVG icon library
 * Stroke-based, 24x24 viewBox, uses currentColor for theming.
 * Usage: FH.icon('graduation-cap')  → SVG markup string
 *        Or add `data-icon="name"` to an element and call FH.hydrateIcons()
 */
(function () {
  const I = {};

  // --- profile types
  I['graduation-cap'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11v5c3.5 2 8.5 2 12 0v-5"/><path d="M22 9v5"/></svg>`;
  I['rocket'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4l6 0 0 6c0 4-3 8-8 9l-1-3c-1-.3-2-1.3-2.3-2.3l-3-1C7 7 11 4 14 4z"/><path d="M9 15c-1 1-1.5 3-1.5 4.5C9 19.5 11 19 12 18"/><circle cx="15" cy="9" r="1.3"/></svg>`;
  I['heart'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.5-9-9c-1.4-3 .8-6 4-6 2 0 3.5 1.2 5 3 1.5-1.8 3-3 5-3 3.2 0 5.4 3 4 6-2 4.5-9 9-9 9z"/></svg>`;
  I['heart-fill'] = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.5-9-9c-1.4-3 .8-6 4-6 2 0 3.5 1.2 5 3 1.5-1.8 3-3 5-3 3.2 0 5.4 3 4 6-2 4.5-9 9-9 9z"/></svg>`;
  I['columns'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M3 9h18"/><path d="M12 3l9 6H3l9-6z"/><path d="M6 9v12"/><path d="M10 9v12"/><path d="M14 9v12"/><path d="M18 9v12"/></svg>`;

  // --- discover / nav actions
  I['close'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
  I['info'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="8" r="0.8" fill="currentColor"/></svg>`;
  I['star'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9L12 3z"/></svg>`;
  I['home'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>`;
  I['sparkles'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7L19 14z"/><path d="M5 16l.5 1.5 1.5.5-1.5.5L5 20l-.5-1.5L3 18l1.5-.5L5 16z"/></svg>`;
  I['user'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>`;
  I['back'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
  I['arrow-right'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>`;

  // --- card category icons (used in card banners + tags)
  I['globe'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9z"/></svg>`;
  I['lightbulb'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 00-4 10.5c.7.6 1 1.5 1 2.5h6c0-1 .3-1.9 1-2.5A6 6 0 0012 3z"/></svg>`;
  I['leaf'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21c0-9 7-15 16-16-1 9-7 16-16 16z"/><path d="M5 21c4-4 8-8 13-13"/></svg>`;
  I['trophy'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v4a5 5 0 11-10 0V4z"/><path d="M5 6H3v2a3 3 0 003 3"/><path d="M19 6h2v2a3 3 0 01-3 3"/><path d="M9 17h6"/><path d="M12 13v4"/><path d="M9 21h6"/></svg>`;
  I['briefcase'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/><path d="M3 13h18"/></svg>`;
  I['health'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3h4v6h6v4h-6v6h-4v-6H4V9h6V3z"/></svg>`;
  I['atom'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>`;
  I['handshake'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l2 2 4-4"/><path d="M3 11l4-4 5 5-4 4-5-5z"/><path d="M21 11l-4-4-5 5 4 4 5-5z"/><path d="M9 13l2 2"/></svg>`;
  I['mountain'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l6-12 4 7 2-3 6 8H3z"/></svg>`;
  I['shield'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></svg>`;
  I['ticket'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 002-2h14a2 2 0 002 2v3a2 2 0 100 4v3a2 2 0 00-2 2H5a2 2 0 00-2-2v-3a2 2 0 100-4V8z"/><path d="M11 6v12"/></svg>`;
  I['dollar'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M16 7a4 4 0 00-4-2c-2.5 0-4 1.5-4 3.5S9.5 12 12 12s4 1.5 4 3.5-1.5 3.5-4 3.5a4 4 0 01-4-2"/></svg>`;
  I['flag'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>`;
  I['bolt'] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>`;

  // brand mark
  I['brand'] = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-5-9-9.5C1.7 8 4 5 7 5c2 0 3.5 1.2 5 3 1.5-1.8 3-3 5-3 3 0 5.3 3 4 6.5C19 16 12 21 12 21z"/></svg>`;

  // --- Public API ---------------------------------------------------------
  function svg(name, opts) {
    const raw = I[name];
    if (!raw) return '';
    if (!opts) return raw;
    // allow size override
    let out = raw;
    if (opts.size) out = out.replace('<svg ', `<svg width="${opts.size}" height="${opts.size}" `);
    if (opts.class) out = out.replace('<svg ', `<svg class="${opts.class}" `);
    return out;
  }

  function hydrate(scope) {
    const root = scope || document;
    root.querySelectorAll('[data-icon]').forEach(el => {
      const name = el.dataset.icon;
      if (!name || el.querySelector('svg')) return;
      el.insertAdjacentHTML('afterbegin', svg(name));
    });
  }

  // wait for FH if it's not ready yet
  if (typeof FH !== 'undefined') {
    FH.icon = svg;
    FH.hydrateIcons = hydrate;
  } else {
    window.FH = window.FH || {};
    window.FH.icon = svg;
    window.FH.hydrateIcons = hydrate;
  }

  // auto-hydrate on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => hydrate());
  } else {
    hydrate();
  }
})();
