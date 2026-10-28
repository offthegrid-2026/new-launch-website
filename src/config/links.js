// Every outbound / CTA destination on the site lives here.
// Values starting with '#' are in-page anchors used until the real page exists.

// all Register / Buy / Apply buttons
export const REGISTER_URL = '/register'

export const PARTNER_URL = 'mailto:outreach@otgsummit.com?subject=Partnering%20with%20Off%20The%20Grid'

// TODO(client): real destinations not supplied yet
export const PROSPECTUS_URL = '#partners'
export const BECOME_SPEAKER_URL = '#contact'
export const CONTACT_URL = '#contact'
export const CODE_OF_CONDUCT_URL = '#code-of-conduct'
export const TERMS_URL = '#terms'
export const PRIVACY_URL = '#privacy'

export const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=New+Town+Convention+Centre+Kolkata'

export const SOCIALS = [
  { id: 'facebook', label: 'Off The Grid on Facebook', href: 'https://www.facebook.com/thinkoffthegrid' },
  { id: 'instagram', label: 'Off The Grid on Instagram', href: 'https://www.instagram.com/thinkoffthegrid/' },
  { id: 'linkedin', label: 'Off The Grid on LinkedIn', href: 'https://www.linkedin.com/company/thinkoffthegrid/' },
  { id: 'youtube', label: 'Off The Grid on YouTube', href: 'https://www.youtube.com/@thinkoffthegrid' },
]

// named links that FAQ answers can reference with { t, link: '<key>' }
export const NAMED_LINKS = {
  becomeSpeaker: BECOME_SPEAKER_URL,
  contactUs: CONTACT_URL,
  codeOfConduct: CODE_OF_CONDUCT_URL,
}
