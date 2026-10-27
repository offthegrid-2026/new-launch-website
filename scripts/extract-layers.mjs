/**
 * Turns full-page Canva layer exports into per-section web assets.
 *
 *   npm run layers -- <source folder> <section>
 *   npm run layers -- section1 hero
 *
 * Source PNGs live in src/assets/images/<source folder>/ and are named
 * "Layer<N> (description).png" — N is the stacking order (0 = bottom).
 * Each export is the whole 1366px-wide page; the script crops it to the
 * section's band, trims transparent edges, and writes:
 *
 *   src/assets/images/<section>/layer<N>.webp
 *   src/assets/images/<section>/layers.json   (artboard-px geometry)
 *
 * Layers already redrawn in code (entries with a `kind`, e.g. fitted
 * glows) are kept as they are and their PNGs are skipped.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

// Section bands in the full-page export (px). The export starts with a
// 56px strip above the hero, which the site drops.
const SECTIONS = {
  hero: [56, 982],
  why: [982, 1561],
  theme: [1561, 2586],
  passes: [2586, 4021],
  venue: [4021, 4638],
  faq: [4638, 5478],
  speakers: [5478, 6596],
  footer: [6596, 6971],
}

const [srcName, section] = process.argv.slice(2)
if (!srcName || !SECTIONS[section]) {
  console.error(`usage: npm run layers -- <source folder> <${Object.keys(SECTIONS).join('|')}>`)
  process.exit(1)
}

const root = path.resolve('src/assets/images')
const srcDir = path.join(root, srcName)
const outDir = path.join(root, section)
fs.mkdirSync(outDir, { recursive: true })

const [top, bottom] = SECTIONS[section]
const height = bottom - top
const files = fs
  .readdirSync(srcDir)
  .filter((f) => /^layer\s*\d+/i.test(f) && f.endsWith('.png'))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))

const manifestPath = path.join(outDir, 'layers.json')
const coded = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')).filter((l) => l.kind)
  : []

const manifest = [...coded]
for (const file of files) {
  const index = parseInt(file.match(/\d+/)[0])
  if (coded.some((l) => l.index === index)) {
    console.log(`${file} → kept coded layer ${index}`)
    continue
  }
  const desc = (file.match(/\(([^)]*)\)/) || [])[1] || ''
  const meta = await sharp(path.join(srcDir, file)).metadata()
  const scale = meta.width / 1366

  const band = sharp(path.join(srcDir, file)).extract({
    left: 0,
    top: Math.round(top * scale),
    width: meta.width,
    height: Math.round(height * scale),
  })
  const { data, info } = await band.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  // bounding box of visible pixels
  let x0 = info.width, y0 = info.height, x1 = -1, y1 = -1
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 2) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
    }
  }
  if (x1 < 0) {
    console.warn(`skip ${file}: empty inside ${section}`)
    continue
  }

  const box = { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }
  const out = `layer${index}.webp`
  await sharp(data, { raw: info })
    .extract(box)
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(path.join(outDir, out))

  manifest.push({
    index,
    desc,
    file: out,
    left: +(box.left / scale).toFixed(2),
    top: +(box.top / scale).toFixed(2),
    width: +(box.width / scale).toFixed(2),
    height: +(box.height / scale).toFixed(2),
  })
  const kb = (fs.statSync(path.join(outDir, out)).size / 1024).toFixed(0)
  console.log(`${file} → ${section}/${out}  @(${manifest.at(-1).left}, ${manifest.at(-1).top}) ${manifest.at(-1).width}×${manifest.at(-1).height}  ${kb}KB`)
}

manifest.sort((a, b) => a.index - b.index)
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`wrote ${section}/layers.json`)
