import { NextRequest, NextResponse } from "next/server";

/**
 * AI agents get markdown, humans get the site.
 *
 * When a request comes from a known AI assistant/crawler user agent (or
 * explicitly asks for text/markdown), rewrite the HTML pages to their
 * markdown equivalents: the portfolio pages collapse into /llms-full.txt and
 * blog posts map to /md/blog/<slug>. Search engines (Googlebot, Bingbot) are
 * deliberately NOT in this list — they keep seeing the real HTML.
 */
const AI_AGENT_UA =
  /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|Claude-SearchBot|claude-web|anthropic-ai|PerplexityBot|Perplexity-User|DuckAssistBot|MistralAI-User|cohere-ai|meta-externalagent|meta-externalfetcher|Bytespider/i;

export default function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  const accept = request.headers.get("accept") ?? "";
  const wantsMarkdown =
    AI_AGENT_UA.test(ua) || accept.includes("text/markdown");
  if (!wantsMarkdown) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const postMatch = /^\/blog\/([^/]+)$/.exec(pathname);
  if (postMatch) {
    url.pathname = `/md/blog/${postMatch[1]}`;
  } else {
    url.pathname = "/llms-full.txt";
  }

  const response = NextResponse.rewrite(url);
  response.headers.set("vary", "User-Agent, Accept");
  return response;
}

export const config = {
  matcher: ["/", "/about", "/projects", "/blog", "/blog/:slug"],
};
