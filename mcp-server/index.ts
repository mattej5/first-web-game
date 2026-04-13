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

// Helper function to safely read the file
async function readProjectsPage() {
  const filePath = path.join(process.cwd(), "app/projects/page.tsx");
  const content = await readFile(filePath, "utf-8");
  return { filePath, content };
}

server.setRequestHandler(ListToolsRequestSchema, async (): Promise<ListToolsResult> => {
  return {
    tools: [
      {
        name: "add_project",
        description: "Add a new project to the projects page.",
        inputSchema: {
          type: "object",
          properties: {
            title: { type: "string", description: "Title of the project" },
            description: {
              type: "string",
              description: "Paragraph text describing what the project is",
            },
            buttonText: {
              type: "string",
              description: "Text for the CTA button",
            },
            buttonUrl: {
              type: "string",
              description: "URL for the CTA button to link to",
            },
          },
          required: ["title", "description", "buttonText", "buttonUrl"],
        },
      },
      {
        name: "update_project",
        description:
          "Update an existing project on the projects page. This will search for the title and replace its description and button URL.",
        inputSchema: {
          type: "object",
          properties: {
            currentTitle: {
              type: "string",
              description: "The exact title currently in the project accordion",
            },
            newDescription: {
              type: "string",
              description: "The new description text",
            },
            newButtonUrl: {
              type: "string",
              description: "The new button URL link",
            },
            newButtonText: {
              type: "string",
              description: "The new button text",
            },
          },
          required: [
            "currentTitle",
            "newDescription",
            "newButtonUrl",
            "newButtonText",
          ],
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
              description: "URL-friendly slug for the blog post (e.g. my-new-post)",
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
});

server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest): Promise<CallToolResult> => {
  try {
    if (!request.params.arguments) {
      throw new Error("Arguments are required");
    }
    const args = request.params.arguments as Record<string, string>;

    switch (request.params.name) {
      case "add_project": {
        const { title, description, buttonText, buttonUrl } = args;
        const { filePath, content } = await readProjectsPage();

        const newAccordion = `
      <Accordion className="mb-6">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: "bold" }}>
            ${title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            ${description}
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#047857",
              "&:hover": { backgroundColor: "#065f46" },
            }}
            href="${buttonUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${buttonText}
          </Button>
        </AccordionDetails>
      </Accordion>
`;

        const lastDivIndex = content.lastIndexOf("</div>");
        if (lastDivIndex === -1) {
          throw new Error("Could not find ending </div> tag in projects page");
        }
        const updatedContent =
          content.slice(0, lastDivIndex) + newAccordion + content.slice(lastDivIndex);
        await writeFile(filePath, updatedContent, "utf-8");

        return {
          content: [
            { type: "text" as const, text: `Successfully added project "${title}".` },
          ],
        };
      }

      case "update_project": {
        const { currentTitle, newDescription, newButtonUrl, newButtonText } = args;
        const { filePath, content } = await readProjectsPage();

        const titleStart = content.indexOf(currentTitle);
        if (titleStart === -1) {
          throw new Error(`Could not find project with title: ${currentTitle}`);
        }

        let accordionStart = content.lastIndexOf("<Accordion ", titleStart);
        if (accordionStart === -1) {
          accordionStart = content.lastIndexOf("<Accordion>", titleStart);
        }
        if (accordionStart === -1) {
          throw new Error("Could not find the starting <Accordion tag for the project.");
        }

        let accordionEnd = content.indexOf("</Accordion>", titleStart);
        if (accordionEnd === -1) {
          throw new Error("Could not find the ending </Accordion> tag for the project.");
        }
        accordionEnd += "</Accordion>".length;

        const newAccordion = `<Accordion className="mb-6">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: "bold" }}>
            ${currentTitle}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            ${newDescription}
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#047857",
              "&:hover": { backgroundColor: "#065f46" },
            }}
            href="${newButtonUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${newButtonText}
          </Button>
        </AccordionDetails>
      </Accordion>`;

        const updatedContent =
          content.slice(0, accordionStart) +
          newAccordion +
          content.slice(accordionEnd);
        await writeFile(filePath, updatedContent, "utf-8");

        return {
          content: [
            { type: "text" as const, text: `Successfully updated project "${currentTitle}".` },
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
        const blogPath = path.join(process.cwd(), "app/blog/posts", `${safeSlug}.mdx`);

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
            { type: "text" as const, text: `Successfully wrote blog post to ${blogPath}` },
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
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("first-web-game MCP Server running on stdio");
}

run().catch(console.error);
