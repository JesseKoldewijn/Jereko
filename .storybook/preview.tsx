import type { Preview } from "@storybook/react";
import React from "react";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    decorators: [
      (Story) => {
        return (
          <div className="inset-0 flex h-full w-full items-center justify-center">
            <Story />
          </div>
        );
      },
    ],
  },
};

export default preview;
