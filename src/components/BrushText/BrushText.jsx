import { motion } from 'framer-motion'
import styles from './BrushText.module.css'

/**
 * Feeling Passionate lettering, placed like a Canva text box:
 * `box` = { left, top, width, height, rotate, size } in artboard px.
 * Paints in left → right when scrolled into view, then sways on a loop.
 * The wrapper is what's observed — a fully clipped element never
 * intersects the viewport, so the clip lives on the inner text.
 */
export default function BrushText({ as = 'p', children, box, className = '', duration = 1.4, delay = 0 }) {
  const Tag = motion[as]
  return (
    <motion.span
      className={`${styles.box} ${className}`}
      style={{
        '--l': box.left,
        '--t': box.top,
        '--w': box.width,
        '--h': box.height,
        '--r': `${box.rotate}deg`,
        '--fs': box.size,
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <Tag
        className={styles.text}
        variants={{
          hidden: { clipPath: 'inset(-20% 105% -20% -5%)' },
          show: { clipPath: 'inset(-20% -5% -20% -5%)' },
        }}
        transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </Tag>
    </motion.span>
  )
}
