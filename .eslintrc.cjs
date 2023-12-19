/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "jsx-a11y", "storybook"],
  extends: [
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:storybook/recommended",
    "plugin:jsx-a11y/strict",
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
