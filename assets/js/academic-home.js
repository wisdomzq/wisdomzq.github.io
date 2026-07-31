(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    const closeNav = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(willOpen));
      nav.classList.toggle('is-open', willOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeNav();
    });
  }

  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const linkById = new Map(navLinks.map((link) => [link.hash.slice(1), link]));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => link.removeAttribute('aria-current'));
      linkById.get(visible.target.id)?.setAttribute('aria-current', 'location');
    }, {
      rootMargin: '-18% 0px -62% 0px',
      threshold: [0.05, 0.25, 0.5]
    });

    sections.forEach((section) => observer.observe(section));
  }

  const year = document.querySelector('#site-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
