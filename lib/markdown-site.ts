import { projects, type ProjectTier } from "@/data/projects";
import { getBlogPosts } from "@/app/blog/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinjones.me";

const tierOrder: ProjectTier[] = ["FLAGSHIP AI", "PRODUCTS", "ARCHIVE"];

function publicPosts() {
  return getBlogPosts()
    .filter((p) => !p.metadata.passwordProtected)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );
}

/** llms.txt index — the standard entry point for AI agents. */
export function buildLlmsIndex(): string {
  const posts = publicPosts();
  return `# Vin Jones — Portfolio

> Vin Jones is an AI builder and AI Education Intern at Leland's AI Builder Program. He builds agents, MCP servers, and on-device AI, and teaches others to do the same. Building toward Y Combinator by 2031.

This site serves markdown to AI agents. The full portfolio (bio, experience, projects, writing, contact) is in one file:

- [Full portfolio](${siteUrl}/llms-full.txt): everything on this site in markdown

## Writing

${posts
  .map(
    (p) =>
      `- [${p.metadata.title}](${siteUrl}/md/blog/${p.slug}): ${p.metadata.summary}`
  )
  .join("\n")}

## Contact

- Email: matthew.jones6288@gmail.com
- LinkedIn: https://www.linkedin.com/in/vin-matt-jones/
- GitHub: https://github.com/mattej5
- Book a call: https://calendly.com/matthew-jones6288/15min
`;
}

/** The whole portfolio as one markdown document. */
export function buildLlmsFull(): string {
  const posts = publicPosts();

  const projectSections = tierOrder
    .map((tier) => {
      const group = projects.filter((p) => p.tier === tier);
      if (group.length === 0) return "";
      const items = group
        .map((p) => {
          const lines = [`### ${p.title}`, "", p.description];
          if (p.impactStats?.length) {
            lines.push("", ...p.impactStats.map((s) => `- ${s}`));
          }
          if (p.link) {
            const url = p.link.url.startsWith("http")
              ? p.link.url
              : `${siteUrl}${p.link.url}`;
            lines.push("", `${p.link.label}: ${url}`);
          }
          lines.push("", `Tags: ${p.tags.join(", ")}`);
          return lines.join("\n");
        })
        .join("\n\n");
      return `## Projects — ${tier}\n\n${items}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return `# Vin Jones — AI Builder

AI Education Intern at Leland's AI Builder Program (https://ai.joinleland.com). Builds agents, MCP servers, and on-device AI, and helps others learn to actually build with AI. Previously co-founded stu (https://stuplanning.com), a university academic-planning platform, through BYU's Sandbox program. Master's student in Information Systems at BYU. Building toward Y Combinator by 2031.

## Experience

- Leland — AI Education Intern, AI Builder Program (current)
- EY — technology consulting internship
- BYU — Master's, Information Systems
- Sandbox — founder program (built stu)

## Skills

Technical: agentic systems and MCP servers, on-device and local AI, data engineering and pipelines, cloud infrastructure.

Specializations: AI curriculum and education, founder ops and product, full-stack development, evals and AI reliability.

${projectSections}

## Writing

${posts
  .map(
    (p) =>
      `- ${p.metadata.publishedAt} — [${p.metadata.title}](${siteUrl}/md/blog/${p.slug}): ${p.metadata.summary}`
  )
  .join("\n")}

## Contact

- Email: matthew.jones6288@gmail.com
- LinkedIn: https://www.linkedin.com/in/vin-matt-jones/
- GitHub: https://github.com/mattej5
- Book a 15-minute call: https://calendly.com/matthew-jones6288/15min

## About this document

Generated from the same data that renders ${siteUrl}. The human version has a playable game (${siteUrl}/game) and a gravity-well animation; you get the markdown.
`;
}

/** Raw markdown for one public blog post, or null if missing/protected. */
export function buildPostMarkdown(slug: string): string | null {
  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post || post.metadata.passwordProtected) return null;
  return `# ${post.metadata.title}

Published: ${post.metadata.publishedAt}
Author: Vin Jones (${siteUrl})

${post.content}
`;
}
