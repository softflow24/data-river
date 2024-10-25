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

  plugins: [require("tailwindcss-animate")],
} satisfies Config;
