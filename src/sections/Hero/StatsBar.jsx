import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import BorderBeam from '../../components/BorderBeam/BorderBeam'
import styles from './StatsBar.module.css'

function CountUp({ to, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, {
      duration: to > 100 ? 2.2 : 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, delay, reduce])

  return <span ref={ref}>{val}</span>
}

export default function StatsBar({ stats }) {
  return (
    <motion.dl
      className={`gradient-outline ${styles.bar}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <BorderBeam duration={8} />
      {stats.map((s, i) => (
        <div key={s.label} className={styles.stat}>
          <dt className={styles.label}>{s.label}</dt>
          <dd className={styles.value}>
            <span aria-hidden="true">
              <CountUp to={s.value} delay={1.3 + i * 0.12} />
              {s.suffix}
            </span>
            <span className="visually-hidden">
              {s.value}
              {s.suffix}
            </span>
          </dd>
        </div>
      ))}
    </motion.dl>
  )
}
