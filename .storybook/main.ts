import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.story.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-styling",
      options: {
        postcss: {
          implementation: require("postcss")({
            plugins: [require("tailwindcss"), require("autoprefixer")],
            tailwindConfig: "../tailwind.config.js",
          }),
        },
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
