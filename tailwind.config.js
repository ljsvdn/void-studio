/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Oxblood palette — discipline is the point. No other colors.
        void: {
          bg: '#0a0506', // near-black body, faint warmth
          black: '#000000', // deepest shadow
          oxblood: '#7a1420', // brighter wine accent (primary accent)
          'oxblood-deep': '#5c1018', // deep oxblood
        },
      },
      fontFamily: {
        // Geist carries body/UI/meta; Archivo (heavy/expanded) carries display.
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Archivo', 'Geist', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
      },
      maxWidth: {
        prose: '68ch', // cap line length for readability
      },
      zIndex: {
        canvas: '0',
        content: '10',
        nav: '50',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        bob: 'bob 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
