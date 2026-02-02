import { incrementPostClick, getPostClickCount } from "@/lib/post-clicks-db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    if (typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json(
        { error: "A valid slug is required." },
        { status: 400 }
      );
    }

    const count = incrementPostClick(slug.trim());
    return NextResponse.json({ slug, count });
  } catch (error) {
    console.error("Failed to increment click count", error);
    return NextResponse.json(
      { error: "Unable to record click." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "The slug query parameter is required." },
      { status: 400 }
    );
  }

  try {
    const count = getPostClickCount(slug);
    return NextResponse.json({ slug, count });
  } catch (error) {
    console.error("Failed to fetch click count", error);
    return NextResponse.json(
      { error: "Unable to fetch click count." },
      { status: 500 }
    );
  }
}
