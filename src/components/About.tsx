import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '../content';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  reducedMotion: boolean;
}

export default function About({ reducedMotion }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-statement',
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.about-cap',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.about-caps', start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t border-white/10 scroll-mt-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 py-[clamp(6rem,14vh,11rem)] sm:px-10">
        <h2
          id="about-heading"
          className="mb-12 text-xs uppercase tracking-[0.3em] text-white/50 sm:mb-16"
        >
          <span className="text-void-oxblood">({about.index})</span> — {about.label}
        </h2>

        <p className="about-statement max-w-[20ch] text-[clamp(1.75rem,4.6vw,3.25rem)] font-medium leading-[1.12] tracking-tighter text-white text-balance sm:max-w-[24ch] lg:max-w-[68ch]">
          {about.statement}
        </p>

        <ul className="about-caps mt-16 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/10 pt-10 sm:mt-20 md:grid-cols-3">
          {about.capabilities.map((cap) => (
            <li
              key={cap}
              className="about-cap text-base text-white/60 sm:text-lg"
            >
              {cap}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
