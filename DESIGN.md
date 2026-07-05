---
name: "Void / Pixel Alchemy"
description: "Offer-first async micro-studio for sharper homepages and landing pages."
colors:
  void-black: "#040302"
  ash-ink: "#f1e8e1"
  dim-ember: "#968578"
  hairline-ash: "#f1e8e121"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(4rem, 10vw, 8.75rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "0.08em"
  logo:
    fontFamily: "Instrument Serif, serif"
    fontSize: "clamp(3.5rem, 8.5vw, 7.75rem)"
    fontWeight: 400
    lineHeight: 0.78
rounded:
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "40px"
  xl: "64px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.ash-ink}"
    textColor: "{colors.void-black}"
    rounded: "{rounded.pill}"
    padding: "11px 17px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ash-ink}"
    rounded: "{rounded.pill}"
    padding: "11px 17px"
---

# Design System: Void / Pixel Alchemy

## 1. Overview

**Creative North Star: "The dark proof room"**

Void is a restrained, cinematic brand surface for an async micro-studio. The page should feel like entering a quiet room where one luminous object is being examined: the offer, the proof project, the process. Atmosphere matters, but clarity leads. The design should prove taste without burying the service behind abstract studio language.

The current system uses near-black space, warm ash text, ruled structure, grain, scanlines, and shader-backed visual moments. That atmosphere should remain. The next evolution should reduce fake-portfolio signals and make every section answer a buyer question: what is sold, why it matters, what proof exists, and how the async process works.

**Key Characteristics:**

- Dark, quiet, high-contrast, and tactile.
- One strong visual event at a time.
- Huge type, sparse copy, precise controls.
- No sales-call pressure, no portfolio theater.
- Technical enough to feel capable, restrained enough to feel premium.

## 2. Colors

The palette is almost monochrome: off-black, warm ash, dim ember, and shader-driven oxblood light. Color should feel like heat inside a dark room, not a decorative accent system.

### Primary

- **Void Black**: The global background and dominant field. It should be used as the default surface, never replaced with pure black.
- **Ash Ink**: The main text and primary action color. It carries confidence and contrast.

### Neutral

- **Dim Ember**: Muted metadata, nav support text, secondary labels, and low-emphasis copy.
- **Hairline Ash**: Dividers and rules. It should stay thin and quiet.

### Named Rules

**The One Luminous Thing Rule.** Let the shader, one giant type moment, or one proof artifact dominate a fold. Do not make every component glow.

**The No Generic Accent Rule.** Do not add cyan, violet, blue-purple gradients, or neon accents. Color lives in the shader and the warm ash system.

## 3. Typography

**Display Font:** Archivo, pending replacement  
**Body Font:** Space Grotesk, pending replacement  
**Logo Font:** Instrument Serif, used only for the VØID mark and occasional voice details

**Character:** The current type is strong but too close to common AI/studio defaults. Future font work should find a sharper physical reference: an art-book index, a machine-room plaque, a kiln-stamped maker mark, or a gallery wall label with more tension than polish.

### Hierarchy

- **Display** (900, fluid clamp, 0.86 line-height): Hero and major section statements. Large, compressed, architectural.
- **Headline** (800, fluid clamp, near 1.0 line-height): Section headings and proof titles.
- **Title** (650-800, 1.25rem-2rem): Component-level emphasis.
- **Body** (400, 1rem-1.0625rem, 1.5-1.65 line-height): Short explanatory copy, capped near 65ch.
- **Label** (600-650, 0.75rem, tracked uppercase): Navigation, compact controls, and metadata only.

### Named Rules

**The Type Must Do Work Rule.** If a section needs an icon grid or decorative badge to feel designed, the typography and spacing are not strong enough yet.

**The Font Replacement Rule.** Archivo, Space Grotesk, and Instrument Serif are allowed as current-state tokens, but the next typography pass should replace at least the display/body pairing with a less reflexive choice.

## 4. Elevation

Void is flat by default. Depth comes from layering, shader light, thin rules, opacity changes, grain, and motion. Avoid standard card shadows. Hover states should shift opacity, stroke, or transform, not create floating SaaS cards.

### Named Rules

**The Flat Room Rule.** Surfaces do not float at rest. If something needs emphasis, use scale, space, contrast, or shader proximity before shadow.

## 5. Components

### Buttons

- **Shape:** Pill control, tight and utilitarian (999px radius).
- **Primary:** Ash Ink on Void Black inversion for the main async action.
- **Secondary:** Transparent field, ash border, ash text.
- **Hover / Focus:** Subtle background shift, border shift, and transform. Focus must remain visibly outlined.

### Navigation

- **Style:** Large VØID mark at left, ruled masthead, compact uppercase links.
- **Desktop:** Split grid masthead with metadata and CTA on the right.
- **Mobile:** Logo and burger row with a collapsing grid-row drawer.
- **Behavior:** Active links underline. The CTA should describe the async action, not a generic project start.

### Hero

- **Style:** Full-bleed dark shader field with a giant two-line offer statement.
- **Copy:** Studio-like but concrete. Avoid generic "we build the future" phrasing.
- **Actions:** One primary action and one quiet secondary link. Do not add a third hero CTA.

### Work / Proof Rows

- **Current shape:** Large ruled rows with hover-triggered shader bodies.
- **Future role:** Replace the fake archive with one proof project or sprint artifact. The row interaction can stay, but the content must be honest.

### Contact

- **Style:** Email-first, async-first, with a large typographic invitation.
- **Behavior:** Copy email affordance is useful and should remain.
- **Copy:** Make "no sales call needed" visible near the CTA when the footer is reworked.

## 6. Do's and Don'ts

### Do:

- **Do** keep the dark gallery atmosphere while making the offer explicit.
- **Do** use one proof artifact as the central evidence source.
- **Do** make async delivery feel like a professional operating model.
- **Do** use warm ash text and thin rules rather than decorative card stacks.
- **Do** let section pacing breathe, especially around the hero and proof project.
- **Do** keep motion slow, deliberate, and respectful of reduced-motion preferences.

### Don't:

- **Don't** build generic SaaS feature grids, hero metrics, pastel gradients, bento cards, or "book a demo" energy.
- **Don't** fake portfolio depth with invented case studies or inflated client lists.
- **Don't** compete as a cheap marketplace freelancer with a long tool menu.
- **Don't** hide the offer behind vague premium-studio mystery.
- **Don't** use purple-blue gradients, glass cards, repeated eyebrow labels, generic rounded CTA stacks, or default font pairings that feel scraped from a template.
- **Don't** use salesy conversion-copy tropes. Void sells through diagnosis, proof, and restraint.
