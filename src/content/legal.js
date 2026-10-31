// Legal pages, verbatim from the client's PDFs (OTG_Terms_of_Use, OTG_Privacy_Policy,
// OTG_Code_of_Conduct). Each page is served at its own URL (see config/links.js).
//
// A section's `body` is a list of blocks:
//   'plain paragraph'
//   { list: ['item', { label: 'Bold lead-in', text: 'rest of the item' }] }
// Email addresses and phone numbers in the text are linked automatically.

export const legalPages = {
  terms: {
    title: 'Terms & Conditions',
    intro:
      'Please read these terms carefully before registering for, attending, or participating in the Off The Grid Design Summit 2026.',
    sections: [
      {
        id: 'acceptance',
        title: 'Acceptance of Terms & Legal Capacity',
        body: [
          'Welcome to the official platform for the Off The Grid (OTG) Design Summit. By accessing this website, submitting an application, purchasing delegate passes, registering for any sessions, or participating in any associated digital or physical events, you explicitly agree to be bound by these Terms of Use ("Terms"), our Code of Conduct, and our official Privacy Policy in their entirety.',
          { list: [{ label: 'Legal Capacity:', text: 'Passes may only be purchased by persons who can form legally binding contracts under the Indian Contract Act, 1872 (i.e., you must be 18 years of age or older). The organizers reserve the absolute right to cancel any pass and refuse access if it is discovered that you do not meet this criteria or have provided falsified information.' }] },
          'If you do not agree to these Terms, you must immediately refrain from using this website or attending the summit. These Terms apply universally to all visitors, registered delegates, speakers, sponsors, vendors, virtual participants, and exhibitors.',
        ],
      },
      {
        id: 'passes',
        title: 'Pass Purchases, Vetted Access, and Payment Terms',
        body: [
          'All delegate pass sales, registrations, and transactions made through this platform are governed by the following strict conditions to ensure the quality, security, and elite commercial nature of the summit:',
          {
            list: [
              { label: 'Vetted Access & Right of Admission:', text: "The Off The Grid Design Summit is a highly curated B2B event. For specific categories (such as 'THE ELITE' Pass), purchasing a ticket constitutes an application for entry, not a guaranteed confirmation. The curation team reserves the absolute right to vet, approve, or reject any application based on professional profile and summit requirements. If an application is rejected by the organizers, a full refund will be initiated to the original payment method." },
              { label: 'Finality of Sale:', text: 'Once an application is approved and a pass is issued, all sales are final. Passes are strictly non-refundable under any circumstances, except in the explicit event of a full summit cancellation by the organizers without any rescheduled dates.' },
              { label: 'Transfers and Substitutions:', text: "Standard delegate passes may be transferred to another individual from the same organization up to 14 business days prior to the summit's start date via written request to the official support email. Curated or Invite-Only passes (e.g., THE ELITE Pass) are strictly non-transferable to ensure the integrity of the curated room, unless explicitly approved in writing by the organizers." },
              { label: 'Invoicing & Taxes:', text: 'If you require a GST invoice for corporate accounting, you must provide your company name, GSTIN, and billing address during purchase. All investment tiers are inclusive of applicable local taxes unless explicitly stated otherwise.' },
              { label: 'Identity Verification:', text: 'Organizers and venue security reserve the right to request a valid, government-issued photographic ID that perfectly matches the registered delegate pass name upon physical check-in. Discrepancies, falsification of credentials, or misrepresentation of affiliation will result in denied entry without a refund.' },
              { label: 'Inclusions:', text: 'Your pass includes access to the respective sessions, Networking Lunch, and scheduled tea/coffee servings on the day of the summit. Any other consumption of food, beverages, or facilities at the venue will be at your own expense.' },
            ],
          },
        ],
      },
      {
        id: 'conduct',
        title: 'Code of Conduct and Venue Regulations',
        body: [
          'The Off The Grid Design Summit community values commercial growth, high-level networking, and mutual respect. All participants must strictly adhere to the official Code of Conduct:',
          {
            list: [
              { label: 'Venue Compliance (Zero Tolerance Policy):', text: "The summit is hosted at premium, regulated facilities. Adherence to all official venue rules is a strict legal requirement. The consumption, possession, or distribution of illegal substances is strictly prohibited anywhere on the premises. Furthermore, delegates must strictly adhere to the host venue's specific policies regarding alcohol, tobacco, and e-cigarettes. If the host venue restricts or bans these items, the rule applies unconditionally to all summit segments, including evening networking sessions." },
              { label: 'Expected Behavior:', text: 'Delegates must treat all participants, venue staff, speakers, and organizers with absolute respect, professionalism, and integrity.' },
              { label: 'Prohibited Conduct:', text: 'Harassment in any form (sexual, verbal, visual, physical, cyber), discrimination, intimidation, offensive comments, deliberate stalking, unauthorized solicitation, or unauthorized filming/recording of exclusive presentations is strictly prohibited. Aggressive sales pitches outside designated zones are considered a violation of B2B standards.' },
              { label: 'Ejection Policy:', text: 'The organizers and venue security reserve the right to immediately revoke access and physically eject any individual from the premises without warning or refund if their behavior violates venue rules, disrupts the summit, or compromises the safety of the event. Severe violations may be reported to law enforcement.' },
            ],
          },
        ],
      },
      {
        id: 'intellectual-property',
        title: 'Intellectual Property, Content Restrictions & Media Release',
        body: [
          'All materials distributed, presented, or available through the Off The Grid Design Summit—including branding, slide decks, proprietary insights, and recordings—are the exclusive intellectual property of the organizers or their respective third-party content providers.',
          {
            list: [
              { label: 'Limited License:', text: 'Registered attendees are granted a personal, non-exclusive, non-transferable license to consume event content for individual professional growth.' },
              { label: 'Restrictions:', text: 'No photography, filming, recording, broadcasting, or publication of the presentations, private conversations, and slide decks is permitted without express written consent. You shall not reproduce, distribute, or commercially exploit any of the Content.' },
              { label: 'No Professional Advice:', text: "The Content and presentations provided by speakers do not necessarily reflect the official views of the organizers. Suggestions or advice contained in the sessions are provided 'AS-IS' and should not be relied upon in place of professional legal, financial, or business advice." },
              { label: 'Media Release:', text: 'By attending, you grant the organizers and official media partners absolute permission to capture your image, voice, and likeness in audio, video, or photographic formats for future commercial, promotional, and archival purposes globally, without any compensation. If you do not wish to be photographed, you must request a "No Photos" lanyard at registration.' },
            ],
          },
        ],
      },
      {
        id: 'data',
        title: 'Attendee Information Usage and Data Privacy',
        body: [
          'By signing up to these Terms, you hereby give us the right to send you material pertaining to the Summit, including promotional material, and to contact you on behalf of our official sponsors. All communication will take place over your registered email address.',
          {
            list: [
              { label: 'Sponsor Interactions & Lead Generation:', text: 'Scanning your delegate badge at vendor booths, or participating in sponsored breakout sessions, constitutes your explicit consent to share your professional contact information with those specific B2B partners.' },
              { label: 'Opt-Out & Data Protection:', text: 'You have the right to opt-out from receiving promotional material by indicating your preference to our support team. We do not, under any circumstances, sell or market your personal information to unauthorized third parties.' },
            ],
          },
        ],
      },
      {
        id: 'liability',
        title: 'Disclaimers, Baggage Liability, and Limitations',
        body: [
          {
            list: [
              { label: 'B2B Interactions & Attendee Disputes:', text: 'Any dispute, commercial disagreement, or loss arising between you and any other attendee, sponsor, or participant during or after the summit shall not be the responsibility or liability of the organizers. We hold no liability for the outcomes of your networking or business deals.' },
              { label: 'Personal Belongings & Safety:', text: 'Attendees are solely responsible for their personal belongings. The organizers and venue management bear zero liability for any lost, stolen, misplaced, or damaged personal property, nor are we liable for any personal injuries sustained at the venue.' },
              { label: 'Cap on Liability:', text: 'To the maximum extent permitted by Indian law, the organizers and their affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages (including loss of profits, business opportunities, or reputation) arising from your attendance, inability to attend, or alteration of the summit schedule.' },
            ],
          },
        ],
      },
      {
        id: 'indemnity',
        title: 'Indemnity (Protection of Organizers)',
        body: [
          'You hereby agree to fully indemnify, defend, and hold harmless the Off The Grid Design Summit organizers, its partners, employees, and agents from and against all claims, penalties, damages, losses, costs, and expenses arising out of:',
          {
            list: [
              'a) Your violation of these Terms or the Code of Conduct (especially regarding the strict alcohol/substance prohibitions at regulated venues).',
              'b) Your violation of any applicable laws, venue rules, or the rights of a third party.',
              'c) Any fraudulent act, negligent behavior, or unauthorized recording/distribution of Intellectual Property on your part.',
            ],
          },
        ],
      },
      {
        id: 'force-majeure',
        title: 'Force Majeure & Event Alterations',
        body: [
          'The organizers shall not be held liable for any delays, schedule changes, alteration of advertised content/speakers, or total cancellation of the event due to circumstances beyond their reasonable control (including acts of God, sudden government mandates, venue lockdowns, pandemics, severe weather, or civil unrest). In such events, we will not be liable for any personal costs, travel, or accommodation expenses you may have incurred. The organizers reserve the right to alter the venue or timings at their sole discretion, communicating changes via your registered email.',
        ],
      },
      {
        id: 'governing-law',
        title: 'Governing Law, Legal Framework and Jurisdiction',
        body: [
          'These Terms of Use shall be governed by, construed, and enforced in accordance with the laws of the Republic of India, including but not limited to the Information Technology Act, 2000 and the Indian Contract Act, 1872. Any dispute, controversy, or claim arising out of or relating to these Terms, ticket purchases, or your participation in the summit shall be subject to the exclusive jurisdiction of the competent courts located in Kolkata, West Bengal, India.',
        ],
      },
      {
        id: 'contact',
        title: 'Official Contact Information',
        body: [
          'For any legal inquiries, GST invoice requests, transfer requests, or clarifications, please reach out via our official channels:',
          {
            list: [
              { label: 'Support Contacts:', text: 'Aditya Jaiswal (Founder & Curator) | +91 98362 46175, Sashi Kumar (Co-Curator) | +91 93309 68302' },
              { label: 'Official Email:', text: 'joinoffthegrid@gmail.com' },
              { label: 'Event Dates:', text: 'December 11, 2026 (BEES Pre-Summit) & December 12, 2026 (Off The Grid Design Summit)' },
            ],
          },
        ],
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    intro: 'How we collect, use, share, and protect your information when you engage with the Off The Grid Design Summit.',
    updated: 'Effective Date: November 2026 | Last Updated: November 2026',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        body: [
          'Welcome to the Off The Grid (OTG) Design Summit. We are committed to protecting the privacy of all elite delegates, founders, design leaders, sponsors, and enterprise gatekeepers who engage with our high-stakes B2B convergence.',
          'This Privacy Policy explains how we collect, use, share, and protect your professional and personal information when you interact with our websites, digital platforms, registration systems, and attend our physical events (including the BEES 2026 pre-summit and the OTG GROOVE afterparty).',
        ],
      },
      {
        id: 'data-controller',
        title: 'Data Controller Information',
        body: [
          'The Off The Grid Design Summit curation team acts as the primary data controller for your personal data collected in connection with the summit.',
          {
            list: [
              { label: 'Support Contacts:', text: 'Aditya Jaiswal (Founder & Curator) | +91 98362 46175, Sashi Kumar (Co-Curator) | +91 93309 68302' },
              { label: 'Contact Email:', text: 'joinoffthegrid@gmail.com' },
              { label: 'Location:', text: 'Kolkata, West Bengal, India' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        title: 'Scope and Legal Framework',
        body: [
          "This policy is designed to comply with India's Digital Personal Data Protection Act, 2023 (DPDPA), the Information Technology Act, 2000, and standard B2B data handling practices.",
        ],
      },
      {
        id: 'information-we-collect',
        title: 'Information We Collect',
        body: [
          'To curate an elite networking environment, we collect the following categories of information:',
          {
            list: [
              { label: 'Professional Data:', text: 'Name, email address, phone number, organization, job title, portfolio links, and LinkedIn profiles (for vetting Elite passes).' },
              { label: 'Event-Related Information:', text: 'Pass purchase details, session preferences, dietary requirements, and badge scanning data.' },
              { label: 'Speaker & Partner Information:', text: 'Biographies, headshots, presentation materials, and travel itineraries.' },
              { label: 'Financial Information:', text: 'Processed securely via trusted third-party payment gateways. We do not store complete payment card details but retain transaction records for GST and accounting compliance.' },
              { label: 'Technical Data:', text: 'IP addresses, device identifiers, and website analytics to optimize our platform.' },
            ],
          },
        ],
      },
      {
        id: 'how-we-use',
        title: 'How We Use Your Information',
        body: [
          'We process your data to operate the summit and facilitate high-level B2B engagements:',
          {
            list: [
              { label: 'Event Operations:', text: 'To manage ticket vetting, registrations, physical access, and customer support.' },
              { label: 'Curation & Vetting:', text: "To review applications for 'THE ELITE' passes and ensure the room maintains its premium standard." },
              { label: 'Networking & Sponsorship:', text: 'To enable sponsor-attendee interactions (only with explicit consent via badge scanning) and provide aggregated attendance analytics.' },
              { label: 'Marketing:', text: 'To send event updates, transactional emails, and future summit announcements.' },
            ],
          },
        ],
      },
      {
        id: 'sharing',
        title: 'Data Sharing and Third Parties',
        body: [
          'We do not sell your personal data. Data is only shared under strict conditions:',
          {
            list: [
              { label: 'Service Providers:', text: 'Ticketing platforms, payment processors, and analytics tools necessary for event execution.' },
              { label: 'Sponsors & Enterprise Partners:', text: "Sponsors receive anonymized, aggregated insights by default. Identifiable data (name, email, organization) is ONLY shared if you provide explicit opt-in consent (e.g., by allowing a sponsor to scan your delegate badge at their booth)." },
              { label: 'Legal Authorities:', text: 'We will disclose data to law enforcement or regulatory authorities if required by Indian law or to protect the safety and security of our event.' },
            ],
          },
        ],
      },
      {
        id: 'retention',
        title: 'Data Retention & Security',
        body: [
          'We implement robust technical and organizational security measures to protect your data against unauthorized access.',
          {
            list: [
              { label: 'Retention:', text: 'Registration and participation data are retained for up to 3 years for alumni engagement. Financial records are retained for 7 years as required by Indian tax laws.' },
              { label: 'Security:', text: 'We utilize secure servers, encrypted payment gateways, and restrict data access solely to authorized curation staff.' },
            ],
          },
        ],
      },
      {
        id: 'your-rights',
        title: 'Your Rights as a Data Principal',
        body: [
          'Under the DPDPA, you maintain strict rights over your personal data:',
          {
            list: [
              { label: 'Right to Access & Correction:', text: 'You may request a copy of your data or ask us to correct inaccuracies.' },
              { label: 'Right to Erasure:', text: 'You may request deletion of your data (subject to legal/tax retention requirements).' },
              { label: 'Right to Withdraw Consent:', text: 'You may withdraw consent for marketing or sponsor data sharing at any time by contacting our support team.' },
            ],
          },
        ],
      },
      {
        id: 'media',
        title: 'Media, Photography, and Recording Consent',
        body: [
          'By attending OTG, a high-profile commercial summit, you acknowledge that photos, videos, and audio recordings will be captured.',
          {
            list: [
              { label: 'Media Usage:', text: 'You may appear in official event media. OTG may use such media for marketing, promotional, and archival purposes.' },
              { label: 'Opt-Out:', text: 'If you do not wish to be photographed in common networking areas, you must request a "No Photos" lanyard at the registration desk. However, we cannot guarantee you will not incidentally appear in wide crowd shots.' },
            ],
          },
        ],
      },
      {
        id: 'contact',
        title: 'Contact Us & Governing Law',
        body: [
          'If you have any privacy concerns or wish to exercise your data rights, please contact:',
          {
            list: [
              { label: 'Email:', text: 'joinoffthegrid@gmail.com' },
              { label: 'Phone:', text: '+91 98362 46175 / +91 93309 68302' },
              { label: 'Jurisdiction:', text: 'This Privacy Policy shall be governed by the laws of India. Any disputes arising from our data practices shall be subject to the exclusive jurisdiction of the competent courts in Kolkata, West Bengal, India.' },
            ],
          },
        ],
      },
    ],
  },

  conduct: {
    title: 'Code of Conduct',
    intro: 'The standard every delegate, speaker, sponsor, vendor, and crew member is held to, across every part of Off The Grid 2026.',
    sections: [
      {
        id: 'standard',
        title: 'The Standard: A Safe and Elite B2B Environment',
        body: [
          'The Off The Grid (OTG) Design Summit is designed as a high-stakes, highly curated convergence for the region’s top founders, design leaders, and enterprise gatekeepers. To maintain the integrity of this room, we are strictly committed to providing a harassment-free, safe, and professional environment for everyone, regardless of gender, identity, sexual orientation, disability, race, or religion.',
          'This Code of Conduct is non-negotiable and applies universally to all VIP delegates, speakers, enterprise sponsors, vendors, and staff. It remains in full effect across all event segments, from the BEES 2026 pre-summit sessions to the main summit and the OTG GROOVE afterparty.',
        ],
      },
      {
        id: 'venue-compliance',
        title: 'Zero Tolerance: Strict Venue Compliance',
        body: [
          'The summit is hosted at premium, regulated facilities. Adherence to all official venue rules and summit policies is a strict requirement, not a suggestion.',
          {
            list: [
              { label: 'Prohibited Substances & Regulations:', text: "The consumption, possession, or distribution of illegal substances is strictly prohibited anywhere on the premises. Furthermore, delegates must strictly adhere to the host venue's specific policies regarding alcohol, tobacco, and e-cigarettes. If the host venue restricts or bans these items, the rule applies unconditionally to all summit segments, including the evening 'OTG GROOVE' networking sessions." },
              { label: 'Strict Enforcement:', text: 'Any participant found violating venue policies or summit regulations will be immediately handed over to venue security and assumes full personal and legal liability for any resulting fines, damages, or legal actions.' },
            ],
          },
        ],
      },
      {
        id: 'anti-harassment',
        title: 'Anti-Harassment & Prohibited Conduct',
        body: [
          'OTG has absolute zero tolerance for harassment, discrimination, and disruptive behavior. Prohibited conduct includes, but is not limited to:',
          {
            list: [
              { label: 'Harassment Categories:', text: 'Unwelcome sexual advances (Sexual), derogatory remarks or intimidation (Verbal), intrusive photography without consent (Visual), unwanted contact (Physical), and online bullying (Cyber/Psychological).' },
              { label: 'Commercial Disruption:', text: 'While we encourage elite networking, aggressive sales pitches outside designated networking zones, badgering attendees who have declined a conversation, or unauthorized mass distribution of marketing materials (flyer spamming) are considered severe violations of our B2B professional standards.' },
              { label: 'Disruption of Sessions:', text: 'Sustained disruption of talks, panels, or Q&A sessions.' },
            ],
          },
        ],
      },
      {
        id: 'confidentiality',
        title: 'B2B Confidentiality, Photography & Recording',
        body: [
          'As a commercial summit, high-level business strategies and proprietary insights will be shared.',
          {
            list: [
              { label: 'Confidentiality:', text: 'Unauthorized filming, recording, broadcasting, or livestreaming of exclusive speaker slide decks, private presentations, or closed-door commercial conversations is strictly prohibited.' },
              { label: 'Photography Consent:', text: 'Personal photography in common areas is permitted, but requires explicit consent when photographing individuals at close range. Attendees who do not wish to be photographed may request a "No Photos" lanyard at the registration desk. Official summit media coverage requires implicit consent by attendance.' },
            ],
          },
        ],
      },
      {
        id: 'legal-framework',
        title: 'Legal Framework & Jurisdiction',
        body: [
          'This Code of Conduct operates strictly within the framework of Indian law, including but not limited to:',
          {
            list: [
              'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act).',
              'Relevant sections of the Indian Penal Code (IPC), including Sections 354, 354A, 354D (stalking), and 509.',
              { label: 'Jurisdiction:', text: 'Any legal disputes or matters arising from violations of this Code of Conduct shall be subject to the exclusive jurisdiction of the competent courts in Kolkata, West Bengal, India.' },
            ],
          },
        ],
      },
      {
        id: 'reporting',
        title: 'Reporting Mechanism & Immediate Consequences',
        body: [
          'If you experience or witness a violation of this Code of Conduct, report it immediately to maintain the safety of the room.',
          {
            list: [
              { label: 'How to Report:', text: "Immediately approach any summit staff member clearly identified by an official 'CREW' lanyard/badge, or contact our 24/7 summit support at +91 98362 46175 / +91 93309 68302 / joinoffthegrid@gmail.com. All reports are handled with absolute confidentiality." },
              { label: 'The Ejection Policy:', text: 'The organizers and venue security reserve the right to immediately revoke access and physically eject any individual from the premises. Ejection will occur without warning and without a refund. Severe violations will result in law enforcement involvement and a permanent ban from all future OTG and partner events.' },
            ],
          },
        ],
      },
    ],
  },
}
