import { NextResponse } from "next/server";

const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File)) {
    return NextResponse.json(
      { message: "No image file was provided." },
      { status: 400 }
    );
  }

  if (!ACCEPTED_TYPES.has(image.type)) {
    return NextResponse.json(
      { message: "Unsupported format. Use JPG, PNG, or WEBP." },
      { status: 415 }
    );
  }

  if (image.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: "File is too large. Keep uploads under 10 MB." },
      { status: 413 }
    );
  }

  const bytes = await image.arrayBuffer();
  const sizeInKb = Math.max(1, Math.round(bytes.byteLength / 1024));

  return NextResponse.json(
    {
      message: `Demo mode: ${image.name} (${sizeInKb} KB) was validated in request memory and was not written to disk. Connect a live background removal provider to return a cutout result.`,
      transientProcessing: true,
    },
    { status: 501 }
  );
}
