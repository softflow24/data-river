import type { Config } from "tailwindcss";
import sharedConfig from "../shared/tailwind.config";
import path from "path";

export default {
  ...sharedConfig,
  darkMode: ["class"],
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    path.resolve(__dirname, "../shared/src/**/*.{js,ts,jsx,tsx}"),
    path.resolve(__dirname, "../editor/src/**/*.{js,ts,jsx,tsx}"),
  ],
  safelist: [
    {
      pattern:
        /bg-(purple|red|green|blue|yellow|orange|teal|indigo|pink|emerald|cyan|violet|rose|slate)-700/,
      variants: ["dark"],
    },
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
