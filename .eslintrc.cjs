/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    extraFileExtensions: [".astro"],
  },
  plugins: ["@typescript-eslint", "jsx-a11y", "astro"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:jsx-a11y/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:astro/recommended",
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  ],
  rules: {
    // These rules are only disabled because of the openapi-typescript schema gen output.
    "@typescript-eslint/consistent-indexed-object-style": 0,
    "@typescript-eslint/no-empty-interface": 0,
    // --- END ---

    // These opinionated rules are enabled in stylistic-type-checked above.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: { attributes: false },
      },
    ],
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
};

module.exports = config;
