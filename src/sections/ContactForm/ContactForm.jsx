import { useEffect, useRef, useState } from 'react'
import { contactForm } from '../../content/site'
import { CONTACT_FORM } from '../../config/links'
import eventPhoto from '../../assets/images/hero/layer0.webp'
import Container from '../../components/Container/Container'
import Glow from '../../components/Glow/Glow'
import Reveal from '../../components/Reveal/Reveal'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import styles from './ContactForm.module.css'

function mailtoFor(data) {
  const subject = `${data.get('enquiry')}: ${data.get('name')}`
  const body = [
    data.get('message'),
    '',
    `Name: ${data.get('name')}`,
    `Organisation / Institution: ${data.get('organisation') || '-'}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || '-'}`,
  ].join('\n')
  return `mailto:${CONTACT_FORM.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function Field({ label, required, wide, children }) {
  return (
    <label className={`${styles.field} ${wide ? styles.wide : ''}`}>
      <span className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' '}*
          </span>
        )}
      </span>
      {children}
    </label>
  )
}

/** Split card after temp/form-design-sample.png: event photo panel on the left, form on the right. */
export default function ContactForm() {
  // idle | sending | sent | mail | error
  const [status, setStatus] = useState('idle')
  const select = useRef(null)

  // pre-select the enquiry type from ?enquiry= on arrival, or from a clicked data-enquiry link
  useEffect(() => {
    const choose = (key) => {
      const option = contactForm.enquiries.find((o) => o.key === key)
      if (option && select.current) select.current.value = option.label
    }

    const params = new URLSearchParams(window.location.search)
    if (params.has('enquiry')) {
      choose(params.get('enquiry'))
      params.delete('enquiry')
      const query = params.toString()
      window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`)
    }

    const onClick = (e) => {
      const link = e.target.closest?.('a[data-enquiry]')
      if (link) choose(link.dataset.enquiry)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (!CONTACT_FORM.endpoint) {
      window.location.href = mailtoFor(data)
      setStatus('mail')
      return
    }

    setStatus('sending')
    try {
      // url-encoded so the Apps Script web app reads it as e.parameter (it doesn't parse multipart)
      const res = await fetch(CONTACT_FORM.endpoint, { method: 'POST', body: new URLSearchParams(data) })
      const result = await res.json()
      if (!res.ok || !result.ok) throw new Error(result.error || res.statusText)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="reach-out" aria-labelledby="reach-out-title">
      <Glow x="0%" y="40%" color="140, 82, 255" opacity={0.14} duration={16} />
      <Container>
        <SectionTitle id="reach-out-title" script={contactForm.script} align="left" />

        <Reveal as="form" className={styles.card} onSubmit={onSubmit} amount={0.15}>
          <div className={styles.panel}>
            <img src={eventPhoto} alt="" className={styles.photo} width="1366" height="842" loading="lazy" />
            <h3 className={styles.heading}>{contactForm.heading}</h3>
            <p className={styles.intro}>{contactForm.intro}</p>
          </div>

          <div className={styles.fields}>
            <div className={`${styles.wide} ${styles.fieldsHead}`}>
              <h3 className={styles.formHeading}>{contactForm.formHeading}</h3>
              <p className={styles.formIntro}>{contactForm.formIntro}</p>
            </div>

            <Field label="Full Name" required>
              <input name="name" type="text" autoComplete="name" placeholder="eg. Ananya Sen" required />
            </Field>
            <Field label={contactForm.enquiryLabel}>
              <select ref={select} name="enquiry" defaultValue={contactForm.enquiries[0].label}>
                {contactForm.enquiries.map((o) => (
                  <option key={o.key}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Organisation / Institution" wide>
              <input name="organisation" type="text" autoComplete="organization" placeholder="eg. Studio Name" />
            </Field>
            <Field label="Email Address" required>
              <input name="email" type="email" autoComplete="email" placeholder="eg. you@company.com" required />
            </Field>
            <Field label="Phone Number">
              <input name="phone" type="tel" autoComplete="tel" placeholder="eg. +91 98765 43210" />
            </Field>
            <Field label="Message" required wide>
              <textarea name="message" rows={5} placeholder="Write your message here..." required />
            </Field>

            {/* honeypot: hidden from people, bots fill it and the script drops the submission */}
            <input name="website" type="text" className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className={styles.wide}>
              <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                {status === 'sending' ? contactForm.sending : contactForm.submit}
              </button>
              <p className={styles.status} role="status">
                {status === 'sent' && contactForm.sent}
                {status === 'mail' && contactForm.mailOpened}
                {status === 'error' && (
                  <>
                    {contactForm.error} <a href={`mailto:${CONTACT_FORM.email}`}>{CONTACT_FORM.email}</a>.
                  </>
                )}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
