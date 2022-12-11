/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.{html,ejs,js', './views/partials/*.{html,ejs,js}'],
  theme: {
    colors: {
      'teal': '#00ADB5',
      'black': '#222831',
      'gray': '#393E46',
      'gray-light': '#EEEEEE',
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
