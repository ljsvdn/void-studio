import { nav, studio } from '../content';

/** Fixed pill nav with the spinning liquid-foil border (thicker now). */
export default function Nav() {
  return (
    <nav>
      <div className="navshell">
        <div className="navin">
          <a href="#top" className="void" aria-label={`${studio.name} — home`}>
            {studio.name}
          </a>
          <div className="navlinks">
            {nav.links.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <a href={nav.cta.href} className="navcta">
            {nav.cta.label}
          </a>
        </div>
      </div>
    </nav>
  );
}
