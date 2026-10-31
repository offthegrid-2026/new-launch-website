import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { REGISTER_URL, enquiryHref } from '../../config/links'
import styles from './PassCard.module.css'

/** True once the CTA's `opens` moment has passed; flips by itself if the page is open at that moment. */
function useOpen(opens) {
  const at = opens ? Date.parse(opens.at) : 0
  const [open, setOpen] = useState(() => Date.now() >= at)

  useEffect(() => {
    if (open) return
    const wait = at - Date.now()
    if (wait > 2 ** 31 - 1) return // beyond setTimeout's range; a reload will pick it up
    const timer = setTimeout(() => setOpen(true), Math.max(wait, 0))
    return () => clearTimeout(timer)
  }, [at, open])

  return open
}

/** The bar under the card art: CTA (or status), accent dot, flip button. */
function Bar({ pass, open, children }) {
  return (
    <div className={styles.bar}>
      {!open ? (
        <span className={styles.cta}>{pass.cta.opens.label}</span>
      ) : pass.cta.buy || pass.cta.enquiry ? (
        <a
          href={pass.cta.enquiry ? enquiryHref(pass.cta.enquiry) : REGISTER_URL}
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
  const open = useOpen(pass.cta.opens)

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
      style={{ '--dot': pass.dot }}
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
          <img src={front} alt="" width="720" height="1067" loading="lazy" decoding="async" className={styles.art} />
          <p className="visually-hidden">{pass.summary}</p>
          <Bar pass={pass} open={open}>
            <button ref={frontButton} type="button" className={styles.flip} aria-expanded={flipped} aria-controls={backId} onClick={toggle}>
              View inclusions
            </button>
          </Bar>
        </div>

        <div id={backId} className={`${styles.face} ${styles.back}`} inert={!flipped} aria-hidden={!flipped || undefined}>
          <img src={back} alt="" width="720" height="1067" loading="lazy" decoding="async" className={styles.art} />
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
          <Bar pass={pass} open={open}>
            <button ref={backButton} type="button" className={styles.flip} aria-expanded={flipped} aria-controls={backId} onClick={toggle}>
              <span aria-hidden="true">← </span>Back to pass
            </button>
          </Bar>
        </div>
      </div>
    </motion.article>
  )
}
