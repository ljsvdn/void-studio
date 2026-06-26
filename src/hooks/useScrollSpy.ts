import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently in view, using a root margin that
 * fires when the section crosses the upper-third of the viewport.
 */
export function useScrollSpy(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      );
      io.observe(el);
      return io;
    });

    return () => observers.forEach((io) => io?.disconnect());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
