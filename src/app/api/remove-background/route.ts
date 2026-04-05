import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message:
        "Background removal provider is not connected yet. Wire this route to remove.bg, Clipdrop, or your own model service.",
    },
    { status: 501 }
  );
}
