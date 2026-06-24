import { GrainGradient, Heatmap, SmokeRing } from '@paper-design/shaders-react';
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
 * the shader store (so the dev tuner updates it in real time). Fills its
 * positioned parent by default.
 */
export default function PaperShader({ config, className, style }: Props) {
  const params = useShaderParams(config.id);
  const reduced = useReducedMotion();
  const Component = COMPONENTS[config.component];

  // Freeze animation (static frame) when the user prefers reduced motion.
  const live = reduced ? { ...params, speed: 0 } : params;

  return (
    <Component
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
      {...config.fixed}
      {...live}
    />
  );
}
