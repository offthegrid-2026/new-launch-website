import { partners, ctas } from '../../content/site'
import Container from '../../components/Container/Container'
import PillButton from '../../components/PillButton/PillButton'
import Reveal from '../../components/Reveal/Reveal'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import styles from './Partners.module.css'

export default function Partners() {
  return (
    <section id="partners" aria-labelledby="partners-title">
      <Container>
        <SectionTitle id="partners-title" display={partners.heading} script={partners.script} scriptFirst={false} />
        <Reveal as="p" from="blur" className={styles.status} delay={0.2}>
          {partners.status}
        </Reveal>

        <div className={styles.pitch}>
          <Reveal className={styles.copy}>
            <h3 className={styles.pitchTitle}>{partners.pitchTitle}</h3>
            {partners.pitch.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal className={styles.actions} delay={0.15}>
            <PillButton href={ctas.partner.href} data-enquiry={ctas.partner.enquiry} color="var(--orange)">
              {ctas.partner.label}
            </PillButton>
            <PillButton href={ctas.prospectus.href} color="var(--purple)" download>
              {ctas.prospectus.label}
            </PillButton>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
