import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav, studio } from '../content';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Switch to the blurred/bordered state once past most of the hero.
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-nav transition-colors duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-void-bg/70 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 py-5 sm:px-10"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-display text-xl tracking-tighter text-white"
          style={{ fontVariationSettings: "'wght' 700, 'wdth' 110" }}
          aria-label={`${studio.name} — home`}
        >
          {studio.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 sm:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="-mr-2 inline-flex items-center justify-center p-2 text-white/80 transition-colors hover:text-white sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-void-bg/95 backdrop-blur-md transition-[max-height] duration-300 ease-out-quint sm:hidden ${
          menuOpen ? 'max-h-72' : 'max-h-0 border-t-transparent'
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-white/5 py-4 text-lg text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
