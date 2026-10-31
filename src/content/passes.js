// Delegate passes, from the Canva file "OTG PASS PORTRAIT (STORE)".
// The card art is an image; `summary` and `inclusions` are its text for screen readers.
// `cta` with `buy: true` links to REGISTER_URL, with `enquiry` it opens the reach-out form
// with that enquiry type chosen; otherwise it renders as a status label.
// `opens` holds a buy button back until a moment (IST), showing its label until then.

const OTG_EXPERIENCE = [
  'Main Stage Conversations',
  'Cross-disciplinary Panels',
  'Community Showcase',
  'Networking Sessions',
  'Lunch & Refreshments',
  'Certificate of Participation',
]

export const passes = [
  {
    id: 'first',
    name: 'The First',
    summary: 'Early Bird delegate pass. ₹1,999 + 18% GST. Full-day access, 12 Dec. Available till 15 Nov. Limited passes.',
    cta: { label: 'Buy now', buy: true, opens: { at: '2026-11-05T00:00:00+05:30', label: 'Opens 05 Nov' } },
    dot: '#14d27f',
    inclusions: [{ heading: 'OTG Experience', items: OTG_EXPERIENCE }],
  },
  {
    id: 'many',
    name: 'The Many',
    // design reads "22 NOV" on the card art — see report
    summary: 'On Time delegate pass. ₹2,999 + 18% GST. Full-day access, 12 Dec. Opens 16 Nov, available till 05 Dec. Limited passes.',
    cta: { label: 'Opens 16 Nov' },
    dot: '#cb6ce6',
    inclusions: [{ heading: 'OTG Experience', items: OTG_EXPERIENCE }],
  },
  {
    id: 'last',
    name: 'The Last',
    summary: 'Late Arrivals delegate pass. ₹3,999 + 18% GST. Full-day access, 12 Dec. Opens 06 Dec, available till 11 Dec. Final limited access.',
    cta: { label: 'Opens 06 Dec' },
    dot: '#ff2e4d',
    inclusions: [{ heading: 'OTG Experience', items: OTG_EXPERIENCE }],
  },
  {
    id: 'elite',
    name: 'The Elite',
    summary: 'Premium delegate pass. ₹5,999 + 18% GST. Full-day access, 12 Dec. Limited availability.',
    cta: { label: 'Enquire now', enquiry: 'premium' },
    dot: '#ffbd59',
    inclusions: [
      { heading: 'BEES 2026 — Full Access', items: [] },
      { heading: 'Premium Access', items: ['Front-row networking', 'Exclusive Premium Delegate Kit', 'Exclusive access to OTG Club'] },
      { heading: 'OTG Experience', items: OTG_EXPERIENCE },
    ],
  },
]
