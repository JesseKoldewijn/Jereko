import { NextResponse } from "next/server";

const handler = (req: Request) => {
  const url = new URL(req.url);
  const target = url.pathname.replace("/api/remote/", "");
  const search = url.search;

  const isUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  if (target && isUrl(target)) {
    // @todo switch to rewrite when available in app router
    return NextResponse.redirect(target + search);
  } else {
    return NextResponse.json({
      status: 500,
      error: "Invalid URL",
    });
  }
};

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;
