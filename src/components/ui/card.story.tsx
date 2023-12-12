import type { Meta, StoryObj } from "@storybook/react";
import crypto from "crypto";

import { StorybookThemeWrapper } from "@/lib/storybook/theme-wrapper";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./card";

interface CardArgs {
  id: string;
  title: string;
  sub_title: string;
  description: string;
  tags: string;
}

const ComponentTemplate = (args: CardArgs) => (
  <Card
    className={cn(
      "w-full max-w-md bg-neutral-100 p-5 dark:bg-transparent",
      "min-w-[300px]",
    )}
  >
    <CardTitle>{args.title}</CardTitle>
    <CardDescription>{args.sub_title}</CardDescription>
    <CardContent className="px-2 pt-4">{args.description}</CardContent>
    <CardFooter className="flex flex-wrap items-start gap-2 gap-y-4 px-0 py-0">
      {args.tags.split(",").flatMap((tag: string, idx: number) => {
        return (
          <div
            key={`${idx}_${tag}_${args.id}}`}
            className="rounded-full border bg-gray-300 px-2 py-1 text-neutral-950 dark:border-neutral-300 dark:bg-neutral-700 dark:text-neutral-300"
          >
            {tag}
          </div>
        );
      })}
    </CardFooter>
  </Card>
);

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ComponentTemplate> = {
  component: ComponentTemplate,
};

export default meta;
type Story = StoryObj<typeof ComponentTemplate>;

export const ButtonDark: Story = {
  args: {
    //👇 The args you need here will depend on your component
    id: String(crypto.randomBytes(20).toString("hex")),
    title: "Title",
    sub_title: "Subtitle",
    description: "Hey there! I'm a card.",
    tags: "tag1,tag2,tag3",
  },
  decorators: [StorybookThemeWrapper("dark")],
};

export const ButtonLight: Story = {
  args: {
    //👇 The args you need here will depend on your component
    id: String(crypto.randomBytes(20).toString("hex")),
    title: "Title",
    sub_title: "Subtitle",
    description: "Hey there! I'm a card.",
    tags: "tag1,tag2,tag3",
  },
  decorators: [StorybookThemeWrapper("light")],
};
