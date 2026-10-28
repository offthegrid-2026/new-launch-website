# Off The Grid — Design Summit 2026

Vite + React (JavaScript) build of the Canva file **"OTG Website Design"**.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
```

## Structure

```
src/
  content/                 all copy — site.js (sections), faqs.js, speakers.js, passes.js
  config/links.js          REGISTER_URL, socials and every other link destination
  assets/images/           images + index.js registry
  styles/                  tokens.css (colours, type scale, layout tokens), fonts.css, global.css
  hooks/useSmoothScroll.js Lenis smooth scrolling, offset for the fixed header
  components/              shared building blocks (Container, SectionTitle, PillButton, …)
  sections/                one folder per section, each with its own CSS module
design/                    Canva exports, FAQs.pdf, design-tokens.md
```

Layout is mobile-first flow layout. Every section puts its content in `<Container>`
(`--page-gutter`, `--page-max`); `<main class="page">` spaces sections with `--section-gap`,
so sections never set their own outer padding. Type sizes come from the `--step-*` scale.
See `design/design-tokens.md`.

## Editing content

- **FAQs:** append `{ q, a }` to `src/content/faqs.js` (format documented at the top of the file).
- **Speakers:** add a 682×727 WebP to `src/assets/images/speakers/<id>.webp` and an entry in `src/content/speakers.js`.
- **Links:** change destinations in `src/config/links.js` only.

## Scripts

```bash
npm run design-assets   # re-crop images from design/exports (after re-exporting from Canva)
npm run verify          # with `npm run dev` running: overflow/edges/eye/flip/FAQ checks at 360–1440px
```

## Fonts

Add the licensed files to `public/fonts/` with these names (woff2 preferred):

| Family                | File(s)                                              | Used for                         |
|-----------------------|------------------------------------------------------|----------------------------------|
| Loubag                | `Loubag-Regular.woff2`, `Loubag-Bold.woff2`          | headings, wordmark, stats        |
| Helvetica Now Display | `HelveticaNowDisplay-Regular.woff2`                  | body copy, quotes, date line     |
| Poppins               | loaded from Google Fonts                             | nav, buttons, eyebrows, footer   |

The orange brush lettering ("Why go", "business", "FAQs") ships as transparent PNGs.

## Section images from Canva layers

Export each layer of a section from Canva as a full-page PNG with a transparent
background, named `Layer<N> (description).png` (0 = bottom), into a folder such as
`src/assets/images/section2/`, then run:

```bash
npm run layers -- section2 why     # sections: hero why theme passes venue faq speakers footer
```

This writes trimmed `layer<N>.webp` files plus `layers.json` (positions in artboard px)
to `src/assets/images/<section>/`. The source PNGs can be deleted afterwards.

Glows and gradient boxes are redrawn in code rather than shipped as images:
their `layers.json` entries carry a `kind` (`glow` = fitted radial gradients,
`box` = rounded rect with gradient fill/stroke) and render through
`components/LayerStack/CodedLayer.jsx`. Re-running the script keeps these
entries. The hero's stage gradient (hero layer 1) stays an image — it is
three stacked Canva images that no simple gradient reproduces at 99%.

## Cropped images

Speaker photos, venue photos, the BEES lockup, the schedule sphere and the pass faces are cropped
from the Canva exports by `scripts/export-design-assets.mjs`. Replace with originals (same name)
when available.
