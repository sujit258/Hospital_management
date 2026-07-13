import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", ...fontFamily.sans]
      },
      colors: {
        primary: {
          50: "#e9f9f2",
          100: "#c6efd9",
          200: "#96dfbb",
          300: "#63c89c",
          400: "#3bb382",
          500: "#129666",
          600: "#0b7c55",
          700: "#096646",
          800: "#0a523a",
          900: "#0a4331"
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
