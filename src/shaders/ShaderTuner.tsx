import { useState } from 'react';
import { allShaderConfigs, type ParamField } from './shaderConfigs';
import { useShaderStore } from './ShaderStore';

/**
 * DEV-ONLY shader tuner. Pick a surface, tune its Paper-Design shader live,
 * then "Copy" the params and paste them over that shader's `params` block in
 * shaderConfigs.ts. Gated behind import.meta.env.DEV in App, so it's stripped
 * from production builds.
 */
export default function ShaderTuner() {
  const { params, setParam, reset } = useShaderStore();
  const [activeId, setActiveId] = useState(allShaderConfigs[0].id);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = allShaderConfigs.find((c) => c.id === activeId)!;
  const current = params[activeId];

  const copy = async () => {
    await navigator.clipboard.writeText(
      `params: ${JSON.stringify(current, null, 2)},`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 top-24 z-[200] rounded-md border border-white/20 bg-black/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/70 backdrop-blur hover:text-white"
      >
        ⚙ Shaders
      </button>
    );
  }

  return (
    <aside className="fixed right-4 top-24 z-[200] max-h-[78vh] w-72 overflow-y-auto rounded-lg border border-white/20 bg-black/85 p-4 font-mono text-[11px] text-white/80 shadow-2xl backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-semibold uppercase tracking-[0.2em] text-white">
          Shader tuner
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-1 text-white/50 hover:text-white"
          aria-label="Collapse"
        >
          ✕
        </button>
      </div>

      <select
        value={activeId}
        onChange={(e) => setActiveId(e.target.value)}
        className="mb-4 w-full rounded border border-white/20 bg-black/60 px-2 py-1.5 text-white"
      >
        {allShaderConfigs.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      {config.schema.map((field) => (
        <Field
          key={field.key}
          field={field}
          value={current[field.key]}
          onChange={(v) => setParam(activeId, field.key, v)}
        />
      ))}

      <div className="sticky bottom-0 mt-2 flex gap-2 bg-black/85 pt-2">
        <button
          type="button"
          onClick={copy}
          className="flex-1 rounded border border-white/20 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
        >
          {copied ? 'Copied ✓' : 'Copy params'}
        </button>
        <button
          type="button"
          onClick={() => reset(activeId)}
          className="rounded border border-white/20 px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: ParamField;
  value: unknown;
  onChange: (v: number | string | string[]) => void;
}) {
  if (field.kind === 'range') {
    const num = Number(value);
    return (
      <label className="mb-2 block">
        <div className="mb-0.5 flex justify-between">
          <span className="text-white/60">{field.label}</span>
          <span className="tabular-nums text-white">{num.toFixed(field.step < 1 ? 2 : 0)}</span>
        </div>
        <input
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={num}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1 w-full cursor-pointer accent-white"
        />
      </label>
    );
  }

  if (field.kind === 'select') {
    return (
      <label className="mb-3 block">
        <div className="mb-0.5 text-white/60">{field.label}</div>
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-white/20 bg-black/60 px-2 py-1 text-white"
        >
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.kind === 'color') {
    return (
      <label className="mb-3 flex items-center justify-between gap-2">
        <span className="text-white/60">{field.label}</span>
        <span className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded border border-white/20"
            style={{ background: String(value) }}
          />
          <input
            type="text"
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
            className="w-24 rounded border border-white/20 bg-black/60 px-1.5 py-0.5 text-white"
          />
        </span>
      </label>
    );
  }

  // colors[]
  const colors = Array.isArray(value) ? (value as string[]) : [];
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between text-white/60">
        <span>{field.label}</span>
        <span className="flex gap-1">
          <button
            type="button"
            onClick={() => onChange([...colors, '#ffffff'])}
            className="rounded border border-white/20 px-1.5 hover:bg-white/10"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => colors.length > 1 && onChange(colors.slice(0, -1))}
            className="rounded border border-white/20 px-1.5 hover:bg-white/10"
          >
            −
          </button>
        </span>
      </div>
      {colors.map((c, i) => (
        <div key={i} className="mb-1 flex items-center gap-2">
          <span className="h-4 w-4 rounded border border-white/20" style={{ background: c }} />
          <input
            type="text"
            value={c}
            onChange={(e) => {
              const next = [...colors];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="w-full rounded border border-white/20 bg-black/60 px-1.5 py-0.5 text-white"
          />
        </div>
      ))}
    </div>
  );
}
