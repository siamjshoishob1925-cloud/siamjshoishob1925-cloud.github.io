# Terminal Portfolio — GitHub Pages Template

A single-page developer portfolio styled like a terminal / "Matrix" console, with a
dark green-on-black mode and a light white-and-green mode. No build tools, no
frameworks — just HTML, CSS and vanilla JavaScript, so it runs directly on
GitHub Pages.

**Live sections:** Overview (home) · Education · Skills · Projects · Contact

---

## 1. What's inside

```
portfolio/
├── index.html              → all page content (edit text here)
├── css/
│   └── style.css           → theme colors, layout, animations
├── js/
│   └── script.js            → theme toggle, matrix rain, typewriter, scroll reveal
├── assets/
│   ├── images/
│   │   ├── profile-placeholder.svg   → swap for your own photo
│   │   └── favicon.svg               → browser tab icon
│   └── cv/
│       └── Your-Name-CV.pdf          → swap for your real CV/resume
└── README.md
```

Everything is self-contained. There is no build step — just edit the files and
refresh your browser.

---

## 2. Quick preview on your computer

You don't strictly need a server, but a local one avoids browser quirks with
`fetch`/module loading:

- **VS Code**: install the "Live Server" extension, right-click `index.html` →
  "Open with Live Server".
- **Python** (already installed on most systems):
  ```bash
  cd portfolio
  python3 -m http.server 8000
  ```
  Then open `http://localhost:8000` in your browser.
- **Or simply double-click `index.html`** — the site works fine opened
  directly from disk too.

---

## 3. Deploying to GitHub Pages

1. Create a new GitHub repository, e.g. `yourusername.github.io` (for a
   user/root site) or any name like `portfolio` (for a project site).
2. Push the contents of this folder to the repository:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/YOUR-REPO.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   pick branch `main` and folder `/ (root)`, then **Save**.
5. Wait 1–2 minutes. Your site will be live at:
   - `https://yourusername.github.io/` (if the repo is named `yourusername.github.io`), or
   - `https://yourusername.github.io/YOUR-REPO/` (for any other repo name).

No `.nojekyll` file or extra config is needed for this template.

---

## 4. Editing your content

Everything below refers to sections inside `index.html`. Search for the
`id="..."` markers to jump straight to a section.

### 4.1 Site title, brand & favicon
- `<title>` in `<head>` — the browser tab title.
- `.brand` link in the top bar — the logo text (`your-name.dev`).
- `assets/images/favicon.svg` — replace with your own icon (any square SVG or
  swap the `<link rel="icon">` in `<head>` to point at a `.png`/`.ico`).

### 4.2 Home / overview (`id="home"`)
- Replace `assets/images/profile-placeholder.svg` with your own photo. Keep
  the filename **or** update the `src` in the `<img>` tag inside
  `.hero-photo-frame`. Square images (e.g. 480×480 or larger) work best.
- Edit the name, intro paragraph, and the `.tech-row` chips.
- The rotating role text under your name (e.g. "Java & C++ Developer") is
  controlled by the `roles` array near the top of `js/script.js`:
  ```js
  const roles = [
    "Computer Science Student",
    "Java & C++ Developer",
    "Python Enthusiast",
    "Open Source Learner"
  ];
  ```
  Add, remove or reword lines freely.
- **CV download button**: replace `assets/cv/Your-Name-CV.pdf` with your real
  CV, keeping the same filename — or update the `href` on the
  `download-cv` button in `index.html`.

### 4.3 Education (`id="education"`)
Each entry is a `<li class="timeline-item">` inside the `<ol class="timeline">`
list. Copy/paste a block to add more entries, or edit the existing three
(SSC, HSC, B.Sc.):

```html
<li class="timeline-item">
  <span class="timeline-node" aria-hidden="true"></span>
  <div class="timeline-card">
    <div class="timeline-card-head">
      <span class="timeline-degree">Degree / exam name</span>
      <span class="timeline-year">Start – End</span>
    </div>
    <p class="timeline-inst">Institution name</p>
    <p class="timeline-gpa">GPA: <span class="accent">X.XX</span> / Y.YY</p>
  </div>
</li>
```

The vertical line and each node animate into view automatically as you
scroll — no extra work needed when you add entries.

### 4.4 Skills (`id="skills"`)
Each skill is a `.skill-card`. The fill level of the progress bar is set with
an inline CSS variable:

```html
<div class="skill-card" style="--level:88%">
  <div class="skill-top"><span class="skill-icon">C</span></div>
  <p class="skill-name">C</p>
  <div class="skill-bar-track"><div class="skill-bar-fill"></div></div>
  <p class="skill-level-label">proficient</p>
</div>
```

Change `--level` (0–100%), the short `skill-icon` label, the `skill-name`,
and the `skill-level-label` text. Copy the whole block to add a new skill —
the grid re-flows automatically.

### 4.5 Projects (`id="projects"`)
Each project is an `<article class="project-card">`. The template ships with
three: **Java Quiz**, **Car Racing Game**, and **Traffic Light Control
System** — only the Java Quiz card includes a GitHub repo link/button, as
requested; the other two show a "Repository not public yet" note instead.

To add a repo link to any card, replace its `<p class="no-repo-note">...`
line with:

```html
<div class="project-links">
  <a href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener noreferrer">
    <svg viewBox="0 0 24 24" fill="currentColor">...(GitHub icon, copy from Java Quiz card)...</svg>
    view-repo
  </a>
</div>
```

To add an entirely new project card, copy an existing `<article
class="project-card reveal">...</article>` block and edit the title, brief,
`.project-tech` tags, and links.

### 4.6 Contact (`id="contact"`)
Update the three `.contact-card` links:
- `mailto:your.email@example.com`
- `https://github.com/yourusername`
- `https://linkedin.com/in/yourusername`

and the visible text inside each `.contact-value` span.

---

## 5. Customizing the color themes

All colors are CSS custom properties defined at the top of `css/style.css`:

```css
:root {                 /* dark "matrix" theme (default) */
  --bg: #050905;
  --primary: #39ff6a;   /* matrix green accent */
  --text: #d8ffe0;
  ...
}

[data-theme="light"] {  /* light "white & green" theme */
  --bg: #fbfdfb;
  --primary: #0c8a3e;   /* readable green accent */
  --text: #10241a;
  ...
}
```

Change any hex value to retune either theme — every component (buttons,
cards, timeline, nav) reads from these variables, so a single edit updates
the whole site consistently.

The theme toggle button (`#theme-toggle` in the top bar) flips a
`data-theme="light"` attribute on `<html>` and remembers the user's choice in
`localStorage`, so it persists across visits. On a first-ever visit it
follows the visitor's OS-level light/dark preference.

---

## 6. Fonts

Two Google Fonts are loaded via `@import` at the top of `css/style.css`:
- **JetBrains Mono** — headings, nav, buttons, terminal chrome (the
  "code" voice of the page)
- **Inter** — body copy and descriptions (readability)

To use different fonts, change the `@import` URL and the `--font-mono` /
`--font-body` variables in `css/style.css`.

---

## 7. Notes on the effects

- **Matrix rain background** (`#matrix-rain` canvas, driven by
  `js/script.js`): renders behind everything at low opacity so text stays
  readable. It automatically adapts its color to the active theme, pauses
  when the browser tab isn't visible, and is disabled entirely if the
  visitor's OS has "reduce motion" turned on.
- **Timeline & skill-card reveal animations**: powered by
  `IntersectionObserver` — elements fade/slide in once when they scroll into
  view. No library required.
- Everything degrades gracefully without JavaScript: content is fully
  readable, just without the animated effects.

---

## 8. Accessibility & performance checklist

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and one
  `<h1>` per page.
- Visible focus outlines on all interactive elements (keyboard navigable).
- Respects `prefers-reduced-motion`.
- No external JS frameworks — fast first load.
- Replace the placeholder `<img alt="...">` text once you swap in a real
  photo, and keep alt text descriptive.

---

## 9. License

Free to use and modify for your own portfolio.
