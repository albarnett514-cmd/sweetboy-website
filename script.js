/* ─────────────────────────────────────────
   SWEETBOY — interactions
   ───────────────────────────────────────── */

(function () {
  'use strict';

  /* ── HEADER: shadow on scroll ── */
  const header = document.getElementById('site-header');

  function onScroll() {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE NAV ── */
  const hamburger = document.querySelector('.hamburger');
  const nav       = document.getElementById('main-nav');
  const navLinks  = nav.querySelectorAll('.nav-link');

  function openNav() {
    nav.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleNav() {
    nav.classList.contains('open') ? closeNav() : openNav();
  }

  hamburger.addEventListener('click', toggleNav);
  navLinks.forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  /* ── SMOOTH SCROLL (offsets for sticky header) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── SCROLL FADE-IN ── */
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach(el => observer.observe(el));

  /* ── CONTACT FORM ── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const original = btn.innerHTML;
      btn.innerHTML = 'Sent <span aria-hidden="true">✓</span>';
      btn.disabled = true;
      btn.style.borderColor = 'var(--green)';
      btn.style.color       = 'var(--green)';
      setTimeout(() => {
        btn.innerHTML  = original;
        btn.disabled   = false;
        btn.style.borderColor = '';
        btn.style.color       = '';
        form.reset();
      }, 3200);
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const allLinks = document.querySelectorAll('#main-nav .nav-link');

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          allLinks.forEach(l => l.style.color = '');
          const active = document.querySelector(`#main-nav a[href="#${entry.target.id}"]`);
          if (active) active.style.color = 'var(--text)';
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => sectionObserver.observe(s));


}());
