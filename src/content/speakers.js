// Speaker cards. To add a speaker: drop a 682×727 WebP into
// src/assets/images/speakers/ named after `id`, then add an entry here.
// `bio` shows on the back of the card (the last paragraph is set in bold);
// social links live in config/links.js under SPEAKER_LINKS[id].

export const speakers = {
  script: 'Who’s speaking',
  heading: 'at Off The Grid ’26?',
  more: 'More unveiling soon',
  items: [
    {
      id: 'paul-sandip',
      name: ['Paul', 'Sandip'],
      roles: ['Author of I Didn’t Say It!', '2x Red Dot Award-winner', 'Industrial Designer'],
      alt: 'Paul Sandip in a black T-shirt, holding a copy of his book “i didn’t say it!”',
      bio: [
        'A two-time Red Dot Award-winning industrial designer, Paul Sandip has engineered over 1,000 commercial products for global brands.',
        'His core philosophy, “Innovation by Observation,” drives both PAUL STUDIO’s success and his best-selling book series, “i didn’t say it!”.',
        'At Off The Grid 2026, Sandip decodes how to turn everyday human behavior into highly profitable, scalable enterprise solutions.',
      ],
    },
    {
      id: 'indroneel-mukherjee',
      name: ['Indroneel', 'Mukherjee'],
      roles: ['Fashion Designer', 'Influencer', 'Pageant Coach'],
      alt: 'Indroneel Mukherjee in a sequinned black outfit and statement earrings',
      bio: [
        'Indroneel Mukherjee has spent his career proving that visual identity is a tool for commercial leverage.',
        'As a leading designer, influencer, and core mentor for premier platforms like FFACE and Indie Royal, he has shaped East India’s fashion ecosystem and launched countless careers in entertainment.',
        'At Off The Grid 2026, Indroneel decodes how to engineer raw personal presence into a scalable, high-impact business.',
      ],
    },
    {
      id: 'charbak-dipta',
      name: ['Charbak', 'Dipta'],
      roles: ['Author of Lublu Comics', 'Eisner Nominated Graphic Novelist'],
      alt: 'Charbak Dipta in clear-framed glasses and a grey T-shirt',
      bio: [
        'An Oxford alumnus and Eisner-nominated graphic novelist, Charbak Dipta proves that independent illustration is a globally scalable asset.',
        'Having published over 60 books across India and the US, he bypassed traditional gatekeepers to build a commercial IP with his award-nominated work, The World of Lublu, and his own retail brand.',
        'At Off The Grid 2026, Charbak decodes how to turn indie visual storytelling into a highly profitable, internationally recognized enterprise.',
      ],
    },
  ],
}
