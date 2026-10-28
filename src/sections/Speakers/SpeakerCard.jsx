import { motion } from 'framer-motion'
import styles from './SpeakerCard.module.css'

export default function SpeakerCard({ speaker, src, delay }) {
  return (
    <motion.li
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.frame}>
        <img src={src} alt={speaker.alt} width="682" height="727" loading="lazy" decoding="async" className={styles.photo} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>
          {speaker.name.map((part, i) => (
            <span key={i}>{part} </span>
          ))}
        </h3>
        <ul className={styles.roles}>
          {speaker.roles.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <span className={styles.arrow} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </motion.li>
  )
}
