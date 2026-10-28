import styles from './PillButton.module.css'

/** Outlined pill CTA from the design. */
export default function PillButton({ href, color, children, className = '', ...rest }) {
  return (
    <a href={href} className={`${styles.pill} ${className}`} style={{ '--c': color }} {...rest}>
      <span className={styles.label}>{children}</span>
    </a>
  )
}
