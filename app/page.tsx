import Image from "next/image";
import Link from "next/link";
import { GridCanvas } from "@/components/grid-canvas";
// import { GravityWell } from "@/components/gravity-well";
import { HeroNodeDiagram } from "@/components/hero-node-diagram";
import { Reveal } from "@/components/use-reveal";
import { getBlogPosts, formatDate } from "@/app/blog/utils";
import { PageView, TrackedLink } from "@/components/analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinjones.me";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vin Jones",
  jobTitle: "AI Education Intern, Leland AI Builder Program",
  url: siteUrl,
  image: `${siteUrl}/headshot_IS_square.jpg`,
  sameAs: [
    "https://github.com/mattej5",
    "https://www.linkedin.com/in/vin-matt-jones/",
    "mailto:matthew.jones6288@gmail.com",
    "https://stuplanning.com",
  ],
  worksFor: { "@type": "Organization", name: "Leland" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vin Jones Portfolio",
  url: siteUrl,
  description:
    "Portfolio of Vin Jones, an AI builder and AI Education Intern at Leland who ships agents, MCP servers, and on-device AI.",
  publisher: { "@type": "Person", name: "Vin Jones" },
};

const technicalSkills = [
  "Agentic Systems & MCP Servers",
  "On-Device & Local AI",
  "Data Engineering & Pipelines",
  "Cloud Infrastructure",
];

const specializations = [
  "AI Curriculum & Education",
  "Founder Ops & Product",
  "Full-Stack Development",
  "Evals & AI Reliability",
];

const experience = [
  {
    name: "BYU",
    src: "https://brightspotcdn.byu.edu/e4/0a/b679ee0a41d9b1675fc78cd03239/byu-logo-white-small.svg",
    width: 80,
    height: 38,
    unoptimized: true,
  },
  { name: "EY", src: "/logos/ey-logo.jpg", width: 56, height: 40 },
  { name: "Leland", src: "/logos/leland.avif", width: 100, height: 32 },
  { name: "Sandbox", src: "/logos/sandbox.jpeg", width: 56, height: 56 },
];

const badges = [
  { name: "AWS", src: "/badges/aws-is.png" },
  { name: "Security", src: "/badges/security-track.png" },
  { name: "Intex I", src: "/badges/intex-i.png" },
  { name: "Intex II", src: "/badges/intex-ii.png" },
  { name: "Dev Track", src: "/badges/dev-track.png" },
  { name: "BYU Data Engineering", src: "/badges/byu-data-eng.png" },
];

const metaFont =
  "'Departure Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace";

export default function Home() {
  const recentPosts = getBlogPosts()
    .filter((p) => !p.metadata.passwordProtected)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 3);

  return (
    <>
      <PageView slug="home" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-black pt-16 pb-12 lg:pt-[110px] lg:pb-16">
        <GridCanvas />
        {/* <GravityWell /> */}

        <div className="relative z-[2] mx-auto flex max-w-4xl items-center gap-12 px-6">
          {/* ── Left: text content ── */}
          <div className="flex-1">
            <div className="mb-6" data-enter>
              <Image
                src="/headshot_IS_square.jpg"
                alt="Vin Jones"
                width={72}
                height={72}
                className="rounded-full object-cover ring-1 ring-white/10"
              />
            </div>
            <span
              data-enter
              className="mb-5 block text-[#A5E446]"
              style={{
                fontFamily: metaFont,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                ["--enter-delay" as string]: "70ms",
              }}
            >
              AI Builder · AI Education Intern @ Leland
            </span>

            <h1
              data-enter
              className="text-white"
              style={{
                fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
                fontSize: "clamp(40px, 5.5vw, 72px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginBottom: "24px",
                ["--enter-delay" as string]: "140ms",
              }}
            >
              Vin Jones
            </h1>

            <p
              data-enter
              style={{ ["--enter-delay" as string]: "220ms" }}
              className="mb-3 max-w-lg text-[17px] leading-[1.65] text-white/60"
            >
              I build agents, MCP servers, and on-device AI, and help others do
              the same as an AI Education Intern at{" "}
              <a
                href="https://ai.joinleland.com"
                className="text-[#A5E446] transition-opacity duration-150 hover:opacity-75"
                style={{ textDecoration: "none" }}
              >
                Leland&apos;s AI Builder Program
              </a>
              .
            </p>
            <p
              data-enter
              style={{ ["--enter-delay" as string]: "280ms" }}
              className="mb-4 max-w-lg text-[17px] leading-[1.65] text-white/60"
            >
              Recent builds: Scout, an SDR agent running real outbound for the
              AI Builder Program; Founder OS, my agent-powered project OS; and a
              personal second-brain MCP server. Previously co-founded{" "}
              <a
                href="https://stuplanning.com/"
                className="text-[#A5E446] transition-opacity duration-150 hover:opacity-75"
                style={{ textDecoration: "none" }}
              >
                stu
              </a>
              .
            </p>
            <p
              data-enter
              style={{ ["--enter-delay" as string]: "340ms" }}
              className="mb-12 max-w-lg text-[15px] leading-[1.65] text-white/40"
            >
              <a
                href="/plan"
                className="transition-opacity duration-150 hover:opacity-75"
                style={{ textDecoration: "none" }}
              >
                Building toward Y Combinator by 2031 →
              </a>
            </p>

            <div
              data-enter
              style={{ ["--enter-delay" as string]: "420ms" }}
              className="flex flex-wrap items-center gap-4"
            >
              <TrackedLink
                eventType="cta_click"
                slug="view-projects"
                href="/projects"
                className="inline-flex items-center gap-2 bg-[#A5E446] px-6 py-3 text-black transition-colors duration-150 hover:bg-[#95D03E]"
                style={{
                  fontFamily: metaFont,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                }}
              >
                View My Projects →
              </TrackedLink>
              <a
                href="/game"
                className="inline-flex items-center gap-2 border border-[#484848] px-6 py-3 text-white transition-all duration-150 hover:border-white/50 hover:bg-white/[0.03]"
                style={{
                  fontFamily: metaFont,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                }}
              >
                Try Battle Squares →
              </a>
            </div>

            {/* Node diagram — mobile only (below CTAs) */}
            <div className="mt-12 flex justify-center lg:hidden">
              <HeroNodeDiagram />
            </div>
          </div>

          {/* ── Right: node diagram — desktop only ── */}
          <div className="hidden shrink-0 lg:block">
            <HeroNodeDiagram />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        {/* ── Experience strip ── */}
        <section
          className="border-b border-white/[0.08]"
          style={{ padding: "56px 0" }}
        >
          <span
            className="mb-6 block text-center text-[#808080]"
            style={{
              fontFamily: metaFont,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Where I&apos;ve Worked
          </span>
          <Reveal className="flex items-center justify-center gap-10">
            {experience.map((co) => (
              <div
                key={co.name}
                data-reveal
                className="relative flex items-center justify-center opacity-[0.45] grayscale transition-all duration-150 hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={co.src}
                  alt={co.name}
                  width={co.width}
                  height={co.height}
                  unoptimized={"unoptimized" in co ? co.unoptimized : false}
                  className="object-contain"
                />
              </div>
            ))}
          </Reveal>
        </section>

        {/* ── Skills ── */}
        <section
          className="border-b border-white/[0.08]"
          style={{ padding: "64px 0" }}
        >
          <span
            className="mb-6 block text-[#A5E446]"
            style={{
              fontFamily: metaFont,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Expertise
          </span>
          <Reveal className="border border-white/[0.08] md:grid md:grid-cols-2">
            <div
              data-reveal
              className="border-b border-white/[0.08] bg-black p-7 transition-colors duration-150 hover:bg-[#050505] md:border-r md:border-b-0"
            >
              <h3
                className="mb-4 text-[#808080]"
                style={{
                  fontFamily: metaFont,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Technical Skills
              </h3>
              <ul className="list-none space-y-3 pl-0">
                {technicalSkills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-[15px] text-white/60"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#A5E446]" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div
              data-reveal
              className="bg-black p-7 transition-colors duration-150 hover:bg-[#050505]"
            >
              <h3
                className="mb-4 text-[#808080]"
                style={{
                  fontFamily: metaFont,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Specializations
              </h3>
              <ul className="list-none space-y-3 pl-0">
                {specializations.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-3 text-[15px] text-white/60"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#A5E446]" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ── Recent Writing ── */}
        <section
          className="border-b border-white/[0.08]"
          style={{ padding: "64px 0" }}
        >
          <div className="mb-6 flex items-baseline justify-between">
            <span
              className="block text-[#A5E446]"
              style={{
                fontFamily: metaFont,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Recent Writing
            </span>
            <Link
              href="/blog"
              className="text-white/40 transition-colors duration-150 hover:text-[#A5E446]"
              style={{
                fontFamily: metaFont,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              All Posts →
            </Link>
          </div>
          <Reveal className="border border-white/[0.08]">
            {recentPosts.map((post, i) => (
              <TrackedLink
                key={post.slug}
                eventType="post_click"
                slug={post.slug}
                href={`/blog/${post.slug}`}
                data-reveal
                className={`group flex items-baseline justify-between gap-6 bg-black px-6 py-5 transition-colors duration-150 hover:bg-[#050505] ${
                  i > 0 ? "border-t border-white/[0.08]" : ""
                }`}
                style={{ textDecoration: "none" }}
              >
                <div className="min-w-0">
                  <h3 className="mb-1 truncate text-[16px] font-semibold text-white group-hover:text-[#A5E446]">
                    {post.metadata.title}
                  </h3>
                  <p className="line-clamp-1 text-[14px] text-white/50">
                    {post.metadata.summary}
                  </p>
                </div>
                <span
                  className="shrink-0 text-white/30"
                  style={{
                    fontFamily: metaFont,
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {formatDate(post.metadata.publishedAt)}
                </span>
              </TrackedLink>
            ))}
          </Reveal>
        </section>

        {/* ── Credentials (demoted) ── */}
        <section
          className="border-b border-white/[0.08]"
          style={{ padding: "40px 0" }}
        >
          <span
            className="mb-4 block text-[#808080]"
            style={{
              fontFamily: metaFont,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Credentials
          </span>
          <Reveal className="flex flex-wrap items-center gap-4" stagger={50}>
            {badges.map((badge) => (
              <div
                key={badge.name}
                data-reveal
                className="relative h-12 w-12 opacity-60 grayscale transition-all duration-150 hover:-translate-y-[2px] hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={badge.src}
                  alt={badge.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </Reveal>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "64px 0 80px" }}>
          <Reveal>
            <div
              data-reveal
              className="border border-white/[0.08] bg-black p-12 transition-colors duration-150 hover:border-white/[0.14]"
            >
              <span
                className="mb-3 block text-[#A5E446]"
                style={{
                  fontFamily: metaFont,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Got a Second?
              </span>
              <p className="mb-6 max-w-sm text-[16px] text-white/60">
                Explore a few of my solutions to problems I&apos;ve tackled
                recently.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <TrackedLink
                  eventType="cta_click"
                  slug="book-a-call"
                  href="https://calendly.com/matthew-jones6288/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#A5E446] px-6 py-3 text-black transition-colors duration-150 hover:bg-[#95D03E]"
                  style={{
                    fontFamily: metaFont,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                  }}
                >
                  Book a Call →
                </TrackedLink>
                <span
                  className="text-white/20"
                  style={{ fontFamily: metaFont, fontSize: "11px" }}
                >
                  or
                </span>
                <a
                  href="/game"
                  className="text-white/50 transition-colors duration-150 hover:text-[#A5E446]"
                  style={{
                    fontFamily: metaFont,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                  }}
                >
                  Try Battle Squares →
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
