import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      prettier,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "import/order": ["off", { "newlines-between": "always" }],
      "react/react-in-jsx-scope": "off",
    },
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/packages/client/**", // Ignore the entire client package
      "**/.*", // Ignore dotfiles explicitly
      "**/client/**",
    ],
  },
];
