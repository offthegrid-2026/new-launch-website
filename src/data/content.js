// All copy for the site lives here so sections stay purely presentational.
// Segments marked { hl: true } render in the purple highlight colour.

export const nav = {
  links: [
    { label: 'Experience', href: '#why' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Partners', href: '#footer' },
    { label: 'Venue', href: '#venue' },
    { label: 'Schedule', href: '#theme' },
    { label: 'Participate', href: '#passes' },
  ],
  wordmark: ['DESIGN', 'SUMMIT', '2026'],
}

export const ctas = {
  delegate: { label: 'Apply for Delegate Pass', href: '#passes' },
  partner: { label: 'Partner with Us', href: 'mailto:outreach@otgsummit.com' },
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
      { t: '"The ' },
      { t: 'sharpest minds of the creative industry', hl: true },
      { t: ' are coming together on one amazing platform."' },
    ],
    [
      { t: '"If you are a creator, a designer, or a founder, ' },
      { t: 'you have to be in this summit', hl: true },
      { t: '."' },
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
    [
      'Bengal’s design industry cannot survive on heritage alone.',
      'It is time to get over the legacy and get down to business.',
    ],
    [
      'The future of design in Bengal depends on unlocking real commercial opportunities for creative professionals. We are done relying on the past.',
    ],
    [
      'Off The Grid is about building the infrastructure for tomorrow—',
      'connecting elite talent with enterprise capital and working directly with the government to officially promote and scale the regional design industry.',
      'The business of creativity is here.',
    ],
  ],
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

// Pass artwork comes from Canva as flat images; `accent` drives the hover glow.
export const passes = [
  { id: 'first', name: 'The First — Early Bird Delegate Pass, ₹1,999 + 18% GST', accent: '#4bac6f' },
  { id: 'many', name: 'The Many — On Time Delegate Pass, ₹2,999 + 18% GST', accent: '#bf77d4' },
  { id: 'last', name: 'The Last — Late Arrivals Delegate Pass, ₹3,999 + 18% GST', accent: '#b20000' },
  { id: 'elite', name: 'The Elite — Premium Delegate Pass, ₹5,999 + 18% GST', accent: '#ffbd59' },
]

export const venue = {
  eyebrow: 'Venue',
  name: 'New Town Convention Centre, Kolkata',
  minutes: 12,
  from: 'mins from',
  landmark: 'Salt Lake Sector V Metro',
}

export const faqs = {
  script: 'FAQs',
  items: [
    {
      q: 'I’m not a designer. Can I attend?',
      a: [
        'Absolutely.',
        'Off The Grid isn\'t only for people who have “designer” in their job title. If you work with ideas, technology, people, products, brands or culture, there is something here for you.\nIf you want to understand how design is shaping what comes next, you belong in the room.',
      ],
    },
    {
      q: 'I’m a designer. What’s in it for me?',
      // Placeholder copy — replace with the final answer.
      a: [
        'Direct, face-to-face access to studio founders, agency heads and enterprise buyers who hire and award projects.',
        'Talks and conversations on merging design, technology and commercial strategy into a sustainable, scalable career.',
      ],
    },
    {
      q: 'Is Off The Grid only about design?',
      // Placeholder copy — replace with the final answer.
      a: [
        'No. Design is the lens, but the summit is about the business of creativity — capital, technology, policy and the people building Bengal’s creative economy.',
      ],
    },
    {
      q: 'What happens at Off The Grid?',
      // Placeholder copy — replace with the final answer.
      a: [
        'A full day of keynotes, panels and curated networking with 15+ speakers, 300+ delegates and 3000+ visitors at New Town Convention Centre, Kolkata.',
      ],
    },
  ],
}

// `photo` is a key into the speaker image map; null renders the empty frame.
// While `comingSoon` is set, it shows in place of the speaker cards.
export const speakers = {
  heading: 'Our Speakers',
  comingSoon: 'Unveiling Soon',
  items: [
    { id: 's1', photo: 'speaker-1', name: '', role: '', showInfo: true },
    { id: 's2', photo: null, name: '', role: '' },
    { id: 's3', photo: null, name: '', role: '' },
  ],
}

export const footer = {
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
      { label: 'Terms of Use', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Code of Conduct', href: '#' },
    ],
  },
  socials: [
    { id: 'facebook', label: 'Facebook', href: '#' },
    { id: 'instagram', label: 'Instagram', href: '#' },
    { id: 'linkedin', label: 'LinkedIn', href: '#' },
    { id: 'youtube', label: 'YouTube', href: '#' },
  ],
  copyright: '© 2026 Off The Grid Design Summit. All Rights Reserved.',
}
