import { buildLlmsFull } from "@/lib/markdown-site";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFull(), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
