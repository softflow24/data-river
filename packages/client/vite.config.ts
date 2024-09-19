import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev"; // Remix plugin
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

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
    tsconfigPaths({ projects: ["./tsconfig.json"] }), // For resolving paths from tsconfig.json
  ],
  server: {
    watch: {
      // Make sure Vite watches your local packages
      ignored: ["!**/node_modules/**", "!../packages/**"],
    },
    hmr: true,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      "~": "/app", // Alias for simplifying imports
      "@data-river/editor": path.resolve(__dirname, "../editor/src"),
    },
    preserveSymlinks: true,
  },
  clearScreen: false, // Helps keep logs clean
});
