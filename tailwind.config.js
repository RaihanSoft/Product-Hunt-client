/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      yellow: {
        'custom-darkGreen': '#006400', 
      },

    },
  },
  plugins: [daisyui],
}