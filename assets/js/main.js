/* Café Kunsthalle — main.js */
(function () {
  'use strict';

  /* Preloader */
  window.addEventListener('load', function () {
    var l = document.getElementById('loader');
    if (l) setTimeout(function () { l.classList.add('done'); }, 350);
  });
  setTimeout(function () {
    var l = document.getElementById('loader');
    if (l) l.classList.add('done');
  }, 2600);

  /* Nav: transparent über Hero, solide beim Scrollen */
  var nav = document.getElementById('nav');
  var threshold = parseFloat(nav.getAttribute('data-threshold') || '0.72');
  function onScroll() {
    nav.classList.toggle('solid', window.scrollY > window.innerHeight * threshold);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile Navigation */
  window.mNav = function () {
    document.getElementById('bg').classList.toggle('x');
    var m = document.getElementById('mn');
    m.classList.toggle('open');
    document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
  };

  /* Reservierungsformular (Demo-Bestätigung) */
  window.sendRes = function () {
    var n = document.getElementById('n1');
    var m = document.getElementById('n3');
    var t = document.getElementById('n2');
    if (!n || !n.value.trim() || (!m.value.trim() && !t.value.trim())) {
      alert('Bitte geben Sie Ihren Namen sowie E-Mail oder Telefonnummer an.');
      return;
    }
    document.getElementById('ok').style.display = 'block';
    var rf = document.getElementById('rf');
    rf.style.opacity = '0.3';
    rf.style.pointerEvents = 'none';
    document.querySelector('.res-send').style.display = 'none';
  };

  /* Google Maps — DSGVO Click-to-Load */
  window.loadMap = function () {
    var f = document.getElementById('mf');
    f.src = f.getAttribute('data-src');
    f.style.display = 'block';
    document.getElementById('mg').style.display = 'none';
  };

  /* Scroll-Reveal */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('go'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('go'); });
  }

  /* Sanfter Parallax auf Hero-/Banner-Bildern */
  var pxEls = document.querySelectorAll('.px');
  if (pxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    function parallax() {
      pxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          var shift = (r.top) * -0.12;
          el.style.transform = 'translateY(' + shift.toFixed(1) + 'px) scale(1.12)';
        }
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
    }, { passive: true });
    parallax();
  }

  /* Datum: nur zukünftige Daten wählbar */
  var d = document.getElementById('n5');
  if (d) d.min = new Date().toISOString().split('T')[0];
})();
