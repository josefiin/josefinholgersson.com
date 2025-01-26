import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        decoration: '#D6FF6F',
      },
      fontFamily: {
        sans: ['var(--font-switzer)'],
      },
      fontSize: {
        '10xl': '9.25rem',
      },
      spacing: {
        dscreen: '100dvh',
      },
    },
  },
  plugins: [],
} satisfies Config;
