import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Instagram, Twitter } from 'lucide-react';
import { contact, studio } from '../content';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  instagram: Instagram,
  twitter: Twitter,
  globe: Globe,
} as const;

interface ContactProps {
  reducedMotion: boolean;
}

export default function Contact({ reducedMotion }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 78%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden border-t border-white/10 scroll-mt-24"
      aria-labelledby="contact-heading"
    >
      {/* Faint oxblood bleed at the very bottom — bookends the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-void-oxblood-deep/30 via-void-oxblood-deep/5 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 py-[clamp(6rem,16vh,12rem)] sm:px-10">
        <h2
          id="contact-heading"
          className="contact-reveal mb-12 text-xs uppercase tracking-[0.3em] text-white/50 sm:mb-16"
        >
          <span className="text-void-oxblood">({contact.index})</span> — {contact.label}
        </h2>

        <p className="contact-reveal max-w-[16ch] whitespace-pre-line text-[clamp(2.25rem,6.5vw,5rem)] font-semibold leading-[0.98] tracking-tightest text-white text-balance">
          {contact.headline}
        </p>

        <a
          href={`mailto:${studio.email}`}
          className="contact-reveal group mt-12 inline-block text-[clamp(1.5rem,4vw,2.75rem)] font-medium tracking-tighter text-white sm:mt-16"
        >
          <span className="bg-gradient-to-r from-void-oxblood to-void-oxblood bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 ease-out-quint group-hover:bg-[length:100%_2px]">
            {studio.email}
          </span>
        </a>

        {/* Footer row */}
        <div className="contact-reveal mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:mt-32">
          <span
            className="font-display tracking-tighter text-white/70"
            style={{ fontVariationSettings: "'wght' 600, 'wdth' 110" }}
          >
            {studio.name}
          </span>

          <div className="flex items-center gap-6">
            <span className="tabular-nums">{studio.year}</span>
            <ul className="flex items-center gap-5">
              {contact.socials.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex text-white/50 transition-colors duration-200 hover:text-white"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
