import openGraph from "open-graph-scraper";

export const GET = async (req: Request) => {
  const reqUrl = new URL(decodeURIComponent(req.url));
  const ogUrl = reqUrl.searchParams.get("url");

  if (!ogUrl || URL.canParse(ogUrl)) {
    return new Response("No valid url provided", {
      status: 400,
    });
  }

  const data = await openGraph({ url: ogUrl });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
