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
        primary: "#3686FF",

        "dark-bg": "#0F172A",
        "dark-card": "#1E293B",
        "dark-box": "#293548",
        "dark-text-color": "#c4c7ce",
        "dark-heading-color": "rgb(56 189 248)",
        "dark-border-color": "#e5e7eb",
        "button-bg": "#3686FF",
        "button-bg-hover": "#4890fc",
        "light-text-color": "#a5a5a5b8",
        "light-bg": "#e5e7eb6e",
        "gray-text": "#8b8b8b",
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
    require("daisyui"),
  ],

  darkMode: "selector",
};

export default keepTheme(config);
