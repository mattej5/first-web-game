import { getBlogPosts } from "@/app/blog/utils";
import { buildPostMarkdown } from "@/lib/markdown-site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getBlogPosts()
    .filter((p) => !p.metadata.passwordProtected)
    .map((p) => ({ slug: p.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const md = buildPostMarkdown(slug);
  if (!md) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(md, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
