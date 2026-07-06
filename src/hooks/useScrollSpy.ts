import { useEffect, useMemo, useState } from 'react';

/**
 * Tracks the section whose top has crossed the viewport's reading line.
 * Returns null while the user is above the first tracked section, so stale
 * active states do not stick after scrolling back to the hero.
 */
export function useScrollSpy(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const idsKey = useMemo(() => ids.join('|'), [ids]);

  useEffect(() => {
    const getSections = () =>
      ids
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el));

    let frame = 0;

    const update = () => {
      frame = 0;
      const sections = getSections();
      if (!sections.length) {
        setActive(null);
        return;
      }

      const readingLine = window.scrollY + window.innerHeight * 0.34;
      let next: string | null = null;

      for (const { id, el } of sections) {
        if (el.offsetTop <= readingLine) next = id;
      }

      setActive(next);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
    };
  }, [idsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
