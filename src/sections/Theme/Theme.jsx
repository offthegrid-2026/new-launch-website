import { motion } from 'framer-motion'
import { theme } from '../../content/site'
import strokes from '../../assets/images/theme/layer7.webp'
import starRed from '../../assets/images/theme/layer5.webp'
import starBlue from '../../assets/images/theme/layer6.webp'
import layers from '../../assets/images/theme/layers.json'
import BorderBeam from '../../components/BorderBeam/BorderBeam'
import BrushText from '../../components/BrushText/BrushText'
import Container from '../../components/Container/Container'
import Glow from '../../components/Glow/Glow'
import Reveal from '../../components/Reveal/Reveal'
import styles from './Theme.module.css'

const ease = [0.22, 1, 0.36, 1]
const inView = { once: true, amount: 0.3 }

// Canva group holding the brush strokes and the "business" text box (artboard px);
// it scales as one unit with the card width
const GROUP = { left: 89.59, top: 186.22, width: 1147.52, height: 282.94 }
const STROKES = layers.find((l) => l.index === 7)
const SCRIPT_BOX = { left: 320.28 - GROUP.left, top: 225.02 - GROUP.top, width: 774.2, height: 205.33, rotate: -5.83, size: 171.31 }

export default function Theme() {
  return (
    <section id="theme" aria-labelledby="theme-title">
      <Glow x="0%" y="0%" color="120, 80, 255" opacity={0.18} duration={17} />
      <Glow x="100%" y="100%" color="255, 160, 110" opacity={0.12} duration={20} delay={3} />
      <Container>
        <Reveal from="zoom" amount={0.15} duration={1.1} className={styles.card}>
          <BorderBeam duration={10} />

          <div className={styles.stars} aria-hidden="true">
            <motion.img
              src={starRed}
              alt=""
              className={`${styles.star} ${styles.starRed}`}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={inView}
              transition={{ duration: 1.2, delay: 0.2, ease }}
            />
            <motion.img
              src={starBlue}
              alt=""
              className={`${styles.star} ${styles.starBlue}`}
              initial={{ opacity: 0, rotate: 30, scale: 0.6 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={inView}
              transition={{ duration: 1.2, delay: 0.35, ease }}
            />
          </div>

          <h2 id="theme-title" className={styles.heading}>
            <Reveal as="span" className={styles.eyebrow} delay={0.2}>
              {theme.eyebrow}
            </Reveal>
            <span className="visually-hidden">: </span>

            {/* observed here: a fully clipped element never counts as in view */}
            <motion.span className={styles.scriptWrap} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
              <span className={styles.sway}>
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
                <BrushText as="span" box={SCRIPT_BOX} className={styles.word} duration={1.3} delay={0.55}>
                  {theme.script}
                </BrushText>
              </span>
            </motion.span>

            <Reveal as="span" className={styles.subtitle} delay={0.6}>
              <span className={styles.rule} aria-hidden="true" />
              <span className={styles.subtitleText}>{theme.subtitle}</span>
              <span className={styles.rule} aria-hidden="true" />
            </Reveal>
          </h2>

          <div className={styles.body}>
            {theme.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={0.2 + i * 0.15}>
                {p}
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
