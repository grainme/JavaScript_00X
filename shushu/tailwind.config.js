/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        clash: ["Clash Display", "sans-serif"],
        Bricolage: ["Bricolage Grotesque", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
    },
    variants: {
      extend: {
        borderColor: ["focus"], // Add the focus variant
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
