/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7038",
        secondary: "#252525",
        tertiary: "#666666",
        info: "#ECECEC",
      }
    },
  },
  plugins: [],
}