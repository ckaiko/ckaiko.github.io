/* ==========================================================
   app.js - Portfolio interactivity (multi-page)

   TABLE OF CONTENTS
   1. Typing Animation (home page only)
   2. Scroll-Reveal (IntersectionObserver)
   3. 3D Tilt Cards
   4. Mobile Nav Toggle
   5. Navbar Scroll Effect
   6. Page Transition Effect
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================
     1. TYPING ANIMATION  (only runs if #typed-text exists)
     ======================================================== */
  const typedEl = document.getElementById('typed-text');

  if (typedEl) {
    const phrases = [
      'Project Manager.',
      'Developer.',
      'Builder of Things.',
      'Vintage Enthusiast.',
      'Lifelong Learner.',
    ];
    let phraseIdx  = 0;
    let charIdx    = 0;
    let deleting   = false;
    const TYPE_SPEED   = 80;
    const DELETE_SPEED  = 40;
    const PAUSE_BEFORE_DELETE = 1800;
    const PAUSE_BEFORE_TYPE   = 400;

    function typeLoop() {
      const current = phrases[phraseIdx];

      if (!deleting) {
        typedEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(typeLoop, PAUSE_BEFORE_DELETE);
          return;
        }
        setTimeout(typeLoop, TYPE_SPEED);
      } else {
        typedEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(typeLoop, PAUSE_BEFORE_TYPE);
          return;
        }
        setTimeout(typeLoop, DELETE_SPEED);
      }
    }
    typeLoop();
  }


  /* ========================================================
     2. SCROLL-REVEAL  (IntersectionObserver)
     ======================================================== */
  const revealEls = document.querySelectorAll('[data-animate]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ========================================================
     3. 3D TILT CARDS
     ======================================================== */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateY = ((x - cx) / cx) * 8;
      const rotateX = ((cy - y) / cy) * 8;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
    });
  });


  /* ========================================================
     4. MOBILE NAV TOGGLE
     ======================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksUl = document.querySelector('.nav-links');

  if (navToggle && navLinksUl) {
    navToggle.addEventListener('click', () => {
      navLinksUl.classList.toggle('open');
    });
    navLinksUl.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksUl.classList.remove('open');
      });
    });
  }


  /* ========================================================
     5. NAVBAR SCROLL EFFECT
     ======================================================== */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }


  /* ========================================================
     6. PAGE TRANSITION  fade content in on load
     ======================================================== */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
