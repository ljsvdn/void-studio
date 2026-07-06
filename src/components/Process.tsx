import type { CSSProperties } from 'react';
import { process } from '../content';
import { useInView } from '../hooks/useInView';

export default function Process() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.16 });

  return (
    <section className="process" id="process">
      <div ref={ref} className={`wrap processwrap ${inView ? 'rv-in' : ''}`}>
        <div className="processintro">
          <h2 className="proc-head" data-reveal style={{ '--i': 0 } as CSSProperties}>
            {process.headParts.map((part, i) =>
              i % 2 === 1 ? (
                <span key={i}>{part}</span>
              ) : (
                <span key={i} className="ghost">
                  {part}
                </span>
              )
            )}
          </h2>
          <p className="proc-lead" data-reveal style={{ '--i': 1 } as CSSProperties}>
            {process.lead}
          </p>
        </div>

        <div className="processsteps">
          {process.steps.map((step, i) => (
            <article
              className="processstep"
              key={step.title}
              data-reveal
              style={{ '--i': i + 2 } as CSSProperties}
            >
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
