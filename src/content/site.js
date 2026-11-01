// Site copy, in page order. FAQs, speakers and passes have their own files.
// Segments marked { hl: true } render in the highlight colour.
import { PASSES_URL, CONTACT_URL, PROSPECTUS_URL, TERMS_URL, PRIVACY_URL, CODE_OF_CONDUCT_URL } from '../config/links'

export const nav = {
  links: [
    { label: 'Experience', href: '#why' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Partners', href: '#partners' },
    { label: 'Venue', href: '#venue' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Participate', href: '#passes' },
  ],
  wordmark: ['DESIGN', 'SUMMIT', '2026'],
}

export const ctas = {
  delegate: { label: 'Apply for Delegate Pass', href: PASSES_URL },
  partner: { label: 'Partner with Us', href: CONTACT_URL, enquiry: 'partner' },
  speaker: { label: 'Become a Speaker', enquiry: 'speaker' },
  prospectus: { label: 'Download Partnership Prospectus', href: PROSPECTUS_URL },
}

export const hero = {
  date: '12th December, 2026',
  city: 'Kolkata',
  title: 'East India’s biggest Design Summit is Here.',
  subtitle:
    "Converging elite designers, studio founders, and enterprise brands to push Bengal's creative economy forward.",
  stats: [
    { value: 1, suffix: '', label: 'Day' },
    { value: 15, suffix: '+', label: 'Speakers' },
    { value: 300, suffix: '+', label: 'Delegates' },
    { value: 3000, suffix: '+', label: 'Footfall' },
  ],
}

export const whyGo = {
  script: 'Why go',
  heading: 'Off the Grid?',
  quotes: [
    [
      { t: '“Design is a powerful medium in our country, but it ' },
      { t: 'desperately needs a definitive commercial platform', hl: true },
      { t: ' in our city.”' },
    ],
    [
      { t: '“The ' },
      { t: 'sharpest minds of the creative industry', hl: true },
      { t: ' are coming together on one amazing platform.”' },
    ],
    [
      { t: '“If you are a creator, a designer, or a founder, ' },
      { t: 'you have to be in this summit', hl: true },
      { t: '.”' },
    ],
    [
      { t: '“An ' },
      { t: 'amazing platform driven by the new generation', hl: true },
      { t: ' of the creative industry.”' },
    ],
  ],
}

export const theme = {
  eyebrow: 'Theme',
  script: 'business',
  subtitle: 'Of Creativity',
  paragraphs: [
    'Bengal’s design industry cannot survive on heritage alone. It is time to get over the legacy and get down to business.',
    'The future of design in Bengal depends on unlocking real commercial opportunities for creative professionals. We are done relying on the past.',
    'Off The Grid is about building the infrastructure for tomorrow—connecting elite talent with enterprise capital and working directly with the government to officially promote and scale the regional design industry. The business of creativity is here.',
  ],
}

export const partners = {
  heading: 'Off The Grid ’26',
  script: 'Partners',
  status: 'To be announced',
  pitchTitle: 'Partner with Off The Grid',
  pitch: [
    'Partnering with Off The Grid gives you direct, unfiltered visibility to the region’s most ambitious design leaders, founders, and decision-makers.',
    'Put your brand at the absolute center of the creative economy, dominate the conversation, capture elite attention, and establish undisputed market authority.',
  ],
}

export const schedule = {
  heading: 'OTG ’26',
  script: 'Schedule',
  days: [
    {
      id: 'dec-11',
      date: 'Dec 11, Fri',
      event: 'BEES 2026',
      access: 'By Invite & Curated Access Only',
      note: 'Front-row networking, enterprise strategy, and VIP Access before the main summit begins.',
    },
    {
      id: 'dec-12',
      date: 'Dec 12, Sat',
      event: 'OTG Design Summit 2026',
      slots: [
        { name: 'Morning', time: '10:00 AM - 01:00 PM', items: ['Registration & Networking Coffee', 'Opening Keynote', 'Panel Discussions'] },
        { name: 'Afternoon', time: '01:00 PM - 05:00 PM', items: ['Networking Lunch', 'Creative Spotlights', 'Beatboxing Performance', 'Closing Keynote'] },
        { name: 'Evening', time: '05:00 PM Onwards', items: ['OTG GROOVE (After Party)'] },
      ],
    },
  ],
  // which passes get into which day
  access: [
    { pass: 'The Elite', elite: true, days: { 'dec-11': true, 'dec-12': true } },
    { pass: 'All other passes', days: { 'dec-11': false, 'dec-12': true } },
  ],
}

export const passesSection = {
  script: 'Secure Your',
  heading: 'Unfair Advantage',
}

export const reasons = {
  title: [{ t: 'Four good reasons', accent: true }, { t: ' to be at OTG' }],
  items: [
    {
      n: '01',
      title: 'Bypass the Gatekeepers',
      body: 'Bengal’s top studio founders, agency heads, and enterprise buyers will be in one room. This is your chance to get direct, face-to-face access to the exact people who hire and award projects.',
    },
    {
      n: '02',
      title: 'Stop Outsourcing Your Ambition',
      body: 'You don’t have to leave the city to find high-stakes opportunities. The regional creative economy is centralizing right here, connecting you with the next big career leap, client, or strategic collaborator.',
    },
    {
      n: '03',
      title: 'Craft Alone Is No Longer Enough',
      body: 'When AI can iterate overnight, aesthetic skill is just table stakes. Learn how the industry’s sharpest minds are merging design, technology, and commercial strategy to build sustainable, scalable careers.',
    },
    {
      n: '04',
      title: 'Step Out of Your Bubble',
      body: 'Real growth doesn’t happen in isolated circles. Cross disciplines, interact with the region’s top 5% vetted talent, and align yourself with the professional standard shaping the future of design in Bengal.',
    },
  ],
}

export const venue = {
  eyebrow: 'Venue',
  name: 'New Town Convention Centre, Kolkata',
  minutes: 12,
  from: 'mins from',
  landmark: 'Salt Lake Sector V Metro',
  photos: [
    { id: 'building', alt: 'New Town Convention Centre seen from the street, with its cantilevered roof' },
    { id: 'map', alt: 'Map of New Town showing the Convention Centre near New Town Road', map: true },
    { id: 'gate', alt: 'The Biswa Bangla Gate arch lit up at dusk over New Town traffic' },
  ],
}

export const faqSection = {
  script: 'FAQs',
}

export const contactForm = {
  script: 'Reach out',
  heading: 'Send us a message',
  intro: 'Tell us what you’re looking for and the right person from the OTG team will get back to you.',
  enquiryLabel: 'Nature of Enquiry',
  formHeading: 'Your Details',
  formIntro: 'Fields marked * are required.',
  // `key` is what links use to pre-select an option (see enquiryHref in config/links.js)
  enquiries: [
    { key: 'general', label: 'General Enquiry' },
    { key: 'partner', label: 'Partner with us' },
    { key: 'premium', label: 'Enquire for Premium Pass' },
    { key: 'speaker', label: 'Enquire for Speaker' },
    { key: 'media', label: 'Media & Press' },
  ],
  submit: 'Submit Message',
  sending: 'Sending…',
  sent: 'Thank you, your query has been submitted. A confirmation is on its way to your inbox.',
  error: 'Something went wrong sending your message. Please try again, or email us at',
  mailOpened: 'Your email app should now open with your message ready. Just press send.',
}

export const footer = {
  partOf: 'Part of the',
  contact: {
    heading: 'Contact',
    phone: '+91 9836246175',
    email: 'outreach@otgsummit.com',
    city: 'Kolkata, West Bengal',
  },
  actionsHeading: 'Actions',
  quickLinks: {
    heading: 'Quick Links',
    links: [
      { label: 'Terms & Conditions', href: TERMS_URL },
      { label: 'Privacy Policy', href: PRIVACY_URL },
      { label: 'Code of Conduct', href: CODE_OF_CONDUCT_URL },
    ],
  },
  copyright: '© 2026 Off The Grid Design Summit. All Rights Reserved.',
}
