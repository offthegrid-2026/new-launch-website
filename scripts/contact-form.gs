/**
 * Google Apps Script backend for the "Reach out" form (src/sections/ContactForm).
 * Not part of the site build: paste it into the Sheet's Apps Script editor.
 *
 * Each submission:
 *   1. adds a row to the first tab of the Sheet (headers are created if the tab is empty)
 *   2. emails the full details to the admins (to / cc / bcc), with Reply going to the visitor
 *   3. emails the visitor a "Query Submitted" confirmation
 *
 * Setup:
 *   1. Create a Google Sheet in the Gmail account the emails should come from.
 *   2. Extensions -> Apps Script, replace Code.gs with this file, fill in ADMINS, save.
 *   3. Project Settings (gear) -> Script Properties -> add FORM_SECRET, the same value as the
 *      site's FORM_SECRET env var. Requests without it are refused, so the URL alone is useless.
 *   4. Deploy -> New deployment -> type "Web app"; Execute as: Me; Who has access: Anyone.
 *      Approve the permissions, then copy the URL ending in /exec.
 *   5. Set it as APPS_SCRIPT_URL in .env and in Vercel's env vars (never in src/: that ships to browsers).
 *
 * The browser never calls this script: it posts to api/contact.js, which adds the secret and
 * the visitor's IP and forwards here.
 *
 * After editing this script: Deploy -> Manage deployments -> Edit (pencil) -> Version: New version.
 * Otherwise the /exec URL keeps running the old code.
 *
 * Quota: a free Gmail sends to ~100 recipients/day from Apps Script. Every to/cc/bcc address
 * counts, plus the visitor, so with 4 admins one submission uses 5.
 */

// ---- settings ----
const ADMINS = {
  to: 'your-gmail@gmail.com',
  cc: '', // comma-separated, e.g. 'a@gmail.com, b@gmail.com'
  bcc: '',
}
const SENDER_NAME = 'Off The Grid Summit'
const EVENT_LINE = '12th December, 2026 · New Town Convention Centre, Kolkata'

// order of the Sheet columns; keys match the form's input names
const COLUMNS = [
  ['Timestamp', 'submitted'],
  ['Name', 'name'],
  ['Enquiry', 'enquiry'],
  ['Organization', 'organisation'],
  ['Email', 'email'],
  ['Phone', 'phone'],
  ['Message', 'message'],
]

// the site's palette (src/styles/tokens.css)
const C = {
  bg: '#0b0c0d',
  card: '#070708',
  cardLine: '#1d1d20',
  field: '#1b1b1e',
  white: '#ffffff',
  soft: '#dfdfdf',
  muted: '#8f8e96',
  purple: '#cb6ce6',
  violet: '#8c52ff',
  amber: '#ff7b1b',
  orange: '#ff751f',
}
const FONT = "'Poppins','Helvetica Neue',Helvetica,Arial,sans-serif"

// must match the form's options (contactForm.enquiries in src/content/site.js)
const ENQUIRIES = ['General Enquiry', 'Partner with us', 'Enquire for Premium Pass', 'Enquire for Speaker', 'Media & Press']
const MAX_LENGTH = { name: 80, organisation: 120, email: 120, phone: 30, message: 2000 }

// abuse limits
const EMAIL_COOLDOWN = 5 * 60 // seconds before the same address can submit again
const IP_COOLDOWN = 60 // seconds between submissions from one visitor
const DAILY_EMAIL_CAP = 15 // submissions/day that send emails; later ones are only saved to the Sheet

function doPost(e) {
  try {
    const p = e.parameter

    // only the site's Vercel function knows this (Project Settings > Script Properties > FORM_SECRET)
    const secret = PropertiesService.getScriptProperties().getProperty('FORM_SECRET')
    if (!secret || p.secret !== secret) return json({ ok: false, error: 'Forbidden' })

    const problem = validate(p)
    if (problem) return json({ ok: false, error: problem })

    const cache = CacheService.getScriptCache()
    const emailKey = `email:${p.email.toLowerCase()}`
    const ipKey = p.ip ? `ip:${p.ip}` : null
    if (cache.get(emailKey) || (ipKey && cache.get(ipKey))) {
      return json({ ok: false, error: 'Please wait a few minutes before sending another message' })
    }
    cache.put(emailKey, '1', EMAIL_COOLDOWN)
    if (ipKey) cache.put(ipKey, '1', IP_COOLDOWN)

    p.submitted = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a')

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
    if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS.map(([label]) => label))
    sheet.appendRow(COLUMNS.map(([, key]) => p[key] || ''))

    if (!underDailyCap()) return json({ ok: true }) // saved; emails paused until tomorrow

    MailApp.sendEmail({
      to: ADMINS.to,
      cc: ADMINS.cc,
      bcc: ADMINS.bcc,
      replyTo: p.email,
      name: SENDER_NAME,
      subject: `New query: ${p.enquiry} from ${p.name}`,
      htmlBody: adminHtml(p),
    })

    MailApp.sendEmail({
      to: p.email,
      name: SENDER_NAME,
      subject: 'Query Submitted | Off The Grid Summit',
      htmlBody: userHtml(p),
    })

    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

// ---------- emails ----------

function adminHtml(p) {
  const fields = COLUMNS.map(([label, key]) => field(label, multiline(p[key]) || '-')).join('')

  return layout({
    preheader: `${p.enquiry} from ${p.name}`,
    eyebrow: 'New query',
    title: `${esc(p.enquiry)}`,
    intro: `${esc(p.name)} sent a message through the Reach out form. Reply to this email to answer them directly.`,
    body: `
      ${fields}
      ${button(`mailto:${esc(p.email)}?subject=${encodeURIComponent(`Re: ${p.enquiry}`)}`, `Reply to ${esc(p.name)}`)}`,
  })
}

function userHtml(p) {
  return layout({
    preheader: 'We’ve received your query and will get back to you soon.',
    eyebrow: 'Query submitted',
    title: `Thank you, ${esc(p.name)}.`,
    intro: `We’ve received your <strong style="color:${C.white}">${esc(p.enquiry)}</strong> and the right person from the OTG team will get back to you soon.`,
    // the message isn't echoed back: anyone can type any address, so this email must carry
    // nothing a stranger wrote beyond their (length-capped) name
    body: `
      ${field('Submitted', `${p.submitted} IST`)}
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:${C.muted}">
        This is an automated confirmation, so there’s no need to reply. We’ll write to you at ${esc(p.email)}.
      </p>`,
  })
}

/** Dark card on a dark page, brand gradient bar on top, like the site's sections. */
function layout({ preheader, eyebrow, title, intro, body }) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:${C.bg}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background-color:${C.bg}">
    <tr>
      <td align="center" style="padding:32px 12px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px">

          <!-- wordmark -->
          <tr>
            <td style="padding:0 8px 20px;font-family:${FONT};font-size:20px;font-weight:700;letter-spacing:3px;color:${C.white}">
              OFF THE <span style="color:${C.purple}">GRID</span>
              <span style="display:block;margin-top:4px;font-size:11px;font-weight:500;letter-spacing:1.5px;color:${C.muted}">DESIGN SUMMIT · KOLKATA</span>
            </td>
          </tr>

          <!-- card -->
          <tr>
            <td bgcolor="${C.card}" style="background-color:${C.card};border:1px solid ${C.cardLine};border-radius:24px;overflow:hidden">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td height="5" bgcolor="${C.violet}" style="height:5px;line-height:5px;font-size:0;background-color:${C.violet};background-image:linear-gradient(90deg,${C.violet},${C.amber})">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:32px 28px 36px;font-family:${FONT}">
                    <p style="margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${C.orange}">${eyebrow}</p>
                    <h1 style="margin:0 0 14px;font-size:26px;line-height:1.25;font-weight:700;color:${C.white}">${title}</h1>
                    <p style="margin:0 0 26px;font-size:15px;line-height:1.65;color:${C.soft}">${intro}</p>
                    ${body}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding:22px 8px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted}">
              ${EVENT_LINE}<br>
              Part of the Bengal Education &amp; Employment Summit 2026.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** A label over a filled box, styled like the form's inputs. */
function field(label, valueHtml) {
  return `
    <p style="margin:0 0 6px;font-family:${FONT};font-size:12px;font-weight:500;letter-spacing:0.5px;color:${C.muted}">${label}</p>
    <div style="margin:0 0 14px;padding:12px 14px;border-radius:10px;background-color:${C.field};font-family:${FONT};font-size:15px;line-height:1.55;color:${C.white};word-break:break-word">${valueHtml}</div>`
}

/** White pill like the site's Submit button. */
function button(href, label) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px">
      <tr>
        <td bgcolor="${C.white}" style="border-radius:10px;background-color:${C.white}">
          <a href="${href}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:14px;font-weight:600;color:${C.bg};text-decoration:none;border-radius:10px">${label}</a>
        </td>
      </tr>
    </table>`
}

// ---------- helpers ----------

/** Returns what's wrong with a submission, or '' when it's fine. Trims fields in place. */
function validate(p) {
  for (const key of ['name', 'organisation', 'email', 'phone', 'message']) p[key] = String(p[key] || '').trim()
  if (!p.name || !p.email || !p.message) return 'Missing required fields'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return 'Invalid email address'
  if (!ENQUIRIES.includes(p.enquiry)) return 'Invalid enquiry type'
  for (const key in MAX_LENGTH) if (p[key].length > MAX_LENGTH[key]) return `${key} is too long`
  return ''
}

/** Counts today's emailed submissions (IST); false once the cap is reached. */
function underDailyCap() {
  const lock = LockService.getScriptLock()
  lock.waitLock(5000)
  try {
    const props = PropertiesService.getScriptProperties()
    const key = `sent:${Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd')}`
    const count = Number(props.getProperty(key) || 0)
    if (count >= DAILY_EMAIL_CAP) return false
    props.setProperty(key, String(count + 1))
    return true
  } finally {
    lock.releaseLock()
  }
}

// visitor input goes into HTML, so escape it
function esc(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
}

function multiline(s) {
  return esc(s).replace(/\n/g, '<br>')
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)
}
