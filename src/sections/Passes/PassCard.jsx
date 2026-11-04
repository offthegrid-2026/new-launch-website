import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { registerHref, enquiryHref } from '../../config/links'
import { passPhase, SOLD_OUT_LABEL } from '../../content/passes'
import useSoldOut from '../../hooks/useSoldOut'
import styles from './PassCard.module.css'

/** The pass's phase (see passPhase); flips by itself if the page is open at an `opens` or `closes` moment. */
function usePhase(pass) {
  const [phase, setPhase] = useState(() => passPhase(pass))

  useEffect(() => {
    const next = { soon: pass.cta.opens, open: pass.cta.closes }[phase]
    if (!next) return
    const wait = Date.parse(next.at) - Date.now()
    if (wait > 2 ** 31 - 1) return // beyond setTimeout's range; a reload will pick it up
    const timer = setTimeout(() => setPhase(passPhase(pass)), Math.max(wait, 0))
    return () => clearTimeout(timer)
  }, [pass, phase])

  return phase
}

/**
 * Red band across the top-right corner, its text scrolling slowly and endlessly (still under
 * reduced motion). Ported from the ticket store's PassCard (store/otg-app). The text repeats to
 * overfill the band, twice over, so the -50% scroll loops without a seam; only the first copy is read out.
 */
function Ribbon({ children }) {
  const run = (hidden) => (
    <span className={styles.ribbonRun} aria-hidden={hidden || undefined}>
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i} aria-hidden={i > 0 || undefined}>
          {children}
        </span>
      ))}
    </span>
  )
  return (
    <p className={styles.ribbon}>
      <span className={styles.ribbonText}>
        {run(false)}
        {run(true)}
      </span>
    </p>
  )
}

/** The bar under the card art: CTA (or status), accent dot, flip button. */
function Bar({ pass, phase, children }) {
  return (
    <div className={styles.bar}>
      {phase !== 'open' ? (
        <span className={styles.cta} data-phase={phase}>
          {{ soon: pass.cta.opens?.label, closed: pass.cta.closes?.label, soldOut: SOLD_OUT_LABEL }[phase]}
        </span>
      ) : pass.cta.buy || pass.cta.enquiry ? (
        <a
          href={pass.cta.enquiry ? enquiryHref(pass.cta.enquiry) : registerHref(pass.id)}
          data-enquiry={pass.cta.enquiry}
          className={styles.cta}
        >
          {pass.cta.label}
          <span className="visually-hidden"> – {pass.name} pass</span>
        </a>
      ) : (
        <span className={styles.cta}>{pass.cta.label}</span>
      )}
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </div>
  )
}

/**
 * A delegate pass that flips in 3D to show its inclusions.
 * The hidden face is inert, so only the visible face's controls can be reached;
 * focus follows the flip to the matching button on the other side.
 */
export default function PassCard({ pass, front, back, delay = 0 }) {
  const [flipped, setFlipped] = useState(false)
  const frontButton = useRef(null)
  const backButton = useRef(null)
  const userFlipped = useRef(false)
  const backId = `pass-${pass.id}-inclusions`
  const timed = usePhase(pass)
  const soldOut = useSoldOut()
  const phase = timed === 'open' && soldOut?.includes(pass.name) ? 'soldOut' : timed
  // as in the store, a sold-out pass and one whose sale has ended look the same to a buyer:
  // grey art and accent, and a red "Sold out" band (the filter is on the art, so the band stays red)
  const unavailable = phase === 'soldOut' || phase === 'closed'
  const ribbon = unavailable && <Ribbon>{SOLD_OUT_LABEL}</Ribbon>
  const artClass = `${styles.art} ${unavailable ? styles.dim : ''}`

  useEffect(() => {
    if (!userFlipped.current) return
    ;(flipped ? backButton : frontButton).current?.focus({ preventScroll: true })
  }, [flipped])

  const toggle = () => {
    userFlipped.current = true
    setFlipped((f) => !f)
  }

  return (
    <motion.article
      className={styles.card}
      data-flipped={flipped}
      style={{ '--dot': unavailable ? '#6b6b70' : pass.dot }}
      aria-labelledby={`pass-${pass.id}-name`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 id={`pass-${pass.id}-name`} className="visually-hidden">
        {pass.name}
      </h3>

      <div className={styles.inner}>
        <div className={`${styles.face} ${styles.front}`} inert={flipped} aria-hidden={flipped || undefined}>
          {ribbon}
          <img src={front} alt="" width="720" height="1067" loading="lazy" decoding="async" className={artClass} />
          <p className="visually-hidden">{pass.summary}</p>
          <Bar pass={pass} phase={phase}>
            <button ref={frontButton} type="button" className={styles.flip} aria-expanded={flipped} aria-controls={backId} onClick={toggle}>
              View inclusions
            </button>
          </Bar>
        </div>

        <div id={backId} className={`${styles.face} ${styles.back}`} inert={!flipped} aria-hidden={!flipped || undefined}>
          {ribbon}
          <img src={back} alt="" width="720" height="1067" loading="lazy" decoding="async" className={artClass} />
          <div className="visually-hidden">
            <h4>{pass.name} includes</h4>
            {pass.inclusions.map((group) => (
              <div key={group.heading}>
                <h5>{group.heading}</h5>
                {group.items.length > 0 && (
                  <ul>
                    {group.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <Bar pass={pass} phase={phase}>
            <button ref={backButton} type="button" className={styles.flip} aria-expanded={flipped} aria-controls={backId} onClick={toggle}>
              <span aria-hidden="true">← </span>Back to pass
            </button>
          </Bar>
        </div>
      </div>
    </motion.article>
  )
}
