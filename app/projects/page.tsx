"use client";

import { useEffect, useRef } from "react";
import { projects, type Project, type ProjectTier } from "@/data/projects";
import { GridCanvas } from "@/components/grid-canvas";
import { Reveal } from "@/components/use-reveal";
import { useScrollProgress } from "@/components/use-scroll-progress";
import { track } from "@/lib/analytics";

const metaFont =
  "'Departure Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace";

const tierOrder: ProjectTier[] = ["FLAGSHIP AI", "PRODUCTS", "ARCHIVE"];
const tierBlurb: Record<ProjectTier, string> = {
  "FLAGSHIP AI": "The work I lead with: agents, MCP, and on-device AI.",
  PRODUCTS: "Shipped things people actually use.",
  ARCHIVE: "Earlier builds, kept for the record.",
};

function metaLabel(color: string): React.CSSProperties {
  return {
    fontFamily: metaFont,
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color,
  };
}

function ProjectCard({
  project,
  litRef,
}: {
  project: Project;
  litRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      data-reveal
      ref={litRef}
      className="group border border-white/[0.08] bg-black p-6 transition-colors duration-150 hover:border-white/[0.14] hover:bg-[#050505]"
    >
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
        {project.tags.map((tag) => (
          <span
            key={tag}
            data-tag
            style={{
              fontFamily: metaFont,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#808080",
              transition: "color 0.3s ease",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <h3
        className="mb-2 text-white"
        style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.01em" }}
      >
        {project.title}
      </h3>

      <p className="max-w-2xl text-[15px] leading-[1.65] text-white/60">
        {project.description}
      </p>

      {project.impactStats && (
        <ul className="mt-4 space-y-1.5 pl-0">
          {project.impactStats.map((stat) => (
            <li
              key={stat}
              className="flex items-center gap-2.5 text-[14px] text-white/50"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-[#A5E446]" />
              {stat}
            </li>
          ))}
        </ul>
      )}

      {project.link && (
        <a
          href={project.link.url}
          onClick={() => track("project_click", { slug: project.title })}
          target={project.link.url.startsWith("http") ? "_blank" : undefined}
          rel={
            project.link.url.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
          className="mt-5 inline-flex items-center gap-2 text-[#A5E446] transition-opacity duration-150 hover:opacity-75"
          style={{
            fontFamily: metaFont,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            textDecoration: "none",
          }}
        >
          {project.link.label} →
        </a>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const { ref: listRef, progress } = useScrollProgress<HTMLDivElement>();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    track("page_view", { slug: "projects" });
  }, []);

  // As the fill line passes each card, flicker its tags grey → lime.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const fillY = list.clientHeight * progress;
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const cardMid = card.offsetTop + card.offsetHeight * 0.35;
      const lit = cardMid <= fillY;
      card.querySelectorAll<HTMLElement>("[data-tag]").forEach((t) => {
        t.style.color = lit ? "#A5E446" : "#808080";
      });
    });
  }, [progress, listRef]);

  let cardIndex = 0;

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-black"
        style={{ paddingTop: "120px", paddingBottom: "56px" }}
      >
        <GridCanvas />
        <div className="relative z-[2] mx-auto max-w-4xl px-6">
          <span className="mb-5 block" style={metaLabel("#A5E446")}>
            Selected Work
          </span>
          <h1
            className="mb-5 text-white"
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Things I&apos;ve Built
          </h1>
          <p className="max-w-xl text-[17px] leading-[1.65] text-white/60">
            Agents, MCP servers, and on-device AI, plus the products and
            experiments that got me here.
          </p>
        </div>
      </section>

      {/* ── Project list with lime scroll rail ── */}
      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div ref={listRef} className="relative pl-6 md:pl-10">
          {/* rail track */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-white/[0.08]" />
          {/* rail fill */}
          <div
            className="absolute top-0 left-0 w-px bg-[#A5E446]"
            style={{
              height: `${progress * 100}%`,
              boxShadow: "0 0 8px rgba(165,228,70,0.6)",
              transition: "height 0.1s linear",
            }}
          />

          {tierOrder.map((tier) => {
            const group = projects.filter((p) => p.tier === tier);
            if (group.length === 0) return null;
            return (
              <section key={tier} className="mb-14">
                <div className="mb-6">
                  <span className="block" style={metaLabel("#808080")}>
                    {tier}
                  </span>
                  <p className="mt-1 text-[13px] text-white/40">
                    {tierBlurb[tier]}
                  </p>
                </div>
                <Reveal className="flex flex-col gap-4">
                  {group.map((project) => {
                    const idx = cardIndex++;
                    return (
                      <ProjectCard
                        key={project.title}
                        project={project}
                        litRef={(el) => {
                          cardRefs.current[idx] = el;
                        }}
                      />
                    );
                  })}
                </Reveal>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
