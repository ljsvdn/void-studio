import { useState } from 'react';
import type { ShaderParams } from './shaderParams';
import { DEFAULT_PARAMS } from './shaderParams';

/**
 * DEV-ONLY shader tuning panel — a lightweight stand-in for the Paper Design
 * controls. Hero renders it behind `import.meta.env.DEV`, so it is tree-shaken
 * out of production builds. Workflow: tune the sliders, hit "Copy params",
 * paste the JSON into DEFAULT_PARAMS in Shader.tsx, then delete this file and
 * its usage in Hero.tsx.
 */

type Field = { key: keyof ShaderParams; label: string; min: number; max: number; step: number };

const GROUPS: { title: string; fields: Field[] }[] = [
  {
    title: 'Frame',
    fields: [
      { key: 'inset', label: 'Inset', min: 0, max: 0.4, step: 0.005 },
      { key: 'feather', label: 'Edge feather', min: 0, max: 0.2, step: 0.005 },
      { key: 'scale', label: 'Zoom', min: 0.3, max: 3, step: 0.01 },
    ],
  },
  {
    title: 'Swirl',
    fields: [
      { key: 'bands', label: 'Bands', min: 1, max: 8, step: 0.1 },
      { key: 'twist', label: 'Twist', min: 0.1, max: 5, step: 0.05 },
      { key: 'swirlSpeed', label: 'Swirl speed', min: 0, max: 0.4, step: 0.005 },
      { key: 'centerX', label: 'Center X', min: -0.5, max: 2, step: 0.02 },
      { key: 'centerY', label: 'Center Y', min: -0.5, max: 2, step: 0.02 },
    ],
  },
  {
    title: 'Fluted glass',
    fields: [
      { key: 'freq', label: 'Rib frequency', min: 1, max: 30, step: 0.5 },
      { key: 'angle', label: 'Angle°', min: -90, max: 90, step: 1 },
      { key: 'refraction', label: 'Refraction', min: 0, max: 12, step: 0.1 },
      { key: 'aberration', label: 'Aberration', min: 0, max: 2, step: 0.01 },
      { key: 'fluteSpeed', label: 'Drift speed', min: 0, max: 1, step: 0.01 },
      { key: 'highlight', label: 'Highlight', min: 0, max: 0.5, step: 0.005 },
      { key: 'ribShade', label: 'Rib shading', min: 0, max: 0.9, step: 0.01 },
    ],
  },
  {
    title: 'Color & grain',
    fields: [
      { key: 'bleed', label: 'Chroma bleed', min: 0, max: 0.5, step: 0.005 },
      { key: 'exposure', label: 'Exposure', min: 0.2, max: 1.5, step: 0.01 },
      { key: 'grain', label: 'Grain', min: 0, max: 0.4, step: 0.005 },
      { key: 'vignette', label: 'Vignette floor', min: 0, max: 1, step: 0.02 },
    ],
  },
];

interface Props {
  params: ShaderParams;
  onChange: (next: ShaderParams) => void;
}

export default function ShaderControls({ params, onChange }: Props) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof ShaderParams, value: number) =>
    onChange({ ...params, [key]: value });

  const copy = async () => {
    const body = (Object.keys(params) as (keyof ShaderParams)[])
      .map((k) => `  ${k}: ${params[k]},`)
      .join('\n');
    await navigator.clipboard.writeText(
      `export const DEFAULT_PARAMS: ShaderParams = {\n${body}\n};`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 top-20 z-[60] rounded-md border border-white/15 bg-black/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/70 backdrop-blur hover:text-white"
      >
        ⚙ Shader
      </button>
    );
  }

  return (
    <aside className="fixed right-4 top-20 z-[60] max-h-[80vh] w-72 overflow-y-auto rounded-lg border border-white/15 bg-black/85 p-4 font-mono text-[11px] text-white/80 shadow-2xl backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-semibold uppercase tracking-[0.2em] text-white">
          Shader · dev
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-1 text-white/50 hover:text-white"
          aria-label="Collapse panel"
        >
          ✕
        </button>
      </div>

      {GROUPS.map((group) => (
        <div key={group.title} className="mb-4">
          <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-void-oxblood">
            {group.title}
          </div>
          {group.fields.map((f) => (
            <label key={f.key} className="mb-2 block">
              <div className="mb-0.5 flex justify-between">
                <span className="text-white/60">{f.label}</span>
                <span className="tabular-nums text-white">
                  {Number(params[f.key]).toFixed(3)}
                </span>
              </div>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={params[f.key]}
                onChange={(e) => set(f.key, Number(e.target.value))}
                className="h-1 w-full cursor-pointer accent-void-oxblood"
              />
            </label>
          ))}
        </div>
      ))}

      <div className="sticky bottom-0 flex gap-2 bg-black/85 pt-2">
        <button
          type="button"
          onClick={copy}
          className="flex-1 rounded border border-white/15 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
        >
          {copied ? 'Copied ✓' : 'Copy params'}
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...DEFAULT_PARAMS })}
          className="rounded border border-white/15 px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
