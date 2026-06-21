# Required User-Supplied Assets

The following files must be added to this `public/` directory before deploying.
They are referenced in source code but cannot be generated automatically.

## og-image.jpg

- **Purpose:** Open Graph / social-preview image (referenced in `src/components/seo/BaseHead.astro`)
- **Required dimensions:** 1200 × 630 px
- **Format:** JPEG
- **Action required:** Create or export a branded social preview card and save it here as `og-image.jpg`.

## cv.pdf

- **Purpose:** Downloadable CV linked from the Hero section CTA button (referenced in `src/config/site.ts` as `cv: '/cv.pdf'`)
- **Format:** PDF
- **Action required:** Export your latest CV/résumé as a PDF and save it here as `cv.pdf`.

---

These files are intentionally excluded from the repository.
Add them locally or via your CI/CD secrets/asset pipeline before running `bun run build`.
