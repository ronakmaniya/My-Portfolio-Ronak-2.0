/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        paper: 'var(--paper)',
        'paper-strong': 'var(--paper-strong)',
        edge: 'var(--edge)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        'accent-strong': 'var(--accent-strong)',
        glass: 'var(--glass)',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'Segoe UI', 'sans-serif'],
        heading: ['Space Grotesk', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: 'var(--shadow)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s ease forwards',
      },
    },
  },
  plugins: [],
}
