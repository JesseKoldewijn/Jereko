import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
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
            navigationMenuTriggerStyle(),
            "text-foreground no-underline transition-none [&_svg]:transition-none",
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
