import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { footer, ctas } from '../../data/content'
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
    <footer id="footer" className={styles.footer}>
      <span className={styles.topLine} aria-hidden="true" />
      <div className={`stage ${styles.stage}`}>
        <Reveal className={styles.col} data-col="contact">
          <h2 className={styles.heading}>{contact.heading}</h2>
          <p className={styles.lines}>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p className={styles.city}>{contact.city}</p>
          <ul className={styles.socials}>
            {footer.socials.map((s, i) => {
              const Icon = icons[s.id]
              return (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 260, damping: 14 }}
                >
                  <a href={s.href} aria-label={s.label} className={styles.social} data-id={s.id}>
                    <Icon />
                  </a>
                </motion.li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal className={styles.col} data-col="actions" delay={0.1}>
          <h2 className={styles.heading}>{footer.actionsHeading}</h2>
          <div className={styles.actions}>
            <PillButton href={ctas.delegate.href} color="var(--white)" width={199.02}>
              {ctas.delegate.label}
            </PillButton>
            <PillButton href={ctas.partner.href} color="var(--orange)" width={145.47}>
              {ctas.partner.label}
            </PillButton>
          </div>
        </Reveal>

        <Reveal className={styles.col} data-col="links" delay={0.2}>
          <h2 className={styles.heading}>{quickLinks.heading}</h2>
          <ul className={styles.links}>
            {quickLinks.links.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className={styles.copy}>{footer.copyright}</p>
      </div>
    </footer>
  )
}
