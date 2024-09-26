/** @type {import('tailwindcss').Config} */
import { keepTheme } from "keep-react/keepTheme";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
      },
      colors: {
        "dark-bg": "#0F172A",
        "dark-card": "#1E293B",
        "dark-box": "#293548",
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".wrapper-container": {
          width: "1280px",
          margin: "auto",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
  darkMode: "selector",
};

export default keepTheme(config);
