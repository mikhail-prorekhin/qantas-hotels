/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Ciutadella: ["Ciutadella", "sans-serif"],
      },
      backgroundImage: {
         "select-image":
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4'/%3E%3C/svg%3E\")",
      },
      colors: {
        transparent: "transparent",
        black: "rgb(30, 41, 59)",
        grey: "0xf6f6f6",
      },
      backgroundPosition: {
      'select-position': 'right 0.75rem center',
      }
    },
  },
  plugins: [],
};
