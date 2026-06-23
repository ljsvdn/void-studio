import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { hero, studio } from '../content';
import { DEFAULT_PARAMS, type ShaderParams } from './shaderParams';

// Code-split the WebGL shader (pulls in Three.js) so it loads after the
// content paints. Until it arrives, the `.void-fallback` gradient shows.
const Shader = lazy(() => import('./Shader'));
// DEV-only tuning panel — the dynamic import is dead-code-eliminated from
// production builds because import.meta.env.DEV is statically false there.
const ShaderControls = import.meta.env.DEV ? lazy(() => import('./ShaderControls')) : null;

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  reducedMotion: boolean;
}

export default function Hero({ reducedMotion }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const supportingRef = useRef<HTMLDivElement>(null);
  // Live shader params (driven by the dev panel; constant in production).
  const [shaderParams, setShaderParams] = useState<ShaderParams>(DEFAULT_PARAMS);

  // Split the wordmark into per-letter spans for the resolve animation.
  const letters = [...studio.name];

  useEffect(() => {
    const section = sectionRef.current;
    const wordmark = wordmarkRef.current;
    if (!section || !wordmark) return;

    const letterEls = wordmark.querySelectorAll<HTMLElement>('.hero-letter');
    const supporting = supportingRef.current;

    if (reducedMotion) {
      // Content is visible by default in markup; nothing to do but ensure
      // no transforms linger. Reveals become instant.
      gsap.set([letterEls, supporting], { clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      // --- Signature beat: the wordmark resolves in (blur + rise + fade). ---
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        letterEls,
        { yPercent: 55, autoAlpha: 0, filter: 'blur(16px)' },
        {
          yPercent: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
        }
      );
      if (supporting) {
        tl.fromTo(
          supporting.children,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
          },
          '-=0.35'
        );
      }

      // --- Parallax: wordmark drifts up + fades faster than scroll. ---
      gsap.to(wordmark, {
        yPercent: -45,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden"
      aria-label="Introduction"
    >
      {/* Fallback oxblood field — always present beneath the canvas. */}
      <div className="void-fallback absolute inset-0 -z-0" aria-hidden="true" />
      {/* WebGL shader canvas (lazy-loaded). */}
      <Suspense fallback={null}>
        <Shader reducedMotion={reducedMotion} params={shaderParams} />
      </Suspense>
      {/* DEV-only live tuning panel. */}
      {ShaderControls && (
        <Suspense fallback={null}>
          <ShaderControls params={shaderParams} onChange={setShaderParams} />
        </Suspense>
      )}
      {/* Readability scrim so type holds contrast over the brightest swirl. */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-tr from-void-bg/85 via-void-bg/30 to-transparent"
        aria-hidden="true"
      />

      {/* Content — lower-left editorial composition. */}
      <div className="relative z-content flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-[1500px] px-6 pb-[clamp(4rem,10vh,7rem)] sm:px-10">
          <h1
            ref={wordmarkRef}
            className="font-display leading-[0.82] tracking-tightest text-white"
            style={{ fontSize: 'clamp(5rem, 17vw, 13rem)' }}
          >
            <span className="sr-only">{studio.name}</span>
            <span aria-hidden="true">
              {letters.map((char, i) => (
                <span key={i} className="hero-letter">
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <div ref={supportingRef} className="mt-8 max-w-xl">
            <p className="whitespace-pre-line text-[clamp(1.25rem,2.4vw,1.9rem)] font-medium leading-tight tracking-tighter text-white text-balance">
              {hero.headline}
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
              {hero.support}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cue. */}
      <a
        href="#work"
        className="group absolute bottom-6 left-1/2 z-content flex -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white"
        aria-label="Scroll to work"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.25em]">
          {hero.scrollCue}
        </span>
        <ArrowDown
          className="h-4 w-4 motion-safe:animate-bob"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
