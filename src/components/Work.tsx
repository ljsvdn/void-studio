import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { work } from '../content';

gsap.registerPlugin(ScrollTrigger);

interface WorkProps {
  reducedMotion: boolean;
}

export default function Work({ reducedMotion }: WorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  // Which row is currently emphasized (hover or focus). null = none.
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const rows = rowsRef.current;
    if (!rows || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows.querySelectorAll('.work-row'),
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: { trigger: rows, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="mx-auto w-full max-w-[1500px] scroll-mt-24 px-6 py-[clamp(6rem,14vh,11rem)] sm:px-10"
      aria-labelledby="work-heading"
    >
      <h2
        id="work-heading"
        className="mb-12 text-xs uppercase tracking-[0.3em] text-white/50 sm:mb-16"
      >
        <span className="text-void-oxblood">({work.index})</span> — {work.label}
      </h2>

      <div ref={rowsRef} role="list" onMouseLeave={() => setActive(null)}>
        {projects.map((project, i) => {
          const isActive = active === i;
          const isDimmed = active !== null && !isActive;
          const RowTag = project.href ? 'a' : 'div';

          return (
            <RowTag
              key={project.title}
              role="listitem"
              {...(project.href ? { href: project.href } : {})}
              className={`work-row group block border-t border-white/10 py-7 transition-[opacity,border-color] duration-300 ease-out-quint sm:py-9 ${
                isActive ? 'border-void-oxblood' : ''
              } ${isDimmed ? 'opacity-40' : 'opacity-100'} ${
                i === projects.length - 1 ? 'border-b border-b-white/10' : ''
              }`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                {/* Title + accent + index */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <span
                    className={`hidden text-sm tabular-nums transition-colors duration-300 sm:inline ${
                      isActive ? 'text-void-oxblood' : 'text-white/55'
                    }`}
                  >
                    {project.index}
                  </span>
                  {/* Oxblood accent dot — scales in on emphasis. */}
                  <span
                    aria-hidden="true"
                    className={`hidden h-2.5 w-2.5 shrink-0 rounded-full bg-void-oxblood transition-all duration-300 ease-out-quint sm:inline-block ${
                      isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                  />
                  <span
                    className={`font-display leading-[0.95] tracking-tighter transition-[color,transform] duration-300 ease-out-quint ${
                      isActive ? 'text-white sm:translate-x-3' : 'text-white/70'
                    }`}
                    style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5rem)' }}
                  >
                    {project.title}
                  </span>
                </div>

                {/* Meta */}
                <div
                  className={`flex items-baseline gap-6 text-sm transition-colors duration-300 sm:flex-col sm:items-end sm:gap-1 sm:text-right ${
                    isActive ? 'text-white/80' : 'text-white/50'
                  }`}
                >
                  <span>{project.type}</span>
                  <span className="tabular-nums text-white/55">{project.year}</span>
                </div>
              </div>
            </RowTag>
          );
        })}
      </div>
    </section>
  );
}
