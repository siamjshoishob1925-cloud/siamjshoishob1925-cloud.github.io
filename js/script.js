(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1. THEME (dark "matrix" <-> light "white & green"), persisted in
        localStorage, respects prefers-color-scheme on first visit.
  --------------------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const THEME_KEY = "portfolio-theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      const label = themeToggleBtn.querySelector(".theme-toggle-label");
      if (label) label.textContent = theme === "light" ? "light_mode" : "matrix_mode";
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      applyTheme(current === "light" ? "dark" : "light");
    });
  }

  /* ---------------------------------------------------------------------
     2. MOBILE NAV TOGGLE
  --------------------------------------------------------------------- */
  const topbar = document.querySelector(".topbar");
  const navToggle = document.getElementById("nav-toggle");
  if (navToggle && topbar) {
    navToggle.addEventListener("click", function () {
      topbar.classList.toggle("nav-open");
    });
    document.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        topbar.classList.remove("nav-open");
      });
    });
  }

  /* ---------------------------------------------------------------------
     3. ACTIVE NAV LINK ON SCROLL
  --------------------------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  function setActiveLink() {
    let currentId = sections[0] ? sections[0].id : "";
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) currentId = section.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------------------------------------------------------------------
     4. SCROLL-REVEAL (timeline items, skill cards, generic .reveal)
  --------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    ".reveal, .timeline-item, .skill-card, .timeline"
  );

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------------------------------------------------------------------
     5. HERO TYPEWRITER — cycles through role strings
  --------------------------------------------------------------------- */
  const typedEl = document.getElementById("typed-role");
  const roles = [
    "Computer Science Student",
    "Java & C++ Developer",
    "Python Enthusiast",
    "Open Source Learner"
  ];

  function typewriter() {
    if (!typedEl) return;
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }
  typewriter();

  /* ---------------------------------------------------------------------
     6. MATRIX DIGITAL RAIN — ambient canvas background
  --------------------------------------------------------------------- */
  const canvas = document.getElementById("matrix-rain");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const glyphs = "01アイウエオカキクケコサシスセソ01001101ABCDEFJAVAPY++#";
    let columns = [];
    let fontSize = 16;
    let animationId = null;
    let lastTime = 0;
    const frameInterval = 55; // ms between draws — keeps it calm, not seizure-inducing

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columnCount = Math.floor(canvas.width / fontSize);
      columns = new Array(columnCount).fill(0).map(function () {
        return Math.floor((Math.random() * canvas.height) / fontSize) * -1;
      });
    }

    function draw(time) {
      animationId = requestAnimationFrame(draw);
      if (time - lastTime < frameInterval) return;
      lastTime = time;

      const isLight = root.getAttribute("data-theme") === "light";
      ctx.fillStyle = isLight ? "rgba(255,255,255,0.18)" : "rgba(5,9,5,0.10)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + "px 'JetBrains Mono', monospace";
      ctx.fillStyle = isLight ? "#0c8a3e" : "#39ff6a";

      for (let i = 0; i < columns.length; i++) {
        const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;
        ctx.fillText(glyph, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        } else {
          columns[i]++;
        }
      }
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(draw);
    }

    // Pause rendering when tab is hidden to save resources.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      } else if (!document.hidden && !animationId && !prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    });
  }

  /* ---------------------------------------------------------------------
     7. FOOTER YEAR
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
