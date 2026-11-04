// The pass application form at /register/, reached from a pass's "Buy now" button
// (which adds ?pass=<id>, see content/passes.js). Submissions go to api/register.js.
// Each `label` is plain text, or segments where { muted: true } renders in the softer colour.

export const register = {
  eyebrow: 'Delegate Pass Application',
  title: 'Claim your seat',
  intro: 'Tell us who you are and what you’re building. Every application is reviewed by the OTG team.',
  passLabel: 'Applying for',
  spotsLeft: 'spots left', // after the pass name, on passes with a cap
  // when no pass is on sale: after a sale ends, or once The First sells out before The Many opens.
  // Reads "The First is sold out." or the closed line, then "Next up: The Many, opens 16 Nov."
  soldOut: 'is sold out.',
  closed: 'Applications are closed right now.',
  nextUp: 'Next up:',
  closedLink: 'View passes',
  // one application per person: this email or mobile number is already in the Sheet
  duplicate: 'You’ve already applied with this email or mobile number. We’ll be in touch after review.',
  // the script's pause between applications from one connection (1 minute)
  wait: 'An application was just sent from this connection. Please wait a minute and try again.',
  // the pass filled up between loading the page and sending
  soldOutOnSend: 'Sorry, this pass sold out just before your application arrived. Reload the page to see what’s open now.',

  formHeading: 'Your Details',
  formIntro: 'Fields marked * are required.',

  // must match CATEGORIES in scripts/application-form.gs
  categoryLabel: 'Which category best describes your current position?',
  categoryPlaceholder: 'Select one or more',
  categorySearch: 'Search',
  categoryEmpty: 'No matches',
  categories: [
    'Agency Founder / Studio Owner',
    'Brand / Enterprise Representative (Tech, SaaS, Corporate)',
    'Senior Design Professional / Team Lead',
    'Elite Emerging Talent / Design Student',
    'Educator / Policy Maker',
    'Student',
  ],

  company: 'What company do you work for?',
  jobTitle: 'What is your job title?',
  linkedin: 'What is your LinkedIn profile?',
  work: [
    { t: 'Drop a link to your best work.' },
    { t: ' We actually review this to see the craft and the impact you are bringing to the summit.', muted: true },
  ],
  why: [
    { t: 'Off The Grid is a strictly curated room of 300 decision-makers and elite creators. ', muted: true },
    { t: 'Briefly tell us what you are currently building or why you belong in this room.' },
  ],

  submit: 'Submit Application',
  sending: 'Sending…',
  sent: 'Thank you, your application is in. We’ll be in touch after review.',
  error: 'Something went wrong sending your application. Please try again, or call us on',
}
