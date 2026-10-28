import { passesSection } from '../../content/site'
import { passes } from '../../content/passes'
import { passImages } from '../../assets/images'
import Container from '../../components/Container/Container'
import Glow from '../../components/Glow/Glow'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import PassCard from './PassCard'
import ReasonsPanel from './ReasonsPanel'
import styles from './Passes.module.css'

export default function Passes() {
  const [first, ...rest] = passes
  const card = (p, i) => (
    <PassCard key={p.id} pass={p} front={passImages[`${p.id}-front`]} back={passImages[`${p.id}-back`]} delay={0.1 * i} />
  )

  return (
    <section id="passes" aria-labelledby="passes-title">
      <Glow x="0%" y="25%" opacity={0.18} duration={17} />
      <Glow x="100%" y="80%" color="150, 190, 255" opacity={0.16} duration={20} delay={3} />
      <Container>
        <SectionTitle id="passes-title" script={passesSection.script} display={passesSection.heading} fit={6.4} />

        <div className={styles.grid}>
          {card(first, 0)}
          <ReasonsPanel className={styles.reasons} />
          {rest.map((p, i) => card(p, i + 1))}
        </div>
      </Container>
    </section>
  )
}
