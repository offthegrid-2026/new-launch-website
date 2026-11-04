import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { register } from '../content/register'
import { passes, passPhase } from '../content/passes'
import { footer } from '../content/site'
import { PASSES_URL } from '../config/links'
import useSmoothScroll from '../hooks/useSmoothScroll'
import usePassStatus from '../hooks/usePassStatus'
import eventPhoto from '../assets/images/hero/layer0.webp'
import GridBackdrop from '../components/GridBackdrop/GridBackdrop'
import Container from '../components/Container/Container'
import Reveal from '../components/Reveal/Reveal'
import Navbar from '../sections/Navbar/Navbar'
import Footer from '../sections/Footer/Footer'
import MultiSelect from './MultiSelect'
import legal from '../legal/LegalPage.module.css'
import form from '../sections/ContactForm/ContactForm.module.css'
import styles from './RegisterPage.module.css'

const ease = [0.22, 1, 0.36, 1]

// `pass`: the one from ?pass=<id> if it's on sale now, otherwise whichever is (none between sales).
// `requested` and `next` word the message shown when none is.
const choosePass = (soldOut) => {
  const buyable = passes.filter((p) => p.cta.buy)
  const onSale = buyable.filter((p) => passPhase(p) === 'open' && !soldOut.includes(p.name))
  const requested = buyable.find((p) => p.id === new URLSearchParams(window.location.search).get('pass'))
  return {
    pass: onSale.find((p) => p === requested) || onSale[0] || null,
    requested,
    next: buyable.find((p) => passPhase(p) === 'soon'),
  }
}

function Closed({ requested, next, soldOut }) {
  const full = requested && soldOut.includes(requested.name) && passPhase(requested) === 'open'
  return (
    <div className={`${form.card} ${styles.card} ${styles.closed}`}>
      <p>
        {full ? `${requested.name} ${register.soldOut}` : register.closed}
        {next && ` ${register.nextUp} ${next.name}, ${next.cta.opens.label.replace(/^Opens/, 'opens')}.`}
      </p>
      <a href={`/${PASSES_URL}`} className={form.submit}>
        {register.closedLink}
      </a>
    </div>
  )
}

function Label({ text }) {
  if (typeof text === 'string') return text
  return text.map((s, i) => (
    <span key={i} className={s.muted ? styles.muted : undefined}>
      {s.t}
    </span>
  ))
}

function Field({ label, required, wide, children }) {
  return (
    <label className={`${form.field} ${wide ? form.wide : ''}`}>
      <span className={form.label}>
        <Label text={label} />
        {required && (
          <span className={form.required} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </span>
      {children}
    </label>
  )
}

/** /register/: the application a pass's "Buy now" leads to. Laid out like the legal pages. */
export default function RegisterPage() {
  useSmoothScroll()
  // null until the site has heard which passes are sold out; the page waits for it
  const passStatus = usePassStatus()
  const soldOut = passStatus?.soldOut
  const choice = useMemo(() => soldOut && choosePass(soldOut), [soldOut])
  const pass = choice?.pass
  const left = pass && passStatus.remaining[pass.name]
  // idle | sending | sent | soldOut | duplicate | wait | error
  const [status, setStatus] = useState('idle')
  // bumped on a successful send to clear the dropdown, which form.reset() can't reach
  const [sends, setSends] = useState(0)

  const onSubmit = async (e) => {
    e.preventDefault()
    const el = e.currentTarget

    setStatus('sending')
    try {
      // url-encoded so the Apps Script web app reads it as e.parameter (it doesn't parse multipart)
      const res = await fetch('/api/register', { method: 'POST', body: new URLSearchParams(new FormData(el)) })
      const result = await res.json()
      if (result.soldOut) return setStatus('soldOut')
      if (result.duplicate) return setStatus('duplicate')
      // the script's one-minute pause between applications from one connection
      if (/^Please wait/.test(result.error)) return setStatus('wait')
      if (!res.ok || !result.ok) throw new Error(result.error || res.statusText)
      el.reset()
      setSends((n) => n + 1)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <GridBackdrop />
      <Navbar home="/" />
      <main>
        <section className={legal.hero}>
          <img src={eventPhoto} alt="" className={legal.photo} width="1366" height="842" />
          <Container className={legal.heroContent}>
            <motion.p
              className={legal.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              {register.eyebrow}
            </motion.p>
            <motion.h1
              className={legal.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease }}
            >
              {register.title}
            </motion.h1>
            <motion.p
              className={legal.intro}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
            >
              {register.intro}
            </motion.p>
            {pass && (
              <p className={styles.pass} style={{ '--dot': pass.dot }}>
                {register.passLabel} <strong>{pass.name}</strong>
                {left != null && <span className={styles.left}> · {left} {register.spotsLeft}</span>}
              </p>
            )}
          </Container>
        </section>

        <Container className={styles.body}>
          {pass ? (
            <Reveal as="form" className={`${form.card} ${styles.card}`} onSubmit={onSubmit} amount={0.05}>
              <div className={form.fields}>
                <div className={`${form.wide} ${form.fieldsHead}`}>
                  <h2 className={form.formHeading}>{register.formHeading}</h2>
                  <p className={form.formIntro}>{register.formIntro}</p>
                </div>

                <input type="hidden" name="pass" value={pass.name} />

                <Field label="Name" required wide>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="eg. Ananya Sen"
                    maxLength={80}
                    required
                  />
                </Field>
                <Field label="Email" required>
                  <input name="email" type="email" autoComplete="email" placeholder="eg. you@company.com" required />
                </Field>
                <Field label="Mobile Number" required>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="eg. +91 98765 43210"
                    pattern="[0-9+ \-\(\)]{8,20}"
                    title="A phone number, eg. +91 98765 43210"
                    required
                  />
                </Field>

                <div className={form.wide}>
                  <MultiSelect
                    key={sends}
                    name="category"
                    label={register.categoryLabel}
                    options={register.categories}
                    placeholder={register.categoryPlaceholder}
                    searchLabel={register.categorySearch}
                    emptyLabel={register.categoryEmpty}
                    required
                  />
                </div>

                <Field label={register.company}>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="eg. Studio Name"
                    maxLength={120}
                  />
                </Field>
                <Field label={register.jobTitle}>
                  <input
                    name="jobTitle"
                    type="text"
                    autoComplete="organization-title"
                    placeholder="eg. Design Lead"
                    maxLength={120}
                  />
                </Field>
                <Field label={register.linkedin} required wide>
                  <input
                    name="linkedin"
                    type="text"
                    inputMode="url"
                    placeholder="eg. linkedin.com/in/your-name"
                    pattern=".*[Ll][Ii][Nn][Kk][Ee][Dd][Ii][Nn]\.com/.+"
                    title="Your LinkedIn profile link, eg. linkedin.com/in/your-name"
                    maxLength={300}
                    required
                  />
                </Field>
                <Field label={register.work} required wide>
                  <input
                    name="work"
                    type="text"
                    inputMode="url"
                    placeholder="eg. behance.net/your-name"
                    pattern="\S+\.\S+"
                    title="A link, eg. behance.net/your-name"
                    maxLength={300}
                    required
                  />
                </Field>
                <Field label={register.why} required wide>
                  <textarea name="why" rows={5} placeholder="Write your answer here..." maxLength={2000} required />
                </Field>

                {/* honeypot: hidden from people, bots fill it and the function drops the submission */}
                <input
                  name="website"
                  type="text"
                  className={form.honeypot}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className={form.wide}>
                  <button type="submit" className={form.submit} disabled={status === 'sending'}>
                    {status === 'sending' ? register.sending : register.submit}
                  </button>
                  <p className={form.status} role="status">
                    {status === 'sent' && register.sent}
                    {status === 'soldOut' && register.soldOutOnSend}
                    {status === 'duplicate' && register.duplicate}
                    {status === 'wait' && register.wait}
                    {status === 'error' && (
                      <>
                        {register.error}{' '}
                        <a href={`tel:${footer.contact.phone.replace(/\s/g, '')}`}>{footer.contact.phone}</a>.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </Reveal>
          ) : (
            choice && <Closed {...choice} soldOut={soldOut} />
          )}
        </Container>
      </main>
      <Footer home="/" />
    </>
  )
}
