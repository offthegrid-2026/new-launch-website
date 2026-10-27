import { motion } from 'framer-motion'
import { theme } from '../../data/content'
import strokes from '../../assets/images/theme/layer7.webp'
import starRed from '../../assets/images/theme/layer5.webp'
import starBlue from '../../assets/images/theme/layer6.webp'
import layers from '../../assets/images/theme/layers.json'
import LayerStack from '../../components/LayerStack/LayerStack'
import stack from '../../components/LayerStack/LayerStack.module.css'
import BorderBeam from '../../components/BorderBeam/BorderBeam'
import BrushText from '../../components/BrushText/BrushText'
import Reveal from '../../components/Reveal/Reveal'
import styles from './Theme.module.css'

const ease = [0.22, 1, 0.36, 1]
const inView = { once: true, amount: 0.3 }

// Canva group holding the brush strokes and the "business" text box
const GROUP = { left: 89.59, top: 186.22, width: 1147.52, height: 282.94 }
const STROKES = layers.find((l) => l.index === 7)
const SCRIPT_BOX = { left: 320.28 - GROUP.left, top: 225.02 - GROUP.top, width: 774.2, height: 205.33, rotate: -5.83, size: 171.31 }

// Canva layers: 0 grid · 1 top-left glow · 2 bottom-right glow · 3 box
// 4 glows on box · 5 red star · 6 blue star · 7 brush strokes (rendered below)
const behaviour = {
  0: { className: stack.breathe },
  1: { className: stack.driftAlt },
  2: { className: stack.drift },
  3: {
    className: styles.desktopOnly,
    intro: { initial: { opacity: 0, scale: 0.96 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 1.1, ease } },
  },
  4: { className: `${styles.desktopOnly} ${styles.boxGlow}` },
  5: {
    className: `${styles.desktopOnly} ${styles.starRed}`,
    intro: { initial: { opacity: 0, scale: 0.7 }, whileInView: { opacity: 1, scale: 1 }, viewport: inView, transition: { duration: 1.2, delay: 0.2, ease } },
  },
  6: {
    className: `${styles.desktopOnly} ${styles.starBlue}`,
    intro: { initial: { opacity: 0, rotate: 30, scale: 0.6 }, whileInView: { opacity: 1, rotate: 0, scale: 1 }, viewport: inView, transition: { duration: 1.2, delay: 0.35, ease } },
  },
  7: { skip: true },
}

export default function Theme() {
  return (
    <section id="theme" className={styles.section}>
      <LayerStack section="theme" height={1025} behaviour={behaviour} />

      <div className={`stage ${styles.stage}`}>
        {/* the box art is a layer on desktop; phones get a CSS card that can grow */}
        <div className={styles.card}>
          <BorderBeam duration={10} />
        </div>

        <motion.img
          src={starRed}
          alt=""
          className={`${styles.starMobile} ${styles.starRedMobile} ${styles.starRed}`}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={{ duration: 1.2, ease }}
        />
        <motion.img
          src={starBlue}
          alt=""
          className={`${styles.starMobile} ${styles.starBlueMobile} ${styles.starBlue}`}
          initial={{ opacity: 0, rotate: 30, scale: 0.6 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={inView}
          transition={{ duration: 1.2, delay: 0.2, ease }}
        />

        <Reveal as="p" className={styles.eyebrow} delay={0.2}>
          {theme.eyebrow}
        </Reveal>

        {/* observed here: a fully clipped element never counts as in view */}
        <motion.div
          className={styles.scriptWrap}
          style={{ '--l': GROUP.left, '--t': GROUP.top, '--w': GROUP.width, '--h': GROUP.height }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className={styles.sway}>
            <motion.img
              src={strokes}
              alt=""
              className={styles.strokes}
              style={{
                '--sl': STROKES.left - GROUP.left,
                '--st': STROKES.top - GROUP.top,
                '--sw': STROKES.width,
                '--sh': STROKES.height,
              }}
              variants={{
                hidden: { clipPath: 'inset(-10% 100% -10% 0%)' },
                show: { clipPath: 'inset(-10% 0% -10% 0%)' },
              }}
              transition={{ duration: 1.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            />
            <BrushText as="h2" box={SCRIPT_BOX} className={styles.word} duration={1.3} delay={0.55}>
              {theme.script}
            </BrushText>
          </div>
        </motion.div>

        <Reveal className={styles.subtitle} delay={0.6}>
          <motion.span
            className={styles.rule}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ originX: 1 }}
          />
          <p className={styles.subtitleText}>{theme.subtitle}</p>
          <motion.span
            className={styles.rule}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ originX: 0 }}
          />
        </Reveal>

        <div className={styles.body}>
          {theme.paragraphs.map((lines, i) => (
            <Reveal as="p" key={i} delay={0.2 + i * 0.15}>
              {lines.map((l, j) => (
                <span key={j} className={styles.line}>
                  {l}
                </span>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
