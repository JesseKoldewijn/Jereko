import type { StorybookConfig } from "@storybook/nextjs";
import { resolve } from "path";

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
  webpack: async (config) => {
    config.module?.rules?.push({
      rules: [
        {
          test: /\.*$/,
          exclude: [resolve(__dirname, "../public/_storybook")],
        },
      ],
    });
    config.output = {
      ...config.output,
      path: resolve(__dirname, "../public/_storybook"),
    };
    return config;
  },
};
export default config;
