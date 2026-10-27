import { motion } from 'framer-motion'
import { hero, ctas } from '../../data/content'
import PillButton from '../../components/PillButton/PillButton'
import HeroLayers from './HeroLayers'
import StatsBar from './StatsBar'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1]
const words = hero.title.split(' ')

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <HeroLayers />

      <div className={`stage ${styles.stage}`}>
        <motion.p
          className={styles.date}
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.094em' }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
        >
          {hero.date} <span className={styles.pipe}>|</span> {hero.city}
        </motion.p>

        <h1 className={styles.title}>
          {words.map((w, i) => (
            <span key={i}>
              <span className={styles.wordMask}>
                <motion.span
                  className={styles.word}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.55 + i * 0.06, ease }}
                >
                  {w}
                </motion.span>
              </span>{' '}
            </span>
          ))}
        </h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease }}
        >
          <PillButton href={ctas.delegate.href} color="var(--lilac)" width={199.02}>
            {ctas.delegate.label}
          </PillButton>
          <PillButton href={ctas.partner.href} color="var(--orange)" width={145.47}>
            {ctas.partner.label}
          </PillButton>
        </motion.div>

        <StatsBar stats={hero.stats} />
      </div>
    </section>
  )
}
