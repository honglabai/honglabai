import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

// eslint-config-next already registers the jsx-a11y plugin but enables only a
// few of its rules. Re-registering the plugin errors ("Cannot redefine
// plugin"), so pull in the recommended rule set on its own.
const a11yRules = jsxA11y.flatConfigs.recommended.rules;

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: a11yRules,
  },
  globalIgnores([".next/**", "out/**", "dist/**", "next-env.d.ts"]),
]);
