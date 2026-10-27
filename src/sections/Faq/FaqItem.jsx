import { AnimatePresence, motion } from 'framer-motion'
import styles from './FaqItem.module.css'

export default function FaqItem({ item, open, onToggle, index }) {
  const panelId = `faq-panel-${index}`
  return (
    <motion.li
      className={`${styles.item} ${open ? styles.open : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className={styles.head} onClick={onToggle} aria-expanded={open} aria-controls={panelId}>
        <span className={styles.sign} aria-hidden="true">
          <span className={styles.bar} />
          <span className={`${styles.bar} ${styles.vertical}`} />
        </span>
        <span className={styles.q}>{item.q}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className={styles.panel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.answer}>
              {item.a.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
