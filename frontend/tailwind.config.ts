import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cyan: {
          400: '#22d3ee',
        },
      },
      boxShadow: {
        neon: '0 0 25px rgba(168, 85, 247, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
