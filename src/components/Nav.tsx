import type { CSSProperties } from 'react';
import { nav, studio } from '../content';
import { useScrollSpy } from '../hooks/useScrollSpy';

export default function Nav() {
  const active = useScrollSpy(['work', 'process', 'contact']);

  return (
    <header className="topbar">
      <div className="navgrid">
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
            {nav.links.map((l) => {
              const id = l.href.replace('#', '');
              const isActive = active === id;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  className={isActive ? 'is-active' : ''}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {l.label}
                </a>
              );
            })}
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
