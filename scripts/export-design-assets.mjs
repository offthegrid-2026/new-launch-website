// Crops the site's raster assets out of the Canva exports in /design/exports.
// Run after re-exporting: `npm run design-assets`
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const EXPORTS = 'design/exports'
const OUT = 'src/assets/images'
const MAIN = `${EXPORTS}/main-desktop@2x.png`
const big = { limitInputPixels: false }

const crop = (src, box) => sharp(src, big).extract(box)

// near-black design background → transparent, so the art sits on the page bg
async function keyOutDark(img, floor, range) {
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 4) {
    const m = Math.max(data[i], data[i + 1], data[i + 2])
    data[i + 3] = Math.round(255 * Math.min(1, Math.max(0, (m - floor) / range)))
  }
  return sharp(data, { raw: info })
}

async function main() {
  for (const d of ['speakers', 'venue', 'schedule', 'passes']) mkdirSync(`${OUT}/${d}`, { recursive: true })

  // speaker photos (the top of each speaker card)
  const speakers = { 'paul-sandip': 266, 'indroneel-mukherjee': 1025, 'charbak-dipta': 1783 }
  for (const [name, left] of Object.entries(speakers)) {
    await crop(MAIN, { left, top: 5961, width: 682, height: 727 }).webp({ quality: 78 }).toFile(`${OUT}/speakers/${name}.webp`)
  }

  // venue photo strip
  const venue = { building: 186, map: 1000, gate: 1814 }
  for (const [name, left] of Object.entries(venue)) {
    await crop(MAIN, { left, top: 16420, width: 728, height: 878 }).resize(640).webp({ quality: 76 }).toFile(`${OUT}/venue/${name}.webp`)
  }

  // schedule: BEES lockup, and the 3D sphere from its own transparent export
  await (await keyOutDark(crop(MAIN, { left: 330, top: 10118, width: 440, height: 188 }), 40, 90))
    .webp({ quality: 85 }).toFile(`${OUT}/schedule/bees.webp`)
  const sphere = await sharp(`${EXPORTS}/schedule-graphic.png`).trim({ threshold: 1 }).toBuffer()
  await sharp(sphere).resize(640).webp({ quality: 80 }).toFile(`${OUT}/schedule/sphere.webp`)

  // pass faces, cropped above the bottom bar (the bar is HTML)
  const faces = ['first-front', 'first-back', 'many-front', 'many-back', 'last-front', 'last-back', 'elite-front', 'elite-back']
  const files = ['pass-1-first-front', 'pass-2-first-back', 'pass-3-many-front', 'pass-4-many-back', 'pass-5-last-front', 'pass-6-last-back', 'pass-7-elite-front', 'pass-8-elite-back']
  for (let i = 0; i < faces.length; i++) {
    await crop(`${EXPORTS}/${files[i]}.png`, { left: 0, top: 0, width: 1800, height: 2668 }).resize(720).webp({ quality: 80 }).toFile(`${OUT}/passes/${faces[i]}.webp`)
  }
}

main()
