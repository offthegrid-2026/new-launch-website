import { schedule } from '../../content/site'
import { images } from '../../assets/images'
import Container from '../../components/Container/Container'
import Glow from '../../components/Glow/Glow'
import Reveal from '../../components/Reveal/Reveal'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import styles from './Schedule.module.css'

function Check() {
  return (
    <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#2fbf5b" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Day({ day }) {
  return (
    <article className={styles.day} aria-labelledby={`${day.id}-title`}>
      <h3 id={`${day.id}-title`} className={styles.date}>
        {day.date}
        <span className={styles.event}>{day.event}</span>
      </h3>

      {day.access && (
        <div className={styles.invite}>
          <img src={images.bees} alt="Bengal Education & Employment Summit 2026" width="440" height="188" loading="lazy" className={styles.bees} />
          <svg className={styles.sparkle} viewBox="0 0 32 32" aria-hidden="true">
            <path d="M18 6c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9z" fill="none" stroke="var(--rust)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M7 3c.4 2 1 2.6 3 3-2 .4-2.6 1-3 3-.4-2-1-2.6-3-3 2-.4 2.6-1 3-3z" fill="var(--rust)" />
          </svg>
          <p className={styles.access}>{day.access}</p>
          <p className={styles.note}>{day.note}</p>
        </div>
      )}

      {day.slots && (
        <ol className={styles.slots}>
          {day.slots.map((s) => (
            <li key={s.name} className={styles.slot}>
              <h4 className={styles.slotName}>{s.name}</h4>
              <p className={styles.time}>{s.time}</p>
              <ul className={styles.items}>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </article>
  )
}

export default function Schedule() {
  const { days, access } = schedule
  return (
    <section id="schedule" aria-labelledby="schedule-title">
      <Glow x="0%" y="70%" color="255, 160, 110" opacity={0.1} duration={16} />
      <Container>
        <SectionTitle id="schedule-title" display={schedule.heading} script={schedule.script} scriptFirst={false} />

        {/* phones: days stacked, one vertical bar per pass beside them;
            ≥900px: days side by side, one horizontal bar per pass under them */}
        <div className={styles.layout} style={{ '--days': days.length, '--passes': access.length }}>
          <Reveal className={styles.days} amount={0.15}>
            {days.map((d) => (
              <Day key={d.id} day={d} />
            ))}
          </Reveal>

          <img src={images.sphere} alt="" width="640" height="617" loading="lazy" decoding="async" className={styles.sphere} />

          <Reveal as="table" className={styles.table} amount={0.15} delay={0.1}>
            <caption className="visually-hidden">Which passes include each day</caption>
            <thead>
              <tr className={styles.headRow}>
                <th scope="col">Pass</th>
                {days.map((d) => (
                  <th key={d.id} scope="col">
                    {d.date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {access.map((row, p) => {
                const from = days.findIndex((d) => row.days[d.id]) + 1
                return (
                  <tr key={row.pass} className={styles.row} data-elite={row.elite || undefined} style={{ '--from': from, '--p': p + 1 }}>
                    <th scope="row" className={styles.passCell}>
                      <span className={styles.passName}>{row.pass}</span>
                    </th>
                    {days.map((d, i) =>
                      row.days[d.id] ? (
                        <td key={d.id} className={styles.included} style={{ '--d': i + 1 }}>
                          <Check />
                          <span className={styles.includedLabel}>Included</span>
                        </td>
                      ) : (
                        <td key={d.id} className={styles.excluded}>
                          <span className="visually-hidden">Not included</span>
                        </td>
                      ),
                    )}
                  </tr>
                )
              })}
            </tbody>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
