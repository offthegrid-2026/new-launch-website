// Vercel function behind the "Reach out" form (src/sections/ContactForm); see api/_form.js.
// In `npm run dev` the same handler is mounted by vite.config.js.

import { forwardForm } from './_form.js'

export const POST = (request) =>
  forwardForm(request, {
    script: 'APPS_SCRIPT_URL',
    fields: ['name', 'enquiry', 'organisation', 'email', 'phone', 'message'],
  })
