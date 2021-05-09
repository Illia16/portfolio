module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
