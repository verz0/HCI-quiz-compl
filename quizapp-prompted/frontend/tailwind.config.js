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
        'greys':'#7D8D96',
      },
      fontFamily: {
        'thefont': ['PT Serif','serif'],
      }
    },
  },
  plugins: [],
}