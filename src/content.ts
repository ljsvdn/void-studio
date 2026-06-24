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
    { label: 'Studio', href: '#process' },
    { label: 'Approach', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Start a project →', href: '#contact' },
} as const;

export const hero = {
  line1: 'We build',
  line2: 'the void',
  sub: "Between idea and interface there's a gap. VØID closes it — brand systems, product UI, and the engineering to ship them with teeth.",
  scroll: 'Scroll to enter ↓',
} as const;

export const work = {
  heading: ['Selected', 'Work'],
  blurb:
    'Recent partners and the products we shaped from nothing into something inevitable.',
} as const;

/** The reworked "void between" section — no eyebrow. */
export const process = {
  headParts: ['Everything between ', 'idea', ' and ', 'interface', '.'], // em words at odd indices
  lead:
    'The void is the work nobody sees — the decisions between a blank file and a shipped interface. Here is what we do inside it.',
  endpoints: { start: 'Idea', finish: 'Interface' },
  capabilities: [
    {
      name: 'Brand',
      desc: 'The logic before the look — naming, voice, and a system built to hold its shape at any scale.',
    },
    {
      name: 'Product',
      desc: 'Flows, edge cases, and empty states. The unglamorous detail that quietly earns a user’s trust.',
    },
    {
      name: 'Engineering',
      desc: 'We ship what we draw. Front-end, WebGL, and the performance budget to keep it honest.',
    },
    {
      name: 'Motion',
      desc: 'Weight, timing, and texture — the layer that turns a static comp into something that feels alive.',
    },
  ],
} as const;

export const footer = {
  heading: ['Let’s build', 'from nothing.'],
  meta: [
    { label: 'Studio', lines: ['Berlin / Remote', 'Mon–Fri'] },
    { label: 'Social', lines: ['Instagram', 'LinkedIn', 'Are.na'] },
  ],
  bottom: { left: '© 2026 VØID Studio', right: 'Built in the gap.' },
} as const;
