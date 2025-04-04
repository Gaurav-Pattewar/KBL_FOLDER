import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
    },
    rules: {
      // ✅ Allow unused arguments if they start with underscore
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
    extends: ["js/recommended"],
  },
]);
