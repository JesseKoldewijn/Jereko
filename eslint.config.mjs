// @ts-check
import js from "@eslint/js";
import astroPlugin from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  // Global ignores
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  },

  // Base JS recommended
  js.configs.recommended,

  // TypeScript stylistic + type-checked
  ...tseslint.configs.stylisticTypeChecked,

  // Astro flat config (handles .astro files with embedded TS)
  ...astroPlugin.configs["flat/recommended"],

  // jsx-a11y recommended + strict
  jsxA11y.flatConfigs.recommended,
  jsxA11y.flatConfigs.strict,

  // Project-wide settings
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "jsx-a11y": {
        polymorphicPropName: "as",
        components: {
          PolymorphInput: "input",
          PolymorphButton: "button",
        },
      },
    },
    rules: {
      // Disabled due to openapi-typescript schema gen output
      "@typescript-eslint/consistent-indexed-object-style": "off",
      "@typescript-eslint/no-empty-interface": "off",

      // Opinionated rules from stylistic-type-checked
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],
    },
  },
);
