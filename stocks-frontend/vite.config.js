import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://stocks-latest.onrender.com",
        changeOrigin: true,
      },
      "/stock": {
        target: "https://stocks-latest.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
