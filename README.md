# MATIN — Portfolio

Scroll-driven, bilingual (fa / en) portfolio. Next.js 15 (App Router, SSG) · TypeScript · GSAP ScrollTrigger · Lenis.

```bash
npm install
npm run dev      # http://localhost:3000  →  redirects to /fa or /en
npm run build && npm run start
```

## Page architecture

| # | Section | What it does |
|---|---------|--------------|
| — | Loader | `MATIN / INITIALIZING SYSTEM`, first visit per session only, waits for fonts (≈1.1 s) |
| 00 | Hero | Sticky stage: name recedes, role cycles (developer → system builder → product engineer), statement resolves |
| 01 | Process | Signature scene. 9 steps; a system is built in CSS-3D layers (wireframe → architecture → database → API → UI → automation → deploy) and collapses into the live product |
| 02 | Work | Project register + one scene per project (wordmark reveal, interface opens, fragments parallax, scene recedes) + floating HUD |
| 03 | Capabilities | 8 capabilities; hover/scroll drives a side panel (description, stack, related projects, reacting grid) |
| 04 | About | Statement read at scroll pace + concise facts |
| 05 | Contact | Intent picker → one clear action (mailto with subject / Telegram) |

## Folder structure

```
app/[lang]/        layout (html lang/dir, fonts, metadata) + page (section composition)
middleware.ts      / → /fa or /en (cookie → Accept-Language → fa)
content/           ALL copy and data — the only place you edit content
  projects.ts      project registry (data-driven Work section)
  capabilities.ts  process.ts  dictionary.ts (UI strings)  site.ts (contact, portrait)
components/
  providers/       SiteProvider: locale, dictionary, Lenis ⇄ GSAP ticker, scroll lock
  chrome/          Loader, Nav (+ progress, mobile sheet), Cursor, Footer
  sections/        hero · process · work · capabilities · about · contact
  ui/              SectionHead, SplitWords, Magnetic, LocalTime
hooks/             useReveal, useMediaQuery, useIsoLayoutEffect
lib/               motion.ts (GSAP registration + motion tokens + media queries), i18n.ts
app/globals.css    design tokens (color, spacing, type, motion, z) + base
```

## Adding a project

1. Append an object to `content/projects.ts` (title/category/summary/problem/solution/highlights in fa + en, `stack`, `capabilities`, `order`).
2. Optional media: put files in `public/work/<slug>/` and add
   `media: [{ src: "/work/<slug>/dashboard.webp", alt: { fa, en }, width, height }]`
   or `video: { src, poster }`. Without media, an interface schematic of the chosen `schematic` kind is drawn.
3. Links: `links: { live, github, caseStudy }` — empty ones are hidden.
4. `result` is shown only when filled — keep it for real, verifiable outcomes.

The scene, HUD, project index and capability cross-links all pick the new project up automatically.

## Motion rules

- Every scroll scene is built inside `gsap.matchMedia()` with conditions from `lib/motion.ts` — reduced-motion users get a static, fully readable layout (tall scroll sections collapse via `html.motion`, set before first paint).
- One scroll system: Lenis (wheel only; touch keeps native scroll) driven by GSAP's ticker; ScrollTrigger listens to Lenis.
- Sticky (CSS) stages instead of pin-spacers; timelines are scrubbed, never autoplayed.
- Entrance reveals: add `data-reveal` (fade/rise) or `data-reveal-lines` with `<SplitWords>` (word masks) inside any section using `useReveal`.

## TODO (content)

- `content/site.ts` → `contact.email`, `telegram`, `linkedin`, `github` (the contact CTA appears once set).
- Real screenshots per project in `public/work/<slug>/`.
- Optional portrait in `site.portrait`.
- `NEXT_PUBLIC_SITE_URL` for canonical/OG URLs in production.
