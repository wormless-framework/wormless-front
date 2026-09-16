import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        chakra: ['Chakra Petch', 'sans-serif'], 
        teko: ['Teko', 'sans-serif'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}