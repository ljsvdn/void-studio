# VØID

Portfolio site for **VØID** — a design & development studio working at the edge of web,
motion, and interface. Typography-led editorial aesthetic, dark oxblood palette, zero imagery:
the type, layout, motion, and a hand-written WebGL shader carry the entire design.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS 3**
- **GSAP + ScrollTrigger** — hero wordmark resolve, scroll parallax, section reveals
- **Three.js** — the hero fragment shader (hand-written GLSL, no external shader library)
- **lucide-react** — icons only

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## The hero shader

A single full-bleed fragment shader in [`src/components/Shader.tsx`](src/components/Shader.tsx)
composites a Paper-Design-style layered stack into one oxblood field:

- **Swirl** — a polar spiral of two-tone bands.
- **ChromaFlow** — slow directional wine bleed.
- **FlutedGlass** — angled reeded-glass ribs that refract the swirl, with chromatic aberration,
  cylinder shading, and a specular stroke per rib.
- **FilmGrain** — heavy animated grain.

It's framed into the center of the viewport (a black "void" margin around it), pauses when
scrolled out of view, drops to a static oxblood gradient if WebGL is unavailable, and renders
a single still frame under `prefers-reduced-motion`.

### Tuning the shader (dev only)

In `npm run dev`, a control panel (top-right) exposes every shader parameter as a live slider.
Tune it, hit **Copy params**, and paste the output over `DEFAULT_PARAMS` in
[`src/components/shaderParams.ts`](src/components/shaderParams.ts). The panel is gated behind
`import.meta.env.DEV`, so it is stripped from production builds. To remove it entirely, delete
`src/components/ShaderControls.tsx` and its usage in `Hero.tsx`.

## Editing content

All copy lives in [`src/content.ts`](src/content.ts); the Work index is an array in
[`src/data/projects.ts`](src/data/projects.ts) — add a project by appending one object.

## Structure

```
src/
  components/   Nav · Hero · Shader · ShaderControls (dev) · Work · About · Contact
  data/         projects.ts
  hooks/        useReducedMotion.ts
  content.ts    all site copy
```
