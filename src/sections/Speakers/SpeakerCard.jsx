import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { TbWorld } from 'react-icons/tb'
import { SPEAKER_LINKS } from '../../config/links'
import styles from './SpeakerCard.module.css'

const socialIcons = {
  instagram: { Icon: FaInstagram, label: 'Instagram' },
  linkedin: { Icon: FaLinkedin, label: 'LinkedIn' },
  website: { Icon: TbWorld, label: 'website' },
}

function Arrow({ back = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={back ? 2.4 : 1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={back ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
    </svg>
  )
}

/**
 * A speaker card that flips in 3D to show the bio.
 * Same pattern as Passes/PassCard: the hidden face is inert and
 * focus follows the flip to the matching button on the other side.
 */
export default function SpeakerCard({ speaker, src, delay }) {
  const [flipped, setFlipped] = useState(false)
  const openButton = useRef(null)
  const backButton = useRef(null)
  const userFlipped = useRef(false)
  const fullName = speaker.name.join(' ')
  const bioId = `speaker-${speaker.id}-bio`
  const links = Object.entries(SPEAKER_LINKS[speaker.id] || {}).filter(([, href]) => href)

  useEffect(() => {
    if (!userFlipped.current) return
    ;(flipped ? backButton : openButton).current?.focus({ preventScroll: true })
  }, [flipped])

  const toggle = () => {
    userFlipped.current = true
    setFlipped((f) => !f)
  }

  return (
    <motion.li
      className={styles.card}
      data-flipped={flipped}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.inner}>
        <div className={`${styles.face} ${styles.front}`} inert={flipped} aria-hidden={flipped || undefined}>
          <div className={styles.frame}>
            <img src={src} alt={speaker.alt} width="682" height="727" loading="lazy" decoding="async" className={styles.photo} />
          </div>
          <div className={styles.info}>
            <h3 className={styles.name}>
              {speaker.name.map((part, i) => (
                <span key={i}>{part} </span>
              ))}
            </h3>
            <ul className={styles.roles}>
              {speaker.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <button
              ref={openButton}
              type="button"
              className={styles.arrow}
              aria-expanded={flipped}
              aria-controls={bioId}
              aria-label={`About ${fullName}`}
              onClick={toggle}
            >
              <Arrow />
            </button>
          </div>
        </div>

        <div id={bioId} className={`${styles.face} ${styles.back}`} inert={!flipped} aria-hidden={!flipped || undefined}>
          <button
            ref={backButton}
            type="button"
            className={styles.backButton}
            aria-expanded={flipped}
            aria-controls={bioId}
            aria-label={`Back to ${fullName}’s photo`}
            onClick={toggle}
          >
            <Arrow back />
          </button>

          <div className={styles.bio}>
            {speaker.bio.map((p, i) => (
              <p key={i} className={i === speaker.bio.length - 1 ? styles.lead : undefined}>
                {p}
              </p>
            ))}
          </div>

          {links.length > 0 && (
            <ul className={styles.socials}>
              {links.map(([id, href]) => {
                const { Icon, label } = socialIcons[id]
                return (
                  <li key={id}>
                    <a href={href} target="_blank" rel="noreferrer" aria-label={`${fullName} on ${label}`}>
                      <Icon />
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </motion.li>
  )
}
