"use client";

import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathName = usePathname();

  return (
    <div className="mt-20 flex h-full flex-1 flex-col items-center justify-center px-4 py-2">
      <div className="my-auto flex max-w-lg flex-col gap-6 text-center">
        <h1 className="text-2xl font-semibold">Offline</h1>
        <p>
          You are currently offline. Please check your internet connection and
          try again. An active internet connection is required to use my
          website.
        </p>
        <span>
          You were trying to access <code>{pathName}</code>
        </span>
      </div>
    </div>
  );
};

export default NotFound;
