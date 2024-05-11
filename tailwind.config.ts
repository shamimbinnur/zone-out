import type { Config } from "tailwindcss";
const { blackA, green, mauve, slate, violet } = require('@radix-ui/colors');

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif,'],
        archivo: ['var(--font-archivo)', 'inter', 'sans-serif'],
      },
      screens: {
        '1088': '1088px',
        '_410': '410px',
      },
      colors: {
        "out-green-1000": "#0E3A0F",
        "out-green-800": "#41A563",
        "out-green-600": "#538C67",
        "out-green-400": "#4CA069",
        "out-green-200": "#7ED09A",

        //  New colors
        "midnight-moss": "#14231A",
        "shadowy-forest": "#061F0F",
        "evergreen-meadow": "#02551F",
        "turquoise-tide": "#2A998C",
        "coastal-blue": "#237995",
        "ember-glow": "#801D07",
        "moonlit-silver": "#C3C3C3",

        // Radix UI colors
        ...blackA,
        ...green,
        ...mauve,
        ...slate,
        ...violet,
      },
      backgroundImage: {
        'forest': "url('/images/forest.png')",
      },
      keyframes: {
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      animation: {
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
