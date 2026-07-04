# Void / Pixel Alchemy Business Plan

## Positioning

Void should not present itself as a broad portfolio studio yet. The first version of the business should be an offer-first, async-first web design service built around one clear promise:

> We help consultants, service businesses, and small teams turn unclear homepages into sharper landing pages that explain the offer, build trust, and make the next action obvious.

The goal is not to look like a mature agency with a deep archive of work. The goal is to look like a focused operator with taste, diagnostic judgment, and a low-risk way to improve a prospect's most important page.

## Revenue Target

Target personal income: `$2,000/month after taxes`.

Working gross target: `$3,000/month`.

Simple paths to hit this:

- 2 homepage / landing page sprints at `$1,500`.
- 1 site sprint at `$2,000` plus 2 audits or small implementation jobs at `$500`.
- 3 smaller starter sprints at `$900-$1,200`.

The first 1-2 clients can be priced lower to create real proof, but the business should not become a cheap website shop.

## Offer

Primary offer:

**Async Homepage Sprint**

For consultants, service businesses, and small teams with a live offer but a homepage or landing page that does not explain it clearly enough.

Includes:

- Homepage or landing page UX audit.
- Rewritten first-fold messaging.
- Stronger CTA structure.
- Visual redesign.
- Responsive React / Framer-style implementation.
- One revision round.
- Async delivery through Upwork messages, email, or shared docs.

Starter pricing:

- First beta client: `$500-$750`.
- Standard starter range: `$900-$1,500`.
- After 2 testimonials or Upwork reviews: `$1,500-$2,500`.

Optional entry offer:

**Paid Async Homepage Audit**

- `$99-$250`.
- 5-10 minute Loom or written teardown.
- Prioritized fixes.
- Can be credited toward the sprint.

## Better Titles

Avoid:

`Homepage & Landing Page Designer | Framer / React / Webflow-style Sites`

That is clear, but flat. Better options:

- `Homepage conversion designer for consultants and service businesses`
- `Async homepage and landing page redesigns for service businesses`
- `Conversion-focused homepage designer for premium service offers`
- `Landing page designer for consultants, agencies, and service teams`
- `React homepage designer for clear offers and sharper CTAs`

Recommended Upwork title:

`Homepage Conversion Designer for Consultants & Service Businesses`

Recommended site headline direction:

`Sharper homepages for service businesses that sell through trust.`

Alternative site headline:

`Your homepage should make the next step obvious.`

## Current Void Site Audit

Current stack:

- Vite + React + TypeScript.
- Tailwind CSS plus a large custom CSS layer.
- Strong shader-driven dark visual identity.
- Content centralized in `src/content.ts`.
- Work rows driven by `src/data/projects.ts`.

What already works:

- The site feels distinctive and premium.
- The dark, kinetic visual system gives Void an actual point of view.
- Typography, motion, and shader atmosphere can serve as proof of craft.
- The email CTA and copy-to-clipboard interaction fit an async sales process.

What does not fit the new business:

- The site currently acts like a portfolio/manifesto, not an offer page.
- "Selected Work" lists three fictional projects, which creates the wrong trust signal.
- The hero copy is broad: "brand, product, and engineering" is too agency-shaped for the first offer.
- The process section is poetic, but not concrete enough for a buyer evaluating a small sprint.
- The footer CTA says "Let's build from nothing," which implies a broad custom project instead of a specific low-risk next step.
- The nav points to `Work`, `Approach`, `Contact`; the new page should point to `Offer`, `Proof`, `Process`, `Contact`.

## Offer-First Studio Page Rework Paths

### Path A: Sprint Sales Page

Best for fastest client acquisition.

This turns `void.pixelalchemy.studio` into a direct sales page for the Async Homepage Sprint.

Page structure:

1. Hero: who it is for, what gets improved, async CTA.
2. Problem: unclear homepages lose trust before the visitor scrolls.
3. Offer: what the sprint includes and who it fits.
4. Proof: one live project, clearly labeled as concept or beta work.
5. Process: audit, direction, build, revision, handoff.
6. Pricing: "Sprints start at $900" or "Beta slots from $750".
7. Contact: async project intake via email.

Pros:

- Clearest for Upwork and cold outreach.
- Prevents fake portfolio bloat.
- Makes the site a sales tool immediately.

Cons:

- Less mysterious and "studio" than the current version.
- Requires copy to become more concrete and less poetic.

Recommendation:

Use this for the first 30 days.

### Path B: Diagnostic Lab

Best if the acquisition angle becomes audits and teardown-led selling.

This frames Void as a diagnostic studio that finds homepage friction and turns it into clearer conversion paths.

Page structure:

1. Hero: homepage diagnosis and redesign for service businesses.
2. Diagnostic principles: message clarity, CTA friction, trust proof, mobile path.
3. One teardown: before/after annotated proof project.
4. Audit offer: paid or free qualifying audit.
5. Sprint upsell: implement the fixes.
6. Async contact.

Pros:

- Strong match for AI-assisted Google Maps audit pipeline.
- Makes "proposal as proof" feel native to the brand.
- Easier to post on X/LinkedIn because teardown content flows from the site.

Cons:

- Slightly less direct for Upwork buyers who just want someone to build the page.

### Path C: Premium Async Micro-Studio

Best if Void wants to preserve more of the current high-end studio feel.

This keeps the atmospheric identity and frames the offer as a focused studio engagement.

Page structure:

1. Hero: one focused sprint, delivered async.
2. Studio standard: taste, clarity, responsive implementation.
3. Single proof project.
4. Async workflow.
5. Limited monthly slots.
6. Contact.

Pros:

- Keeps the existing Void mood.
- Feels less like a generic conversion freelancer.
- Better long-term brand direction.

Cons:

- May be less instantly clear to practical Upwork buyers.

## Recommended Site Direction

Use a hybrid of Path A and Path C:

**A clear sprint sales page wearing the current Void visual identity.**

Do not remove the atmosphere. Remove the vagueness.

Recommended sections:

1. **Hero**
   - Headline: `Sharper homepages for service businesses that sell through trust.`
   - Subcopy: `Void redesigns and builds async homepage sprints for consultants, agencies, and service teams whose current page makes the offer harder to buy.`
   - CTA: `Send the page to review`
   - Secondary link: `See the proof project`

2. **Offer**
   - Rename current `Work` section to `Sprint`.
   - Explain deliverables in 4 compact rows: audit, message, design, build.

3. **Proof**
   - Replace the three fictional projects with one proof project.
   - Label it honestly: `Concept sprint` or `Beta sprint`.
   - Show the live URL, before/after screenshots, and 3-5 decisions.

4. **Process**
   - Replace manifesto lines with concrete async process:
     - `Send the page`
     - `Get the diagnosis`
     - `Approve the direction`
     - `Receive the build`

5. **Contact**
   - Keep email-first.
   - CTA copy: `Send your current page and the outcome you want. No sales call needed.`

## One Proof Project

Build one project only for now:

**A consultant or premium service-business homepage sprint.**

Recommended concept:

`Northline Advisory`

A fictional but realistic consultant / service business with a weak original homepage and a redesigned version.

Project should include:

- Live Vercel project URL.
- Mobile and desktop responsiveness.
- Before/after framing.
- Clear notes on what changed:
  - stronger headline,
  - one primary CTA,
  - proof moved above the fold,
  - clearer service structure,
  - better mobile contact path.

Do not build a second project until outreach has produced real market feedback.

## Acquisition Plan: First 30 Days

### Week 1: Build the sales surface

Goals:

- Rework Void into an offer-first page.
- Create the one proof project.
- Prepare Upwork assets.

Tasks:

- Rewrite site positioning around the Async Homepage Sprint.
- Replace `Selected Work` with the single proof project.
- Replace broad manifesto process with concrete async process.
- Add "no sales call needed" language to contact.
- Build the one proof project and host it on Vercel.
- Create 3 proposal templates:
  - homepage redesign,
  - landing page build,
  - async audit plus sprint.

### Week 2: Start Upwork seriously

Goals:

- Complete profile.
- Send first proposal batch.
- Learn which jobs respond.

Targets:

- 15-20 Upwork proposals.
- 3-5 short Looms only for strong-fit jobs.
- 1 profile revision based on proposal views.

Apply only when:

- Fewer than 10-15 proposals.
- Payment is verified or client history is credible.
- Budget is at least `$300`, ideally `$500+`.
- The job maps to homepage, landing page, redesign, Framer, Webflow, React, or small site build.
- The client gives enough detail to write a specific response.

Proposal CTA:

`Want me to send over a fixed-price plan? I can keep the whole project async through Upwork messages.`

### Week 3: Add AI-assisted outbound

Goals:

- Create a small local/business lead list.
- Test permission-based audit outreach.

Targets:

- 30-40 AI-assisted leads from Google Maps or manual research.
- 20-30 cold emails or contact-form messages.
- 15-20 additional Upwork proposals.
- 2-3 Loom audits for people who reply or high-fit prospects.

Cold opener:

```text
Subject: quick homepage note

Hey [Name],

I noticed a few small UX issues on your homepage that may be making it harder for visitors to contact or book with you, especially on mobile.

I do async homepage cleanups for service businesses. If useful, I can send a short 2-minute audit with the 3 changes I'd make first.

Worth sending?
```

### Week 4: Close and refine

Goals:

- Send offers.
- Close first small project or paid audit.
- Convert any work into real proof.

Targets:

- 15-20 Upwork proposals.
- 20-30 cold messages.
- 1-3 written fixed-price offers.
- 1 paid project or paid audit.

Async close:

```text
I can handle this async.

Scope:
- homepage or landing page redesign
- clearer headline and CTA structure
- responsive build
- 1 revision round
- delivery in 5 business days

Fixed price: $___

If that works, I can send the milestone structure here on Upwork.
```

## Loom Strategy

Use Looms selectively.

Do a Loom when:

- The job is very close to the offer.
- The client has a real website to inspect.
- The budget is worth the extra effort.
- The proposal count is still low.

Do not do a Loom when:

- The job is vague.
- The budget is too low.
- The client history is poor.
- The job already has too many proposals.

Ideal Loom length:

- 60-120 seconds.

Structure:

1. One thing noticed on the current page.
2. Why it may hurt trust or action.
3. What the sprint would fix first.

## AI-Assisted Audit Pipeline

Use automation to support judgment, not replace it.

For each lead, collect:

- Business name.
- Website.
- Contact path.
- Industry.
- Homepage clarity score from 1-5.
- Mobile CTA issue.
- Trust/proof issue.
- One suggested first-fold improvement.
- Contact priority from 1-5.

Only contact leads with:

- A real business model.
- A visible website problem.
- A likely value per customer high enough to justify a redesign.
- An owner, founder, manager, or clear contact route.

## Weekly Metrics

Track:

- Upwork proposals sent.
- Proposal views.
- Replies/interviews.
- Looms sent.
- Cold messages sent.
- Positive replies.
- Paid audits offered.
- Fixed-price offers sent.
- Projects closed.
- Testimonials/reviews collected.

Minimum monthly activity target:

- 50-60 Upwork proposals.
- 40-60 outbound messages.
- 8-12 Looms total.
- 1 proof project.
- 1 paid client or paid audit.

## Rules for the First 30 Days

- One proof project only.
- No broad portfolio.
- No unpaid full redesigns for random prospects.
- No sales calls required.
- Every sales message should offer an async next step.
- Upwork gets priority over X because Upwork has active buyers.
- X/LinkedIn posts should repurpose audits, teardown notes, and the proof project.
- If an activity does not create proof or conversations, limit it.

## Pivot Rules

After 50 targeted Upwork proposals:

- If views are low, improve title, first two proposal lines, and job selection.
- If views are decent but replies are low, improve proof link and proposal specificity.
- If replies happen but no closes, reduce scope, clarify price, or offer a paid audit first.

After 60 cold messages:

- If no replies, improve lead quality and shorten the opener.
- If replies ask for more info but do not buy, create a paid audit bridge.
- If people like the audit but avoid implementation, pitch a smaller first-fold sprint.

After 30 days:

- If Upwork works, double proposal volume and raise prices slowly.
- If outbound works, build a tighter lead pipeline.
- If neither works, narrow the ICP or make the entry offer smaller.

