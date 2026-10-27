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
  data/content.js          all copy (nav, hero, quotes, reasons, FAQs, speakers, footer)
  assets/images/           images + index.js registry
  styles/                  tokens.css (colours, fonts, --u scale), fonts.css, global.css
  hooks/useSmoothScroll.js Lenis smooth scrolling
  components/              shared building blocks
    Reveal/  BrushText/  LayerStack/  Glow/  GridBackdrop/  PillButton/  BorderBeam/  RichText/
  sections/                one folder per section, each with its own CSS module
    Navbar/ Hero/ WhyGo/ Theme/ Passes/ Venue/ Faq/ Speakers/ Footer/
```

Desktop layout reproduces the 1366px Canva artboard: every size is written as
`calc(<canva px> * var(--u))`, so values in the CSS map 1:1 to the design and the
page scales fluidly. Below 900px each section reflows into a mobile layout.

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

## Remaining cropped images

These were cut from the Canva export and can be replaced with originals (same name)
in `src/assets/images/`:

- `logo.webp` — transparent PNG/WebP originals look best
- `pass-*.webp`, `speaker-1.webp`

To add a speaker, drop a photo in, register it in `speakerImages` in
`src/assets/images/index.js`, then set `photo`, `name`, `role` in `src/data/content.js`.
