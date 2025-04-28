import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const SingleItemSection = ({
  children,
  className,
  ...rest
}: React.ComponentPropsWithRef<"a">) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...rest}
        >
          {children}
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default SingleItemSection;
