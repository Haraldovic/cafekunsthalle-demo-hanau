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
  var t = parseFloat(nav.getAttribute('data-threshold') || '64');
  function onScroll() {
    /* t < 0: Navigation immer solide (Seiten ohne Bild-Hero) */
    nav.classList.toggle('solid', t < 0 || window.scrollY > 64);
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

  /* Reservierungsformular — oeffnet WhatsApp mit vorformulierter Anfrage */
  window.sendRes = function () {
    var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    var name = v('n1'), tel = v('n2'), mail = v('n3');
    if (!name || (!mail && !tel)) {
      alert('Bitte geben Sie Ihren Namen sowie E-Mail oder Telefonnummer an.');
      return;
    }
    var lines = [
      'Reservierungsanfrage — Café Kunsthalle',
      '',
      'Name: ' + name,
      tel ? 'Telefon: ' + tel : null,
      mail ? 'E-Mail: ' + mail : null,
      'Personen: ' + v('n4'),
      v('n5') ? 'Datum: ' + v('n5') : null,
      'Uhrzeit: ' + v('n6'),
      v('n7') ? '' : null,
      v('n7') ? 'Nachricht: ' + v('n7') : null
    ].filter(function (l) { return l !== null; });
    var url = 'https://wa.me/491734045678?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
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
