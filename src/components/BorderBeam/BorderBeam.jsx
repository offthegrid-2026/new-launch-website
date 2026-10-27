import styles from './BorderBeam.module.css'

/**
 * A light that travels around its parent's rounded border forever.
 * Parent must be position:relative and set border-radius.
 */
export default function BorderBeam({ duration = 7, delay = 0, color = '255,255,255', width = 1.5 }) {
  return (
    <span
      aria-hidden="true"
      className={styles.beam}
      style={{ '--d': `${duration}s`, '--delay': `${delay}s`, '--c': color, '--bw': width }}
    />
  )
}
