import { motion } from 'framer-motion'
import { reasons } from '../../data/content'
import BorderBeam from '../../components/BorderBeam/BorderBeam'
import RichText from '../../components/RichText/RichText'
import styles from './ReasonsPanel.module.css'

// the hover spotlight follows the pointer inside the tile
function trackPointer(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function ReasonsPanel() {
  return (
    <motion.div
      className={`gradient-outline ${styles.panel}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <BorderBeam duration={9} />
      <h2 className={styles.title}>
        <RichText segments={reasons.title} hlClassName={styles.accent} />
      </h2>

      <ol className={styles.list}>
        {reasons.items.map((r, i) => (
          <motion.li
            key={r.n}
            className={styles.tile}
            data-i={i}
            onPointerMove={trackPointer}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.num}>{r.n}</span>
            <h3 className={styles.tileTitle}>{r.title}</h3>
            <p className={styles.body}>{r.body}</p>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  )
}
