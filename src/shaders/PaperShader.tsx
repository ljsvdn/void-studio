import { GrainGradient, Heatmap, SmokeRing } from '@paper-design/shaders-react';
import { Component as ReactComponent, useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC, ReactNode } from 'react';
import type { ShaderConfig } from './shaderConfigs';
import { useShaderParams } from './ShaderStore';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Dynamic dispatch over shaders with differing prop shapes — props are fed
// from the runtime config/store, so a permissive signature is intentional.
const COMPONENTS: Record<string, FC<any>> = { GrainGradient, Heatmap, SmokeRing };

class ShaderBoundary extends ReactComponent<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

interface Props {
  config: ShaderConfig;
  className?: string;
  style?: CSSProperties;
  /** Caller-driven pause (e.g. a project shader that isn't the active one). */
  paused?: boolean;
}

/**
 * Renders the Paper-Design shader for a surface, fed by the live params from
 * the shader store (so the dev tuner updates it in real time).
 *
 * Two performance guards:
 *  - Mounts the shader only once its wrapper has a real (non-zero) size, so
 *    Paper never measures a 0×0 parent and sticks the canvas at 0×0.
 *  - Drives `speed` to 0 whenever the shader is off-screen, paused, or the user
 *    prefers reduced motion. Paper cancels its animation frame at speed 0, so
 *    off-screen / inactive shaders cost nothing instead of looping forever.
 */
export default function PaperShader({ config, className, style, paused = false }: Props) {
  const params = useShaderParams(config.id);
  const reduced = useReducedMotion();
  const ShaderComponent = COMPONENTS[config.component];

  const wrapRef = useRef<HTMLDivElement>(null);
  const [sized, setSized] = useState(false);
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);

  // Defer mount until the wrapper has a real size (fixes the 0×0 init race).
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

  // Track on-screen visibility (continuous), with a margin to pre-warm.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animate = visible && !paused && !reduced;
  const live = { ...params, speed: animate ? params.speed : 0 };
  const colors = Array.isArray(params.colors) ? params.colors : ['#1a2a6c', '#b21f1f', '#fdbb2d'];
  const colorBack = typeof params.colorBack === 'string' ? params.colorBack : '#040302';
  const fallbackBackground = `
    radial-gradient(circle at 58% 42%, ${colors[2] ?? colors[0]} 0%, ${colors[1] ?? colors[0]} 34%, transparent 62%),
    radial-gradient(circle at 36% 68%, ${colors[0]} 0%, transparent 48%),
    ${colorBack}
  `;

  return (
    <div
      ref={wrapRef}
      className={['paper-shader', className].filter(Boolean).join(' ')}
      style={{ width: '100%', height: '100%', background: fallbackBackground, ...style }}
    >
      {sized && !failed && (
        <ShaderBoundary onError={() => setFailed(true)}>
          <ShaderComponent
            style={{ width: '100%', height: '100%' }}
            {...config.fixed}
            {...live}
          />
        </ShaderBoundary>
      )}
    </div>
  );
}
