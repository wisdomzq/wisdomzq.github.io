(() => {
  const nav = document.querySelector('.section-nav');
  const links = [...document.querySelectorAll('.section-nav__link')];
  const sections = links.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let activeId = '';
  let scheduled = false;

  const updateNavigation = () => {
    scheduled = false;
    const offset = window.innerWidth <= 1170 ? (nav?.offsetHeight || 0) + 45 : 90;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) current = section;
    }
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      current = sections.at(-1);
    }
    if (!current || current.id === activeId) return;
    activeId = current.id;
    for (const link of links) {
      if (link.hash === '#' + activeId) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };

  const scheduleNavigation = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  };
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  window.addEventListener('load', scheduleNavigation);
  document.querySelectorAll('details').forEach((details) => details.addEventListener('toggle', scheduleNavigation));
  document.fonts?.ready.then(scheduleNavigation);
  updateNavigation();

  const dialog = document.querySelector('.figure-dialog');
  const preview = document.querySelector('#figure-preview');
  const caption = document.querySelector('#figure-caption');
  const source = document.querySelector('#figure-source');

  if (dialog && preview && caption && source && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-figure]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        preview.src = link.href;
        preview.alt = link.querySelector('img').alt;
        caption.textContent = link.dataset.caption;
        source.href = link.dataset.source;
        source.textContent = link.dataset.sourceLabel;
        dialog.showModal();
        document.body.classList.add('figure-open');
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        dialog.close();
      }
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('figure-open');
      preview.removeAttribute('src');
      preview.alt = '';
    });
  }

  const year = document.querySelector('#site-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
