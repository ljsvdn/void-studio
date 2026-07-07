import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Fine-pointer cursor with a crisp pin and a slower inspection ring.
 * The ring expands on interactive elements.
 */
export default function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.documentElement.classList.add('has-cursor');

    const el = cursor.current!;
    let ringX = -100;
    let ringY = -100;
    let pinX = -100;
    let pinY = -100;
    let targetX = ringX;
    let targetY = ringY;
    let raf: number;

    const setMode = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, summary'
      );

      el.classList.toggle('is-interactive', Boolean(interactive));
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setMode(e.target);
    };

    const onOver = (e: MouseEvent) => {
      setMode(e.target);
    };

    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget) setMode(e.relatedTarget);
      else el.classList.remove('is-interactive');
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      pinX += (targetX - pinX) * 0.72;
      pinY += (targetY - pinY) * 0.72;

      el.style.setProperty('--cursor-ring-x', `${ringX}px`);
      el.style.setProperty('--cursor-ring-y', `${ringY}px`);
      el.style.setProperty('--cursor-pin-x', `${pinX}px`);
      el.style.setProperty('--cursor-pin-y', `${pinY}px`);

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

  return (
    <div ref={cursor} className="cursor" aria-hidden="true">
      <span className="cursor-ring" />
      <span className="cursor-pin" />
    </div>
  );
}
