import styles from './PillButton.module.css'

/** Outlined pill CTA from the design. `width` is in artboard px. */
export default function PillButton({ href, color, width, children, className = '' }) {
  return (
    <a
      href={href}
      className={`${styles.pill} ${className}`}
      style={{ '--c': color, '--w': width }}
    >
      <span className={styles.label}>{children}</span>
    </a>
  )
}
