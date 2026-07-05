import type { CSSProperties } from 'react';
import PaperShader from '../shaders/PaperShader';
import { heroShader } from '../shaders/shaderConfigs';
import { hero } from '../content';

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Paper-Design GrainGradient bg (amber ember). */}
      <div className="heroshader" aria-hidden="true">
        <PaperShader config={heroShader} priority />
      </div>

      <div className="herocontent">
        <h1
          className="herobig disp"
          data-reveal
          aria-label={`${hero.line1} ${hero.line2}`}
          style={{ '--i': 0 } as CSSProperties}
        >
          <span aria-hidden="true">{hero.line1}</span>
          <span className="l2" aria-hidden="true">
            {hero.line2}
          </span>
        </h1>
        <div className="herorow">
          <div className="herocopy" data-reveal style={{ '--i': 1 } as CSSProperties}>
            <p className="herosub">{hero.sub}</p>
            <div className="heroactions" aria-label="Hero actions">
              {hero.actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={`heroaction ${action.variant === 'primary' ? 'is-primary' : ''}`}
                >
                  {action.label}
                </a>
              ))}
            </div>
            <p className="heronote">{hero.note}</p>
          </div>
          <div className="scrollhint" data-reveal style={{ '--i': 2 } as CSSProperties}>
            {hero.scroll}
          </div>
        </div>
      </div>
    </section>
  );
}
