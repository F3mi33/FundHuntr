/* FundHuntr — shared front-end logic
 * Profile data persists in localStorage under 'fundhuntr.profile'.
 * Each profile builder calls FH.initWizard({ type, schema }).
 */

const FH = (function () {
  const STORAGE_KEY = 'fundhuntr.profile';
  const SAVED_KEY = 'fundhuntr.saved';
  const PASSED_KEY = 'fundhuntr.passed';

  // ---- Storage helpers ---------------------------------------------------
  function loadProfile() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveProfile(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  function clearProfile() { localStorage.removeItem(STORAGE_KEY); }

  function loadList(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  }
  function saveList(key, list) { localStorage.setItem(key, JSON.stringify(list)); }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  // ---- Field rendering ---------------------------------------------------
  function renderField(field, values) {
    const v = values?.[field.name] ?? '';
    const wrap = document.createElement('div');
    wrap.className = 'field' + (field.full ? ' full' : '');

    if (field.label) {
      const lbl = document.createElement('label');
      lbl.htmlFor = field.name;
      lbl.textContent = field.label + (field.required ? ' *' : '');
      wrap.appendChild(lbl);
    }
    if (field.hint) {
      const h = document.createElement('div');
      h.className = 'hint';
      h.textContent = field.hint;
      wrap.appendChild(h);
    }

    let el;
    switch (field.type) {
      case 'textarea': {
        el = document.createElement('textarea');
        el.id = field.name; el.name = field.name;
        el.placeholder = field.placeholder || '';
        el.value = v;
        if (field.rows) el.rows = field.rows;
        break;
      }
      case 'select': {
        el = document.createElement('select');
        el.id = field.name; el.name = field.name;
        const blank = document.createElement('option');
        blank.value = ''; blank.textContent = field.placeholder || 'Select…';
        el.appendChild(blank);
        (field.options || []).forEach(o => {
          const opt = document.createElement('option');
          opt.value = typeof o === 'string' ? o : o.value;
          opt.textContent = typeof o === 'string' ? o : o.label;
          if (v === opt.value) opt.selected = true;
          el.appendChild(opt);
        });
        break;
      }
      case 'chips':
      case 'chips-multi': {
        const group = document.createElement('div');
        group.className = 'chip-group';
        const isMulti = field.type === 'chips-multi';
        const selected = isMulti ? new Set(Array.isArray(v) ? v : []) : v;
        (field.options || []).forEach(o => {
          const optVal = typeof o === 'string' ? o : o.value;
          const optLbl = typeof o === 'string' ? o : o.label;
          const chip = document.createElement('label');
          chip.className = 'chip';
          chip.dataset.value = optVal;
          chip.textContent = optLbl;
          if (isMulti && selected.has(optVal)) chip.classList.add('active');
          if (!isMulti && selected === optVal) chip.classList.add('active');
          chip.addEventListener('click', () => {
            if (isMulti) chip.classList.toggle('active');
            else {
              group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
              chip.classList.add('active');
            }
          });
          group.appendChild(chip);
        });
        group.dataset.fieldName = field.name;
        group.dataset.fieldKind = field.type;
        wrap.appendChild(group);
        return wrap;
      }
      default: {
        el = document.createElement('input');
        el.type = field.type || 'text';
        el.id = field.name; el.name = field.name;
        el.placeholder = field.placeholder || '';
        el.value = v;
        if (field.min != null) el.min = field.min;
        if (field.max != null) el.max = field.max;
        if (field.autocomplete) el.autocomplete = field.autocomplete;
        if (field.inputmode) el.inputMode = field.inputmode;
      }
    }
    wrap.appendChild(el);
    return wrap;
  }

  function renderStep(step, values) {
    const wrapper = document.createElement('div');
    wrapper.className = 'step';
    const h = document.createElement('h3');
    h.textContent = step.title;
    wrapper.appendChild(h);
    if (step.subtitle) {
      const p = document.createElement('p');
      p.className = 'step-sub';
      p.textContent = step.subtitle;
      wrapper.appendChild(p);
    }
    if (step.callout) {
      const c = document.createElement('div');
      c.className = 'callout';
      c.textContent = step.callout;
      wrapper.appendChild(c);
    }
    const grid = document.createElement('div');
    grid.className = 'field-grid';
    step.fields.forEach(f => grid.appendChild(renderField(f, values)));
    wrapper.appendChild(grid);
    return wrapper;
  }

  function collectStepValues(stepEl) {
    const data = {};
    stepEl.querySelectorAll('input, select, textarea').forEach(el => {
      if (!el.name) return;
      data[el.name] = el.value;
    });
    stepEl.querySelectorAll('.chip-group').forEach(group => {
      const name = group.dataset.fieldName;
      const isMulti = group.dataset.fieldKind === 'chips-multi';
      if (isMulti) {
        const vals = [...group.querySelectorAll('.chip.active')].map(c => c.dataset.value);
        data[name] = vals;
      } else {
        const active = group.querySelector('.chip.active');
        data[name] = active ? active.dataset.value : '';
      }
    });
    return data;
  }

  function buildReview(values, schema) {
    const all = [];
    schema.steps.forEach(s => {
      (s.fields || []).forEach(f => {
        const v = values[f.name];
        if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) return;
        all.push({ k: f.label || f.name, v: Array.isArray(v) ? v.join(', ') : String(v) });
      });
    });
    return all;
  }

  // ---- Wizard initializer -----------------------------------------------
  function initWizard({ type, schema }) {
    const stored = loadProfile();
    const values = (stored && stored.type === type) ? (stored.data || {}) : {};

    const bodyEl = document.querySelector('[data-wizard-body]');
    const progressFill = document.querySelector('[data-progress-fill]');
    const progressLabel = document.querySelector('[data-progress-label]');
    const stepLabel = document.querySelector('[data-step-label]');
    const backBtn = document.querySelector('[data-back]');
    const nextBtn = document.querySelector('[data-next]');

    const totalSteps = schema.steps.length + 1; // +1 for review
    let currentStep = 0;

    function renderCurrent() {
      bodyEl.innerHTML = '';
      let stepEl;
      if (currentStep < schema.steps.length) {
        stepEl = renderStep(schema.steps[currentStep], values);
        bodyEl.appendChild(stepEl);
        stepLabel.textContent = schema.steps[currentStep].title;
        nextBtn.textContent = currentStep === schema.steps.length - 1 ? 'Review →' : 'Next →';
      } else {
        stepEl = document.createElement('div');
        stepEl.className = 'step active';
        stepEl.innerHTML = `<h3>Review your profile</h3>
          <p class="step-sub">We'll feed this to our matching agent. You can edit any field later.</p>`;
        const grid = document.createElement('div');
        grid.className = 'review-grid';
        const reviewItems = buildReview(values, schema);
        if (reviewItems.length === 0) {
          const empty = document.createElement('div');
          empty.className = 'callout warn';
          empty.textContent = 'No answers captured yet. Use Back to fill in your profile.';
          stepEl.appendChild(empty);
        }
        reviewItems.forEach(r => {
          const item = document.createElement('div');
          item.className = 'review-item';
          item.innerHTML = `<div class="k">${escapeHtml(r.k)}</div><div class="v">${escapeHtml(r.v)}</div>`;
          grid.appendChild(item);
        });
        stepEl.appendChild(grid);
        bodyEl.appendChild(stepEl);
        stepLabel.textContent = 'Review';
        nextBtn.textContent = 'Find matches →';
      }
      stepEl.classList.add('active');

      const pct = Math.round(((currentStep) / (totalSteps - 1)) * 100);
      progressFill.style.width = pct + '%';
      progressLabel.textContent = `Step ${Math.min(currentStep + 1, totalSteps)} of ${totalSteps}`;
      backBtn.disabled = currentStep === 0;
    }

    function captureCurrent() {
      const stepEl = bodyEl.querySelector('.step');
      if (!stepEl) return;
      Object.assign(values, collectStepValues(stepEl));
      saveProfile({ type, data: values });
    }

    nextBtn.addEventListener('click', () => {
      captureCurrent();
      if (currentStep < totalSteps - 1) {
        currentStep++;
        renderCurrent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        saveProfile({ type, data: values, completedAt: new Date().toISOString() });
        window.location.href = 'discover.html';
      }
    });

    backBtn.addEventListener('click', () => {
      if (currentStep === 0) return;
      captureCurrent();
      currentStep--;
      renderCurrent();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    renderCurrent();
  }

  // ---- Bottom nav rendering ---------------------------------------------
  function renderBottomNav(active) {
    const items = [
      { id: 'home', label: 'Home', icon: 'home', href: 'index.html' },
      { id: 'discover', label: 'Discover', icon: 'sparkles', href: 'discover.html' },
      { id: 'saved', label: 'Saved', icon: 'heart', href: 'saved.html' },
      { id: 'profile', label: 'Profile', icon: 'user', href: profileLink() }
    ];
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    items.forEach(it => {
      const a = document.createElement('a');
      a.href = it.href;
      a.className = 'bottom-nav-item' + (active === it.id ? ' active' : '');
      const iconHtml = (window.FH && FH.icon) ? FH.icon(it.icon) : '';
      a.innerHTML = `<span class="ico">${iconHtml}</span><span>${it.label}</span>`;
      nav.appendChild(a);
    });
    document.body.appendChild(nav);
  }
  function profileLink() {
    const p = loadProfile();
    if (!p?.type) return 'index.html';
    return 'profile-' + p.type + '.html';
  }

  // ---- Service worker registration --------------------------------------
  function registerSW() {
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      });
    }
  }

  return {
    initWizard,
    loadProfile, saveProfile, clearProfile,
    loadList, saveList,
    SAVED_KEY, PASSED_KEY,
    escapeHtml,
    renderBottomNav,
    registerSW
  };
})();

FH.registerSW();
