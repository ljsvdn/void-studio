import { GrainGradient, Heatmap, SmokeRing } from '@paper-design/shaders-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC } from 'react';
import type { ShaderConfig } from './shaderConfigs';
import { useShaderParams } from './ShaderStore';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Dynamic dispatch over shaders with differing prop shapes — props are fed
// from the runtime config/store, so a permissive signature is intentional.
const COMPONENTS: Record<string, FC<any>> = { GrainGradient, Heatmap, SmokeRing };

interface Props {
  config: ShaderConfig;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders the Paper-Design shader for a surface, fed by the live params from
 * the shader store (so the dev tuner updates it in real time).
 *
 * The shader is mounted only once its wrapper has a real (non-zero) size. Paper
 * measures its parent once on mount; if it mounts into a parent that is still
 * 0×0 (flex/font/layout not yet resolved), the canvas can stick at 0×0. Gating
 * on a measured size makes init deterministic.
 */
export default function PaperShader({ config, className, style }: Props) {
  const params = useShaderParams(config.id);
  const reduced = useReducedMotion();
  const Component = COMPONENTS[config.component];
  const live = reduced ? { ...params, speed: 0 } : params;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [sized, setSized] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measured = () => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    if (measured()) {
      setSized(true);
      return;
    }
    const ro = new ResizeObserver(() => {
      if (measured()) {
        setSized(true);
        ro.disconnect();
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    >
      {sized && (
        <Component
          style={{ width: '100%', height: '100%' }}
          {...config.fixed}
          {...live}
        />
      )}
    </div>
  );
}
