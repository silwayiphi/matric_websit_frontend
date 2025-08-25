/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",              // Vite entry
    "./public/index.html",       // CRA entry
    "./src/**/*.{js,jsx,ts,tsx}" // All React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};