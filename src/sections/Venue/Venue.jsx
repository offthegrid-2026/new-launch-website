import { venue } from '../../data/content'
import glows from '../../assets/images/venue/layer1.webp'
import building from '../../assets/images/venue/layer2.webp'
import LayerStack from '../../components/LayerStack/LayerStack'
import stack from '../../components/LayerStack/LayerStack.module.css'
import BorderBeam from '../../components/BorderBeam/BorderBeam'
import Reveal from '../../components/Reveal/Reveal'
import styles from './Venue.module.css'

// Canva layers: 0 grid · 1 group of glows behind box · 2 venue image inside box
const behaviour = {
  0: { className: stack.breathe },
  1: { className: stack.drift },
  2: { skip: true },
}

export default function Venue() {
  return (
    <section id="venue" className={styles.section}>
      <LayerStack section="venue" height={617} behaviour={behaviour} />

      <div className={`stage ${styles.stage}`}>
        <Reveal from="zoom" className={styles.card} amount={0.25} duration={1.1}>
          {/* the glows show through the box behind the building */}
          <div className={styles.photo}>
            <img src={glows} alt="" aria-hidden="true" className={`${styles.glows} ${stack.drift}`} draggable="false" />
            <img
              src={building}
              alt="New Town Convention Centre (Biswa Bangla Convention Centre)"
              className={styles.building}
            />
          </div>
          <BorderBeam duration={9} />
        </Reveal>

        <Reveal as="p" className={styles.eyebrow} delay={0.25}>
          {venue.eyebrow}
        </Reveal>
        <Reveal as="h2" className={styles.name} delay={0.35}>
          {venue.name}
        </Reveal>
        <Reveal className={styles.eta} delay={0.5}>
          <span className={styles.minutes}>{venue.minutes}</span>
          <span className={styles.from}>{venue.from}</span> <span className={styles.landmark}>{venue.landmark}</span>
        </Reveal>
      </div>
    </section>
  )
}
