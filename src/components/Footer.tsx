import type { CSSProperties } from 'react';
import PaperShader from '../shaders/PaperShader';
import { footerShader } from '../shaders/shaderConfigs';
import { footer, studio } from '../content';
import { useInView } from '../hooks/useInView';

export default function Footer() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <footer id="contact">
      {/* Paper-Design GrainGradient (amber wave). Tunable via the dev panel. */}
      <div className="footshader" aria-hidden="true">
        <PaperShader config={footerShader} />
      </div>

      <div ref={ref} className={`footin wrap ${inView ? 'rv-in' : ''}`}>
        <h2 className="disp" data-reveal style={{ '--i': 0 } as CSSProperties}>
          {footer.heading[0]}
          <br />
          {footer.heading[1]}
        </h2>

        <div className="footrow" data-reveal style={{ '--i': 1 } as CSSProperties}>
          <a href={`mailto:${studio.email}`} className="bigmail">
            {studio.email}
          </a>
          <div className="footmeta">
            <div>
              <b>{footer.studio.label}</b>
              {footer.studio.lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < footer.studio.lines.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div>
              <b>{footer.social.label}</b>
              {footer.social.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footbottom" data-reveal style={{ '--i': 2 } as CSSProperties}>
          <span>{footer.bottom.left}</span>
          <span className="void" style={{ fontSize: 16 }}>
            {studio.name}
          </span>
          <span>{footer.bottom.right}</span>
        </div>
      </div>
    </footer>
  );
}
