import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev"; // Remix plugin
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // Remix Vite plugin with future flags enabled
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths({projects: ['./tsconfig.json']}), // For resolving paths from tsconfig.json
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      "~": "/app", // Alias for simplifying imports
    },
    preserveSymlinks: true,
  },
  build: {
    outDir: ".vite/renderer", // Output directory for the build
    rollupOptions: {
      input: "./src/index.tsx", // Entry point for the application
    },
  },
  clearScreen: false, // Helps keep logs clean
});
