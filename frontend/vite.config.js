import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "gzip" }), // ✅ Enable Gzip compression
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // ✅ Updated backend port
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./public"), // ✅ Added alias for public folder
    },
  },
});
