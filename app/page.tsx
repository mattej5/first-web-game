import Image from "next/image";
import { GridCanvas } from "@/components/grid-canvas";
import { NodeDiagram } from "@/components/node-diagram";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinjones.me";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vin Jones",
  jobTitle: "AI Engineer & Co-Founder",
  url: siteUrl,
  image: `${siteUrl}/headshot_IS_square.jpg`,
  sameAs: [
    "https://github.com/mattej5",
    "https://www.linkedin.com/in/vin-matt-jones/",
    "mailto:matthew.jones6288@gmail.com",
    "https://stuplanning.com",
  ],
  worksFor: { "@type": "Organization", name: "STU - Upgrading Academia" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vin Jones Portfolio",
  url: siteUrl,
  description:
    "Master's student in Information Systems at BYU specializing in predictive analytics, secure software development, and cloud engineering solutions.",
  publisher: { "@type": "Person", name: "Vin Jones" },
};

const technicalSkills = [
  "Cloud Engineering & Architecture",
  "AI & Machine Learning Solutions",
  "Full-Stack Development",
  "Data Pipelines & Analytics",
];

const specializations = [
  "Predictive Analytics",
  "Secure Software Development",
  "UX Design & Implementation",
  "Recommendation Systems",
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-black"
        style={{ paddingTop: "140px", paddingBottom: "100px" }}
      >
        <GridCanvas />

        {/* faint headshot wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[1]"
          style={{
            width: "55%",
            backgroundImage: "url('/headshot_IS_square.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: 0.07,
            maskImage: "linear-gradient(to left, black 0%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, transparent 70%)",
          }}
        />

        <div className="relative z-[2] mx-auto flex max-w-4xl items-center gap-12 px-6">
          {/* ── Left: text content ── */}
          <div className="flex-1">
            <div className="mb-6">
              <Image
                src="/headshot_IS_square.jpg"
                alt="Vin Jones"
                width={72}
                height={72}
                className="rounded-full object-cover ring-1 ring-white/10"
              />
            </div>
            <span
              className="mb-5 block text-[#A5E446]"
              style={{
                fontFamily: metaFont,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              AI Engineer · Co-Founder
            </span>

            <h1
              className="text-white"
              style={{
                fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
                fontSize: "clamp(40px, 5.5vw, 72px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginBottom: "24px",
              }}
            >
              Vin Jones
            </h1>

            <p className="mb-3 max-w-lg text-[17px] leading-[1.65] text-white/60">
              Master&apos;s student in Information Systems at BYU, focused on AI
              efficiency, predictive analytics, and secure systems — including
              locally-hosted AI.
            </p>
            <p className="mb-4 max-w-lg text-[17px] leading-[1.65] text-white/60">
              At{" "}
              <a
                href="https://leland.com/"
                className="text-[#A5E446] transition-opacity duration-150 hover:opacity-75"
                style={{ textDecoration: "none" }}
              >
                Leland
              </a>{" "}
              building curriculum and infrastructure that makes AI accessible to
              everyone, from everyday users to engineering teams. Previously
              co-founded{" "}
              <a
                href="https://stuplanning.com/"
                className="text-[#A5E446] transition-opacity duration-150 hover:opacity-75"
                style={{ textDecoration: "none" }}
              >
                stu
              </a>
              .
            </p>
            <p className="mb-12 max-w-lg text-[15px] leading-[1.65] text-white/40">
              Currently building{" "}
              <a
                href="https://mattej5.github.io/remora-landing"
                className="text-white/60 transition-opacity duration-150 hover:text-[#A5E446]"
                style={{ textDecoration: "none" }}
              >
                Remora
              </a>{" "}
              and{" "}
              <a
                href="/projects"
                className="text-white/60 transition-opacity duration-150 hover:text-[#A5E446]"
                style={{ textDecoration: "none" }}
              >
                Strix
              </a>
              .
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
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
              </a>
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
              <NodeDiagram />
            </div>
          </div>

          {/* ── Right: node diagram — desktop only ── */}
          <div className="hidden shrink-0 lg:block">
            <NodeDiagram />
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
          <div className="flex items-center justify-center gap-10">
            {experience.map((co) => (
              <div
                key={co.name}
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
          </div>
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
          <div className="border border-white/[0.08] md:grid md:grid-cols-2">
            <div className="border-b border-white/[0.08] bg-black p-7 transition-colors duration-150 hover:bg-[#050505] md:border-r md:border-b-0">
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
            <div className="bg-black p-7 transition-colors duration-150 hover:bg-[#050505]">
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
          </div>
        </section>

        {/* ── Credentials ── */}
        <section
          className="border-b border-white/[0.08]"
          style={{ padding: "64px 0" }}
        >
          <span
            className="mb-6 block text-[#808080]"
            style={{
              fontFamily: metaFont,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Credentials
          </span>
          <div className="flex flex-wrap gap-5">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className="relative h-20 w-20 opacity-85 transition-all duration-150 hover:-translate-y-[3px] hover:opacity-100"
              >
                <Image
                  src={badge.src}
                  alt={badge.name}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "64px 0 80px" }}>
          <div className="border border-white/[0.08] bg-black p-12 transition-colors duration-150 hover:border-white/[0.14]">
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
              <a
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
              </a>
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
                Try Untitled Battle Squares →
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
