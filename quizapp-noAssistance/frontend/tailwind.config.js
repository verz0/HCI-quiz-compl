/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-texts': '#04507A',
        'right-blue': '#04507A',
        'hover-color': '#04507A',
      },
      fontFamily: {
        'thefont': ['PT Serif','serif'],
      }
    },
  },
  plugins: [],
}