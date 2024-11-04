/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {

    extend: {
      fontFamily: {
        poppins: ['Poppins', "sans-serif"]
      },
      colors: {
        main: '#419DB4',
        default: '#FFFFFF',
        variant4: '#2A2A2A',
        variant2: '#8B9CA1'
      }

    },
  },
  plugins: [],
};
