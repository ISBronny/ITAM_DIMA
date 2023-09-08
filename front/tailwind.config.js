/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

