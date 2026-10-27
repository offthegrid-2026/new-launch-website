import styles from './Glow.module.css'

/**
 * Soft radial light, positioned in artboard px. Loops a slow drift + breathe.
 * Mirrors Canva's "Orange Glow Light" / "Circle Gradient Fade" elements.
 */
export default function Glow({
  x,
  y,
  size,
  color = '255, 196, 120',
  opacity = 0.14,
  duration = 14,
  delay = 0,
  still = false,
}) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.glow} ${still ? '' : styles.loop}`}
      style={{
        '--x': x,
        '--y': y,
        '--s': size,
        '--c': color,
        '--o': opacity,
        '--d': `${duration}s`,
        '--delay': `${delay}s`,
      }}
    />
  )
}
