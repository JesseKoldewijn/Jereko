"use client";

import { usePathname } from "next/navigation";

import OfflineExperiencePage from "./fallback_pages/experience";
import OfflineProjectsPage from "./fallback_pages/projects";

const OfflineRoutes = ({ pathName }: { pathName: string }) => {
  switch (pathName) {
    case "/projects":
      return <OfflineProjectsPage />;
    case "/experience":
      return <OfflineExperiencePage />;
    default:
      return <DefaultFallback />;
  }
};

const DefaultFallback = () => {
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

const OfflineRoot = () => {
  const pathName = usePathname();
  if (!pathName) return <DefaultFallback />;
  return <OfflineRoutes pathName={pathName} />;
};

export default OfflineRoot;
