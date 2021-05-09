module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
      backgroundImage: {
        'hero': "url('../assets/nathan-anderson-iYO-EGosrCo-unsplash.jpg')",
      },
      fontSize: {
        doubled: '2rem',
      },
      lineHeight: {
        heading: '5rem',
      },
      colors: {
        'white': '#ffffff',
        'brown': '#4d4d4d',
        'black': '#0d0d0d',
        'blue': '#00008b'

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
