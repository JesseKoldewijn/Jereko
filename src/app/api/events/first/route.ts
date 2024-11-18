import { NextResponse } from "next/server";

import { db } from "@/server/db/conn";

export const GET = async (_req: Request) => {
  try {
    const data = await db.query.events.findFirst().execute();

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
