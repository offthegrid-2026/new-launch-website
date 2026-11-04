/**
 * Google Apps Script backend for the pass application form (src/register, reached from a pass's
 * "Buy now"). Separate from the enquiry script (contact-form.gs): its own Sheet, its own web app.
 * Not part of the site build: paste it into the Sheet's Apps Script editor.
 *
 * Each application adds a row to the Sheet's first tab (headers are written if the tab is empty).
 * No emails are sent: the Sheet is the only record.
 *
 * It also caps passes (CAPS below): once a pass has that many rows it refuses further
 * applications for it. The site asks how many are left, to show "N spots left" and "Sold out".
 *
 * One application per person: an email or mobile number already in the Sheet is refused, whatever
 * the pass (delete their row to let them apply again). Visitors aren't limited by IP beyond a
 * one-minute pause, since a college or office wifi puts many applicants behind one IP.
 *
 * Setup:
 *   1. Create a Google Sheet, e.g. "OTG Design Summit 2026 – Pass Applications".
 *   2. Extensions -> Apps Script, replace Code.gs with this file, save.
 *   3. Project Settings (gear) -> Script Properties -> add FORM_SECRET, the same value as the
 *      site's FORM_SECRET env var (the one the enquiry script uses). Requests without it are refused.
 *   4. Deploy -> New deployment -> type "Web app"; Execute as: Me; Who has access: Anyone.
 *      Approve the permissions, then copy the URL ending in /exec.
 *   5. Set it as APPLICATIONS_SCRIPT_URL in .env and in Vercel's env vars, then redeploy the site.
 *
 * The browser never calls this script: it posts to api/register.js, which adds the secret and the
 * visitor's IP and forwards here.
 *
 * After editing this script: Deploy -> Manage deployments -> Edit (pencil) -> Version: New version.
 * Otherwise the /exec URL keeps running the old code.
 *
 * Rows are written and read by column position, not by header name: add columns only after the
 * last one, and don't reorder them (the cap counts Pass Tier; the one-per-person check reads Email and Mobile).
 */

// order of the Sheet columns; keys match the form's input names
const COLUMNS = [
  ['Timestamp', 'submitted'],
  ['Pass Tier', 'pass'],
  ['Name', 'name'],
  ['Email', 'email'],
  ['Mobile', 'phone'],
  ['Category', 'category'],
  ['Company', 'company'],
  ['Job Title', 'jobTitle'],
  ['LinkedIn', 'linkedin'],
  ['Best Work', 'work'],
  ['Why They Belong', 'why'],
]

// the passes sold through this form (The Elite goes through the enquiry form);
// must match the pass names in src/content/passes.js
const PASSES = ['The First', 'The Many', 'The Last']

// applications a pass takes before it's sold out (deleting a row frees its slot); unlisted passes have no cap
const CAPS = { 'The First': 50 }

// must match register.categories in src/content/register.js
const CATEGORIES = [
  'Agency Founder / Studio Owner',
  'Brand / Enterprise Representative (Tech, SaaS, Corporate)',
  'Senior Design Professional / Team Lead',
  'Elite Emerging Talent / Design Student',
  'Educator / Policy Maker',
  'Student',
]

const MAX_LENGTH = { name: 80, email: 120, phone: 30, company: 120, jobTitle: 120, linkedin: 300, work: 300, why: 2000 }

// abuse limit: seconds between applications from one IP, to slow a bot down
const IP_COOLDOWN = 60

function doPost(e) {
  try {
    const p = e.parameter

    // only the site's Vercel function knows this (Project Settings > Script Properties > FORM_SECRET)
    const secret = PropertiesService.getScriptProperties().getProperty('FORM_SECRET')
    if (!secret || p.secret !== secret) return json({ ok: false, error: 'Forbidden' })

    // the site asking how many applications each capped pass has left (api/register.js GET)
    if (p.action === 'status') return json({ ok: true, ...passStatus(readRows()) })

    const problem = validate(p)
    if (problem) return json({ ok: false, error: problem })

    const cache = CacheService.getScriptCache()
    const ipKey = p.ip ? `ip:${p.ip}` : null
    if (ipKey && cache.get(ipKey)) return json({ ok: false, error: 'Please wait a minute before applying again' })

    p.submitted = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a')

    // locked so two applications arriving together can't both take the last slot
    const lock = LockService.getScriptLock()
    lock.waitLock(10000)
    try {
      const rows = readRows()
      if (passStatus(rows).soldOut.includes(p.pass)) return json({ ok: false, soldOut: true, error: `${p.pass} is sold out` })
      const email = p.email.toLowerCase()
      const phone = digits(p.phone)
      if (rows.some((r) => String(r.email).toLowerCase() === email || digits(r.phone) === phone)) {
        return json({ ok: false, duplicate: true, error: 'Already applied with this email or mobile number' })
      }
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
      if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS.map(([label]) => label))
      // a leading = + - @ would make Sheets read the answer as a formula
      sheet.appendRow(COLUMNS.map(([, key]) => String(p[key] || '').replace(/^[=+\-@]/, "'$&")))
    } finally {
      lock.releaseLock()
    }

    if (ipKey) cache.put(ipKey, '1', IP_COOLDOWN)
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

/** Every application in the Sheet, as { pass, email, phone, ... } keyed like COLUMNS. */
function readRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  const count = sheet.getLastRow() - 1 // minus the header
  if (count < 1) return []
  return sheet
    .getRange(2, 1, count, COLUMNS.length)
    .getValues()
    .map((values) => Object.fromEntries(COLUMNS.map(([, key], i) => [key, values[i]])))
}

/** For each capped pass (CAPS): applications left, and which are sold out. */
function passStatus(rows) {
  const remaining = {}
  for (const name in CAPS) remaining[name] = Math.max(0, CAPS[name] - rows.filter((r) => r.pass === name).length)
  return { remaining, soldOut: Object.keys(remaining).filter((name) => remaining[name] === 0) }
}

/** A phone number's last 10 digits, so "+91 98765 43210" and "9876543210" match. */
function digits(phone) {
  return String(phone).replace(/\D/g, '').slice(-10)
}

/** Returns what's wrong with an application, or '' when it's fine. Trims fields in place.
 *  `category` arrives as the picked options joined with '; '. */
function validate(p) {
  for (const [, key] of COLUMNS) p[key] = String(p[key] || '').trim()
  if (!p.name || !p.email || !p.phone || !p.category || !p.linkedin || !p.work || !p.why) return 'Missing required fields'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return 'Invalid email address'
  if (!PASSES.includes(p.pass)) return 'Invalid pass'
  if (!p.category.split('; ').every((c) => CATEGORIES.includes(c))) return 'Invalid category'
  if (!/linkedin\.com\//i.test(p.linkedin)) return 'Invalid LinkedIn profile'
  for (const key in MAX_LENGTH) if (p[key].length > MAX_LENGTH[key]) return `${key} is too long`
  return ''
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)
}
