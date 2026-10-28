import { venue } from '../../content/site'
import { MAP_URL } from '../../config/links'
import { venuePhotos } from '../../assets/images'
import glows from '../../assets/images/venue/layer1.webp'
import building from '../../assets/images/venue/layer2.webp'
import BorderBeam from '../../components/BorderBeam/BorderBeam'
import Container from '../../components/Container/Container'
import Glow from '../../components/Glow/Glow'
import Reveal from '../../components/Reveal/Reveal'
import styles from './Venue.module.css'

export default function Venue() {
  return (
    <section id="venue" aria-labelledby="venue-title">
      <Glow x="100%" y="60%" color="80, 200, 200" opacity={0.12} duration={15} />
      <Container>
        <Reveal from="zoom" className={styles.card} amount={0.25} duration={1.1}>
          <BorderBeam duration={9} />
          <div className={styles.copy}>
            <h2 id="venue-title" className={styles.heading}>
              <span className={styles.eyebrow}>{venue.eyebrow}</span>
              <span className="visually-hidden">: </span>
              <span className={styles.name}>{venue.name}</span>
            </h2>
            <p className={styles.eta}>
              <span className={styles.minutes}>{venue.minutes}</span>
              <span className={styles.from}>{venue.from}</span> <span>{venue.landmark}</span>
            </p>
          </div>

          {/* the glows show through the box behind the building */}
          <div className={styles.photo}>
            <img src={glows} alt="" className={styles.glows} width="1366" height="569" loading="lazy" />
            <img
              src={building}
              alt="New Town Convention Centre (Biswa Bangla Convention Centre)"
              className={styles.building}
              width="577"
              height="308"
              loading="lazy"
            />
          </div>
        </Reveal>

        <ul className={styles.strip}>
          {venue.photos.map((p, i) => {
            const img = <img src={venuePhotos[p.id]} alt={p.alt} width="640" height="772" loading="lazy" decoding="async" />
            return (
              <Reveal as="li" key={p.id} className={styles.tile} delay={i * 0.1}>
                {p.map ? (
                  <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                    {img}
                    <span className={styles.mapLabel}>
                      Open in Google Maps<span className="visually-hidden"> (opens in a new tab)</span>
                    </span>
                  </a>
                ) : (
                  img
                )}
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
