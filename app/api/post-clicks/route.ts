import { NextResponse } from "next/server";

// Views feature disabled — better-sqlite3 native bindings need a rebuild.
// Both endpoints return gracefully so no errors hit the console.

export async function GET() {
  return NextResponse.json({ count: 0 });
}

export async function POST() {
  return NextResponse.json({ ok: true });
}
