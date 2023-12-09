import type { Meta, StoryObj } from "@storybook/react";

import { StorybookThemeWrapper } from "@/lib/storybook/theme-wrapper";

import AnimatedText from "./animated-grad-text";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof AnimatedText> = {
  component: AnimatedText,
};

export default meta;
type Story = StoryObj<typeof AnimatedText>;

export const AnimatedTextElem: Story = {
  args: {
    //👇 The args you need here will depend on your component
    text: "Hello I'm a gradient text!",
    variant: "span",
  },
  decorators: [StorybookThemeWrapper("dark")],
};
