import PaperShader from '../shaders/PaperShader';
import { footerShader } from '../shaders/shaderConfigs';
import { footer, studio } from '../content';

export default function Footer() {
  return (
    <footer id="contact">
      {/* Paper-Design GrainGradient (amber wave). Tunable via the dev panel. */}
      <div className="footshader" aria-hidden="true">
        <PaperShader config={footerShader} />
      </div>

      <div className="footin wrap">
        <h2 className="disp">
          {footer.heading[0]}
          <br />
          {footer.heading[1]}
        </h2>

        <div className="footrow">
          <a href={`mailto:${studio.email}`} className="bigmail">
            {studio.email}
          </a>
          <div className="footmeta">
            {footer.meta.map((col) => (
              <div key={col.label}>
                <b>{col.label}</b>
                {col.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < col.lines.length - 1 && <br />}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footbottom">
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
