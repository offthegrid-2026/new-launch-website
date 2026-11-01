import { speakers } from '../../content/speakers'
import { ctas } from '../../content/site'
import { enquiryHref } from '../../config/links'
import { speakerImages } from '../../assets/images'
import Container from '../../components/Container/Container'
import Glow from '../../components/Glow/Glow'
import PillButton from '../../components/PillButton/PillButton'
import Reveal from '../../components/Reveal/Reveal'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import SpeakerCard from './SpeakerCard'
import styles from './Speakers.module.css'

export default function Speakers() {
  return (
    <section id="speakers" aria-labelledby="speakers-title">
      <Glow x="96%" y="55%" color="190, 190, 255" opacity={0.12} duration={18} />
      <Container>
        <SectionTitle id="speakers-title" script={speakers.script} display={speakers.heading} fit={7.6} />

        <ul className={styles.grid}>
          {speakers.items.map((s, i) => (
            <SpeakerCard key={s.id} speaker={s} src={speakerImages[s.id]} delay={i * 0.12} />
          ))}
        </ul>

        <Reveal from="blur" className={styles.more} delay={0.2}>
          <PillButton href={enquiryHref(ctas.speaker.enquiry)} data-enquiry={ctas.speaker.enquiry} color="var(--white)">
            {ctas.speaker.label}
          </PillButton>
        </Reveal>
      </Container>
    </section>
  )
}
