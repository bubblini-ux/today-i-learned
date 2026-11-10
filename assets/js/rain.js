(function () {
  'use strict';

  var canvas = document.getElementById('rain');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var glyphs = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';
  var cell = 16;
  var frameMs = 60;
  var width = 0;
  var height = 0;
  var drops = [];
  var lastFrame = 0;
  var raf = 0;
  var resizeTimer = 0;

  function setup() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = cell + 'px monospace';
    ctx.fillStyle = '#020603';
    ctx.fillRect(0, 0, width, height);

    var rows = Math.ceil(height / cell);
    drops = [];
    for (var i = 0; i < Math.ceil(width / cell); i++) {
      drops.push(-Math.floor(Math.random() * rows));
    }
  }

  function step() {
    ctx.fillStyle = 'rgba(2, 6, 3, 0.08)';
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < drops.length; i++) {
      var y = drops[i] * cell;
      ctx.fillStyle = Math.random() < 0.05 ? '#d6ffe0' : '#2bd45a';
      ctx.fillText(glyphs.charAt(Math.floor(Math.random() * glyphs.length)), i * cell, y);
      if (y > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  function loop(now) {
    raf = window.requestAnimationFrame(loop);
    if (now - lastFrame < frameMs) return;
    lastFrame = now;
    step();
  }

  function stop() {
    window.cancelAnimationFrame(raf);
    raf = 0;
  }

  function start() {
    stop();
    if (motion.matches) {
      for (var i = 0; i < 240; i++) step();
      return;
    }
    if (!document.hidden) raf = window.requestAnimationFrame(loop);
  }

  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      // Mobile browser bars shrink the viewport while scrolling; ignore that.
      if (window.innerWidth === width && window.innerHeight <= height) return;
      setup();
      start();
    }, 150);
  });

  document.addEventListener('visibilitychange', start);

  if (motion.addEventListener) motion.addEventListener('change', start);

  setup();
  start();

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-copy]') : null;
    if (!btn) return;
    var text = btn.getAttribute('data-copy') || '';
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;
    navigator.clipboard.writeText(text).then(function () {
      var orig = btn.textContent;
      btn.textContent = '[copied!]';
      setTimeout(function () { btn.textContent = orig; }, 1600);
    });
  });
})();
