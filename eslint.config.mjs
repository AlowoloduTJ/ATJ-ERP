import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    rules: {
      // Temporarily allow 'any' types during development
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      // Allow unescaped entities in JSX (common in development)
      "react/no-unescaped-entities": "warn",
      // Allow <a> tags for external links or special cases
      "@next/next/no-html-link-for-pages": "warn",
      // Allow require() for dynamic imports in specific cases
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
]);

export default eslintConfig;
