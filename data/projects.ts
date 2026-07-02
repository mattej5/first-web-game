export type ProjectTier = "FLAGSHIP AI" | "PRODUCTS" | "ARCHIVE";

export type ProjectTag =
  | "AGENTS"
  | "MCP"
  | "ON-DEVICE AI"
  | "EVALS"
  | "iOS"
  | "REACT NATIVE"
  | "3D"
  | "EDUCATION"
  | "HEALTHCARE"
  | "FULL-STACK"
  | "DATA ENG"
  | "ARCHIVE";

export type Project = {
  title: string;
  description: string;
  tags: ProjectTag[];
  tier: ProjectTier;
  link?: { label: string; url: string };
  impactStats?: string[];
};

/**
 * Canonical project data for /projects. Rendered by app/projects/page.tsx.
 * NOTE (for MCP server / Codex): the projects page is now data-driven from this
 * file — mcp-server/index.ts add_project/update_project should target entries
 * here instead of MUI <Accordion> blocks in the page component.
 */
export const projects: Project[] = [
  // ── FLAGSHIP AI ──
  {
    title: "School OS",
    tier: "FLAGSHIP AI",
    tags: ["AGENTS", "EDUCATION", "EVALS"],
    description:
      "A Socratic tutoring system that withholds answers to fight the AI-crutch effect, gated by a comprehension check on the work you produce. Every session is written to a tamper-evident, hash-chained learning ledger. Edit, delete, or reorder an entry and the chain breaks, so progress is provable rather than claimed.",
    link: {
      label: "Read the build notes",
      url: "/blog/building-an-eval-harness",
    },
  },
  {
    title: "MCP Server for This Site",
    tier: "FLAGSHIP AI",
    tags: ["MCP", "AGENTS", "FULL-STACK"],
    description:
      "An MCP server I built so I can manage this site's content through an AI agent, a working example of exposing a real app surface to a language model over the Model Context Protocol.",
  },
  {
    title: "Apple FM: On-Device Foundation Model App",
    tier: "FLAGSHIP AI",
    tags: ["ON-DEVICE AI", "iOS"],
    description:
      "An iOS app built on Apple's on-device foundation models. Inference runs locally on the phone (no round trip to a server, no data leaving the device), proving out private, offline-capable AI features on consumer hardware.",
  },
  {
    title: "Agent in a 3D Playground",
    tier: "FLAGSHIP AI",
    tags: ["AGENTS", "3D"],
    description:
      "An interactive agent playground built with Next.js and Three.js. An AI agent navigates a 3D office between three desks (Planning, Writing, and Critique) to recursively draft a book, making the agent's control loop something you can actually watch.",
    link: {
      label: "Watch the demo",
      url: "https://www.loom.com/share/ff38ea5b69c34ce0a9f19522c9af04e3",
    },
  },

  // ── PRODUCTS ──
  {
    title: "stu",
    tier: "PRODUCTS",
    tags: ["FULL-STACK", "AGENTS"],
    description:
      "A platform to help university students plan their academic careers, advisors guide students, and registrars forecast resource allocation. Co-founded and built through the Sandbox program.",
    link: { label: "Visit stuplanning.com", url: "https://stuplanning.com" },
  },
  {
    title: "Lumenarie Marketplace",
    tier: "PRODUCTS",
    tags: ["FULL-STACK", "EDUCATION"],
    description:
      "A classroom marketplace that lets students earn and spend star-themed rewards while reinforcing collaboration and accountability. Teachers get quick dashboards for awarding Lumens and keeping the class economy transparent without extra admin work.",
    impactStats: [
      "73 active students, 273 transactions",
      "Daily award time cut from 40 min to 5 min",
      "175 minutes saved per week (87.5% reduction)",
    ],
    link: {
      label: "Explore Lumenarie",
      url: "https://lumenarie-marketplace.vinjones.me",
    },
  },
  {
    title: "Agentic Grading for Teachers",
    tier: "PRODUCTS",
    tags: ["AGENTS", "EDUCATION"],
    description:
      "An automation that uses AI agents to grade student notes, built with a high school teacher to take one grading process off their plate. Documented end to end in a blog post.",
    link: { label: "See blog post", url: "/blog/automation-for-teachers" },
  },

  // ── ARCHIVE ──
  {
    title: "INTEX I",
    tier: "ARCHIVE",
    tags: ["ARCHIVE", "FULL-STACK"],
    description:
      "A team school project, since retired. Written up as a blog post covering the build and the challenges we faced.",
    link: { label: "See post", url: "/blog/intex-I" },
  },
  {
    title: "Networked Tic-Tac-Toe",
    tier: "ARCHIVE",
    tags: ["ARCHIVE", "REACT NATIVE"],
    description:
      "A React Native app built to learn the framework in a summer sprint. Two devices join the same session to play tic-tac-toe.",
    link: {
      label: "Request the Android build",
      url: "https://drive.google.com/file/d/1jfkryUnuZjf38Rk6u1nunske7avgSXOz/view?usp=drive_link",
    },
  },
  {
    title: "Data Migration Accuracy Tool",
    tier: "ARCHIVE",
    tags: ["ARCHIVE", "DATA ENG"],
    description:
      "A Python + pandas utility that diffs before/after Excel exports of a data migration, flagging discrepancies and scoring per-column accuracy. An older tool that still earns its keep.",
    link: {
      label: "See GitHub repo",
      url: "https://github.com/mattej5/data-migration-accuracy-tool",
    },
  },
];
