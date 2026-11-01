// Builds the navbar logo from the brand SVG in /design/exports: the SVG wraps a colour PNG
// under a luminance mask, so this flattens the two into one transparent image and erases
// the inside of the eye, which components/OtgLogo redraws as live circles.
// Run after replacing the SVG: `node scripts/export-logo.mjs`
import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const SRC = 'design/exports/otg-logo.svg'
const OUT = 'src/assets/images/logo-eyeless.webp'

// the eye's opening, in the embedded PNGs' 1768×1183 px (keep in step with components/OtgLogo)
const HOLE = { cx: 372.05, cy: 209.72, rx: 245.31, ry: 123.99 }

const [mask, colour] = [...readFileSync(SRC, 'utf8').matchAll(/base64,([^"]+)"/g)].map((m) => Buffer.from(m[1], 'base64'))

const { data: alpha, info } = await sharp(mask).extractChannel(0).raw().toBuffer({ resolveWithObject: true })
const rgb = await sharp(colour).removeAlpha().raw().toBuffer()
const { width: W, height: H } = info

const px = Buffer.alloc(W * H * 4)
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x
    // clear the opening, stopping 2px short of its rim so the ring keeps its anti-aliased edge
    const d = Math.hypot((x - HOLE.cx) / HOLE.rx, (y - HOLE.cy) / HOLE.ry)
    const inside = d < 1 - 2 / HOLE.ry
    px.set([rgb[i * 3], rgb[i * 3 + 1], rgb[i * 3 + 2], inside ? 0 : alpha[i]], i * 4)
  }
}

await sharp(px, { raw: { width: W, height: H, channels: 4 } }).resize(480).webp({ quality: 90, alphaQuality: 100 }).toFile(OUT)
console.log(`wrote ${OUT}`)
