import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav } from '../../data/content'
import { images } from '../../assets/images'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <motion.div
        className={`stage ${styles.bar}`}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className={styles.brand} aria-label="Off The Grid Design Summit 2026 — home">
          <img src={images.logo} alt="" className={styles.logo} />
          <span className={styles.divider} />
          <span className={styles.wordmark}>
            {nav.wordmark.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {nav.links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              className={styles.link}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
            >
              {l.label}
            </motion.a>
          ))}
        </nav>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className={styles.drawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Mobile"
          >
            {nav.links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
