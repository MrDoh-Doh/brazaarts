import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        violet: { 950: '#090617' },
        teal: { 300: '#5eead4' },
      },
    },
  },
  plugins: [],
};

export default config;
