import type { CSSProperties } from 'react';
import PaperShader from '../shaders/PaperShader';
import { heroShader } from '../shaders/shaderConfigs';
import { hero } from '../content';

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Paper-Design GrainGradient bg (amber ember). Tunable via the dev panel. */}
      <div className="heroshader" aria-hidden="true">
        <PaperShader config={heroShader} />
      </div>

      <div className="herocontent">
        <h1 className="herobig disp" data-reveal style={{ '--i': 0 } as CSSProperties}>
          {hero.line1}
          <span className="l2">{hero.line2}</span>
        </h1>
        <div className="herorow">
          <p className="herosub" data-reveal style={{ '--i': 1 } as CSSProperties}>
            {hero.sub}
          </p>
          <div className="scrollhint" data-reveal style={{ '--i': 2 } as CSSProperties}>
            {hero.scroll}
          </div>
        </div>
      </div>
    </section>
  );
}
