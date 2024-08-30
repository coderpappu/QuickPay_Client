import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "@fullcalendar/core",
      "@fullcalendar/react",
      "@fullcalendar/daygrid",
      "@fullcalendar/timegrid",
    ],
  },
  resolve: {
    alias: {
      "@fullcalendar/core": "@fullcalendar/core/main.js",
      "@fullcalendar/daygrid": "@fullcalendar/daygrid/main.js",
      "@fullcalendar/timegrid": "@fullcalendar/timegrid/main.js",
    },
  },
});
