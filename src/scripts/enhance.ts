/**
 * enhance.ts — single progressive-enhancement module for the portfolio.
 * Imported once by BaseLayout.astro. Runs on DOMContentLoaded (or immediately
 * if the DOM is already ready). All functions are idempotent and side-effect-free
 * when the relevant DOM hook is absent.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProjectData {
  num: string;
  cat: string;
  title: string;
  year: string;
  role: string;
  overview: string;
  stack: string[];
  banner: string;
  live: string;
  repo: string;
}

// ---------------------------------------------------------------------------
// initTheme
// Toggle `data-theme` on <html> between unset (dark) and "light".
// The no-FOUC inline script already applied the saved value on load;
// here we only wire the toggle button + persist on click.
// ---------------------------------------------------------------------------
function initTheme(): void {
  const btn = document.getElementById('pf-theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';

    // For "dark" we remove the attribute (tokens.css default is dark).
    if (next === 'dark') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', 'light');
    }

    try {
      localStorage.setItem('pf-theme', next);
    } catch (_) { /* storage unavailable */ }
  });
}

// ---------------------------------------------------------------------------
// initClock
// Fill [data-clock] with America/Havana time every 20 s.
// Locale string is derived from document.documentElement.lang ('es'|'en').
// ---------------------------------------------------------------------------
function initClock(): void {
  const el = document.querySelector<HTMLElement>('[data-clock]');
  if (!el) return;

  const tick = (): void => {
    try {
      const lang = document.documentElement.lang || 'es';
      el.textContent = new Date().toLocaleTimeString(lang === 'en' ? 'en-US' : 'es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Havana',
      });
    } catch (_) { /* toLocaleTimeString unsupported */ }
  };

  tick();
  setInterval(tick, 20_000);
}

// ---------------------------------------------------------------------------
// initReveal
// Observe [data-reveal] elements. Sets initial hidden state IN JS so that
// without JS the content remains visible. Respects prefers-reduced-motion.
// ---------------------------------------------------------------------------
function initReveal(reducedMotion: boolean): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!els.length) return;

  if (reducedMotion) {
    // Ensure visible in case any prior CSS hid them.
    els.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        const delay = parseInt(target.getAttribute('data-reveal-delay') ?? '0', 10);
        setTimeout(() => {
          target.style.opacity = '1';
          target.style.transform = 'none';
          target.style.filter = 'none';
        }, delay);
        io.unobserve(target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.filter = 'blur(9px)';
    el.style.transition =
      'opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1), filter .9s ease';
    io.observe(el);
  });
}

// ---------------------------------------------------------------------------
// initScrollProgress
// Sets width of #pf-progress as a percentage of the total scroll position.
// ---------------------------------------------------------------------------
function initScrollProgress(): void {
  const bar = document.getElementById('pf-progress');
  if (!bar) return;

  const update = (): void => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    const pct = scrollable > 0 ? (scrollY / scrollable) * 100 : 0;
    bar.style.width = pct + '%';
  };

  addEventListener('scroll', update, { passive: true });
  update();
}

// ---------------------------------------------------------------------------
// initScrollspy
// Observes #trabajo, #stack, #contacto sections and highlights the
// matching [data-nav-link] anchor by data-active attribute.
// ---------------------------------------------------------------------------
function initScrollspy(): void {
  const navLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'),
  );
  if (!navLinks.length) return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = (entry.target as HTMLElement).id;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.dataset.active = isActive ? '1' : '';
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );

  ['trabajo', 'stack', 'contacto'].forEach((id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
}

// ---------------------------------------------------------------------------
// initCursorGlowAndAurora
// #pf-glow follows the pointer with lerp; #pf-aurora [data-depth] blobs
// parallax based on cursor position. Gated: pointer:fine + no reduced-motion.
// ---------------------------------------------------------------------------
function initCursorGlowAndAurora(): void {
  const glow = document.getElementById('pf-glow');
  const aurora = document.getElementById('pf-aurora');
  if (!glow) return;

  let mx = 0, my = 0, gx = 0, gy = 0;

  glow.style.opacity = '1';

  addEventListener('mousemove', (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  const layers = aurora
    ? Array.from(aurora.querySelectorAll<HTMLElement>('[data-depth]'))
    : [];

  const loop = (): void => {
    gx += (mx - gx) * 0.16;
    gy += (my - gy) * 0.16;
    glow.style.transform = `translate(${gx}px,${gy}px)`;

    const cx = mx / innerWidth - 0.5;
    const cy = my / innerHeight - 0.5;
    layers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute('data-depth') ?? '0') * 120;
      layer.style.marginLeft = cx * depth + 'px';
      layer.style.marginTop = cy * depth + 'px';
    });

    requestAnimationFrame(loop);
  };

  loop();
}

// ---------------------------------------------------------------------------
// initMagnetic
// Gives [data-magnetic] elements a subtle pull toward the cursor.
// Gated: pointer:fine + no reduced-motion.
// ---------------------------------------------------------------------------
function initMagnetic(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
  els.forEach((btn) => {
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px,${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
}

// ---------------------------------------------------------------------------
// initTilt
// 3D tilt + glare overlay on [data-tilt] cards.
// Gated: pointer:fine + no reduced-motion.
// ---------------------------------------------------------------------------
function initTilt(): void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
  cards.forEach((card) => {
    const glare = document.createElement('div');
    glare.style.cssText =
      'position:absolute;inset:0;border-radius:20px;pointer-events:none;opacity:0;' +
      'transition:opacity .4s ease;mix-blend-mode:overlay;z-index:4;';
    card.appendChild(glare);

    const img = card.children[0] as HTMLElement | undefined;
    const body = card.children[1] as HTMLElement | undefined;
    if (img) img.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    if (body) body.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';

    card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), border-color .4s';

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-8px)`;
      card.style.borderColor = 'var(--accent)';
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%,rgba(255,255,255,.22),transparent 46%)`;
      if (img) img.style.transform = 'translateZ(46px)';
      if (body) body.style.transform = 'translateZ(24px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0)';
      card.style.borderColor = 'var(--border)';
      glare.style.opacity = '0';
      if (img) img.style.transform = 'translateZ(0)';
      if (body) body.style.transform = 'translateZ(0)';
    });
  });
}

// ---------------------------------------------------------------------------
// initStackHover
// Gentle lift on [data-stack-card] hover.
// Gated: pointer:fine.
// ---------------------------------------------------------------------------
function initStackHover(): void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-stack-card]'));
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.borderColor = 'var(--accent)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'var(--border)';
    });
  });
}

// ---------------------------------------------------------------------------
// initGrain
// Applies SVG film-grain texture as background image to [data-grain].
// ---------------------------------------------------------------------------
function initGrain(): void {
  const el = document.querySelector<HTMLElement>('[data-grain]');
  if (!el) return;
  el.style.backgroundImage =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
}

// ---------------------------------------------------------------------------
// initModal
// Opens a detail modal for [data-tilt][data-project-index] card clicks.
// Reads project data from #pf-projects JSON script tag.
// Adds: focus trap, restore-focus on close, aria-hidden management, Escape key.
// ---------------------------------------------------------------------------
function initModal(): void {
  const modal = document.querySelector<HTMLElement>('[data-modal]');
  if (!modal) return;

  const backdrop = modal.querySelector<HTMLElement>('[data-modal-backdrop]');
  const panel = modal.querySelector<HTMLElement>('[data-modal-panel]');
  const closeBtn = modal.querySelector<HTMLElement>('[data-modal-close]');

  // Parse project data embedded by Projects.astro.
  let projects: ProjectData[] = [];
  try {
    const scriptEl = document.getElementById('pf-projects');
    if (scriptEl?.textContent) {
      projects = JSON.parse(scriptEl.textContent) as ProjectData[];
    }
  } catch (_) { /* malformed JSON — modal simply won't fill */ }

  // Track which element had focus before the modal opened.
  let previousFocus: HTMLElement | null = null;

  // All focusable elements inside the modal panel.
  const getFocusable = (): HTMLElement[] =>
    Array.from(
      modal.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])',
      ),
    );

  // Focus trap: keep Tab / Shift+Tab inside the modal.
  const trapTab = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    const focusable = getFocusable();
    if (!focusable.length) { e.preventDefault(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  const openModal = (index: number): void => {
    const project = projects[index];
    if (!project) return;

    // Fill modal fields.
    const setText = (sel: string, val: string): void => {
      const el = modal.querySelector<HTMLElement>(sel);
      if (el) el.textContent = val;
    };

    setText('[data-m-num]', project.num);
    setText('[data-m-cat]', project.cat);
    setText('[data-m-title]', project.title);
    setText('[data-m-year]', project.year);
    setText('[data-m-role]', project.role);
    setText('[data-m-overview]', project.overview);

    const bannerEl = modal.querySelector<HTMLElement>('[data-m-banner]');
    if (bannerEl) bannerEl.style.background = project.banner;

    const stackEl = modal.querySelector<HTMLElement>('[data-m-stack]');
    if (stackEl) {
      // Build chip elements via DOM APIs — avoids innerHTML XSS risk even
      // though the data is build-time static (stack strings may contain
      // characters like '<' that would be misinterpreted as markup).
      stackEl.replaceChildren(
        ...project.stack.map((tech) => {
          const chip = document.createElement('span');
          chip.textContent = tech;
          chip.style.cssText =
            'padding:7px 13px;border-radius:9px;background:var(--accent-soft);font-size:14px;';
          return chip;
        }),
      );
    }

    const liveEl = modal.querySelector<HTMLAnchorElement>('[data-m-live]');
    if (liveEl) liveEl.href = project.live;

    const repoEl = modal.querySelector<HTMLAnchorElement>('[data-m-repo]');
    if (repoEl) repoEl.href = project.repo;

    // Show modal.
    previousFocus = document.activeElement as HTMLElement | null;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Animate in (double rAF to allow display:flex to paint first).
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (backdrop) backdrop.style.opacity = '1';
        if (panel) {
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0) scale(1)';
        }
        // Move focus into modal.
        closeBtn?.focus();
      });
    });

    document.addEventListener('keydown', handleModalKey);
  };

  const closeModal = (): void => {
    if (modal.style.display === 'none' || modal.getAttribute('aria-hidden') === 'true') return;

    if (backdrop) backdrop.style.opacity = '0';
    if (panel) {
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(26px) scale(.97)';
    }

    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleModalKey);

    setTimeout(() => {
      modal.style.display = 'none';
      // Restore focus to the card that opened the modal.
      previousFocus?.focus();
      previousFocus = null;
    }, 430);
  };

  const handleModalKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') { closeModal(); return; }
    trapTab(e);
  };

  // Set initial aria-hidden state.
  modal.setAttribute('aria-hidden', 'true');

  // Wire close button and backdrop.
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  // Wire project cards.
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>('[data-tilt][data-project-index]'),
  );
  cards.forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const idx = parseInt((card as HTMLElement).getAttribute('data-project-index') ?? '0', 10);
      openModal(idx);
    });
  });
}

// ---------------------------------------------------------------------------
// init — top-level orchestrator
// ---------------------------------------------------------------------------
/**
 * Mobile nav: the hamburger toggles the collapsed link panel. Closes on link
 * click, Escape, and when the viewport grows back to desktop width.
 */
function initMobileNav(): void {
  const nav = document.querySelector<HTMLElement>('.pf-nav');
  const burger = document.getElementById('pf-nav-burger');
  const menu = document.getElementById('pf-nav-menu');
  if (!nav || !burger || !menu) return;

  const setOpen = (open: boolean): void => {
    nav.dataset.open = open ? 'true' : '';
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  burger.addEventListener('click', () => {
    setOpen(burger.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

function init(): void {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointerFine = matchMedia('(pointer:fine)').matches;

  initTheme();
  initClock();
  initReveal(reducedMotion);
  initScrollProgress();
  initScrollspy();
  initGrain();
  initModal();
  initMobileNav();

  if (pointerFine && !reducedMotion) {
    initCursorGlowAndAurora();
    initMagnetic();
    initTilt();
  }

  // Stack hover only needs pointer:fine (animation is simple, no vestibular risk).
  if (pointerFine) {
    initStackHover();
  }
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
