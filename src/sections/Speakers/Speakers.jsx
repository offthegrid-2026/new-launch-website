import { speakers } from '../../data/content'
import { speakerImages } from '../../assets/images'
import GridBackdrop from '../../components/GridBackdrop/GridBackdrop'
import Reveal from '../../components/Reveal/Reveal'
import SpeakerCard from './SpeakerCard'
import styles from './Speakers.module.css'

export default function Speakers() {
  return (
    <section id="speakers" className={`${styles.section} ${speakers.comingSoon ? styles.teaser : ''}`}>
      <GridBackdrop />
      <div className={`stage ${styles.stage}`}>
        <Reveal as="h2" from="blur" className={styles.heading}>
          {speakers.heading}
        </Reveal>
        {speakers.comingSoon ? (
          <Reveal as="p" from="blur" className={styles.soon} delay={0.2}>
            {speakers.comingSoon}
          </Reveal>
        ) : (
          <div className={styles.grid}>
            {speakers.items.map((s, i) => (
              <SpeakerCard
                key={s.id}
                speaker={s}
                src={s.photo ? speakerImages[s.photo] : null}
                slot={i}
                delay={i * 0.12}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
