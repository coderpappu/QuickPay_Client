/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  
  plugins: [function ({ addUtilities }) {
    const newUtilities = {
      '.wrapper-container': {
        width: '1280px',
        margin: 'auto',
      },
    };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
