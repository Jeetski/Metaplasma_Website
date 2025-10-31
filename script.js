// Minimal enhancements for console/grimoire vibe
(function() {
  const links = document.querySelectorAll('a[href^="#"]');
  for (const a of links) {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('pulse');
        setTimeout(() => el.classList.remove('pulse'), 500);
      }
    });
  }
  // j/k keyboard navigation across .panel sections
  document.addEventListener('keydown', (e) => {
    if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
    const panels = Array.from(document.querySelectorAll('.panel'));
    if (panels.length === 0) return;
    const y = window.scrollY + 1; // avoid exact borders
    let idx = panels.findIndex(p => {
      const r = p.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const bottom = r.bottom + window.scrollY;
      return y >= top && y < bottom;
    });
    if (idx === -1) idx = 0;
    if (e.key === 'j') {
      const next = panels[Math.min(idx + 1, panels.length - 1)];
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (e.key === 'k') {
      const prev = panels[Math.max(idx - 1, 0)];
      prev.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
