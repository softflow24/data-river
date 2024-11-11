import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev"; // Remix plugin
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths({
      projects: [
        "./tsconfig.json",
        "../../packages/editor/tsconfig.json",
        "../../packages/shared/tsconfig.json",
      ],
    }),
  ],
  resolve: {
    alias: {
      "~": "/app",
      "@data-river/editor": path.resolve(__dirname, "../editor/src"),
      "@data-river/blocks": path.resolve(__dirname, "../blocks/src"),
      "@data-river/shared": path.resolve(__dirname, "../shared/src"),
      "@data-river/execution-engine": path.resolve(
        __dirname,
        "../execution-engine/src",
      ),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".css"],
  },
  optimizeDeps: {
    include: ["@data-river/editor", "@data-river/shared", "@data-river/blocks"],
  },
  build: {
    commonjsOptions: {
      include: [/shared/, /editor/, /node_modules/],
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          config: "./tailwind.config.ts",
        }),
        autoprefixer(),
      ],
    },
  },
});
