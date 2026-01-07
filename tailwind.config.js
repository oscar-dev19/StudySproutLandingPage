/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f6f7f6',
          100: '#e8ebe8',
          200: '#d4dbd4',
          300: '#b5c4b5',
          400: '#91a691',
          500: '#728a72',
          600: '#587058',
          700: '#475a47',
          800: '#3b4a3b',
          900: '#333e33',
        },
        earth: {
          50: '#f9f7f5',
          100: '#f2ede8',
          200: '#e4dbd2',
          300: '#d1c2b3',
          400: '#bda68e',
          500: '#ab8c70',
          600: '#9a765e',
          700: '#7f5f4f',
          800: '#694f44',
          900: '#57433a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
