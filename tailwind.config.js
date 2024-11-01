/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a1c6d",
        secondary: "#ff8b07",
      },
      scrollBehavior: ["responsive"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
