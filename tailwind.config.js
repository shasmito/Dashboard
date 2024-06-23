/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark':'#081F51',
        'primary':'#0A11E0',
        'gray':'#544E5D',
        'light':'#F9F9FA'
      },
    },
  },
  plugins: [],
}

