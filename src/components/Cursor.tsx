import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Minimal custom cursor — a 6px dot that follows the mouse with light lerp.
 * Expands on interactive elements. Only activates on pointer:fine devices.
 * Hidden via CSS on touch; JS never runs on those devices either.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.documentElement.classList.add('has-cursor');

    const el = dot.current!;
    let cx = -100, cy = -100, tx = cx, ty = cy;
    let raf: number;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) el.classList.add('is-big');
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) el.classList.remove('is-big');
    };

    const tick = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return <div ref={dot} className="cursor-dot" aria-hidden="true" />;
}
