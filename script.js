// Minimal enhancements for console/grimoire vibe
(function() {
  // Normalize UI text and encoding issues on load
  document.addEventListener('DOMContentLoaded', () => {
    // Fix page title mojibake (replace odd dash chars with em-dash)
    if (document.title && /[�]/.test(document.title)) {
      document.title = document.title.replace(/[�]+/g, '—');
    }

    // Normalize hamburger menu label across pages
    const toggleBtn = document.querySelector('.nav-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = '&#9776; menu';
    }

    // Standardize footer across pages
    const footer = document.querySelector('footer.site-footer');
    if (footer) {
      footer.innerHTML = [
        '<div class="divider" aria-hidden="true">A·A·A</div>',
        '<p class="credit">Hivemind Studio — David Cody — &copy; 2025</p>',
        '<p>Metaplasma — built from symbols, shaped by relations.</p>'
      ].join('');
    }

    // Home page: normalize Explore link separators to em-dash
    const exploreHeader = Array.from(document.querySelectorAll('section.panel h2'))
      .find(h => h.textContent.trim().toLowerCase() === 'explore');
    if (exploreHeader) {
      const list = exploreHeader.parentElement.querySelector('ul.links');
      if (list) {
        for (const li of list.querySelectorAll('li')) {
          // If there is an anchor, ensure separator after it is an em-dash
          const a = li.querySelector('a');
          if (!a) continue;
          // Collect any text after anchor and replace with standardized separator + original remainder
          const nodes = Array.from(li.childNodes);
          const anchorIndex = nodes.indexOf(a);
          if (anchorIndex !== -1) {
            // Remove all text nodes after the anchor
            for (let i = nodes.length - 1; i > anchorIndex; i--) {
              li.removeChild(nodes[i]);
            }
            // Re-add standardized description if we can infer from anchor href
            const href = a.getAttribute('href') || '';
            let desc = '';
            if (href.includes('engine.html')) desc = ' — Sigils, relations, pulses.';
            else if (href.includes('relations.html')) desc = ' — the preposition alphabet.';
            else if (href.includes('start.html')) desc = ' — install and launch.';
            else if (href.includes('docs.html')) desc = ' — full specs and references.';
            if (desc) li.appendChild(document.createTextNode(desc));
          }
        }
      }
    }
  });
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
  // Mobile nav toggle
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
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
