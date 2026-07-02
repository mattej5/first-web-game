const EVENT_TYPES = [
  "page_view",
  "post_click",
  "cta_click",
  "project_click",
] as const;

export type AnalyticsEventType = (typeof EVENT_TYPES)[number];

export type AnalyticsEventPayload = {
  type: AnalyticsEventType;
  slug?: string;
  referrer?: string;
};

export type AnalyticsSummary = {
  totals: Record<AnalyticsEventType, number>;
  groups: Record<AnalyticsEventType, Array<{ slug: string; count: number }>>;
};

const TOTALS_KEY = "portfolio:analytics:totals";
const GROUP_KEY_PREFIX = "portfolio:analytics:group";
const REFERRER_KEY_PREFIX = "portfolio:analytics:referrer";

function emptySummary(): AnalyticsSummary {
  return {
    totals: {
      page_view: 0,
      post_click: 0,
      cta_click: 0,
      project_click: 0,
    },
    groups: {
      page_view: [],
      post_click: [],
      cta_click: [],
      project_click: [],
    },
  };
}

function getRedisConfig() {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!baseUrl || !token) {
    return null;
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    token,
  };
}

function encodeSegment(value: string) {
  return encodeURIComponent(value);
}

async function upstashRequest(path: string, init?: RequestInit) {
  const config = getRedisConfig();
  if (!config) {
    return null;
  }

  try {
    const response = await fetch(`${config.baseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${config.token}`,
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as { result?: unknown };
  } catch {
    return null;
  }
}

function normalizeHashResult(result: unknown): Record<string, string> {
  if (!result) {
    return {};
  }

  if (Array.isArray(result)) {
    const entries: Array<[string, string]> = [];
    for (let index = 0; index < result.length; index += 2) {
      const key = result[index];
      const value = result[index + 1];
      if (typeof key === "string" && value !== undefined) {
        entries.push([key, String(value)]);
      }
    }
    return Object.fromEntries(entries);
  }

  if (typeof result === "object") {
    const entries = Object.entries(result as Record<string, unknown>).map(
      ([key, value]) => [key, String(value)] as const
    );
    return Object.fromEntries(entries);
  }

  return {};
}

function toSortedGroups(hash: Record<string, string>) {
  return Object.entries(hash)
    .map(([slug, count]) => ({ slug, count: Number.parseInt(count, 10) || 0 }))
    .filter(({ count }) => count > 0)
    .sort(
      (left, right) =>
        right.count - left.count || left.slug.localeCompare(right.slug)
    );
}

export function isAnalyticsEventType(
  value: unknown
): value is AnalyticsEventType {
  return (
    typeof value === "string" &&
    EVENT_TYPES.includes(value as AnalyticsEventType)
  );
}

export async function recordEvent(payload: AnalyticsEventPayload) {
  const config = getRedisConfig();
  if (!config) {
    return { ok: true, recorded: false as const };
  }

  await upstashRequest(
    `/hincrby/${encodeSegment(TOTALS_KEY)}/${encodeSegment(payload.type)}/1`,
    { method: "POST" }
  );

  if (payload.slug) {
    await upstashRequest(
      `/${["hincrby", `${GROUP_KEY_PREFIX}:${payload.type}`, payload.slug, "1"]
        .map(encodeSegment)
        .join("/")}`,
      { method: "POST" }
    );
  }

  if (payload.referrer) {
    await upstashRequest(
      `/${[
        "hincrby",
        `${REFERRER_KEY_PREFIX}:${payload.type}`,
        payload.referrer,
        "1",
      ]
        .map(encodeSegment)
        .join("/")}`,
      { method: "POST" }
    );
  }

  return { ok: true, recorded: true as const };
}

export async function getEventsSummary(): Promise<AnalyticsSummary> {
  if (!getRedisConfig()) {
    return emptySummary();
  }

  const summary = emptySummary();
  const totalsResponse = await upstashRequest(
    `/hgetall/${encodeSegment(TOTALS_KEY)}`
  );
  const totalsHash = normalizeHashResult(totalsResponse?.result);

  for (const type of EVENT_TYPES) {
    summary.totals[type] = Number.parseInt(totalsHash[type] ?? "0", 10) || 0;

    const groupsResponse = await upstashRequest(
      `/hgetall/${encodeSegment(`${GROUP_KEY_PREFIX}:${type}`)}`
    );
    summary.groups[type] = toSortedGroups(
      normalizeHashResult(groupsResponse?.result)
    );
  }

  return summary;
}

export async function getPostClickCount(slug?: string) {
  const summary = await getEventsSummary();

  if (!slug) {
    return summary.totals.post_click;
  }

  return (
    summary.groups.post_click.find((entry) => entry.slug === slug)?.count ?? 0
  );
}
