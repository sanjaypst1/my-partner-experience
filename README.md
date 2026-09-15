# Partner Experience Portfolio — Sanjay Singh Rawat

An interactive, single-page case-study walkthrough built for one purpose: to give a hiring
manager an 8–12 minute guided tour of how I lead Partner Experience programs, and to let them
explore any part of it directly.

**Core story:** Designed once. Proven through a pilot. Improved through feedback. Deployed many times.

**The four pillars:** Daimler shapes the partner journey · UBS scales it across regions ·
NAB Compass governs delivery and benefits · Merck Cornerstone makes it repeatable.

---

## 1. Project purpose

This site is a private or semi-private artefact for a **Pax8 Project Manager, Partner Experience**
conversation. It is designed so a reader finishes it understanding how I think, what problems I
solve, and how I would coordinate Academy, Content, Marketing, Sales, Partner Experience, vendors
and APAC regional stakeholders.

Two things it deliberately does **not** do:

- It does not claim I worked at Pax8, delivered anything for Pax8, or managed MSP partners directly.
  Any forward-looking Pax8 content is wrapped in a component that always prints
  *"Hypothetical application of my experience to the Pax8 partner ecosystem."*
- It does not present an unverified number as a fact. See [§5](#5-how-to-add-verified-metrics).

## 2. Technology stack

| Area | Choice |
| --- | --- |
| Build | Vite 7, TypeScript 5.9 |
| UI | React 19, Tailwind CSS 3.4 |
| Storytelling animation | GSAP 3 + ScrollTrigger |
| 3D hero | Three.js via React Three Fiber + drei (dynamically imported, hero only) |
| UI transitions | Framer Motion (walkthrough bar only) |
| Icons | Lucide React |
| Charts | Recharts (lazy-loaded, below the fold) |
| Testing | Vitest, React Testing Library |
| Quality | ESLint 9 (flat config), Prettier |

No backend, no API keys, no runtime services. Everything needed for the walkthrough is in the
static bundle, so nothing can fail mid-presentation. Google Fonts load non-blocking and every
family has a system-font fallback, so a blocked CDN changes the typeface and nothing else.

React is pinned to the 19.2 line because `@react-three/fiber@9` declares a peer range of
`>=19 <19.3`. Do not bump React past 19.2 until R3F widens that range.

## 3. Local setup

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck, then production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint, zero warnings tolerated |
| `npm run test` | Vitest suite (54 tests) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run typecheck` | TypeScript only |
| `npm run format` | Prettier write |

## 4. Content editing instructions

**All copy lives in `src/data/`. You should never need to open a component to change wording.**

| File | Contains |
| --- | --- |
| `src/data/portfolio.ts` | Site config, your name and role, hero copy, section order and timings, the Partner Experience problem, the four operating-model pillars, all five case studies, diagram labels, the build-once model, closing copy and contact buttons |
| `src/data/pax8Alignment.ts` | Everything Pax8-facing: what you understand about the ecosystem, the hypothetical program, the translation toggle, the twelve scaling challenges, the 90-day plan, interview questions |
| `src/data/metrics.ts` | The four measurement levels, the benefits chain, and the single gate that decides whether a metric may be displayed |

To edit a case study, find it in the `caseStudies` array and change the `situation`, `task`,
`actions`, `challenges`, `resolutions`, `reusableOutputs`, `successMeasures`, `pax8Relevance`,
`confidentialityNote` or `tags` fields. The layout adapts to whatever length you write.

To change how long the walkthrough claims to be, adjust `minutes` on each entry in `sections`.
A test enforces that the total stays between 8 and 12 minutes.

To add a section, add it to `sections` **and** render it in `src/App.tsx` in the same position.
A test enforces that every navigation target has a matching anchor on the page.

## 5. How to add verified metrics

A metric is only ever printed when **both** flags are true:

```ts
verified === true && publicSafe === true && value !== null
```

That check lives in one place, `isRenderableMetric()` in `src/data/metrics.ts`, and one component
renders metrics, `MetricEvidenceCard`. There is no path by which an unverified figure reaches the
screen.

Before:

```ts
{
  id: 'ubs-regions',
  label: 'Countries or regions in scope',
  value: null,
  verified: false,
  publicSafe: true,
  placeholder: '[Number of countries or regions]',
  explanation: 'Markets that received the common program core.',
  level: 'engagement',
  countable: true,
}
```

After you have confirmed the figure from a document:

```ts
{
  id: 'ubs-regions',
  label: 'Countries or regions in scope',
  value: 9,                              // the real, checkable number
  verified: true,
  publicSafe: true,                      // false if it cannot leave the organisation
  source: 'Program closure report, 2019', // required when verified
  explanation: 'Markets that received the common program core.',
  level: 'engagement',
  countable: true,                       // animates a counter
}
```

Rules the test suite enforces:

- `verified: true` requires both a `value` and a `source`.
- Any metric that is not renderable must still carry a `placeholder`.
- `publicSafe: false` is never printed, even when verified, and even in review mode. Use it for
  real figures you can discuss in an interview but must not publish (budgets, for instance).
- `value` must never hold an estimate, a "roughly", or a number you reconstructed from memory.

## 6. How to hide unverified placeholders

`src/data/portfolio.ts`:

```ts
export const siteConfig: SiteConfig = {
  showUnverifiedPlaceholders: true,  // review mode
};
```

| Setting | Behaviour |
| --- | --- |
| `true` (review mode) | Unverified metrics show the category, the explanation, an "Unverified" badge and the editable `[bracketed prompt]`. Each case study shows a "Before sharing · confirm these details" panel, and the contact section shows which links are still placeholders. |
| `false` (production mode) | Every unverified metric, bracketed prompt and pre-share checklist is removed from the DOM entirely — not hidden with CSS. Confirmed metrics, the measurement framework and the full narrative remain. |

Set it to `false` before sharing the URL with anybody outside your own review. Tests in
`src/tests/productionMode.test.tsx` assert that production mode leaves no bracketed prompt behind.

## 7. How to add your résumé and contact details

Edit `contactActions` in `src/data/portfolio.ts` and set `isPlaceholder: false` on each one you
have filled in.

1. **Résumé** — put the PDF at `public/resume/sanjay-singh-rawat-resume.pdf` (that exact path), or
   change `href` to match your filename. The `public/` folder is copied verbatim into `dist/`.
2. **LinkedIn** — replace `https://www.linkedin.com/in/REPLACE-WITH-PROFILE`.
3. **Email** — replace `REPLACE-WITH-EMAIL@example.com`. The subject line is pre-filled.
4. **Book a conversation** — replace with your scheduling link, or delete the entry.

While any entry still has `isPlaceholder: true` **and** review mode is on, the closing section
shows a "Configure before sharing" reminder listing exactly what is outstanding.

Also update the absolute URLs in `index.html` (canonical, Open Graph, Twitter), `public/robots.txt`
and `public/sitemap.xml` once you know the final address, and replace `public/og-image.svg` with a
1200×630 PNG if you want reliable link previews — some platforms will not render an SVG preview.

## 8. How to deploy to GitHub Pages

1. Create a repository and push this project to `main`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` runs `npm ci`, `npm run lint`, `npm run test`,
   `npm run build`, then publishes `dist/` through the official Pages actions.
4. The site appears at `https://USERNAME.github.io/REPOSITORY_NAME/`.

The workflow fails the deploy if lint or tests fail, so a broken build never replaces a working site.

## 9. How to configure the repository base path

Vite needs to know the sub-path the site is served from, or every asset 404s.

```ts
// vite.config.ts
const base = process.env.VITE_BASE_PATH ?? '/';
```

| Hosting | Setting |
| --- | --- |
| Project site, `USERNAME.github.io/REPO/` | Nothing to do — CI sets `VITE_BASE_PATH=/REPO/` from the repository name |
| User or org site, `USERNAME.github.io` | Set `VITE_BASE_PATH: /` in the workflow's build step |
| Custom domain | Set `VITE_BASE_PATH: /` and add a `CNAME` file to `public/` |
| Local dev and preview | Defaults to `/` |

Because the base path is injected at build time, links inside the app are relative (`./favicon.svg`)
and keep working under any of these.

## 10. Confidentiality and public-sharing checklist

Work through this before the URL leaves your hands. Nothing here is optional.

**Content validation**

- [ ] **Program names** — confirm `Compass` and `Cornerstone` can be named publicly, or replace them
      with neutral descriptions in `caseStudies[].programName`.
- [ ] **Employer naming** — confirm each of Daimler Mercedes-Benz, UBS, NAB, Merck and Bank of
      America can be named in a public portfolio.
- [ ] **Client references** — confirm no client is identified, including by implication.
- [ ] **Metrics** — every `verified: true` metric traced to a document, with `source` filled in.
- [ ] **Project dates** — replace `[Insert delivery timeframe]` with confirmed dates, or leave the
      field unverified and let production mode hide it.
- [ ] **Technologies** — replace `[Insert actual technology platform]`, and confirm naming internal
      platforms is permitted.
- [ ] **Geographic scope** — confirm `[Insert number of regions]` and which markets can be named.
- [ ] **Direct versus indirect partner responsibility** — resolve
      `[Confirm whether dealers were directly involved]`. Do not upgrade "coordinated with" into
      "managed".
- [ ] **Confidentiality restrictions** — check any NDA or employment term that still binds you.
- [ ] **Permission to use logos** — no employer logo appears anywhere in this project. Do not add
      one without written permission.

**Before sharing**

- [ ] `showUnverifiedPlaceholders: false`
- [ ] Résumé PDF in place, or the button removed
- [ ] LinkedIn, email and booking links real
- [ ] `index.html`, `robots.txt` and `sitemap.xml` URLs updated
- [ ] `npm run lint && npm run test && npm run build` all green
- [ ] Read the whole page once in production mode, looking for orphaned labels

**Never include** internal screenshots, unauthorised customer names, confidential architecture,
sensitive project data, proprietary processes, or personal contact details you have not chosen to
publish.

## 11. Accessibility notes

Targeting WCAG 2.2 AA.

- Semantic landmarks, one `h1`, and an `h2` per section tied to it with `aria-labelledby`.
- Skip link to `#main` as the first focusable element.
- Everything interactive is a real `button` or `a`, reachable and operable by keyboard. Tab sets
  support arrow keys; the walkthrough supports arrow keys and Escape; the mobile drawer traps
  nothing but closes on Escape and returns focus to its trigger.
- Visible 3px focus ring on every focusable element, with offset.
- **Reduced motion:** `prefers-reduced-motion` disables GSAP reveals, the scroll-driven chains, the
  autoplaying rollout waves and the WebGL hero. Content marked for reveal is never left invisible.
  A manual **Pause animation** control gives the same guarantees to anyone who wants it.
- **No information by colour alone.** Rollout waves print `W1`/`W2`/`W3`, scaling verdicts print
  "Good scaling"/"Bad scaling" with distinct icons, and verification status is always a word.
- Every diagram is a `figure` with a text description that conveys the same information; the
  regional network and the evidence chart also expose a screen-reader data table.
- 44px minimum touch targets, 16px minimum body text, fluid type that scales without clipping.
- Live regions announce walkthrough section changes and interactive panel changes politely.
- Tested: `src/tests/accessibility.test.tsx` asserts landmarks, heading structure, figure
  descriptions, button labels and reduced-motion behaviour.

## 12. Performance recommendations

Targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.

Already done:

- Three.js (~1 MB) is dynamically imported and only loads when WebGL is present, motion is allowed,
  and the device is not small or low-core. Everyone else gets a static SVG with the same meaning.
- Recharts (~390 kB) is lazy-loaded and gated on an IntersectionObserver, with reserved height so
  there is no layout shift.
- GSAP is split into its own chunk; fonts are non-blocking; the backdrop is CSS, not images.
- Animation loops idle when the tab is hidden (`useDocumentVisible`), and R3F geometry created
  outside the React tree is explicitly disposed.

If you add to the site:

- Prefer CSS or SVG over another 3D scene. Three.js is for the hero, nothing else.
- Run `npm run build` and check the chunk table. Only the deliberately-deferred `three` chunk
  should be large.
- Reserve height for anything that loads late.

## 13. Pre-interview walkthrough checklist

Fifteen minutes before the call:

- [ ] `npm run build && npm run preview`, or open the live URL, and hard-refresh once.
- [ ] Confirm you are in the mode you intend: production mode for a hiring manager.
- [ ] Open the console. It should be clean.
- [ ] Press **Start the Partner Experience Walkthrough** and step through with the arrow keys once.
- [ ] Check the section titles and time remaining read sensibly for how you plan to narrate.
- [ ] Open the Daimler section and toggle the Pax8 translation, so you are ready to explain that it
      is illustrative before you are asked.
- [ ] Have an answer ready for "which of these numbers can you share?" — the Metrics section is
      built to make that a good conversation rather than an awkward one.
- [ ] Close other tabs; the hero runs a WebGL scene.
- [ ] Test the screen share at the zoom level you will actually present at.
- [ ] If sharing the link afterwards, confirm the résumé and contact buttons work.

## 14. Troubleshooting

**Blank page after deploying to GitHub Pages, assets 404.** The base path is wrong. Confirm
**Settings → Pages → Source** is **GitHub Actions**, and that `VITE_BASE_PATH` matches the repo
name with leading and trailing slashes (`/my-repo/`). See [§9](#9-how-to-configure-the-repository-base-path).

**`npm install` fails with `ERESOLVE` about React peers.** React was bumped past 19.2, which
`@react-three/fiber@9` does not accept. Pin `react` and `react-dom` back to `~19.2.8`.

**The 3D hero never appears.** By design on small screens, devices with four or fewer cores, when
WebGL is unavailable, and whenever reduced motion is active. Check the OS motion setting and the
in-page **Pause animation** toggle. The static fallback is not a bug.

**Animations do not run at all.** Same causes. `document.documentElement.dataset.motion` reads
`paused` when motion is off.

**Bracketed prompts still appear after setting production mode.** You edited a copy of the config,
or the dev server cached the module. Confirm `showUnverifiedPlaceholders: false` in
`src/data/portfolio.ts` and restart the dev server.

**A metric will not display even though I set `verified: true`.** It also needs `publicSafe: true`,
a non-null `value`, and a `source` (the test suite requires the source). Check
`src/tests/dataIntegrity.test.ts` output.

**Tests fail with `Cannot read properties of undefined (reading 'matches')`.** Something reset the
`matchMedia` stand-in in `src/tests/setup.ts`. Keep those stand-ins as plain functions, not `vi.fn()`
spies, and do not enable `restoreMocks`.

**Chunk size warning during build.** Expected for the `three` chunk, which is never downloaded
unless the WebGL hero is used. Investigate if any other chunk approaches it.

**Print output looks wrong.** Print styles live at the bottom of `src/styles/index.css`. Elements
marked `data-print="hide"` are dropped and collapsed tab panels are forced open, so the printed
version is linear.
