import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import BorderBeam from '../../components/BorderBeam/BorderBeam'
import styles from './StatsBar.module.css'

function CountUp({ to, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: to > 100 ? 2.2 : 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, delay])

  return <span ref={ref}>{val}</span>
}

export default function StatsBar({ stats }) {
  return (
    <motion.div
      className={`gradient-outline ${styles.bar}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <BorderBeam duration={8} />
      {stats.map((s, i) => (
        <div key={s.label} className={styles.stat} data-i={i}>
          <span className={styles.value}>
            <CountUp to={s.value} delay={1.3 + i * 0.12} />
            {s.suffix}
          </span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </motion.div>
  )
}
