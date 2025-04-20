/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        "midnight-moss": "#141E1B", // Dark background
        "shadowy-forest": "#1A2A24", // Darker element backgrounds
        "moonlit-silver": "#D1D5DB", // Secondary text
        "turquoise-tide": "#2A7E3B", // Primary accent
        "evergreen-meadow": "#196F2E", // Secondary accent
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        archivo: ["var(--font-archivo)"],
      },
      screens: {
        _410: "410px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
