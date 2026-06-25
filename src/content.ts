/**
 * All site copy in one place. Components never hard-code user-facing strings.
 * Project rows (with their shader) live in `data/projects.ts`.
 */

export const studio = {
  name: 'VØID',
  email: 'hello@void.studio',
} as const;

export const nav = {
  links: [
    { label: 'Work', href: '#work' },
    { label: 'Approach', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  meta: [
    'A design & engineering studio for the edge of the web',
    'Berlin / Remote — Est. 2026',
  ],
  cta: { label: 'Start a project →', href: '#contact' },
} as const;

export const hero = {
  line1: 'We build',
  line2: 'the void',
  sub: 'Most studios stop at the comp. We close the gap — brand, product, and the engineering to ship it intact.',
  scroll: 'Scroll to enter ↓',
} as const;

export const work = {
  heading: ['Selected', 'Work'],
  blurb:
    'Recent partners and the products we shaped from nothing into something inevitable.',
} as const;

/**
 * The "void between" section. Header reads IDEA / INTERFACE as the filled poles
 * (odd indices), with the connective words ghosted (even indices). Body is a
 * typographic manifesto — the studio's beliefs, ordered idea → interface.
 */
export const process = {
  headParts: ['Everything between ', 'idea', ' and ', 'interface.'], // filled poles at odd indices
  lead:
    'The void is the work nobody sees — the decisions between a blank file and a shipped interface. Here is what we believe inside it.',
  // each line's pivot word (odd index) is set in the serif italic — the voice
  manifesto: [
    ['The logic comes ', 'before', ' the look.'],
    ['The unglamorous detail ', 'earns', ' the trust.'],
    ['We ship ', 'exactly', ' what we draw.'],
    ['Motion is ', 'meaning', ', never decoration.'],
  ],
} as const;

export const footer = {
  heading: ['Let’s build', 'from nothing.'],
  studio: { label: 'Studio', lines: ['Berlin / Remote', 'Mon–Fri'] },
  social: {
    label: 'Social',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/voidstudio' },
      { label: 'X', href: 'https://x.com/voidstudio' },
    ],
  },
  bottom: { left: '© 2026 VØID Studio', right: 'Built in the gap.' },
} as const;
