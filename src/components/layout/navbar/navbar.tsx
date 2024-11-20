import dynamic from "next/dynamic";
import Link from "next/link";

import ThemeToggle from "@/components/ui/theme-toggle";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import { type Socials } from "@/server/db/schemas/socials";

const NavbarMenu = dynamic(
  () => import("@/components/layout/navbar/navigationMenu"),
  {
    ssr: true,
  },
);
const NavMenuMobile = dynamic(
  () => import("@/components/layout/navbar/mobile/navMenuMobile"),
  {
    ssr: true,
  },
);

const Navbar = async ({ socials }: { socials: Socials | null }) => {
  return (
    <nav
      className={cn(
        "max-w-auto sticky top-0 z-50 flex w-full bg-[rgba(255,255,255,0.75)] px-6 py-4 dark:bg-[rgba(18,18,18,0.65)]",
      )}
    >
      <section className="my-auto mr-auto">
        <Link
          href="/"
          id="Jereko logo"
          className="flex font-semibold duration-500 hover:underline hover:underline-offset-4"
        >
          {appConfig.branding.brandName}
        </Link>
      </section>
      <section className="my-auto flex flex-1 justify-center">
        <NavbarMenu />
      </section>
      <section className="my-auto ml-auto mr-0 flex gap-4">
        <NavMenuMobile socials={socials} />
        <ThemeToggle />
      </section>
    </nav>
  );
};

export default Navbar;
