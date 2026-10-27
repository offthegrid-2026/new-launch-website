import { motion } from 'framer-motion'
import styles from './SpeakerCard.module.css'

/** Canva's empty image frame (sky, cloud, hills) — shown until a photo is added. */
function EmptyFrame() {
  return (
    <svg className={styles.empty} viewBox="0 0 347 417" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c6eafd" />
          <stop offset="0.75" stopColor="#f2fbff" />
        </linearGradient>
      </defs>
      <rect width="347" height="417" fill="url(#sky)" />
      <g className={styles.cloud}>
        <path
          d="M118 120a27 27 0 0 1 2-54 46 46 0 0 1 88-6 21 21 0 0 1 23 25 19 19 0 0 1 1 35z"
          fill="#fff"
        />
      </g>
      <path d="M0 284c60-6 120-6 180 2s110 30 167 54v77H0z" fill="#c5e07f" />
      <path d="M0 356c50 2 70-34 140-36s110 18 207 18v79H0z" fill="#8ba300" />
    </svg>
  )
}

export default function SpeakerCard({ speaker, src, slot, delay }) {
  return (
    <motion.article
      className={styles.card}
      data-slot={slot}
      initial={{ opacity: 0, y: 50, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.frame}>
        {src ? <img src={src} alt={speaker.name || 'Speaker'} className={styles.photo} loading="lazy" /> : <EmptyFrame />}
      </div>
      {speaker.showInfo && (
        <div className={styles.info}>
          {speaker.name && <h3 className={styles.name}>{speaker.name}</h3>}
          {speaker.role && <p className={styles.role}>{speaker.role}</p>}
        </div>
      )}
    </motion.article>
  )
}
