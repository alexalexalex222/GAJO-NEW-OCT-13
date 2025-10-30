import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx,md,mdx,json}',
    './styles/**/*.{ts,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#0B1115',
        nightLight: '#0F151A',
        mist: '#E6F0F5',
        mistMuted: '#9FB2BF',
        teal: '#00B887',
        blue: '#1A9BFF',
      },
      borderRadius: {
        xl: '18px',
        '2xl': '24px',
      },
      boxShadow: {
        glass: '0 12px 40px rgba(7, 16, 22, 0.45)',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};

export default config;
