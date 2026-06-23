# Product

## Register

brand

## Users

Founders, creative directors, and marketing leads at design-conscious brands who are
evaluating a studio to hire for premium web, identity, and interactive/motion work. They
arrive skeptical and fluent in good design — they've seen a hundred agency sites and can
smell a template instantly. Their context: a short, high-intent visit, often from a referral
or a portfolio link, deciding in under a minute whether VØID is "the real thing" and worth a
conversation. The site is the studio's single most important proof of competence: it has to
*demonstrate* craft, not claim it.

## Product Purpose

VØID is a creative studio (web design, development, interactive/motion). This single-page site
is the studio's portfolio and first impression. It exists to convert high-end prospective
clients into inbound conversations by proving — through the artifact itself — that the studio
operates at the edge of web, motion, and interface. Success = a visitor who came to judge
leaves impressed enough to email `hello@void.studio`. The build doubles as the studio's
flagship case study; the medium is the message.

## Brand Personality

Confident, restrained, expensive. First-person-plural studio voice — declarative, unhurried,
no marketing filler. Three words: **deliberate, magnetic, exacting.** The interface should
feel like a gallery at night: dark, quiet, with one luminous thing moving slowly at the
center. Emotional goal: the visitor feels they're in the presence of taste and technical
command, and wants in. Never loud, never salesy, never cute.

## Anti-references

- **Generic SaaS landing** — no feature grids, gradient blobs, hero-metric templates, rounded
  card stacks, pastel gradients, "Sign up free" energy.
- **Cream / warm-editorial trend** — no beige/sand/parchment body, no display-serif + italic +
  mono-label magazine affectation. This stays dark oxblood; warmth comes from the palette's red,
  not from a near-white tinted bg.
- **Corporate Helvetica-min** — not sterile, safe Swiss blandness with no point of view. The
  type must have presence (hence Archivo display over a neutral neo-grotesque).
- Awwwards maximalism is *not* fully banned: technical ambition via the hero shader is welcome,
  but no cursor-trail gimmickry, no scroll-hijacking, no kinetic overload. One standout beat.

## Design Principles

1. **The artifact is the argument.** Don't describe the studio's skill; embody it. The shader,
   the motion, and the typographic command must be the proof. If a section only *tells*, cut it.
2. **One luminous thing, slowly.** Meditative restraint everywhere; a single standout moment
   (the hero wordmark resolve + the living shader). Stillness makes the one motion expensive.
3. **Discipline is the palette.** Near-black, oxblood, white. No other colors. Constraint reads
   as confidence; every added hue would cheapen it.
4. **Type carries the weight.** With no photography, hierarchy, scale, weight, and spacing do
   all the structural work. Every type decision is load-bearing.
5. **Trivially swappable content.** Real studio site — all copy and project data live in clearly
   grouped constants (`content.ts`, `projects.ts`) so the owner edits data, never markup.

## Accessibility & Inclusion

- WCAG 2.1 AA for all text/UI: body ≥ 4.5:1, large display ≥ 3:1 against its actual background
  (verify white/muted-white over the darkest shader regions, not just over flat near-black).
- `prefers-reduced-motion`: shader animation halts to a static oxblood gradient; all GSAP reveals
  become instant opacity (content visible by default, never gated on a transition that won't fire).
- Semantic landmarks (`header`/`nav`/`main`/`section`/`footer`), visible focus states on every
  interactive element, `aria-label`s on icon-only links, smooth-scroll that respects reduced motion.
- WebGL fallback: static oxblood CSS gradient if context creation fails or on low-power mobile.
