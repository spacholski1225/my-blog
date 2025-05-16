import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable the rule that prevents using 'any' type
      // This is a temporary workaround for Next.js 15.3.2 typing issues
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];

export default eslintConfig;
