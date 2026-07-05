import { Component as ReactComponent, useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC, ReactNode } from 'react';
import type { ShaderConfig } from './shaderConfigs';
import { useShaderParams } from './ShaderStore';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Dynamic dispatch over shaders with differing prop shapes. The import is
// deliberately deferred so first paint can happen before WebGL setup.
type ShaderModule = typeof import('@paper-design/shaders-react');
let shaderModulePromise: Promise<ShaderModule> | null = null;

function loadShaderModule() {
  shaderModulePromise ??= import('@paper-design/shaders-react').catch((error) => {
    shaderModulePromise = null;
    throw error;
  });
  return shaderModulePromise;
}

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
  /** Above-the-fold shader that should not depend on IntersectionObserver. */
  priority?: boolean;
}

/**
 * Renders the Paper-Design shader for a surface, fed by the live params from
 * the shader store (so the dev tuner updates it in real time).
 *
 * Two performance guards:
 *  - Mounts the shader only once its wrapper has a real (non-zero) size, so
 *    Paper never measures a 0x0 parent and sticks the canvas at 0x0.
 *  - Drives `speed` to 0 whenever the shader is off-screen, paused, or the user
 *    prefers reduced motion. Paper cancels its animation frame at speed 0, so
 *    off-screen / inactive shaders cost nothing instead of looping forever.
 */
export default function PaperShader({
  config,
  className,
  style,
  paused = false,
  priority = false,
}: Props) {
  const params = useShaderParams(config.id);
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const retriesRef = useRef(0);
  const [sized, setSized] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [ShaderComponent, setShaderComponent] = useState<FC<any> | null>(null);

  // Defer mount until the wrapper has a real size (fixes the 0x0 init race).
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
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = priority || visible;
  const shouldLoadShader = sized && active && !paused && !reduced && !failed;

  useEffect(() => {
    if (!shouldLoadShader || ShaderComponent) return;
    let cancelled = false;
    loadShaderModule()
      .then((mod) => {
        if (!cancelled) setShaderComponent(() => mod[config.component] as FC<any>);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [ShaderComponent, attempt, config.component, shouldLoadShader]);

  const handleShaderError = () => {
    if (priority && retriesRef.current < 2) {
      retriesRef.current += 1;
      setShaderComponent(null);
      setAttempt(retriesRef.current);
      return;
    }
    setFailed(true);
  };

  const animate = active && !paused && !reduced;
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
      className={[
        'paper-shader',
        !ShaderComponent && !failed ? 'is-shader-pending' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{ width: '100%', height: '100%', background: fallbackBackground, ...style }}
    >
      {ShaderComponent && !failed && (
        <ShaderBoundary key={attempt} onError={handleShaderError}>
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

