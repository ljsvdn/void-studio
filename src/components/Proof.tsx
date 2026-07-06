import type { CSSProperties } from 'react';
import { proof } from '../content';
import { useInView } from '../hooks/useInView';

function ProofRows({ rows }: { rows: readonly { label: string; text: string }[] }) {
  return (
    <div className="proofrows">
      {rows.map((row) => (
        <div
          className={`proofrow${row.label === 'Sharper version' ? ' is-payoff' : ''}`}
          key={row.label}
        >
          <span>{row.label}</span>
          <p>{row.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function Proof() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.18 });

  return (
    <section className="proof" id="proof">
      <div ref={ref} className={`wrap proofwrap ${inView ? 'rv-in' : ''}`}>
        <div className="proofhead">
          <h2
            className="disp"
            data-reveal
            aria-label={proof.heading.join(' ')}
            style={{ '--i': 0 } as CSSProperties}
          >
            <span aria-hidden="true">{proof.heading[0]}</span>
            <span aria-hidden="true">{proof.heading[1]}</span>
          </h2>
          <p data-reveal style={{ '--i': 1 } as CSSProperties}>
            {proof.intro}
          </p>
        </div>

        <div className="proofgrid">
          <article
            className="proofpanel proofpanel-thinking"
            data-reveal
            style={{ '--i': 2 } as CSSProperties}
          >
            <div className="proofpanel-top">
              <div>
                <h3>{proof.thinking.title}</h3>
              </div>
              <blockquote>{proof.thinking.original}</blockquote>
            </div>
            <div className="proofevidence">
              <span className="proofsamplelabel">{proof.thinking.label}</span>
              <ProofRows rows={proof.thinking.rows} />
            </div>
          </article>

          <article className="proofpanel" data-reveal style={{ '--i': 3 } as CSSProperties}>
            <div className="proofpanel-top">
              <h3>{proof.standard.title}</h3>
              <p>{proof.standard.copy}</p>
            </div>
            <ProofRows rows={proof.standard.rows} />
          </article>
        </div>

        <p className="proofclosing" data-reveal style={{ '--i': 4 } as CSSProperties}>
          {proof.closing}
        </p>
      </div>
    </section>
  );
}
