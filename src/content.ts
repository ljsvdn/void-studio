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
  note: 'Send the current page. Get a written diagnosis and fixed-scope next step. No sales call required.',
  actions: [
    { label: 'Send a page', href: '#contact', variant: 'primary' },
    { label: 'See process', href: '#process', variant: 'secondary' },
  ],
  scroll: 'Process below',
} as const;

export const work = {
  heading: ['Selected', 'Work'],
  blurb:
    'Recent partners and the products we shaped from nothing into something inevitable.',
} as const;

/**
 * The "void between" section. Header reads IDEA / INTERFACE as the filled poles
 * (odd indices), with the connective words ghosted (even indices). Body is a
 * typographic manifesto: the studio's beliefs, ordered idea to interface.
 */
export const process = {
  headParts: ['Everything between ', 'idea', ' and ', 'interface.'], // filled poles at odd indices
  lead:
    'The void is the work nobody sees: the decisions between a blank file and a shipped interface. Here is what we believe inside it.',
  // each line's pivot word (odd index) is set in the serif italic: the voice
  manifesto: [
    ['The logic comes ', 'before', ' the look.'],
    ['The unglamorous detail ', 'earns', ' the trust.'],
    ['We ship ', 'exactly', ' what we draw.'],
    ['Motion is ', 'meaning', ', never decoration.'],
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
