# itsjhonalex.is-a.dev

Bilingual (ES/EN) developer portfolio built with Astro 6 — fully static, zero client-side frameworks, i18n routing, dark/light theme, and automated SEO.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Astro 6.4](https://astro.build) — static output |
| Language | TypeScript (strict) |
| Fonts | Self-hosted via `@fontsource` (Space Grotesk, JetBrains Mono, Instrument Serif) |
| Sitemap | `@astrojs/sitemap` with i18n locale mapping |
| SEO | `astro-seo` + `astro-seo-schema` (JSON-LD) |
| Testing | Playwright |
| Package manager | Bun |

No UI framework — zero React, Vue, or Svelte.

## Project Structure

```
src/
├── config/
│   ├── site.ts        # Site-wide constants (URL, author, OG, CV path)
│   └── ui.ts          # Theme / UI config
├── i18n/
│   ├── ui.ts          # Typed ES/EN translation dictionaries
│   └── utils.ts       # useTranslations(), localizePath() helpers
├── data/
│   ├── projects.ts    # Project list with per-locale copy
│   └── stack.ts       # Tech-stack entries (domain, label key, icon)
├── styles/
│   ├── tokens.css     # Design tokens (color, typography, spacing)
│   └── global.css     # Base resets and global styles
├── scripts/
│   └── enhance.ts     # Progressive-enhancement: theme toggle, modal, marquee
├── components/
│   ├── seo/           # BaseHead (meta, OG, hreflang, JSON-LD)
│   ├── layout/        # Nav, Footer, Background
│   ├── sections/      # Hero, Marquee, About, Stack, Projects, Contact
│   └── ui/            # ProjectCard, ProjectModal, StackCard
├── layouts/
│   └── BaseLayout.astro
└── pages/
    ├── index.astro    # / → ES (default locale, no prefix)
    ├── 404.astro
    └── en/
        └── index.astro  # /en → EN
```

## Scripts

All commands are run from the project root with Bun:

| Command | Action |
|---|---|
| `bun run dev` | Start dev server at `localhost:4321` |
| `bun run build` | Build to `./dist/` (static) |
| `bun run preview` | Preview production build locally |
| `bun run test` | Run Playwright end-to-end tests |

## Deployment

Deployed to **Vercel** via the `vercel.json` config (framework: `astro`).

- Production URL: <https://itsjhonalex.is-a.dev>
- Build command: `bun run build`
- Output directory: `dist`

## Required Assets

Before building or deploying, add the following files to `public/` (see `public/README.md` for details):

| File | Purpose | Spec |
|---|---|---|
| `public/og-image.jpg` | Open Graph / social-preview image | 1200 × 630 px JPEG |
| `public/cv.pdf` | Downloadable CV linked from Hero CTA | PDF, any size |

These files are excluded from the repository and must be supplied manually or via your CI/CD asset pipeline.
