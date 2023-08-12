module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        quran: ["lpmq", "Arial", "sans-serif"]
      },
      colors: {
        'dark-blue': '#1E293B',
        'dark-blue-bc': '#151e32'
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/typography'),
    require('flowbite/plugin')
  ],
}