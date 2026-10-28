// FAQs, verbatim from design/FAQs.pdf.
//
// To add a question, append { q, a } to the list. Each entry in `a` is one paragraph:
//   'plain text'
//   [{ t: 'plain ' }, { t: 'bold', strong: true }, { t: 'link text', link: 'contactUs' }]
//   { list: ['item', 'item'] }                     → bulleted list
// Link keys are defined in src/config/links.js (NAMED_LINKS).

export const faqs = [
  {
    q: 'I’m not a designer. Can I attend?',
    a: [
      'Absolutely.',
      'Off The Grid isn\'t only for people who have “designer” in their job title. If you work with ideas, technology, people, products, brands or culture, there is something here for you.',
      [{ t: 'If you want to understand how design is shaping what comes next, you belong in the room.', strong: true }],
    ],
  },
  {
    q: 'I’m a designer. What’s in it for me?',
    a: [
      'A chance to get out of your usual circle.',
      'Meet people from different disciplines, hear how senior practitioners are thinking, discover what is changing beyond your screen and find opportunities you might not come across otherwise.',
      [{ t: 'Look beyond the work you already know.', strong: true }],
    ],
  },
  {
    q: 'Is Off The Grid only about design?',
    a: [
      'No. Design is where the conversation starts, not where it ends.',
      [
        { t: 'Off The Grid explores the intersection of ' },
        { t: 'design, technology, AI, business, culture, innovation and the future of work.', strong: true },
      ],
      'Because the most interesting things happening in design today are rarely happening inside design alone.',
    ],
  },
  {
    q: 'What happens at Off The Grid?',
    a: [
      [{ t: 'It\'s a full day of ' }, { t: 'conversations, ideas and people.', strong: true }],
      'Expect Main Stage Conversations, cross-disciplinary panels, a Community Showcase, networking, informal interactions, lunch and hospitality.',
      [{ t: 'Your pass also includes a ' }, { t: 'curated delegate kit and Certificate of Participation.', strong: true }],
    ],
  },
  {
    q: 'Why is Off The Grid a paid event?',
    a: [
      'Putting together a meaningful event takes more than putting people on a stage.',
      'Your pass helps us build the venue, production, speaker experience and hospitality that make the day worth showing up for.',
      [{ t: 'We\'re not trying to fill seats. We\'re trying to fill the room with the right people.', strong: true }],
    ],
  },
  {
    q: 'What does my pass include?',
    a: [
      'All standard Off The Grid passes include:',
      {
        list: [
          'Full-day access',
          'Main Stage Conversations',
          'Cross-disciplinary Panels',
          'Community Showcase',
          'Networking Sessions',
          'Curated Delegate Kit',
          'Lunch & Hospitality',
          'Certificate of Participation',
        ],
      },
      [
        { t: 'The Elite Pass', strong: true },
        { t: ' comes with additional access and benefits, including exclusive access to BEES, front-row networking and an exclusive delegate experience.' },
      ],
    ],
  },
  {
    q: 'Can I get a refund?',
    a: [
      [{ t: 'No. All passes are non-refundable once purchased.', strong: true }],
      'If you can no longer attend, your pass may be transferred to another person, subject to the event\'s transfer policy and deadline.',
    ],
  },
  {
    q: 'Can I transfer my pass to someone else?',
    a: [
      'Yes. Passes can be transferred, subject to the event\'s transfer policy and transfer deadline.',
      'The transfer process will be communicated to the original pass holder.',
    ],
  },
  {
    q: 'Can students attend Off The Grid?',
    a: [
      'Absolutely.',
      'Students are a big part of the creative community we want in the room. Whether you\'re studying design, technology, business, media, architecture or another creative discipline, you\'re welcome.',
      [{ t: 'You don\'t have to wait until you graduate to be part of the industry.', strong: true }],
    ],
  },
  {
    q: 'Can I come alone?',
    a: [
      'Absolutely.',
      'Off The Grid is designed to take you beyond your existing circle. Come by yourself, start a conversation and meet someone new.',
      [{ t: 'You probably won\'t be alone for long.', strong: true }],
    ],
  },
  {
    q: 'How do I get to the venue?',
    a: [
      'The venue is well connected from across Kolkata.',
      [
        { t: 'Take the ' },
        { t: 'East-West Metro to Salt Lake Sector V', strong: true },
        { t: ', then continue by auto, cab or bus to New Town Convention Centre. Direct cabs are also an easy option from central Kolkata, Howrah, Sealdah or the airport.' },
      ],
      [{ t: 'Getting there should be the easy part. We\'ll see you inside.', strong: true }],
    ],
  },
  {
    q: 'Is parking available at the venue?',
    a: [
      'Parking information will be shared closer to the event.',
      [{ t: 'If you\'re driving, ' }, { t: 'we recommend arriving a little early.', strong: true }],
    ],
  },
  {
    q: 'Is the venue accessible?',
    a: [
      'Yes. We want Off The Grid to be accessible and comfortable for everyone attending.',
      'Information about accessible entrances, lifts, restrooms and assistance will be provided closer to the event.',
      [
        { t: 'If you have a specific requirement, ' },
        { t: 'please get in touch with our team before the event.', strong: true },
      ],
    ],
  },
  {
    q: 'How can I become a speaker at Off The Grid?',
    a: [
      'We\'re always interested in people with something worth bringing to the conversation.',
      [
        { t: 'If you have a perspective, practice, project or idea that fits the spirit of Off The Grid, submit your details through ' },
        { t: 'Become a Speaker', link: 'becomeSpeaker' },
        { t: '.' },
      ],
      'Speaker opportunities are subject to curation and availability.',
    ],
  },
  {
    q: 'How can my organisation partner with Off The Grid?',
    a: [
      'There are several ways to be part of Off The Grid — from sponsorships to community, academic and media partnerships.',
      [
        { t: 'If your organisation wants to support Bengal\'s creative ecosystem, connect with new talent or reach an engaged creative audience, ' },
        { t: 'we\'d love to hear from you.', strong: true },
      ],
    ],
  },
  {
    q: 'What are the sponsorship benefits?',
    a: [
      'Loads.',
      [
        { t: 'Your brand gets seen by the people in the room — through ' },
        { t: 'branding, delegate kits, social media, on-ground visibility and curated interactions.', strong: true },
      ],
      [
        { t: 'Want to put something in the hands of delegates? Have a giveaway, offer or activation in mind? ' },
        { t: 'We\'ll find a way to make it part of the experience.', strong: true },
      ],
      [
        { t: 'And if you\'re looking to hire, meet talent, champion design or simply be associated with what\'s happening next in Bengal\'s creative scene, ' },
        { t: 'there\'s plenty we can build together.', strong: true },
      ],
    ],
  },
  {
    q: 'Do you have a Code of Conduct?',
    a: [
      'Yes.',
      [
        { t: 'Off The Grid is built around ' },
        { t: 'openness, curiosity and respect.', strong: true },
        { t: ' Everyone attending — delegates, speakers, partners, volunteers and the team — is expected to contribute to that environment.' },
      ],
      [
        { t: 'The complete ', strong: true },
        { t: 'Code of Conduct', strong: true, link: 'codeOfConduct' },
        { t: ' is available here.', strong: true },
      ],
    ],
  },
  {
    q: 'What should I bring to Off The Grid?',
    a: [
      [{ t: 'Your ' }, { t: 'pass and a valid ID', strong: true }, { t: ' are essential.' }],
      'Beyond that, bring whatever helps you make the most of the day — your phone, notebook, laptop or something to share your work and contact details.',
      'Most importantly:',
      [{ t: 'Come ready to talk to people you don\'t already know.', strong: true }],
    ],
  },
  {
    q: 'What if I still have a question?',
    a: [
      'We\'re happy to help.',
      [
        { t: 'If you can\'t find what you\'re looking for here, reach out through the ' },
        { t: 'Contact Us', strong: true, link: 'contactUs' },
        { t: ' section and we\'ll get back to you.' },
      ],
    ],
  },
]
