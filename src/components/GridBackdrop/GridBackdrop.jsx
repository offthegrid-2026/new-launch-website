import styles from './GridBackdrop.module.css'

// Rebuilds Canva's perspective "tunnel grid" (white lines at 2% opacity).
const W = 400
const H = 239
const INNER = { x: 128, y: 76, w: 144, h: 87 }
const RINGS = 9
const SPOKES = 12

function tunnelPaths() {
  const lines = []
  // concentric frames, spaced with perspective easing toward the vanishing box
  for (let i = 0; i <= RINGS; i++) {
    const t = Math.pow(i / RINGS, 1.6)
    const x = INNER.x * t
    const y = INNER.y * t
    const w = W - (W - INNER.w) * t
    const h = H - (H - INNER.h) * t
    lines.push(`M${x} ${y}h${w}v${h}h${-w}Z`)
  }
  // spokes from outer edge to inner box
  for (let i = 0; i <= SPOKES; i++) {
    const f = i / SPOKES
    lines.push(`M${W * f} 0L${INNER.x + INNER.w * f} ${INNER.y}`)
    lines.push(`M${W * f} ${H}L${INNER.x + INNER.w * f} ${INNER.y + INNER.h}`)
  }
  for (let i = 1; i < 8; i++) {
    const f = i / 8
    lines.push(`M0 ${H * f}L${INNER.x} ${INNER.y + INNER.h * f}`)
    lines.push(`M${W} ${H * f}L${INNER.x + INNER.w} ${INNER.y + INNER.h * f}`)
  }
  // back wall grid
  for (let i = 1; i < 6; i++) {
    lines.push(`M${INNER.x + (INNER.w * i) / 6} ${INNER.y}v${INNER.h}`)
    lines.push(`M${INNER.x} ${INNER.y + (INNER.h * i) / 6}h${INNER.w}`)
  }
  return lines.join('')
}

const D = tunnelPaths()

/** Full-width tunnel grid that slowly "breathes" forward on a loop. */
export default function GridBackdrop({ opacity = 0.05, top = 0 }) {
  return (
    <div aria-hidden="true" className={styles.wrap} style={{ '--o': opacity, '--top': top }}>
      <svg className={styles.grid} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <path d={D} />
      </svg>
    </div>
  )
}
