// Vercel function behind the "Reach out" form: the browser posts here, and this forwards the
// submission to the Google Apps Script (scripts/contact-form.gs), so the script's URL and the
// shared secret stay on the server. In `npm run dev` the same handler is mounted by vite.config.js.
//
// Env (Vercel > Settings > Environment Variables, or .env locally):
//   APPS_SCRIPT_URL  the web app's /exec URL
//   FORM_SECRET      must match FORM_SECRET in the script's Script Properties

const FIELDS = ['name', 'enquiry', 'organisation', 'email', 'phone', 'message']
const MAX_BODY = 20_000 // bytes; the script caps each field more tightly

const reply = (status, body) => Response.json(body, { status })

export async function POST(request) {
  const { APPS_SCRIPT_URL, FORM_SECRET } = process.env
  if (!APPS_SCRIPT_URL || !FORM_SECRET) return reply(500, { ok: false, error: 'Form is not configured' })

  // only our own pages: browsers always send Origin on a cross-site POST
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== request.headers.get('host')) {
    return reply(403, { ok: false, error: 'Forbidden' })
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY) return reply(413, { ok: false, error: 'Message too long' })
  const form = new URLSearchParams(raw)

  if (form.get('website')) return reply(200, { ok: true }) // honeypot: a bot, drop it quietly

  const forward = new URLSearchParams({ secret: FORM_SECRET, ip: clientIp(request) })
  for (const key of FIELDS) forward.set(key, form.get(key) ?? '')

  try {
    // the script answers with a redirect to its output; fetch follows it as a GET
    const res = await fetch(APPS_SCRIPT_URL, { method: 'POST', body: forward })
    const result = await res.json()
    return reply(result.ok ? 200 : 400, result)
  } catch {
    return reply(502, { ok: false, error: 'Could not reach the form service' })
  }
}

function clientIp(request) {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || ''
}
