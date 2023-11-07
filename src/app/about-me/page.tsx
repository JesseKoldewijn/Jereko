import React from "react";

import Link from "next/link";

const Hobbies = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Link
        className="rounded-lg border border-neutral-200 px-3 py-2 hover:bg-neutral-200 hover:text-neutral-900"
        href="/about-me/intro"
      >
        Introduction
      </Link>

      <Link
        className="rounded-lg border border-neutral-200 px-3 py-2 hover:bg-neutral-200 hover:text-neutral-900"
        href="/about-me/hobbies"
      >
        Hobbies
      </Link>

      <Link
        className="rounded-lg border border-neutral-200 px-3 py-2 hover:bg-neutral-200 hover:text-neutral-900"
        href="/about-me/volunteering"
      >
        Volunteering
      </Link>
    </div>
  );
};

export default Hobbies;
