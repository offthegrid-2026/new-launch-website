import { useEffect } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { footer } from '../content/site'
import { SOCIALS } from '../config/links'
import GridBackdrop from '../components/GridBackdrop/GridBackdrop'
import Glow from '../components/Glow/Glow'
import OtgLogo from '../components/OtgLogo/OtgLogo'
import styles from './Maintenance.module.css'

const icons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
}

const ease = [0.22, 1, 0.36, 1]

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
})

// spark rays around the gap between the plugs, as [angle°, length]
const SPARKS = [
  [-90, 22],
  [-45, 16],
  [45, 16],
  [90, 22],
  [135, 16],
  [-135, 16],
]

/** Two plugs that keep reaching for each other and never quite connect. */
function Unplugged() {
  return (
    <svg className={styles.plugs} viewBox="0 40 1200 160" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="mt-cable-l" x1="0" x2="1">
          <stop offset="0" stopColor="#543f90" />
          <stop offset="1" stopColor="#8c52ff" />
        </linearGradient>
        <linearGradient id="mt-cable-r" x1="0" x2="1">
          <stop offset="0" stopColor="#ff7b1b" />
          <stop offset="1" stopColor="#da5636" />
        </linearGradient>
      </defs>

      {/* cables run under the plug bodies, so they stay attached while the plugs move */}
      <path className={styles.cable} d="M-20 60H240Q270 60 270 90Q270 120 300 120H470" stroke="url(#mt-cable-l)" />
      <path className={`${styles.current} ${styles.currentL}`} d="M-20 60H240Q270 60 270 90Q270 120 300 120H470" />
      <path className={styles.cable} d="M730 120H900Q930 120 930 90Q930 60 960 60H1220" stroke="url(#mt-cable-r)" />
      <path className={`${styles.current} ${styles.currentR}`} d="M1220 60H960Q930 60 930 90Q930 120 900 120H730" />

      <g className={styles.plugL}>
        <rect x="376" y="106" width="28" height="28" rx="4" fill="#543f90" />
        <rect x="400" y="88" width="55" height="32" fill="#8c52ff" />
        <rect x="455" y="88" width="55" height="32" fill="#a75df4" />
        <rect x="400" y="120" width="55" height="32" fill="#6a45c9" />
        <rect x="455" y="120" width="55" height="32" fill="#cb6ce6" />
        <rect x="510" y="80" width="16" height="80" rx="3" fill="#bf77d4" />
        <rect x="526" y="98" width="46" height="12" rx="6" fill="#dfdfdf" />
        <rect x="526" y="130" width="46" height="12" rx="6" fill="#cccccc" />
      </g>

      <g className={styles.plugR}>
        <rect x="628" y="80" width="16" height="80" rx="3" fill="#ff9a52" />
        <rect x="630" y="99" width="10" height="10" rx="2" fill="#0b0c0d" />
        <rect x="630" y="131" width="10" height="10" rx="2" fill="#0b0c0d" />
        <rect x="644" y="88" width="55" height="32" fill="#ff751f" />
        <rect x="699" y="88" width="55" height="32" fill="#da5636" />
        <rect x="644" y="120" width="55" height="32" fill="#ff7b1b" />
        <rect x="699" y="120" width="55" height="32" fill="#b8432a" />
        <rect x="750" y="106" width="28" height="28" rx="4" fill="#b8432a" />
      </g>

      <g className={styles.sparks} transform="translate(600 120)">
        {SPARKS.map(([a, len]) => (
          <line key={a} x1="0" y1="-30" x2="0" y2={-30 - len} transform={`rotate(${a + 90})`} />
        ))}
        <circle r="5" />
      </g>
    </svg>
  )
}

export default function Maintenance() {
  useEffect(() => {
    document.title = 'Under Maintenance · Off The Grid'
  }, [])

  const { contact } = footer

  return (
    <MotionConfig reducedMotion="user">
      <GridBackdrop />
      <div className={styles.page}>
        <Glow x="15%" y="20%" color="140, 82, 255" opacity={0.18} duration={16} />
        <Glow x="85%" y="70%" color="255, 117, 31" opacity={0.12} duration={18} delay={2} />

        <motion.header className={styles.top} {...rise(0)}>
          <OtgLogo className={styles.logo} />
        </motion.header>

        <main className={styles.main}>
          <h1 className={styles.title}>
            <motion.span
              className={styles.script}
              initial={{ clipPath: 'inset(-30% 105% -30% -5%)' }}
              animate={{ clipPath: 'inset(-30% -5% -30% -5%)' }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            >
              Be right back
            </motion.span>{' '}
            <motion.span className={styles.display} {...rise(0.5)}>
              We’re off the grid for a bit
            </motion.span>
          </h1>

          <motion.p className={styles.lead} {...rise(0.7)}>
            The site is down for scheduled maintenance while we rewire a few things for the
            Design Summit 2026. Sorry for the inconvenience. We’ll be back online shortly.
          </motion.p>

          <motion.div className={styles.status} {...rise(0.85)}>
            <span className={styles.dot} aria-hidden="true" />
            Maintenance in progress
          </motion.div>
        </main>

        <motion.div className={styles.stage} {...rise(1)}>
          <Unplugged />
        </motion.div>

        <motion.footer className={styles.foot} {...rise(1.2)}>
          <p className={styles.contact}>
            <span>Need us meanwhile?</span>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
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
        </motion.footer>
      </div>
    </MotionConfig>
  )
}
