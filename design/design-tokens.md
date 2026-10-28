# Design tokens — Off The Grid 2026

Source: Canva "OTG WEBSITE DESIGN" (`DAHUQiPaidw`, one 1366 × 10125 desktop artboard, no mobile frame),
"OTG PASS PORTRAIT (STORE)" (`DAHRrRbHzYA`, 8 pages, 900 × 1500: front/back for 4 passes).
Exports live in `design/exports/` (2x PNG). Implemented in `src/styles/tokens.css`.

## Section order (from the main design)

| # | Section | id | Notes |
|---|---------|----|-------|
| 1 | Header + Hero | `top` | date line, h1, subtitle, 2 CTAs, stats bar (1 Day · 15+ Speakers · 300+ Delegates · 3000+ Footfall) |
| 2 | Why go Off the Grid? | `why` | brush "Why go", 3D eye, 4 quotes |
| 3 | Theme — business of creativity | `theme` | card with glass stars, brush strokes, 3 paragraphs |
| 4 | Who's speaking at Off The Grid '26? | `speakers` | 3 speaker cards + "More unveiling soon" |
| 5 | Off The Grid '26 Partners | `partners` | "To be announced" + Partner with Off The Grid pitch, 2 CTAs |
| 6 | OTG '26 Schedule | `schedule` | Dec 11 BEES (invite only) · Dec 12 summit (morning/afternoon/evening); access bars per pass |
| 7 | Secure Your Unfair Advantage | `passes` | 4 pass cards + "Four good reasons" panel |
| 8 | Venue | `venue` | card + 3-photo strip (building, map, Biswa Bangla Gate) |
| 9 | FAQs | `faq` | accordion |
| 10 | Footer | `contact` (column) | logo, part of BEES, contact/socials, actions, quick links |

Nav: Experience → `#why`, Speakers, Partners, Venue, Schedule, Participate → `#passes`.

## Colour

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#0b0c0d` | page background (one, continuous) |
| `--card-from` / `--card-to` | `#13091c` / `#0c081e` | card fills |
| `--white` / `--text-soft` / `--text-muted` | `#fff` / `#dfdfdf` / `#ccc` | text |
| `--purple` | `#cb6ce6` | quote highlights, rules |
| `--lilac` | `#bf77d4` | primary CTA outline, schedule dates |
| `--orange` | `#ff751f` | secondary CTA, "Four good reasons", venue minutes |
| `--rust` | `#da5636` | brush lettering, schedule slot names |
| `--sky` | `#38b6ff` | eyebrows (THEME, VENUE) |
| `--green` | `#4bac6f` | hero date divider |
| `--violet` → `--amber` | `#8c52ff` → `#ff7b1b` | brand gradient (card borders) |
| outline gradient | `#a75df4` → `#e97572` | reasons panel/tiles |
| pass accents | `#14d27f` · `#cb6ce6` · `#ff2e4d` · `#ffbd59` | First · Many · Last · Elite |

## Type

Fonts: **Loubag** (display/headings), **Helvetica Now Display** (body), **Poppins** (UI, nav, buttons),
**Feeling Passionate** (brush words).

Canva sizes are inconsistent and were flagged as too big (FAQs, Four reasons, Why go), so they are
normalised to one fluid scale (360 → 1440px viewport):

| Token | Range | Used for | Canva @1366 |
|-------|-------|----------|-------------|
| `--step--2` | 12 → 13px | stat labels, speaker roles (caps) | 11–16 |
| `--step--1` | 14 → 15.2px | nav, buttons, pass bar | 13–16 |
| `--step-0` | 16 → 18px | body, FAQ answers, list items | 16–21 |
| `--step-1` | 18 → 21px | FAQ questions, tile titles, theme body | 21–27 |
| `--step-2` | 20 → 26px | quotes, eyebrows, reasons title | 25–35 |
| `--step-3` | 23 → 32px | speaker names, schedule dates, "OF CREATIVITY" | 26–36 |
| `--step-4` | 27 → 40px | venue name, partner pitch title | 45 |
| `--step-5` | 31 → 52px | h1, section display lines | 56–68 |
| `--step-script` | 56 → 96px | brush words | 100–171 |

Body measure: `--measure: 65ch`.

## Spacing & layout

| Token | Value | Notes |
|-------|-------|-------|
| `--page-gutter` | `clamp(16px, 5vw, 80px)` | the only horizontal page margin |
| `--page-max` | `1200px` | content column (Canva content spans ~1187px at x 89.6) |
| `--section-gap` | `clamp(64px, 3.2rem + 5vw, 120px)` | between sections (Canva ~150–200px, reduced) |
| `--stack` | `clamp(24px, 1rem + 2vw, 48px)` | heading → content inside a section |
| `--radius-lg` / `--radius-md` | `clamp(24px…48px)` / `clamp(18px…26px)` | big cards / small cards |
| `--logo-h` | `clamp(36px, 1.6rem + 2.4vw, 68px)` | header logo (Canva 95px) |
| `--header-h` | `logo + 2 × clamp(12px…24px)` | fixed header; scroll offset |
| `--hero-pad-top` | `header-h + clamp(24px, 1rem + 3vw, 64px)` | hero content starts here |
| `--hero-min-h` | `min(80svh, 760px)` | Canva hero 926px |
