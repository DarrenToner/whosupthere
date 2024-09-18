/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust based on where your JSX/TSX files live
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3f71c8',
        secondary: '#d74e67',
        danger: '#e3342f'
      },
      fontFamily: {
        DM: ["SUSE", "sans-serif"]
     }
    },
  },
  plugins: [],
};