import { NextRequest, NextResponse } from "next/server";

import { getEventsSummary, isAnalyticsEventType, recordEvent } from "./store";

type EventRequestBody = {
  type?: unknown;
  slug?: unknown;
  referrer?: unknown;
};

function normalizeOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export async function GET() {
  const summary = await getEventsSummary();
  return NextResponse.json(summary);
}

export async function POST(request: NextRequest) {
  let body: EventRequestBody;

  try {
    body = (await request.json()) as EventRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Expected a JSON request body." },
      { status: 400 }
    );
  }

  if (!isAnalyticsEventType(body.type)) {
    return NextResponse.json({ error: "Invalid event type." }, { status: 400 });
  }

  const slug = normalizeOptionalString(body.slug);
  const referrer =
    normalizeOptionalString(body.referrer) ??
    normalizeOptionalString(request.headers.get("referer"));

  const result = await recordEvent({
    type: body.type,
    slug,
    referrer,
  });

  return NextResponse.json(result);
}
