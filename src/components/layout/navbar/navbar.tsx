import { appConfig } from "@/config/app";
import { type Socials } from "@/data/socials";

import {
  NavbarBackgroundWrapper,
  NavbarMenu,
  ThemeToggle,
} from "./_navbar-client-imports";
import NavMenuMobile from "./mobile/navMenuMobile";

const Navbar = ({ socials }: { socials: Socials | null }) => {
  return (
    <NavbarBackgroundWrapper>
      <section className="my-auto mr-auto">
        <a
          href="/"
          id="Jereko logo"
          className="flex font-semibold duration-500 hover:underline hover:underline-offset-4"
        >
          {appConfig.branding.brandName}
        </a>
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
