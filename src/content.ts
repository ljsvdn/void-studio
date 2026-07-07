/**
 * All site copy in one place. Components never hard-code user-facing strings.
 * Project rows (with their shader) live in `data/projects.ts`.
 */

export const studio = {
  name: 'VØID',
  email: 'hello@pixelalchemy.studio',
} as const;

export const nav = {
  links: [
    { label: 'Proof', href: '#proof' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  meta: [
    'Async homepage diagnosis and rebuilds',
    'Written scope / no sales calls',
  ],
  cta: { label: 'Send a page', href: '#contact' },
} as const;

export const hero = {
  line1: 'Clearer offers.',
  line2: 'Sharper pages.',
  sub:
    'Async homepage and landing page sprints for consultants, agencies, and service businesses that sell through trust.',
  note: 'Send the current page. Get a written diagnosis, scoped page fix, and price. No sales call required.',
  actions: [
    { label: 'Send a page', href: '#contact', variant: 'primary' },
    { label: 'See proof', href: '#proof', variant: 'secondary' },
  ],
  scroll: 'Proof below',
} as const;

export const proof = {
  heading: ['Proof,', 'for now.'],
  intro:
    'No fake archive. No invented case studies. The site is stylized; the thinking is portable.',
  standard: {
    title: 'What this page proves',
    copy:
      'This page demonstrates the level of hierarchy, motion restraint, responsive polish, and implementation quality we bring to client pages.',
    rows: [
      {
        label: 'Offer clarity',
        text: 'The page says who it is for, what gets sharper, and what happens next.',
      },
      {
        label: 'Async buying path',
        text: 'The CTA asks for the current page, then returns a written diagnosis, scoped fix, and price.',
      },
      {
        label: 'Visual trust',
        text: 'The design has atmosphere without hiding the offer behind vague studio language.',
      },
    ],
  },
  thinking: {
    title: 'The thinking',
    label: 'Weak line, sample only.',
    copy:
      'A normal service page usually fails before the visuals: it does not name the buyer, the outcome, or the trust gap.',
    original: 'We help businesses grow online.',
    rows: [
      {
        label: 'Problem',
        text: 'No specific buyer, no concrete outcome, no reason to trust the page.',
      },
      {
        label: 'Fix direction',
        text: 'Name the buyer, name the painful problem, and make the next step feel lower-risk.',
      },
      {
        label: 'Sharper line',
        text: 'Homepage rebuilds for local service businesses getting traffic, but losing quote requests to vague copy and weak trust signals.',
      },
    ],
  },
} as const;

export const work = {
  heading: ['Selected', 'Work'],
  blurb:
    'Recent partners and the products we shaped from nothing into something inevitable.',
} as const;

export const process = {
  headParts: ['The ', 'async', ' path.'],
  lead:
    'A no-call workflow for turning a current page into a clearer offer, cleaner structure, and fixed-scope rebuild.',
  steps: [
    {
      title: 'Send',
      text: 'Email the current homepage or landing page with one sentence about what it should sell.',
    },
    {
      title: 'Diagnose',
      text: 'We reply with what is unclear, what is costing trust, and what should change first.',
    },
    {
      title: 'Scope',
      text: 'You get the fixed page scope, timeline, and price before any rebuild work starts.',
    },
    {
      title: 'Rebuild',
      text: 'The page is designed and built async, with written updates instead of sales calls.',
    },
  ],
} as const;

export const footer = {
  heading: ['Let us build', 'from nothing.'],
  studio: { label: 'Studio', lines: ['Remote', 'Mon-Fri'] },
  social: {
    label: 'Social',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/voidstudio' },
      { label: 'X', href: 'https://x.com/voidstudio' },
    ],
  },
  bottom: { left: '© 2026 VØID Studio', right: 'Built in the gap.' },
} as const;
