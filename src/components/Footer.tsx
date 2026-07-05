import type { CSSProperties } from 'react';
import { useState } from 'react';
import PaperShader from '../shaders/PaperShader';
import { footerShader } from '../shaders/shaderConfigs';
import { footer, studio } from '../content';
import { useInView } from '../hooks/useInView';

export default function Footer() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(studio.email);
      } else {
        const field = document.createElement('textarea');
        field.value = studio.email;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.left = '-9999px';
        document.body.appendChild(field);
        field.select();
        document.execCommand('copy');
        document.body.removeChild(field);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${studio.email}`;
    }
  };

  return (
    <footer id="contact">
      <div className="footshader" aria-hidden="true">
        <PaperShader config={footerShader} />
      </div>

      <div ref={ref} className={`footin ${inView ? 'rv-in' : ''}`}>
        <h2
          className="disp"
          data-reveal
          aria-label={footer.heading.join(' ')}
          style={{ '--i': 0 } as CSSProperties}
        >
          <span aria-hidden="true">
            {footer.heading[0]}
            <br />
            {footer.heading[1]}
          </span>
        </h2>

        <div className="footrow" data-reveal style={{ '--i': 1 } as CSSProperties}>
          <div className="mailgroup">
            <a href={`mailto:${studio.email}`} className="bigmail">
              {studio.email}
            </a>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied.' : ''}
            </span>
            <button
              type="button"
              className="copyemail"
              onClick={copyEmail}
              aria-label={`Copy ${studio.email}`}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="footmeta">
            <div>
              <b>{footer.studio.label}</b>
              {footer.studio.lines.map((line, i) => (
                <span key={i}>{line}</span>
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
