// pbernicc TelehackProfile — NeXT MegaPixel Display (photo overlay)
// Drop-in replacement for the <script> at the bottom of telehack.com/u/pbernicc
// Served from: https://pbernicchi.github.io/TelehackProfile/loader.js

(function () {
  'use strict';

  var BASE     = 'https://pbernicchi.github.io/TelehackProfile/';
  var CSS_URL  = BASE + 'pbernicc.css';
  var IMG_URL  = BASE + 'next_monitor.png';
  var MIN_B    = 0.25;
  var MAX_B    = 1.05;
  var brightness  = 0.90;

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

  // ── Build layout ─────────────────────────────────────────────────────────────
  //
  //  #next-stage          — full viewport, dark room background
  //    #next-scene        — photo-sized container, aspect matches monitor PNG
  //      #next-screen     — positioned behind the photo, fills the screen hole
  //        #next-scanlines
  //        #next-vignette
  //        #next-content  — clips to screen bounds
  //          #next-window     — NeXTSTEP Terminal.app chrome
  //            #next-titlebar   — dark gray titlebar with square buttons
  //            #next-terminal   — scrollable text area
  //      #next-photo      — monitor PNG (transparent bg + screen hole)
  //      #next-glare      — glass specular over screen area
  //      #next-knob-hit   — invisible drag target over bezel controls

  var stage   = el('div', 'next-stage');
  var scene   = el('div', 'next-scene');

  // Screen area (behind photo)
  var screen   = el('div', 'next-screen');
  var sclines  = el('div', 'next-scanlines');
  var vignette = el('div', 'next-vignette');

  var contentArea = el('div', 'next-content');

  // NeXTSTEP Terminal.app window
  var win      = el('div', 'next-window');
  var titlebar = el('div', 'next-titlebar');
  var btnClose = el('div', null, 'next-btn next-btn-close');
  var btnMini  = el('div', null, 'next-btn next-btn-mini');
  var titleText = el('div', 'next-title-text');
  titleText.textContent = 'Terminal — pbernicc@telehack.com — 80×40';
  var btnZoom  = el('div', null, 'next-btn next-btn-zoom');
  titlebar.appendChild(btnClose);
  titlebar.appendChild(btnMini);
  titlebar.appendChild(titleText);
  titlebar.appendChild(btnZoom);

  var terminal = el('div', 'next-terminal');
  terminal.appendChild(content);

  win.appendChild(titlebar);
  win.appendChild(terminal);
  contentArea.appendChild(win);

  screen.appendChild(sclines);
  screen.appendChild(vignette);
  screen.appendChild(contentArea);

  // Photo overlay
  var photo = el('img', 'next-photo');
  photo.src = IMG_URL;
  photo.alt = '';

  // Glass glare (over screen hole only)
  var glare = el('div', 'next-glare');

  // Invisible knob drag target (bottom-right area of bezel)
  var knobHit = el('div', 'next-knob-hit');

  scene.appendChild(screen);
  scene.appendChild(photo);
  scene.appendChild(glare);
  scene.appendChild(knobHit);
  stage.appendChild(scene);

  document.body.innerHTML = '';
  document.body.appendChild(stage);

  // ── Brightness control ──────────────────────────────────────────────────────
  function applyBrightness() {
    screen.style.filter = 'brightness(' + brightness + ')';
  }

  var dragging   = false;
  var dragStartY = 0;
  var dragStartB = brightness;

  knobHit.addEventListener('mousedown', function (e) {
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

  knobHit.addEventListener('dblclick', function () {
    brightness = 0.90;
    applyBrightness();
  });

  applyBrightness();

  // ── Power-on animation ──────────────────────────────────────────────────────
  scene.classList.add('next-booting');
  setTimeout(function () {
    scene.classList.remove('next-booting');
    scene.classList.add('next-on');
  }, 1100);

}());
