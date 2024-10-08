import type { Config } from "tailwindcss";
import sharedConfig from "../shared/tailwind.config";

export default {
  ...sharedConfig,
  darkMode: ["class"],
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@data-river/editor/src/**/*.{js,jsx,ts,tsx}",
  ],

  plugins: [require("tailwindcss-animate")],
} satisfies Config;
