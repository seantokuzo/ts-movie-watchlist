/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'bg-light': '#fcfcfc',
      'bg-dark': '#121212',
      'text-lm': '#000',
      'text-dm': '#fff',
      'search-text': '#444444',
      'plot-lm': '#6b7280',
      'plot-dm': '#a5a5a5',
      'empty-grey': '#787878',
      'dark-grey': '#2e2e2f',
      'light-grey': '#dfdddd'
    },
    fontFamily: {
      reg: ['Inter', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      backgroundImage: {
        'bg-camera': "url('/public/img/header-bg-img.jpg"
      }
    }
  },
  plugins: []
}
