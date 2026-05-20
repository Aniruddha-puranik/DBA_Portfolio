/* =============================================
   main.js — Hamburger + Smooth Scroll + Reveal
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hamburger / Mobile Drawer ─────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  const drawerLinks = drawer.querySelectorAll('a');

  function openDrawer() {
    toggle.classList.add('open');
    drawer.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    toggle.classList.remove('open');
    drawer.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });


  /* ── Smooth Scroll with Nav Offset ─────────── */
  const NAV_HEIGHT = 68; // px — matches nav height

  // Handle ALL anchor links (desktop nav + mobile drawer)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── Active Nav Highlight on Scroll ─────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    const scrollY = window.scrollY + NAV_HEIGHT + 40;
    sections.forEach(section => {
      if (
        scrollY >= section.offsetTop &&
        scrollY < section.offsetTop + section.offsetHeight
      ) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${section.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });


  /* ── Scroll Reveal ─────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach(el => observer.observe(el));

});
