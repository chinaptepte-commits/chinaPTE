/**
 * chinaPTE day/night theme
 * Mode: auto | day | night  (localStorage key: chinaPTE_theme_mode)
 * Auto: local clock 06:00–18:59 → day, otherwise night
 */
(function () {
  var KEY = 'chinaPTE_theme_mode';
  var DAY_START = 6; // inclusive
  var DAY_END = 19; // exclusive → 06:00–18:59
  var META_DAY = '#f4f6fb';
  var META_NIGHT = '#0c0f14';

  function resolveTheme(mode) {
    if (mode === 'day' || mode === 'night') return mode;
    var h = new Date().getHours();
    return h >= DAY_START && h < DAY_END ? 'day' : 'night';
  }

  function getMode() {
    try {
      var m = localStorage.getItem(KEY);
      if (m === 'day' || m === 'night' || m === 'auto') return m;
    } catch (e) {}
    return 'auto';
  }

  function setMode(mode) {
    if (mode !== 'auto' && mode !== 'day' && mode !== 'night') mode = 'auto';
    try {
      localStorage.setItem(KEY, mode);
    } catch (e) {}
    apply();
  }

  function updateMeta(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'day' ? META_DAY : META_NIGHT);
  }

  function syncButtons(mode) {
    var root = document.getElementById('themeToggle');
    if (!root) return;
    var buttons = root.querySelectorAll('[data-theme-mode]');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var on = btn.getAttribute('data-theme-mode') === mode;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function apply() {
    var mode = getMode();
    var theme = resolveTheme(mode);
    document.documentElement.setAttribute('data-theme', theme);
    updateMeta(theme);
    syncButtons(mode);
  }

  function buildToggle() {
    if (document.getElementById('themeToggle')) return;
    var wrap = document.createElement('div');
    wrap.className = 'theme-toggle';
    wrap.id = 'themeToggle';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', '外观主题');
    wrap.title = '自动：本地时间 06:00–18:59 日间，其余夜间';

    var modes = [
      { id: 'auto', label: '自动' },
      { id: 'day', label: '日间' },
      { id: 'night', label: '夜间' }
    ];
    for (var i = 0; i < modes.length; i++) {
      var m = modes[i];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'theme-toggle-btn';
      btn.setAttribute('data-theme-mode', m.id);
      btn.textContent = m.label;
      btn.addEventListener('click', (function (id) {
        return function () { setMode(id); };
      })(m.id));
      wrap.appendChild(btn);
    }

    var hint = document.createElement('span');
    hint.className = 'theme-toggle-hint';
    hint.textContent = '自动=06:00–18:59 日间';
    wrap.appendChild(hint);

    var nav = document.querySelector('.site-nav');
    if (nav) {
      nav.appendChild(wrap);
    } else {
      wrap.classList.add('theme-toggle--sticky');
      document.body.appendChild(wrap);
    }
  }

  function boot() {
    apply();
    buildToggle();
    syncButtons(getMode());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Re-evaluate auto mode without reload
  setInterval(function () {
    if (getMode() === 'auto') apply();
  }, 30000);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) apply();
  });

  window.ChinaPTETheme = {
    getMode: getMode,
    setMode: setMode,
    apply: apply,
    resolveTheme: resolveTheme
  };
})();
