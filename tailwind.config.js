/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // colors: {
    //   'bg-light': '#fcfcfc',
    //   'bg-dark': '#121212',
    //   'text-lm': '#000',
    //   'text-dm': '#fff',
    //   'search-text': '#444444',
    //   'plot-lm': '#6b7280',
    //   'plot-dm': '#a5a5a5',
    //   'empty-grey': '#787878',
    //   'dark-grey': '#2e2e2f',
    //   'light-grey': '#dfdddd',
    //   'green-lt': '#749f82',
    //   'red-lt': '#DD5353'
    // },
    fontFamily: {
      reg: ['Montserrat', 'sans-serif'],
      serif: ['Teko', 'serif']
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
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-4turn)' }
        },
        revspin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(4turn)' }
        }
      },
      animation: {
        loadspin: 'spin 3s linear infinite',
        revspin: 'revspin 3s linear infinite'
      }
    }
  },
  plugins: []
}
