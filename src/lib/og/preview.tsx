import type openGraph from "open-graph-scraper";

import { headers } from "next/headers";
import Image from "next/image";

import type { Event } from "@/server/db/schemas/events";

import { cn } from "../utils";

type OpenGraphResult = Awaited<ReturnType<typeof openGraph>> | null;

const getOg = async (url: string) => {
  const headersList = await headers();
  const requestUrl = headersList.get("x-url");

  if (!requestUrl) {
    return null;
  }

  const baseUrl = new URL(requestUrl).origin;
  const ogApiUrl = new URL(`/api/open-graph?url=${url}`, baseUrl);

  return (await fetch(ogApiUrl.href)
    .then((res) => res.json())
    .catch(() => null)) as OpenGraphResult;
};

export const OpenGraphPreview = async ({
  event,
  className,
  ...rest
}: {
  event: Event;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  const data = event.url ? await getOg(event.url) : null;

  if (!data) {
    return null;
  }

  return (
    <div
      className={cn("h-full max-h-[182px] w-full max-w-[322px]", className)}
      {...rest}
    >
      <div className="flex h-screen max-h-[182px] w-screen max-w-[322px] flex-1 items-center justify-center">
        <OpenGraphPreviewComponent data={data} />
      </div>
    </div>
  );
};

const OpenGraphPreviewComponent = ({ data }: { data: OpenGraphResult }) => {
  const isError = !data || data.error;
  const image = data?.result?.ogImage?.[0]?.url;

  if (isError || !image) {
    return (
      <div className="my-auto flex h-full w-full items-center justify-center">
        <span className="-mt-4 select-none text-sm text-muted-foreground">
          No preview available
        </span>
      </div>
    );
  }

  const imageUrl = new URL(image).href;
  const encodedUrl = encodeURIComponent(imageUrl);

  return (
    <Image
      src={`/api/image-src?url=${encodedUrl}&width=${322}&height=${182}`}
      height={182}
      width={322}
      quality={100}
      alt="Open Graph Preview"
      className="flex h-full w-full items-center justify-center"
      priority
    />
  );
};
