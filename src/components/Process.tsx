import { useState } from 'react';
import { process } from '../content';

/**
 * "The void between" — reworked from the generic process-spectrum. No eyebrow.
 * A large interactive capability list (mirrors the Work hover language) with a
 * giant outlined ghost-word of the active capability behind it as the extra.
 */
export default function Process() {
  const caps = process.capabilities;
  const [active, setActive] = useState(0);

  return (
    <section className="process" id="process">
      <div className="ghostword" aria-hidden="true">
        {caps[active].name}
      </div>

      <div className="wrap">
        <h2 className="proc-head">
          {process.headParts.map((part, i) =>
            i % 2 === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>
          )}
        </h2>
        <p className="proc-lead">{process.lead}</p>

        <div className="caplist" onMouseLeave={() => setActive(0)}>
          {caps.map((c, i) => (
            <button
              key={c.name}
              type="button"
              className="caprow"
              aria-expanded={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="cap-idx">
                0{i + 1} / 0{caps.length}
              </span>
              <span>
                <span className="cap-name">{c.name}</span>
                <span className="cap-desc">
                  <span>{c.desc}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
