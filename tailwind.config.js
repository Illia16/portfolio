/** @type {import('tailwindcss').Config} */
export default {
  safelist: ['bg-skills'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
      backgroundImage: {
        'hero': "url(../assets/nathan-anderson-iYO-EGosrCo-unsplash.jpg)",
        'skills': "url(../assets/diego-jimenez-A-NVHPka9Rk-unsplash.jpg)",
        'projects': "url(../assets/daniel-leone-v7daTKlZzaw-unsplash.jpg)",
      },
      fontSize: {
        doubled: '2rem',
      },
      lineHeight: {
        heading: '8rem',
      },
      colors: {
        'white': '#ffffff',
        'brown': '#4d4d4d',
        'black': '#0d0d0d',
        'blue': '#00008b',
        'sandyBorder': '#f0f0f0',
        'skills': {
          'js': '#f0db4f',
          'jquery': '#0769ad',
          'react': '#61dbfb',
          'git': '#211F1F',
          'html': '#F14A29',
          'css': '#2962ff',
          'sass': '#fd7e14',
          'respDesign': '#25201c',
          'a11y': '#1e90ff',
          'pairedProgramming': '#69625b',
          'vuejs': '#42b883',
          'nodejs': '#3c873a',
          'aws': '#ff9900',
        },
        'linkedin': '#0e76a8',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
