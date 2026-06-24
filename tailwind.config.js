/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f1e8e1',
        'ink-dim': '#968578',
        bg: '#070505',
        line: 'rgba(241,232,225,0.13)',
      },
      fontFamily: {
        disp: ['Archivo', 'sans-serif'],
        logo: ['Instrument Serif', 'serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
