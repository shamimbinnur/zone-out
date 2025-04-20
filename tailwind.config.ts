/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        archivo: ["var(--font-archivo)"],
      },
      colors: {
        // Original theme colors
        "midnight-moss": "#062822",
        "shadowy-forest": "#084137",
        "evergreen-meadow": "#2A7E3B",
        "turquoise-tide": "#48BB78",
        "moonlit-silver": "#EDF2F7",
        "ember-glow": "#E53E3E",
        "out-green-800": "#22543D",
        "out-green-1000": "#0D2B1F",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      screens: {
        _410: "410px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
