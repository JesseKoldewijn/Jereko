import {
  GithubIcon,
  GraduationCap,
  Home,
  ListChecks,
  User,
} from "lucide-react";
import React from "react";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavigationMenuMobile = () => {
  return (
    <div className="flex flex-1 md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-lg border px-2 py-1  text-neutral-950 dark:border-neutral-300 dark:text-neutral-300">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent className="static mr-[4.5rem] mt-3 flex flex-col gap-1 bg-neutral-300 py-2 dark:border-neutral-300 dark:bg-neutral-900">
          <DropdownMenuItem>
            <Link href="/" className="flex items-center">
              <Home className="mr-1 h-5" />
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-neutral-900 dark:bg-neutral-300" />
          <DropdownMenuItem>
            <Link href="/projects" className="flex items-center">
              <ListChecks className="mr-1 h-5" />
              All Projects
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/experience" className="flex items-center">
              <GraduationCap className="mr-1 h-5" />
              My Experience
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-neutral-900 dark:bg-neutral-300" />
          <DropdownMenuItem>
            <Link href="/about-me" className="flex items-center">
              <User className="mr-1 h-5" />
              About Me
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="https://github.com/JesseKoldewijn/JKinsight"
              className="flex items-center"
            >
              <GithubIcon className="mr-1 h-5" />
              OpenSource
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavigationMenuMobile;
