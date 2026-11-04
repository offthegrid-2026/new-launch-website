// Shared by the site's form functions: the browser posts to one of them, and this forwards the
// submission to that form's Google Apps Script, so the script's URL and the shared secret stay
// on the server. Vercel doesn't route files starting with _, so this is not an endpoint itself.
//
//   api/contact.js   "Reach out" enquiries  -> scripts/contact-form.gs      (APPS_SCRIPT_URL)
//   api/register.js  pass applications      -> scripts/application-form.gs  (APPLICATIONS_SCRIPT_URL)
//
// Env (Vercel > Settings > Environment Variables, or .env locally):
//   APPS_SCRIPT_URL, APPLICATIONS_SCRIPT_URL  each web app's /exec URL
//   FORM_SECRET                               must match FORM_SECRET in both scripts' Script Properties

import { MAINTENANCE } from '../src/config/maintenance.js'

const MAX_BODY = 20_000 // bytes; the scripts cap each field more tightly

const reply = (status, body) => Response.json(body, { status })

/** `script` names the env var holding the script's URL; `fields` are the inputs passed on. */
export async function forwardForm(request, { script, fields }) {
  // the site is down, so the forms are too: nothing reaches the Sheets or the inbox
  if (MAINTENANCE) return reply(503, { ok: false, error: 'Site under maintenance' })

  // only our own pages: browsers always send Origin on a cross-site POST
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== request.headers.get('host')) {
    return reply(403, { ok: false, error: 'Forbidden' })
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY) return reply(413, { ok: false, error: 'Message too long' })
  const body = new URLSearchParams(raw)

  if (body.get('website')) return reply(200, { ok: true }) // honeypot: a bot, drop it quietly

  const forward = new URLSearchParams({ ip: clientIp(request) })
  for (const key of fields) forward.set(key, body.get(key) ?? '')

  return callScript(script, forward)
}

/** Which passes have hit their cap (CAPS in scripts/application-form.gs), for the site to show "Sold out". */
export async function passStatus() {
  if (MAINTENANCE) return reply(503, { ok: false, error: 'Site under maintenance' })
  // Vercel's CDN keeps the answer for a minute, so page views don't each wake the script
  const res = await callScript('APPLICATIONS_SCRIPT_URL', new URLSearchParams({ action: 'status' }))
  if (res.ok) res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  return res
}

async function callScript(script, params) {
  const url = process.env[script]
  const { FORM_SECRET } = process.env
  if (!url || !FORM_SECRET) return reply(500, { ok: false, error: 'Form is not configured' })
  params.set('secret', FORM_SECRET)

  try {
    // the script answers with a redirect to its output; fetch follows it as a GET
    const res = await fetch(url, { method: 'POST', body: params })
    const result = await res.json()
    return reply(result.ok ? 200 : 400, result)
  } catch {
    return reply(502, { ok: false, error: 'Could not reach the form service' })
  }
}

function clientIp(request) {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || ''
}
