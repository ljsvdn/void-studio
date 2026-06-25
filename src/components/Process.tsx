import type { CSSProperties } from 'react';
import { process } from '../content';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * "Everything between idea and interface." — IDEA / INTERFACE filled as the two
 * poles, the connective words ghosted. The body is a typographic manifesto: the
 * studio's beliefs, each line rising into frame on a staggered mask reveal when
 * the section scrolls in. Reduced-motion / no-observer falls back to fully
 * visible — content is never gated on an animation that might not fire.
 */
export default function Process() {
  const reduced = useReducedMotion();
  const armed = !reduced && typeof IntersectionObserver !== 'undefined';
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const shown = !armed || inView;
  const head = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="process" id="process">
      <div ref={head.ref} className={`wrap ${head.inView ? 'rv-in' : ''}`}>
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

        <div
          ref={ref}
          className={`manifesto ${armed ? 'armed' : ''} ${shown ? 'is-in' : ''}`}
        >
          {process.manifesto.map((parts, i) => (
            <p className="mf-line" key={i} style={{ '--i': i } as CSSProperties}>
              <span className="mf-inner">
                {parts.map((part, j) =>
                  j % 2 === 1 ? (
                    <em key={j} className="mf-em">
                      {part}
                    </em>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
