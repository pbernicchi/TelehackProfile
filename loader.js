// pbernicc TelehackProfile — NeXT MegaPixel Display
// Drop-in replacement for the <script> at the bottom of telehack.com/u/pbernicc
// Served from: https://pbernicchi.github.io/TelehackProfile/loader.js

(function () {
  'use strict';

  var CSS_URL = 'https://pbernicchi.github.io/TelehackProfile/pbernicc.css';
  var MIN_B   = 0.25;
  var MAX_B   = 1.05;
  var brightness  = 0.90;
  var knobDeg     = 0;   // current knob rotation in degrees

  // ── Inject stylesheet ──────────────────────────────────────────────────────
  var link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = CSS_URL;
  document.head.appendChild(link);

  // ── Grab & clean the existing <pre> ────────────────────────────────────────
  var pre = document.querySelector('pre');
  if (!pre) return;
  var content = pre.cloneNode(true);
  // Remove any <script> tags from the cloned content
  Array.prototype.forEach.call(content.querySelectorAll('script'), function (s) {
    s.parentNode.removeChild(s);
  });

  // ── DOM helpers ─────────────────────────────────────────────────────────────
  function el(tag, id, cls) {
    var e = document.createElement(tag || 'div');
    if (id)  e.id        = id;
    if (cls) e.className = cls;
    return e;
  }

  // ── Build monitor shell ─────────────────────────────────────────────────────
  var wrapper    = el('div', 'next-wrapper');
  var monitor    = el('div', 'next-monitor');
  var screenArea = el('div', 'next-screen-area');
  var vignette   = el('div', 'next-vignette');
  var scanlines  = el('div', 'next-scanlines');
  var glare      = el('div', 'next-glare');

  // NeXTSTEP Terminal.app window
  var win        = el('div', 'next-window');
  var titlebar   = el('div', 'next-titlebar');
  var btnClose   = el('div', null, 'next-btn next-btn-close');
  var btnMini    = el('div', null, 'next-btn next-btn-mini');
  var titleText  = el('div', 'next-title-text');
  titleText.textContent = 'Terminal — pbernicc@telehack.com — 80×40';
  var btnResize  = el('div', null, 'next-btn next-btn-resize');

  titlebar.appendChild(btnClose);
  titlebar.appendChild(btnMini);
  titlebar.appendChild(titleText);
  titlebar.appendChild(btnResize);

  var contentArea = el('div', 'next-content');
  contentArea.appendChild(content);

  win.appendChild(titlebar);
  win.appendChild(contentArea);

  screenArea.appendChild(win);
  screenArea.appendChild(vignette);
  screenArea.appendChild(scanlines);
  screenArea.appendChild(glare);

  // ── Bottom bezel ────────────────────────────────────────────────────────────
  var bottomBezel = el('div', 'next-bottom-bezel');

  // NeXT logo block
  var logoWrap  = el('div', 'next-logo');
  var logoCube  = el('div', 'next-logo-cube');
  // Cube faces built via child divs (top, front, side)
  var cubeFront = el('div', null, 'next-cube-front');
  var cubeTop   = el('div', null, 'next-cube-top');
  var cubeSide  = el('div', null, 'next-cube-side');
  logoCube.appendChild(cubeFront);
  logoCube.appendChild(cubeTop);
  logoCube.appendChild(cubeSide);

  var logoText  = el('div', 'next-logo-text');
  // Faithful NeXT wordmark: "N" "e" "X" "T" — note lowercase e
  logoText.innerHTML = 'N<span class="next-logo-e">e</span>XT';

  logoWrap.appendChild(logoCube);
  logoWrap.appendChild(logoText);

  // Model tag
  var modelTag = el('div', 'next-model');
  modelTag.textContent = 'N4000A  MegaPixel Display';

  // Controls: power LED + brightness knob
  var controls       = el('div', 'next-controls');
  var powerLed       = el('div', 'next-power-led');
  var knobWrap       = el('div', 'next-knob-wrap');
  var brightnessKnob = el('div', 'next-brightness-knob');
  var knobLabel      = el('div', 'next-knob-label');
  knobLabel.textContent = 'BRIGHTNESS';
  knobWrap.appendChild(brightnessKnob);
  knobWrap.appendChild(knobLabel);
  controls.appendChild(powerLed);
  controls.appendChild(knobWrap);

  bottomBezel.appendChild(logoWrap);
  bottomBezel.appendChild(modelTag);
  bottomBezel.appendChild(controls);
  monitor.appendChild(screenArea);
  monitor.appendChild(bottomBezel);

  // ── Stand ───────────────────────────────────────────────────────────────────
  var standNeck = el('div', 'next-stand-neck');
  var standBase = el('div', 'next-stand-base');

  wrapper.appendChild(monitor);
  wrapper.appendChild(standNeck);
  wrapper.appendChild(standBase);

  // ── Replace page body ───────────────────────────────────────────────────────
  document.body.innerHTML = '';
  document.body.appendChild(wrapper);

  // ── Brightness control (drag knob up/down) ──────────────────────────────────
  function applyBrightness() {
    // map brightness [MIN_B..MAX_B] → knob rotation [-130°..130°]
    var t      = (brightness - MIN_B) / (MAX_B - MIN_B);
    knobDeg    = -130 + t * 260;
    brightnessKnob.style.transform = 'rotate(' + knobDeg + 'deg)';
    screenArea.style.filter        = 'brightness(' + brightness + ')';
  }

  var dragging    = false;
  var dragStartY  = 0;
  var dragStartB  = brightness;

  brightnessKnob.addEventListener('mousedown', function (e) {
    dragging   = true;
    dragStartY = e.clientY;
    dragStartB = brightness;
    document.body.style.cursor = 'ns-resize';
    e.preventDefault();
  });

  document.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    var delta = (dragStartY - e.clientY) / 220;
    brightness = Math.min(MAX_B, Math.max(MIN_B, dragStartB + delta));
    applyBrightness();
  });

  document.addEventListener('mouseup', function () {
    if (dragging) {
      dragging = false;
      document.body.style.cursor = '';
    }
  });

  // Double-click knob resets brightness
  brightnessKnob.addEventListener('dblclick', function () {
    brightness = 0.90;
    applyBrightness();
  });

  applyBrightness();

  // ── Power-on boot animation ─────────────────────────────────────────────────
  monitor.classList.add('next-booting');
  setTimeout(function () {
    monitor.classList.remove('next-booting');
    monitor.classList.add('next-on');
  }, 1100);

}());
