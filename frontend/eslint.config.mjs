import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  {
    rules: {
      // disable ALL rules
      "react-hooks/*": "off",
      "@typescript-eslint/*": "off",
      "react-refresh/*": "off",
    },
  },
]);

export default eslintConfig;