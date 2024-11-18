import { NextResponse } from "next/server";

import { mostRecentEvent } from "@/server/handlers/events/getLatest";

export const GET = async (_req: Request) => {
  try {
    const data = await mostRecentEvent();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
