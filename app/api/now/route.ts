import { NextResponse } from "next/server";

export const revalidate = 900;

type GitHubEvent = {
  type?: string;
  repo?: {
    name?: string;
  };
  created_at?: string;
  payload?: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: Array<{ message?: string }>;
    issue?: { number?: number };
    pull_request?: { number?: number };
    release?: { tag_name?: string };
  };
};

function summarizeEvent(event: GitHubEvent) {
  switch (event.type) {
    case "PushEvent": {
      const commits = event.payload?.commits ?? [];
      if (commits.length === 1 && commits[0]?.message) {
        return commits[0].message;
      }

      return `Pushed ${commits.length || 0} commit${commits.length === 1 ? "" : "s"}`;
    }
    case "CreateEvent":
      return `Created ${event.payload?.ref_type ?? "resource"}${event.payload?.ref ? ` ${event.payload.ref}` : ""}`;
    case "IssuesEvent":
      return `${event.payload?.action ?? "Updated"} issue #${event.payload?.issue?.number ?? ""}`.trim();
    case "IssueCommentEvent":
      return `${event.payload?.action ?? "Updated"} a comment on issue #${event.payload?.issue?.number ?? ""}`.trim();
    case "PullRequestEvent":
      return `${event.payload?.action ?? "Updated"} pull request #${event.payload?.pull_request?.number ?? ""}`.trim();
    case "PullRequestReviewCommentEvent":
      return `Reviewed pull request #${event.payload?.pull_request?.number ?? ""}`.trim();
    case "ReleaseEvent":
      return `${event.payload?.action ?? "Published"} release ${event.payload?.release?.tag_name ?? ""}`.trim();
    case "WatchEvent":
      return "Starred a repository";
    case "ForkEvent":
      return "Forked a repository";
    default:
      return event.type ? `Recorded ${event.type}` : "Recorded GitHub activity";
  }
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "vinjones-portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      "https://api.github.com/users/mattej5/events/public",
      {
        headers,
        next: { revalidate },
      }
    );

    if (!response.ok) {
      return NextResponse.json([]);
    }

    const events = (await response.json()) as GitHubEvent[];
    const payload = events.slice(0, 5).map((event) => ({
      repo: event.repo?.name ?? "unknown",
      message: summarizeEvent(event),
      ts: event.created_at ?? "",
    }));

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json([]);
  }
}
