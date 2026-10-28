import { motion } from 'framer-motion'
import { reasons } from '../../content/site'
import BorderBeam from '../../components/BorderBeam/BorderBeam'
import RichText from '../../components/RichText/RichText'
import styles from './ReasonsPanel.module.css'

// the hover spotlight follows the pointer inside the tile
function trackPointer(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function ReasonsPanel({ className = '' }) {
  return (
    <motion.div
      className={`gradient-outline ${styles.panel} ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <BorderBeam duration={9} />
      <h3 className={styles.title}>
        <RichText segments={reasons.title} hlClassName={styles.accent} />
      </h3>

      <ol className={styles.list}>
        {reasons.items.map((r) => (
          <li key={r.n} className={styles.tile} onPointerMove={trackPointer}>
            <span className={styles.num} aria-hidden="true">
              {r.n}
            </span>
            <h4 className={styles.tileTitle}>{r.title}</h4>
            <p className={styles.body}>{r.body}</p>
          </li>
        ))}
      </ol>
    </motion.div>
  )
}
