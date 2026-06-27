import { useState } from 'react';
import type { CSSProperties } from 'react';
import { nav, studio } from '../content';
import { useScrollSpy } from '../hooks/useScrollSpy';

export default function Nav() {
  const active = useScrollSpy(['work', 'process', 'contact']);
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className={`topbar${open ? ' nav-open' : ''}`}>
      <div className="navgrid">
        <a
          href="#top"
          className="navlogo void"
          aria-label={`${studio.name} — home`}
          data-reveal
          style={{ '--i': 0 } as CSSProperties}
          onClick={close}
        >
          {studio.name}
        </a>

        <button
          className="navburger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>

        <div className="navdrawer" aria-hidden={!open || undefined}>
          <div className="navdrawer-inner">
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
                      onClick={close}
                    >
                      {l.label}
                    </a>
                  );
                })}
              </nav>
              <a href={nav.cta.href} className="navcta" onClick={close}>
                {nav.cta.label}
              </a>
            </div>

            <p className="navmeta" data-reveal style={{ '--i': 2 } as CSSProperties}>
              {nav.meta.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
