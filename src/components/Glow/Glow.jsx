import styles from './Glow.module.css'

/**
 * Soft radial light for ambient decoration. Position is any CSS length
 * relative to the parent (it may spill past section edges). Loops a slow drift.
 */
export default function Glow({ x, y, size = 'min(70vw, 840px)', color = '255, 196, 120', opacity = 0.14, duration = 14, delay = 0 }) {
  return (
    <span
      aria-hidden="true"
      className={styles.glow}
      style={{ '--x': x, '--y': y, '--s': size, '--c': color, '--o': opacity, '--d': `${duration}s`, '--delay': `${delay}s` }}
    />
  )
}
