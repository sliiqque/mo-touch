import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          gsap: ["gsap"],
          router: ["react-router-dom"],
        },
      },
    },
    sourcemap: process.env.NODE_ENV !== "production",
  },
  optimizeDeps: {
    include: ["gsap"],
  },
});
