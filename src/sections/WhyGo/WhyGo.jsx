import { whyGo } from '../../data/content'
import eye from '../../assets/images/why/layer3.webp'
import BrushText from '../../components/BrushText/BrushText'
import LayerStack from '../../components/LayerStack/LayerStack'
import stack from '../../components/LayerStack/LayerStack.module.css'
import Reveal from '../../components/Reveal/Reveal'
import RichText from '../../components/RichText/RichText'
import styles from './WhyGo.module.css'

// Canva text box for "Why go"
const SCRIPT_BOX = { left: 18.79, top: 76.2, width: 518.01, height: 137.38, rotate: -5.39, size: 114.62 }

// Canva layers: 0 grid · 1 bottom-right glow · 2 top-left glow · 3 3D eye
const behaviour = {
  0: { className: stack.breathe },
  1: { className: stack.drift },
  2: { className: stack.driftAlt },
  3: {
    className: `${stack.float} ${styles.eyeLayer}`,
    intro: {
      initial: { opacity: 0, scale: 0.8, rotate: 8 },
      whileInView: { opacity: 1, scale: 1, rotate: 0 },
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  },
}

export default function WhyGo() {
  // two copies of the quote row make a seamless loop
  const loop = [...whyGo.quotes, ...whyGo.quotes]

  return (
    <section id="why" className={styles.section}>
      <LayerStack section="why" height={579} behaviour={behaviour} />

      <div className={`stage ${styles.stage}`}>
        <div className={styles.heading}>
          <BrushText box={SCRIPT_BOX} className={styles.script}>
            {whyGo.script}
          </BrushText>
          <Reveal as="h2" className={styles.title} delay={0.35}>
            {whyGo.heading}
          </Reveal>
        </div>

        {/* phones: the eye joins the flow instead of sitting on the artboard */}
        <Reveal from="zoom" className={styles.eyeMobile}>
          <img src={eye} alt="" className={stack.float} />
        </Reveal>
      </div>

      <Reveal from="fade" className={styles.marquee} amount={0.2} delay={0.4}>
        <ul className={styles.track}>
          {loop.map((q, i) => (
            <li key={i} className={styles.quote} aria-hidden={i >= whyGo.quotes.length}>
              <RichText segments={q} hlClassName={styles.hl} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
