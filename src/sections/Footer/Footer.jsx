import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { footer, ctas, nav } from '../../content/site'
import { SOCIALS } from '../../config/links'
import { images } from '../../assets/images'
import Container from '../../components/Container/Container'
import PillButton from '../../components/PillButton/PillButton'
import Reveal from '../../components/Reveal/Reveal'
import styles from './Footer.module.css'

const icons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
}

export default function Footer() {
  const { contact, quickLinks } = footer
  return (
    <footer className={styles.footer}>
      <Container className={styles.grid}>
        <div className={styles.brand}>
          <img src={images.logo} alt="Off The Grid" className={styles.logo} width="138" height="95" loading="lazy" />
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.wordmark} aria-hidden="true">
            {nav.wordmark.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </span>
        </div>

        <div className={styles.partOf}>
          <p>{footer.partOf}</p>
          <img src={images.bees} alt="Bengal Education & Employment Summit 2026" width="440" height="188" loading="lazy" />
        </div>

        <Reveal className={styles.col} id="contact">
          <h2 className={styles.heading}>{contact.heading}</h2>
          <p className={styles.lines}>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p className={styles.city}>{contact.city}</p>
          <ul className={styles.socials}>
            {SOCIALS.map((s) => {
              const Icon = icons[s.id]
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className={styles.social}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal className={styles.col} delay={0.1}>
          <h2 className={styles.heading}>{footer.actionsHeading}</h2>
          <div className={styles.actions}>
            <PillButton href={ctas.delegate.href} color="var(--white)">
              {ctas.delegate.label}
            </PillButton>
            <PillButton href={ctas.partner.href} color="var(--orange)">
              {ctas.partner.label}
            </PillButton>
          </div>
        </Reveal>

        <Reveal className={styles.col} delay={0.2}>
          <h2 className={styles.heading}>{quickLinks.heading}</h2>
          <ul className={styles.links}>
            {quickLinks.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} id={l.id}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className={styles.copy}>{footer.copyright}</p>
      </Container>
    </footer>
  )
}
