import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { base } from "@/utils/hostname";

import ListItem from "../_parts/listItem";

interface ListItemProps {
  triggerTitle: React.ReactNode;
  showcase: {
    title: string;
    href: string;
    description: string;
  };
  links?: {
    title: string;
    href: string;
    description: string;
  }[];
}

const ShowcaseNavSection = ({
  triggerTitle,
  showcase,
  links,
}: ListItemProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{triggerTitle}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 bg-neutral-100 p-6 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr] dark:bg-neutral-900">
          <li className="row-span-3 rounded-lg bg-black text-white dark:bg-neutral-100 dark:text-neutral-900">
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-neutral-100 to-neutral-900 p-6 no-underline outline-none select-none focus:shadow-md"
                href={showcase.href}
                target={
                  !showcase.href.startsWith("/")
                    ? !showcase.href.includes(base)
                      ? "_blank"
                      : undefined
                    : undefined
                }
              >
                <div className="inset-0 mt-auto flex max-h-max w-full flex-1 flex-col gap-2 text-neutral-200 no-underline outline-none select-none dark:text-neutral-100">
                  <div className="text-base font-semibold">
                    {showcase.title}
                  </div>
                  <p className="text-sm leading-tight opacity-90">
                    {showcase.description}
                  </p>
                </div>
              </a>
            </NavigationMenuLink>
          </li>
          {links && links.length > 0
            ? links.map((link, idx) => (
                <ListItem
                  key={idx}
                  href={link.href}
                  title={link.title}
                  target={
                    !link.href.startsWith("/")
                      ? !link.href.includes(base)
                        ? "_blank"
                        : undefined
                      : undefined
                  }
                >
                  {link.description}
                </ListItem>
              ))
            : null}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ShowcaseNavSection;
