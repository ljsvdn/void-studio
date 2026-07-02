import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown, Moon } from 'lucide-react';

const videoSrc = 'https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8';
const posterSrc =
  'https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080';

const navLinks = [
  { label: 'Offerings', href: '#offerings', hasMenu: true },
  { label: 'Client Stories', href: '#scenario' },
  { label: 'Resources', href: '#standards' },
  { label: 'Pricing', href: '#access' },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        void video.play().catch(() => undefined);
      });

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      const playVideo = () => {
        void video.play().catch(() => undefined);
      };

      video.addEventListener('loadedmetadata', playVideo);
      return () => {
        video.removeEventListener('loadedmetadata', playVideo);
      };
    }
  }, [reducedMotion]);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-black text-white" aria-labelledby="hero-title">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-55 grayscale contrast-125 saturate-0"
        poster={posterSrc}
        muted
        loop
        playsInline
        autoPlay
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" aria-hidden="true" />
      <div
        className="absolute left-[18%] top-[-22%] h-[600px] w-[600px] rounded-full bg-white/10 blur-[120px] mix-blend-screen"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-12%] right-[18%] h-[500px] w-[500px] rounded-full bg-[#2c365a]/25 blur-[120px] mix-blend-screen"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" aria-hidden="true" />

      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-transparent px-6 py-4">
        <a className="flex items-center gap-3 text-white" href="/" aria-label="Selene home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/14 bg-white/[0.06] shadow-[0_0_36px_rgba(255,255,255,0.12)] backdrop-blur-md">
            <Moon size={20} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.08em] sm:block">SELENE</span>
        </a>

        <nav className="hidden items-center gap-8 font-sans text-sm font-medium text-white/80 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.label} className="group inline-flex items-center gap-1.5 transition hover:text-white" href={link.href}>
              {link.label}
              {link.hasMenu ? (
                <ChevronDown
                  className="transition group-hover:translate-y-0.5"
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a className="hidden text-sm font-medium text-white/78 transition hover:text-white sm:block" href="#access">
            Book A Review
          </a>
          <a
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            href="#access"
          >
            Request Access
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="space-y-10 sm:space-y-12">
          <motion.p
            className="font-serif text-3xl leading-[1.1] text-white sm:text-5xl lg:text-[48px]"
            {...fadeUp}
          >
            Private wealth at the speed of equity
          </motion.p>

          <motion.h1
            id="hero-title"
            className="bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text font-sans text-6xl font-semibold leading-[0.9] tracking-tighter text-transparent sm:text-8xl lg:text-[136px]"
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Know Earlier
          </motion.h1>

          <motion.p
            className="mx-auto max-w-xl font-sans text-lg leading-[1.65] text-white sm:text-[20px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Selene maps concentrated equity, liquidity windows, and tax-aware choices before timing makes the decision.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <a
              className="group inline-flex items-center gap-5 rounded-full bg-white py-2 pl-6 pr-2 text-lg font-medium text-[#0a0400] transition hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              href="#access"
            >
              Request Review
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#3054ff] text-white transition group-hover:bg-[#2040e0]">
                <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
              </span>
            </a>
            <a
              className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white/70 backdrop-blur-sm transition hover:bg-white/5 hover:text-white"
              href="#scenario"
            >
              See Scenarios
              <ArrowRight className="transition group-hover:translate-x-1" size={17} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
