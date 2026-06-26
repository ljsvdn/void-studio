import { useState } from 'react';
import type { CSSProperties } from 'react';
import PaperShader from '../shaders/PaperShader';
import { projects } from '../data/projects';
import { work } from '../content';
import { useInView } from '../hooks/useInView';

export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="work" id="work">
      <div ref={ref} className={`wrap ${inView ? 'rv-in' : ''}`}>
        <div className="workhead">
          <h2 className="disp" data-reveal style={{ '--i': 0 } as CSSProperties}>
            {work.heading[0]}
            <br />
            {work.heading[1]}
          </h2>
          <p data-reveal style={{ '--i': 1 } as CSSProperties}>
            {work.blurb}
          </p>
        </div>

        <div className="blendstage">
          <div className="stagefx" aria-hidden="true">
            {projects.map((p, i) => (
              <div key={p.name} className={`bodylayer ${active === i ? 'is-active' : ''}`}>
                <PaperShader config={p.shader} paused={active !== i} />
              </div>
            ))}
          </div>
          <div className={`stagescrim ${active !== null ? 'is-on' : ''}`} aria-hidden="true" />

          <div className="workgrid" onMouseLeave={() => setActive(null)}>
            {projects.map((p, i) => (
              <a
                key={p.name}
                href="#work"
                className="wrow"
                data-reveal
                aria-label={`${p.name} — ${p.meta.join(' ')}`}
                style={{ '--i': i + 2 } as CSSProperties}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="wnum">{'0' + (i + 1)}</span>
                <span className="name">{p.name}</span>
                <span className="meta">
                  {p.meta[0]}
                  <br />
                  {p.meta[1]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
