/**
 * All site copy lives here. Edit this file to change wording anywhere —
 * components never hard-code user-facing strings. Project rows live in
 * `data/projects.ts`.
 */

export const studio = {
  /** Wordmark. The Ø is U+00D8 (Latin capital O with stroke). */
  name: 'VØID',
  email: 'hello@void.studio',
  year: '© 2026',
} as const;

export const nav = {
  links: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;

export const hero = {
  headline: 'We build the void\nbetween idea and interface.',
  support:
    'A design & development studio working at the edge of web, motion, and interface.',
  scrollCue: 'Scroll',
} as const;

export const work = {
  label: 'Selected Work',
  index: '01',
} as const;

export const about = {
  label: 'Studio',
  index: '02',
  statement:
    'VØID is a studio for brands that refuse the template. We design and build digital work where motion, type, and interface meet — restrained, deliberate, and made to be felt. No noise. No filler. Just the work.',
  capabilities: [
    'Web Design',
    'Development',
    'Interaction',
    'Motion',
    'Creative Direction',
    'Art Direction',
  ],
} as const;

export const contact = {
  label: 'Contact',
  index: '03',
  headline: "Let's build something\nthat doesn't exist yet.",
  socials: [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'X / Twitter', href: 'https://x.com', icon: 'twitter' },
    { label: 'Website', href: 'https://void.studio', icon: 'globe' },
  ],
} as const;
