/**
 * Google Apps Script backend for the pass application form (src/register, reached from a pass's
 * "Buy now"). Separate from the enquiry script (contact-form.gs): its own Sheet, its own web app.
 * Not part of the site build: paste it into the Sheet's Apps Script editor.
 *
 * Each application adds a row to the Sheet's first tab (headers are written if the tab is empty).
 * No emails are sent: the Sheet is the only record.
 *
 * It also caps passes (CAPS below): once a pass has that many rows it refuses further
 * applications for it, and tells the site, which then shows the pass as "Sold out".
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
 * Rows are written by column position, not by header name: add columns only after the last one,
 * and keep Pass Tier in column B (the cap counts it).
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

// abuse limits
const EMAIL_COOLDOWN = 5 * 60 // seconds before the same address can apply again
const IP_COOLDOWN = 60 // seconds between applications from one visitor

function doPost(e) {
  try {
    const p = e.parameter

    // only the site's Vercel function knows this (Project Settings > Script Properties > FORM_SECRET)
    const secret = PropertiesService.getScriptProperties().getProperty('FORM_SECRET')
    if (!secret || p.secret !== secret) return json({ ok: false, error: 'Forbidden' })

    // the site asking which passes are full (api/register.js GET)
    if (p.action === 'status') return json({ ok: true, soldOut: soldOutPasses() })

    const problem = validate(p)
    if (problem) return json({ ok: false, error: problem })

    const cache = CacheService.getScriptCache()
    const emailKey = `email:${p.email.toLowerCase()}`
    const ipKey = p.ip ? `ip:${p.ip}` : null
    if (cache.get(emailKey) || (ipKey && cache.get(ipKey))) {
      return json({ ok: false, error: 'Please wait a few minutes before applying again' })
    }

    p.submitted = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a')

    // locked so two applications arriving together can't both take the last slot
    const lock = LockService.getScriptLock()
    lock.waitLock(10000)
    try {
      if (soldOutPasses().includes(p.pass)) return json({ ok: false, soldOut: true, error: `${p.pass} is sold out` })
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
      if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS.map(([label]) => label))
      // a leading = + - @ would make Sheets read the answer as a formula
      sheet.appendRow(COLUMNS.map(([, key]) => String(p[key] || '').replace(/^[=+\-@]/, "'$&")))
    } finally {
      lock.releaseLock()
    }

    cache.put(emailKey, '1', EMAIL_COOLDOWN)
    if (ipKey) cache.put(ipKey, '1', IP_COOLDOWN)
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

/** The capped passes (CAPS) whose rows have reached the cap. */
function soldOutPasses() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  const rows = sheet.getLastRow() - 1 // minus the header
  if (rows < 1) return []
  const col = COLUMNS.findIndex(([, key]) => key === 'pass') + 1
  const counts = {}
  for (const [name] of sheet.getRange(2, col, rows, 1).getValues()) counts[name] = (counts[name] || 0) + 1
  return Object.keys(CAPS).filter((name) => (counts[name] || 0) >= CAPS[name])
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
