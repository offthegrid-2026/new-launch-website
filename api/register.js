// Vercel function behind the pass application form (src/register); see api/_form.js.
// POST sends an application; GET lists the passes that are sold out (src/hooks/useSoldOut.js).
// In `npm run dev` the same handlers are mounted by vite.config.js.

import { forwardForm, passStatus } from './_form.js'

export const GET = () => passStatus()

export const POST = (request) =>
  forwardForm(request, {
    script: 'APPLICATIONS_SCRIPT_URL',
    fields: ['pass', 'name', 'email', 'phone', 'category', 'company', 'jobTitle', 'linkedin', 'work', 'why'],
  })
