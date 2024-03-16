import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "out-green-1000": "#0E3A0F",
        "out-green-800": "#358B53",
        "out-green-600": "#538C67",
        "out-green-400": "#4CA069",
        "out-green-200": "#78B98E",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'forest': "url('/images/forest.png')",
      }
    },
  },
  plugins: [],
};
export default config;
