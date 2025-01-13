import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./components/*.{js,vue,ts}", "./pages/*.{js,vue,ts}", "./layouts/*.{js,vue,ts}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['var(--dmsans-font)', ...fontFamily.sans],
      serif: ['var(--inter-font)', ...fontFamily.serif],
    },
    extend: {
      animation: {
        fadeOut: 'fadeOut 4s linear forwards',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
