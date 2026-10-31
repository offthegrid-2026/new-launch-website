import { motion } from 'framer-motion'
import { legalPages } from '../content/legal'
import { TERMS_URL, PRIVACY_URL, CODE_OF_CONDUCT_URL } from '../config/links'
import useSmoothScroll from '../hooks/useSmoothScroll'
import eventPhoto from '../assets/images/hero/layer0.webp'
import GridBackdrop from '../components/GridBackdrop/GridBackdrop'
import Container from '../components/Container/Container'
import Reveal from '../components/Reveal/Reveal'
import Navbar from '../sections/Navbar/Navbar'
import Footer from '../sections/Footer/Footer'
import styles from './LegalPage.module.css'

const ease = [0.22, 1, 0.36, 1]

const docs = [
  { key: 'terms', label: 'Terms & Conditions', href: TERMS_URL },
  { key: 'privacy', label: 'Privacy Policy', href: PRIVACY_URL },
  { key: 'conduct', label: 'Code of Conduct', href: CODE_OF_CONDUCT_URL },
]

const pad = (n) => String(n).padStart(2, '0')

// links email addresses and phone numbers inside legal copy
const CONTACT = /([\w.+-]+@[\w-]+\.[\w.]+|\+91\s?\d{5}\s?\d{5})/g

function Linked({ text }) {
  return text.split(CONTACT).map((part, i) => {
    if (i % 2 === 0) return part
    const href = part.includes('@') ? `mailto:${part}` : `tel:${part.replace(/\s/g, '')}`
    return (
      <a key={i} href={href} className={styles.inlineLink}>
        {part}
      </a>
    )
  })
}

function Block({ block }) {
  if (typeof block === 'string') {
    return (
      <p>
        <Linked text={block} />
      </p>
    )
  }
  return (
    <ul className={styles.list}>
      {block.list.map((item, i) => (
        <li key={i}>
          {typeof item === 'string' ? (
            <Linked text={item} />
          ) : (
            <>
              <strong>{item.label}</strong> <Linked text={item.text} />
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function LegalPage({ doc }) {
  useSmoothScroll()
  const page = legalPages[doc]

  return (
    <>
      <GridBackdrop />
      <Navbar home="/" />
      <main>
        <section className={styles.hero}>
          <img src={eventPhoto} alt="" className={styles.photo} width="1366" height="842" />
          <Container className={styles.heroContent}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              Legal Document
            </motion.p>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease }}
            >
              {page.title}
            </motion.h1>
            <motion.p
              className={styles.intro}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
            >
              {page.intro}
            </motion.p>
            {page.updated && <p className={styles.updated}>{page.updated}</p>}

            <nav className={styles.tabs} aria-label="Legal documents">
              {docs.map((d) => (
                <a key={d.key} href={d.href} className={styles.tab} aria-current={d.key === doc ? 'page' : undefined}>
                  {d.label}
                </a>
              ))}
            </nav>
          </Container>
        </section>

        <Container className={styles.body}>
          <Reveal as="nav" className={styles.contents} aria-labelledby="contents-heading">
            <h2 id="contents-heading" className={styles.contentsHeading}>
              Contents
            </h2>
            <ol className={styles.contentsList}>
              {page.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className={styles.contentsNum}>{pad(i + 1)}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>

          {page.sections.map((s, i) => (
            <Reveal as="section" key={s.id} id={s.id} className={styles.section} amount={0.1}>
              <p className={styles.num} aria-hidden="true">
                {pad(i + 1)}
              </p>
              <h2 className={styles.heading}>{s.title}</h2>
              <div className={styles.text}>
                {s.body.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
              </div>
            </Reveal>
          ))}
        </Container>
      </main>
      <Footer home="/" />
    </>
  )
}
