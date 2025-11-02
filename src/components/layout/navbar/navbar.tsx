import Link from "next/link";

import { appConfig } from "@/config/app";
import { type Socials } from "@/server/db/schemas/socials";

import {
  NavbarBackgroundWrapper,
  NavbarMenu,
  ThemeToggle,
} from "./_navbar-client-imports";
import NavMenuMobile from "./mobile/navMenuMobile";

const Navbar = async ({ socials }: { socials: Socials | null }) => {
  return (
    <NavbarBackgroundWrapper>
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
    </NavbarBackgroundWrapper>
  );
};

export default Navbar;
