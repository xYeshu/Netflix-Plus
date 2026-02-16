/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          bg: '#141414',
          red: '#e50914',
          text: '#ffffff',
        },
      },
      boxShadow: {
        glow: '0 15px 40px rgba(229, 9, 20, 0.35)',
      },
    },
  },
  plugins: [],
};
