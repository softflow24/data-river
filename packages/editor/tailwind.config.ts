import sharedConfig from "../shared/tailwind.config";
import path from "path";

export default {
  ...sharedConfig,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    path.resolve(__dirname, "../shared/src/**/*.{js,ts,jsx,tsx}"),
  ],
  // Add any editor-specific customizations here
};
