import { motion } from 'framer-motion'
import styles from './SectionTitle.module.css'

const ease = [0.22, 1, 0.36, 1]

/**
 * Brush word + display line, read as one heading.
 * `scriptFirst` puts the brush word above ("Why go / Off the Grid?");
 * otherwise it sits below ("Off The Grid '26 / Partners").
 * `fit` = the brush word's width in em; long words shrink to fit narrow screens.
 */
export default function SectionTitle({ as = 'h2', script, display, scriptFirst = true, align = 'center', fit, className = '', id }) {
  const Tag = as
  // observed on the wrapper: a fully clipped element never counts as in view
  const brush = script && (
    <motion.span className={styles.scriptWrap} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
      <motion.span
        className={styles.script}
        variants={{
          hidden: { clipPath: 'inset(-30% 105% -30% -5%)' },
          show: { clipPath: 'inset(-30% -5% -30% -5%)' },
        }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        {script}
      </motion.span>
    </motion.span>
  )
  const line = display && (
    <motion.span
      className={styles.display}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, delay: 0.3, ease }}
    >
      {display}
    </motion.span>
  )

  return (
    <Tag
      id={id}
      className={`${styles.title} ${className}`}
      data-align={align}
      data-order={scriptFirst ? 'script' : 'display'}
      style={fit ? { '--fit': fit } : undefined}
    >
      {scriptFirst ? brush : line}
      {display && script && ' '}
      {scriptFirst ? line : brush}
    </Tag>
  )
}
