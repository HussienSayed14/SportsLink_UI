/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Add DaisyUI plugin here
  daisyui: {
    themes: ["light"], // Disable DaisyUI themes (including dark mode)
  },
};
