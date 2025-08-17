/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          900: '#4B0055',
          800: '#6B1E7A',
          400: '#B266C4',
        },
        yellow: {
          200: '#F6F3C4',
          300: '#F9E79F',
        },
      },
    },
  },
  plugins: [],
}
