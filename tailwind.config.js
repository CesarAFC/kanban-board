/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    // colors: {
    //   'asparagus': '#87a878',
    // },
    fontFamily: {
      sans: ['Avenir Next', 'sans-serif'],
      // serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
}

