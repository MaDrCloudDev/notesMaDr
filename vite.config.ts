import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "src", // Project root is src/
  plugins: [tailwindcss()],
  publicDir: "../public", // Public assets relative to src/
  build: {
    outDir: "../dist", // Output to project root dist/
    emptyOutDir: true, // Clear dist/ before building
    assetsDir: "assets", // Subdirectory for non-JS/CSS assets
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        edit: resolve(__dirname, "src/edit.html"),
      },
      output: {
        entryFileNames: "scripts/[name]-bundle.js", // Outputs scripts/main-bundle.js, scripts/edit-bundle.js
        chunkFileNames: "scripts/[name]-[hash].js",
        assetFileNames: ({ name }: { name?: string }) => {
          if (name && /\.(css)$/.test(name)) {
            return "styles/[name].[ext]"; // Outputs styles/styles.css
          }
          return "assets/[name].[ext]"; // Other assets (e.g., MaDrLogo.svg)
        },
      },
    },
  },
  server: {
    open: "/index.html",
    port: 5173,
  },
  resolve: {
    alias: {
      "/scripts": resolve(__dirname, "src/scripts"), // Map /scripts to src/scripts/
    },
  },
});
