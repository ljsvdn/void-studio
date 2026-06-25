import type { CSSProperties } from 'react';
import { nav, studio } from '../content';
import { useInView } from '../hooks/useInView';

/**
 * Grid header — oversized serif wordmark in the left cell, a links/CTA row over
 * a studio-meta row in the right cell, ruled like a print masthead. In normal
 * flow at the top of the first view (not floating).
 */
export default function Nav() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0 });

  return (
    <header className="topbar">
      <div ref={ref} className={`navgrid ${inView ? 'rv-in' : ''}`}>
        <a
          href="#top"
          className="navlogo void"
          aria-label={`${studio.name} — home`}
          data-reveal
          style={{ '--i': 0 } as CSSProperties}
        >
          {studio.name}
        </a>

        <div className="navtop" data-reveal style={{ '--i': 1 } as CSSProperties}>
          <nav className="navlinks" aria-label="Primary">
            {nav.links.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href={nav.cta.href} className="navcta">
            {nav.cta.label}
          </a>
        </div>

        <p className="navmeta" data-reveal style={{ '--i': 2 } as CSSProperties}>
          {nav.meta.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </p>
      </div>
    </header>
  );
}
