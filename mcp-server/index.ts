import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type ListToolsResult,
  type CallToolResult,
  type CallToolRequest,
} from "@modelcontextprotocol/sdk/types.js";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const server = new Server(
  {
    name: "first-web-game-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// The projects page is DATA-DRIVEN: content lives in the `projects` array in
// `data/projects.ts` (typed `Project[]`), rendered by `app/projects/page.tsx`.
// add_project/update_project below insert/patch entries in that array.
const VALID_TIERS = ["FLAGSHIP AI", "PRODUCTS", "ARCHIVE"];

async function readProjectsData() {
  const filePath = path.join(process.cwd(), "data/projects.ts");
  const content = await readFile(filePath, "utf-8");
  return { filePath, content };
}

// Build a single `Project` object literal (matching data/projects.ts formatting)
// from tool arguments. `tags` is a comma-separated string; link is optional.
function buildProjectLiteral(args: {
  title: string;
  description: string;
  tier: string;
  tags: string;
  buttonText?: string;
  buttonUrl?: string;
}): string {
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const tier = VALID_TIERS.includes(args.tier) ? args.tier : "PRODUCTS";
  const tags = args.tags
    .split(",")
    .map((t) => t.trim().toUpperCase())
    .filter(Boolean)
    .map((t) => `"${esc(t)}"`)
    .join(", ");

  const lines = [
    "  {",
    `    title: "${esc(args.title)}",`,
    `    tier: "${tier}",`,
    `    tags: [${tags}],`,
    `    description:`,
    `      "${esc(args.description)}",`,
  ];
  if (args.buttonText && args.buttonUrl) {
    lines.push(
      `    link: { label: "${esc(args.buttonText)}", url: "${esc(args.buttonUrl)}" },`
    );
  }
  lines.push("  },");
  return lines.join("\n");
}

// Locate the object-literal span (including trailing comma) for the project
// whose `title:` matches. Returns [start, end) indices into `content`.
function findProjectSpan(content: string, title: string): [number, number] {
  const esc = title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const titleIdx = content.indexOf(`title: "${esc}"`);
  if (titleIdx === -1) {
    throw new Error(`Could not find project with title: ${title}`);
  }
  const objStart = content.lastIndexOf("{", titleIdx);
  if (objStart === -1) {
    throw new Error("Could not find start of project object literal.");
  }
  // Walk braces from objStart to find the matching close.
  let depth = 0;
  let i = objStart;
  for (; i < content.length; i++) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) {
    throw new Error("Could not find end of project object literal.");
  }
  let end = i + 1;
  if (content[end] === ",") end++; // include trailing comma
  return [objStart, end];
}

server.setRequestHandler(
  ListToolsRequestSchema,
  async (): Promise<ListToolsResult> => {
    return {
      tools: [
        {
          name: "add_project",
          description:
            "Add a new project to the projects page (appends an entry to the `projects` array in data/projects.ts).",
          inputSchema: {
            type: "object",
            properties: {
              title: { type: "string", description: "Title of the project" },
              description: {
                type: "string",
                description: "Paragraph text describing what the project is",
              },
              tier: {
                type: "string",
                description:
                  "Which section the project belongs to. One of: FLAGSHIP AI, PRODUCTS, ARCHIVE.",
                enum: ["FLAGSHIP AI", "PRODUCTS", "ARCHIVE"],
              },
              tags: {
                type: "string",
                description:
                  "Comma-separated tags (e.g. 'AGENTS, MCP, ON-DEVICE AI'). Uppercased automatically.",
              },
              buttonText: {
                type: "string",
                description: "Optional text for the CTA link",
              },
              buttonUrl: {
                type: "string",
                description: "Optional URL for the CTA link",
              },
            },
            required: ["title", "description", "tier", "tags"],
          },
        },
        {
          name: "update_project",
          description:
            "Update an existing project. Finds the entry by title in data/projects.ts and replaces it with the provided fields.",
          inputSchema: {
            type: "object",
            properties: {
              currentTitle: {
                type: "string",
                description: "The exact current title of the project to update",
              },
              newTitle: {
                type: "string",
                description: "Optional new title (defaults to currentTitle)",
              },
              newDescription: {
                type: "string",
                description: "The new description text",
              },
              tier: {
                type: "string",
                description:
                  "New tier. One of: FLAGSHIP AI, PRODUCTS, ARCHIVE.",
                enum: ["FLAGSHIP AI", "PRODUCTS", "ARCHIVE"],
              },
              tags: {
                type: "string",
                description: "Comma-separated tags (uppercased automatically)",
              },
              newButtonUrl: {
                type: "string",
                description: "Optional new CTA URL",
              },
              newButtonText: {
                type: "string",
                description: "Optional new CTA text",
              },
            },
            required: ["currentTitle", "newDescription", "tier", "tags"],
          },
        },
        {
          name: "get_blog_post_instructions",
          description: "Get instructions on formatting a new blog post.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "add_blog_post",
          description: "Creates a new blog post file.",
          inputSchema: {
            type: "object",
            properties: {
              slug: {
                type: "string",
                description:
                  "URL-friendly slug for the blog post (e.g. my-new-post)",
              },
              title: { type: "string" },
              summary: { type: "string" },
              content: { type: "string", description: "Markdown content body" },
            },
            required: ["slug", "title", "summary", "content"],
          },
        },
        {
          name: "update_blog_post",
          description:
            "Updates an existing blog post by replacing its entire content.",
          inputSchema: {
            type: "object",
            properties: {
              slug: {
                type: "string",
                description: "The slug of the existing article to modify",
              },
              title: { type: "string", description: "Metadata title" },
              summary: { type: "string", description: "Metadata summary" },
              content: { type: "string", description: "Full markdown content" },
            },
            required: ["slug", "title", "summary", "content"],
          },
        },
      ],
    };
  }
);

server.setRequestHandler(
  CallToolRequestSchema,
  async (request: CallToolRequest): Promise<CallToolResult> => {
    try {
      if (!request.params.arguments) {
        throw new Error("Arguments are required");
      }
      const args = request.params.arguments as Record<string, string>;

      switch (request.params.name) {
        case "add_project": {
          const { title, description, tier, tags, buttonText, buttonUrl } =
            args;
          const { filePath, content } = await readProjectsData();

          const literal = buildProjectLiteral({
            title,
            description,
            tier,
            tags,
            buttonText,
            buttonUrl,
          });

          // Insert before the array's closing `];`.
          const closeIdx = content.lastIndexOf("];");
          if (closeIdx === -1) {
            throw new Error(
              "Could not find the projects array terminator `];`."
            );
          }
          const updatedContent =
            content.slice(0, closeIdx) +
            literal +
            "\n" +
            content.slice(closeIdx);
          await writeFile(filePath, updatedContent, "utf-8");

          return {
            content: [
              {
                type: "text" as const,
                text: `Successfully added project "${title}".`,
              },
            ],
          };
        }

        case "update_project": {
          const {
            currentTitle,
            newTitle,
            newDescription,
            tier,
            tags,
            newButtonUrl,
            newButtonText,
          } = args;
          const { filePath, content } = await readProjectsData();

          const [start, end] = findProjectSpan(content, currentTitle);

          const literal = buildProjectLiteral({
            title: newTitle || currentTitle,
            description: newDescription,
            tier,
            tags,
            buttonText: newButtonText,
            buttonUrl: newButtonUrl,
          });

          const updatedContent =
            content.slice(0, start) + literal.trimStart() + content.slice(end);
          await writeFile(filePath, updatedContent, "utf-8");

          return {
            content: [
              {
                type: "text" as const,
                text: `Successfully updated project "${currentTitle}".`,
              },
            ],
          };
        }

        case "get_blog_post_instructions": {
          return {
            content: [
              {
                type: "text" as const,
                text: `Blog posts are stored in \`app/blog/posts/\` as .mdx files.
A valid blog post MUST have the following strict frontmatter structure at the very top:

---
title: "Your Title String"
publishedAt: "YYYY-MM-DD"
summary: "A short 1-2 sentence overview."
---

After the second \`---\`, you can start writing standard Markdown (or MDX).
You can use standard headings like ## Heading 2, bold formatting, links, etc.`,
              },
            ],
          };
        }

        case "add_blog_post":
        case "update_blog_post": {
          const { slug, title, summary, content } = args;
          const safeSlug = slug.replace(/[^a-z0-9-]/gi, "").toLowerCase();
          const blogPath = path.join(
            process.cwd(),
            "app/blog/posts",
            `${safeSlug}.mdx`
          );

          const today = new Date().toISOString().split("T")[0];
          const fileContent = `---
title: "${title}"
publishedAt: "${today}"
summary: "${summary}"
---

${content}
`;

          await writeFile(blogPath, fileContent, "utf-8");
          return {
            content: [
              {
                type: "text" as const,
                text: `Successfully wrote blog post to ${blogPath}`,
              },
            ],
          };
        }

        default:
          throw new Error("Unknown tool");
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          isError: true,
          content: [{ type: "text" as const, text: `Error: ${error.message}` }],
        };
      }
      return {
        isError: true,
        content: [{ type: "text" as const, text: "An unknown error occurred" }],
      };
    }
  }
);

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("first-web-game MCP Server running on stdio");
}

run().catch(console.error);
