import { motion } from 'framer-motion'
import { whyGo } from '../../content/site'
import { images } from '../../assets/images'
import Container from '../../components/Container/Container'
import Glow from '../../components/Glow/Glow'
import Reveal from '../../components/Reveal/Reveal'
import RichText from '../../components/RichText/RichText'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import styles from './WhyGo.module.css'

export default function WhyGo() {
  // two copies of the quote row make a seamless loop; the copy is hidden from AT
  const loop = [...whyGo.quotes, ...whyGo.quotes]

  return (
    <section id="why" aria-labelledby="why-title">
      <Glow x="8%" y="10%" color="255, 160, 110" opacity={0.12} />
      <Container>
        <div className={styles.top}>
          <SectionTitle id="why-title" script={whyGo.script} display={whyGo.heading} align="left" />

          <motion.img
            src={images.eye}
            alt=""
            width="339"
            height="211"
            loading="lazy"
            decoding="async"
            className={styles.eye}
            initial={{ opacity: 0, scale: 0.85, rotate: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <Reveal from="fade" className={styles.marquee} amount={0.2} delay={0.3}>
          <ul className={styles.track}>
            {loop.map((q, i) => {
              const copy = i >= whyGo.quotes.length
              return (
                <li key={i} className={`${styles.quote} ${copy ? styles.copy : ''}`} aria-hidden={copy || undefined}>
                  <RichText segments={q} hlClassName={styles.hl} />
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
