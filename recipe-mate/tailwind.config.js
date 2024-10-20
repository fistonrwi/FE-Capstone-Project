const { darkMode, theme, plugins } = require('./tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  darkMode: 'class', // or 'media' for system preference
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
