/* script.js
 Purpose: Progressive enhancement JS for menu toggle, smooth scroll, reveal-on-scroll, copy-to-clipboard, simple form validation stub, and theme toggle persisted to localStorage.
 Author: Provided as part of static site deliverable.
 No external libraries.
*/

(() => {
  'use strict';

  /* Helper */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* Set current year */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* NAV TOGGLE (mobile) */
  const navToggle = $('#nav-toggle');
  const primaryNav = $('#primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });
  }

  /* SMOOTH SCROLL for internal links (prefers-reduced-motion respected) */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (a) {
        const href = a.getAttribute('href');
        // allow top-of-page links
        if (href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // close mobile nav when navigating
            if (primaryNav && primaryNav.classList.contains('open')) {
              primaryNav.classList.remove('open');
              if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
          }
        }
      }
    });
  }

  /* REVEAL ON SCROLL using IntersectionObserver */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // If you want one-time reveal, unobserve after visible:
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((r) => io.observe(r));
  } else {
    // fallback: reveal all
    reveals.forEach(r => r.classList.add('is-visible'));
  }

  /* COPY TO CLIPBOARD micro-interaction */
  function copyEmailHandler(e) {
    const btn = e.currentTarget;
    const email = btn.dataset.email;
    if (!email) return;
    navigator.clipboard?.writeText(email).then(() => {
      const original = btn.innerHTML;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.innerHTML = original, 1500);
    }).catch(() => {
      // fallback: select a hidden input
      const tmp = document.createElement('input');
      tmp.value = email;
      document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand('copy'); }
      catch (err) { /* no-op */ }
      tmp.remove();
    });
  }
  $$('#copy-email, #copy-email-2').forEach(btn => btn && btn.addEventListener('click', copyEmailHandler));

  /* FORM VALIDATION STUB (progressive enhancement) */
  const contactForm = $('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formStatus = $('#form-status');
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const message = $('#message').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        if (formStatus) formStatus.textContent = 'Please complete all required fields.';
        return;
      }
      // Email pattern check (simple)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        if (formStatus) formStatus.textContent = 'Please provide a valid email address.';
        return;
      }

      // Stub behavior: show success but do not send (static demo)
      if (formStatus) { formStatus.textContent = 'Message ready (demo). Hook this form to a server or third-party form handler.'; }
      contactForm.reset();
    });
  }

  /* THEME TOGGLE (persist preference) */
  const themeToggle = $('#color-toggle');
  const root = document.documentElement;
  const THEME_KEY = 'de_theme_pref';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      themeToggle && themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      themeToggle && themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  // initialize from localStorage or system preference
  const saved = localStorage.getItem(THEME_KEY);
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(saved || (prefersLight ? 'light' : 'dark'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('theme-light');
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
    });
  }

  /* PRINT link */
  const printLink = $('#print-resume');
  if (printLink) {
    printLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }

  /* Small accessibility: ensure main gets focus after skip link */
  const skip = document.querySelector('.skip-link');
  if (skip) {
    skip.addEventListener('click', (e) => {
      const main = $('#main');
      if (main) { setTimeout(() => main.focus(), 10); }
    });
  }

})();
