import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import styles from './PassCard.module.css'

/** One delegate pass. Tilts toward the cursor and carries a looping sheen. */
export default function PassCard({ src, name, accent, slot, delay = 0 }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 180, damping: 18 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.a
      ref={ref}
      href="#passes"
      className={styles.card}
      data-slot={slot}
      style={{ '--accent': accent, rotateX: rx, rotateY: ry }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      aria-label={name}
    >
      <span className={styles.float} style={{ animationDelay: `${delay * 3}s` }}>
        <img src={src} alt={name} className={styles.img} loading="lazy" />
        <span className={styles.sheen} style={{ animationDelay: `${delay * 4}s` }} aria-hidden="true" />
      </span>
    </motion.a>
  )
}
