import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";
import { globalIgnores } from "eslint/config";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "*.tsbuildinfo",
  ]),
];

export default eslintConfig;
