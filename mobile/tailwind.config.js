/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        darkPurple: "#221C3D",
        primaryPurple: "#8162FF",
        backgroundBlack: "#141518",
        secondaryBlack: "#1A1B1F",
        grayOne: "#26272B",
        grayTwo: "#4E525B",
        grayThree: "#838896",
        Red: "#EF4444",
        darkRed: "#2F1F1F",
      },
    },
  },
  plugins: [],
};
