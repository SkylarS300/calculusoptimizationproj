/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#0a1a0f",
        moss: "#1a3a20",
        sage: "#4ade80",
        gold: "#fbbf24",
        offwhite: "#f0f4f0",
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};