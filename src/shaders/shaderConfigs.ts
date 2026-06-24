/**
 * Shader registry. Each surface (hero bg, footer bg, and the three project
 * backgrounds) is one Paper-Design shader plus its tunable defaults and a
 * schema the dev tuner renders controls from.
 *
 * After tuning live, hit "Copy" in the tuner and paste the params back over
 * the matching `params` block below to bake them in.
 */

export type ShaderName = 'GrainGradient' | 'Heatmap' | 'SmokeRing';

export type ParamValue = number | string | string[];
export type ParamValues = Record<string, ParamValue>;

export type ParamField =
  | { key: string; label: string; kind: 'range'; min: number; max: number; step: number }
  | { key: string; label: string; kind: 'select'; options: string[] }
  | { key: string; label: string; kind: 'color' }
  | { key: string; label: string; kind: 'colors' };

export interface ShaderConfig {
  id: string;
  label: string;
  component: ShaderName;
  /** Non-tunable extras passed straight through (e.g. Heatmap image). */
  fixed?: Record<string, unknown>;
  params: ParamValues;
  schema: ParamField[];
}

// ---- reusable schema fragments ----
const sizing: ParamField[] = [
  { key: 'scale', label: 'Scale', kind: 'range', min: 0.1, max: 4, step: 0.01 },
  { key: 'rotation', label: 'Rotation°', kind: 'range', min: 0, max: 360, step: 1 },
  { key: 'offsetX', label: 'Offset X', kind: 'range', min: -1, max: 1, step: 0.01 },
  { key: 'offsetY', label: 'Offset Y', kind: 'range', min: -1, max: 1, step: 0.01 },
  { key: 'speed', label: 'Speed', kind: 'range', min: 0, max: 3, step: 0.01 },
];
const colorFields: ParamField[] = [
  { key: 'colors', label: 'Colors', kind: 'colors' },
  { key: 'colorBack', label: 'Background', kind: 'color' },
];

const grainSchema: ParamField[] = [
  {
    key: 'shape',
    label: 'Shape',
    kind: 'select',
    options: ['wave', 'dots', 'truchet', 'corners', 'ripple', 'blob', 'sphere'],
  },
  { key: 'softness', label: 'Softness', kind: 'range', min: 0, max: 1, step: 0.01 },
  { key: 'intensity', label: 'Intensity', kind: 'range', min: 0, max: 1, step: 0.01 },
  { key: 'noise', label: 'Grain', kind: 'range', min: 0, max: 1, step: 0.01 },
  ...sizing,
  ...colorFields,
];

const heatmapSchema: ParamField[] = [
  { key: 'contour', label: 'Contour', kind: 'range', min: 0, max: 2, step: 0.01 },
  { key: 'angle', label: 'Angle°', kind: 'range', min: 0, max: 360, step: 1 },
  { key: 'noise', label: 'Noise', kind: 'range', min: 0, max: 2, step: 0.01 },
  { key: 'innerGlow', label: 'Inner glow', kind: 'range', min: 0, max: 1, step: 0.01 },
  { key: 'outerGlow', label: 'Outer glow', kind: 'range', min: 0, max: 1, step: 0.01 },
  ...sizing,
  ...colorFields,
];

const smokeRingSchema: ParamField[] = [
  { key: 'noiseScale', label: 'Noise scale', kind: 'range', min: 0, max: 5, step: 0.01 },
  { key: 'noiseIterations', label: 'Noise iters', kind: 'range', min: 1, max: 5, step: 1 },
  { key: 'radius', label: 'Radius', kind: 'range', min: 0, max: 1, step: 0.01 },
  { key: 'thickness', label: 'Thickness', kind: 'range', min: 0, max: 0.3, step: 0.005 },
  { key: 'innerShape', label: 'Inner shape', kind: 'range', min: 0, max: 1, step: 0.01 },
  ...sizing,
  ...colorFields,
];

export const heroShader: ShaderConfig = {
  id: 'hero',
  label: 'Hero background',
  component: 'GrainGradient',
  params: {
    colors: ['#c6750c', '#68380d'],
    colorBack: '#040302',
    shape: 'corners',
    softness: 0.8,
    intensity: 0.94,
    noise: 0.8,
    speed: 0.6,
    scale: 1.8,
    rotation: 0,
    offsetX: -0.5,
    offsetY: 0,
  },
  schema: grainSchema,
};

export const footerShader: ShaderConfig = {
  id: 'footer',
  label: 'Footer background',
  component: 'GrainGradient',
  params: {
    colors: ['#c6750c', '#68380d'],
    colorBack: '#040302',
    shape: 'wave',
    softness: 1,
    intensity: 0.3,
    noise: 0.01,
    speed: 0.6,
    scale: 2.9,
    rotation: 124,
    offsetX: -0.2,
    offsetY: 0,
  },
  schema: grainSchema,
};

// ── project backgrounds — celestial bodies born from the void ──
export const seleneShader: ShaderConfig = {
  id: 'selene',
  label: 'Selene · moon',
  component: 'GrainGradient',
  params: {
    colors: ['#dfe6f2', '#8c9bb8'],
    colorBack: '#040302',
    shape: 'sphere',
    softness: 0.53,
    intensity: 0.07,
    noise: 0.25,
    speed: 1.54,
    scale: 0.5,
    rotation: 40,
    offsetX: 0,
    offsetY: 0,
  },
  schema: grainSchema,
};

export const vestaShader: ShaderConfig = {
  id: 'vesta',
  label: 'Vesta · hearth',
  component: 'Heatmap',
  fixed: { image: 'https://shaders.paper.design/images/logos/diamond.svg' },
  params: {
    colors: ['#141414', '#82290e'],
    colorBack: '#040302',
    contour: 1,
    angle: 0,
    noise: 1,
    innerGlow: 0.69,
    outerGlow: 0.2,
    speed: 0.26,
    scale: 0.71,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
  },
  schema: heatmapSchema,
};

export const heliosShader: ShaderConfig = {
  id: 'helios',
  label: 'Helios · sun',
  component: 'SmokeRing',
  params: {
    colors: ['#ffffff', '#fff424', '#ff6200'],
    colorBack: '#040302',
    noiseScale: 2.3,
    noiseIterations: 2,
    radius: 0.33,
    thickness: 0.04,
    innerShape: 0.88,
    speed: 1.22,
    scale: 0.8,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
  },
  schema: smokeRingSchema,
};

export const allShaderConfigs: ShaderConfig[] = [
  heroShader,
  seleneShader,
  vestaShader,
  heliosShader,
  footerShader,
];
