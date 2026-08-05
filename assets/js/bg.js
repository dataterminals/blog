/* Background video readiness — the same handshake app.js does on the hub.
   The clip starts at opacity 0 so a slow or missing file shows the oxblood
   gradient instead of a black rectangle; this adds .is-ready once there are
   actual frames to show. */
(function () {
  'use strict';

  function initVideo() {
    var v = document.querySelector('.bg__video');
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // CSS hides it; leave the gradient

    var show = function () { v.classList.add('is-ready'); };
    if (v.readyState >= 2) show();
    v.addEventListener('loadeddata', show, { once: true });
    v.addEventListener('canplay', show, { once: true });

    // Some browsers need a nudge; ignore rejections (no file yet, etc.).
    var p = v.play();
    if (p && typeof p.catch === 'function') p.catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideo);
  } else {
    initVideo();
  }
})();
