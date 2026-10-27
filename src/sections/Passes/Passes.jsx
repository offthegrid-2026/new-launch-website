import { passes } from '../../data/content'
import { passImages } from '../../assets/images'
import Glow from '../../components/Glow/Glow'
import GridBackdrop from '../../components/GridBackdrop/GridBackdrop'
import PassCard from './PassCard'
import ReasonsPanel from './ReasonsPanel'
import styles from './Passes.module.css'

export default function Passes() {
  const [first, ...rest] = passes
  return (
    <section id="passes" className={styles.section}>
      <GridBackdrop />
      <div className={`stage ${styles.stage}`}>
        <Glow x={-437.8} y={46.7} size={843.4} opacity={0.24} duration={17} />
        <Glow x={1029.85} y={812.23} size={843.4} opacity={0.24} color="150, 190, 255" duration={20} delay={3} />

        <div className={styles.topRow}>
          <PassCard slot={first.id} src={passImages[first.id]} name={first.name} accent={first.accent} />
          <ReasonsPanel />
        </div>

        <div className={styles.bottomRow}>
          {rest.map((p, i) => (
            <PassCard
              key={p.id}
              slot={p.id}
              src={passImages[p.id]}
              name={p.name}
              accent={p.accent}
              delay={0.12 * (i + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
