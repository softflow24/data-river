import sharedConfig from "../shared/tailwind.config";

export default {
  ...sharedConfig,
  content: [...sharedConfig.content, "./src/**/*.{js,jsx,ts,tsx}"],
  // Add any editor-specific customizations here
};
