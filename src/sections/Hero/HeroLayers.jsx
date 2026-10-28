import LayerStack from '../../components/LayerStack/LayerStack'
import styles from './HeroLayers.module.css'

const ease = [0.22, 1, 0.36, 1]

// Canva layers: 0 crowd + stage · 1 gradient · 2 3D ring · 3 ring shadow · 4 green glow
const behaviour = {
  0: {
    className: styles.stage,
    intro: { initial: { opacity: 0, scale: 1.08 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 2, ease } },
  },
  2: {
    className: styles.ring,
    parallax: 120,
    intro: {
      initial: { opacity: 0, scale: 0.82, rotate: -14 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: { duration: 1.8, delay: 0.25, ease },
    },
  },
  3: { className: styles.shadow, parallax: 90 },
  4: { className: styles.glow },
}

export default function HeroLayers() {
  return <LayerStack section="hero" height={926} behaviour={behaviour} className={styles.backdrop} />
}
