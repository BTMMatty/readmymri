/** @type {import('tailwindcss').Config} */
module.exports = {
  // THIS IS THE KEY - Force specificity with ID selector
  important: true,  // Change from '#__next' to just true
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',  // Add this if using src directory
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
}