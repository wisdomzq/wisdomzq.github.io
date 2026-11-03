(() => {
  const nav = document.querySelector('.section-nav');
  const links = [...document.querySelectorAll('.section-nav__link')];
  const sections = links.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let activeId = '';
  let scheduled = false;
  const hashTarget = (hash) => {
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch { return null; }
  };
  let requestedTarget = hashTarget(window.location.hash);

  const updateNavigation = () => {
    scheduled = false;
    // Track the section entering the reading area, not only one whose heading
    // has already reached the very top of the viewport.
    const stickyHeight = window.innerWidth <= 1170 ? (nav?.offsetHeight || 0) : 0;
    const offset = stickyHeight + Math.min(280, window.innerHeight * 0.28);
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) current = section;
    }
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      current = sections.at(-1);
      // A short final section can prevent a requested research entry from
      // reaching the top. Keep its index active until the visitor scrolls.
      const targetBounds = requestedTarget?.getBoundingClientRect();
      const targetSection = requestedTarget?.closest('.page-section');
      if (targetBounds && targetBounds.top >= stickyHeight - 1 && targetBounds.top < window.innerHeight && sections.includes(targetSection)) {
        current = targetSection;
      }
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
  window.addEventListener('hashchange', () => {
    requestedTarget = hashTarget(window.location.hash);
    scheduleNavigation();
  });
  window.addEventListener('pageshow', scheduleNavigation);
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      requestedTarget = hashTarget(link.hash);
      scheduleNavigation();
    });
  });
  const clearRequestedTarget = () => {
    requestedTarget = null;
    scheduleNavigation();
  };
  window.addEventListener('wheel', clearRequestedTarget, { passive: true });
  window.addEventListener('pointerdown', clearRequestedTarget, { passive: true });
  window.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) clearRequestedTarget();
  });
  document.querySelectorAll('details').forEach((details) => details.addEventListener('toggle', scheduleNavigation));
  document.fonts?.ready.then(scheduleNavigation);
  updateNavigation();

  // All entries live in HTML; only the three selected works show by default
  // when JavaScript is available. Publications and projects use one filter.
  const researchToggle = document.querySelector('#research-toggle');
  const researchHeading = document.querySelector('#research-title');
  const researchStatus = document.querySelector('#research-status');
  const researchEntries = [...document.querySelectorAll('#research-list .paper-row')];

  if (researchToggle && researchHeading && researchEntries.length) {
    let showAllResearch = false;
    const renderResearch = (announce = false) => {
      for (const entry of researchEntries) {
        entry.hidden = !showAllResearch && entry.dataset.highlight !== 'true';
      }
      researchHeading.textContent = showAllResearch ? 'All Research' : 'Highlighted Research';
      researchToggle.textContent = showAllResearch ? 'Highlights only' : 'All Research';
      researchToggle.setAttribute('aria-expanded', String(showAllResearch));
      researchToggle.setAttribute('aria-label', showAllResearch ? 'Show highlighted research only' : 'Show all research and projects');
      if (announce && researchStatus) {
        const count = researchEntries.filter((entry) => !entry.hidden).length;
        researchStatus.textContent = `Showing ${count} ${showAllResearch ? 'research entries' : 'highlighted research entries'}.`;
      }
      scheduleNavigation();
    };

    // Direct links to an unselected work must reveal it, including on reload.
    const revealResearchTarget = () => {
      const target = hashTarget(window.location.hash);
      const entry = target?.closest('#research-list .paper-row');
      if (!entry?.hidden) return;
      showAllResearch = true;
      renderResearch();
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }));
    };

    researchToggle.addEventListener('click', () => {
      showAllResearch = !showAllResearch;
      renderResearch(true);
    });
    window.addEventListener('hashchange', revealResearchTarget);
    window.addEventListener('beforeprint', () => { researchHeading.textContent = 'All Research'; });
    window.addEventListener('afterprint', () => renderResearch());
    renderResearch();
    researchToggle.hidden = false;
    revealResearchTarget();
  }

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
        source.hidden = !link.dataset.source;
        if (link.dataset.source) {
          source.href = link.dataset.source;
          source.textContent = link.dataset.sourceLabel;
        } else {
          source.removeAttribute('href');
          source.textContent = '';
        }
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
