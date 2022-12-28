/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  content: ['./views/*.{html,ejs,js,jpg', './views/partials/*.{html,ejs,js,jpg}'],
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
    extend: {
      backgroundImage: {
        'home': "url('../public/images/childrenplaying.jpg')"
      }
    },
  },
  plugins: [],
}
