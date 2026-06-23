/**
 * Shader tuning parameters — kept in a standalone module (no Three.js import)
 * so Hero and ShaderControls can import the type and defaults statically
 * without pulling Three.js into the main bundle. The heavy Shader component
 * stays code-split via its lazy import.
 *
 * Every field maps to a uniform in Shader.tsx. After tuning with the dev panel,
 * paste the "Copy params" output over DEFAULT_PARAMS below.
 */

export interface ShaderParams {
  inset: number; // black-margin fraction per side (0.1 => center 80%)
  feather: number; // softness of the inset edge
  scale: number; // pattern zoom (>1 zooms in)
  bands: number; // swirl angular band count
  twist: number; // swirl spiral tightness ("detail")
  swirlSpeed: number; // swirl rotation speed
  centerX: number; // swirl center X (in aspect units)
  centerY: number; // swirl center Y
  freq: number; // fluted-glass rib frequency
  angle: number; // rib angle (degrees)
  refraction: number; // how hard ribs bend the swirl
  aberration: number; // chromatic aberration amount
  fluteSpeed: number; // rib drift speed
  highlight: number; // specular stroke strength
  ribShade: number; // rib cylinder shading depth
  bleed: number; // chromaflow wine bleed
  exposure: number; // overall brightness
  grain: number; // film-grain strength
  vignette: number; // edge darkening floor
}

export const DEFAULT_PARAMS: ShaderParams = {
  inset: 0.1,
  feather: 0.02,
  scale: 1.0,
  bands: 2.0,
  twist: 1.7,
  swirlSpeed: 0.04,
  centerX: 1.18,
  centerY: 1.16,
  freq: 8.0,
  angle: 31.0,
  refraction: 4.0,
  aberration: 0.61,
  fluteSpeed: 0.15,
  highlight: 0.12,
  ribShade: 0.34,
  bleed: 0.12,
  exposure: 0.86,
  grain: 0.14,
  vignette: 0.4,
};
