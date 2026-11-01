// Every outbound / CTA destination on the site lives here.
// Values starting with '#' are in-page anchors used until the real page exists.

// the passes' Buy buttons
export const REGISTER_URL = '/register'

// Apply for Delegate Pass: the passes section on the home page
export const PASSES_URL = '#passes'

export const PROSPECTUS_URL = '/downloads/otg-partnership-prospectus.pdf'

// legal pages: separate HTML entries (see vite.config.js), content in content/legal.js
export const TERMS_URL = '/terms/'
export const PRIVACY_URL = '/privacy/'
export const CODE_OF_CONDUCT_URL = '/code-of-conduct/'

// "Reach out" form below the FAQs. With no endpoint it opens the visitor's mail app,
// addressed to `email`, with the message filled in. `endpoint` is our own Vercel function
// (api/contact.js), which forwards to the Google Apps Script that fills the Sheet and sends
// the emails; the script's URL stays server-side in env vars (see .env.example).
export const CONTACT_FORM = {
  endpoint: '/api/contact',
  email: 'outreach@otgsummit.com',
}

export const CONTACT_URL = '#reach-out'

// a link to the form with an enquiry type chosen (keys: contactForm.enquiries in content/site.js).
// Links carry the key as data-enquiry; from another page (`home` = '/') it travels as ?enquiry=.
export const enquiryHref = (key, home = '') => (home ? `${home}?enquiry=${key}` : '') + CONTACT_URL

export const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=New+Town+Convention+Centre+Kolkata'

export const SOCIALS = [
  { id: 'facebook', label: 'Off The Grid on Facebook', href: 'https://www.facebook.com/thinkoffthegrid' },
  { id: 'instagram', label: 'Off The Grid on Instagram', href: 'https://www.instagram.com/thinkoffthegrid/' },
  { id: 'linkedin', label: 'Off The Grid on LinkedIn', href: 'https://www.linkedin.com/company/thinkoffthegrid/' },
  { id: 'youtube', label: 'Off The Grid on YouTube', href: 'https://www.youtube.com/@thinkoffthegrid' },
]

// icons on the back of each speaker card, keyed by speaker id (content/speakers.js).
// An icon only shows once its href is filled in.
export const SPEAKER_LINKS = {
  'paul-sandip': { linkedin: 'https://www.linkedin.com/in/paulsandipdesign/', website: 'https://paulstudio.in/' },
  'indroneel-mukherjee': { instagram: 'https://www.instagram.com/neely4u/', linkedin: 'https://www.linkedin.com/in/indroneel-mukherjee-320770219/' },
  'charbak-dipta': { instagram: 'https://www.instagram.com/charbak/', linkedin: 'https://www.linkedin.com/in/charbak-dipta/' },
}

// named links that FAQ answers can reference with { t, link: '<key>' }.
// A value is an href, or { enquiry } to open the reach-out form with that enquiry type chosen.
export const NAMED_LINKS = {
  becomeSpeaker: { enquiry: 'speaker' },
  contactUs: CONTACT_URL,
  codeOfConduct: CODE_OF_CONDUCT_URL,
}
