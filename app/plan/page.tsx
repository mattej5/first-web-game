"use client";

import Link from "next/link";
import { GridCanvas } from "@/components/grid-canvas";
import { Reveal } from "@/components/use-reveal";
import { Countdown } from "@/components/countdown";

const metaFont =
  "'Departure Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace";

const roadmap = [
  {
    year: "2026",
    label: "Year 1",
    title: "Find the thing",
    current: true,
    points: [
      "Ship small experiments in public and validate real demand",
      "Run discovery calls, follow the pain, kill ideas fast",
      "Pick one direction by end of year, backed by evidence",
      "Gate: first revenue or 100 active users on something",
    ],
  },
  {
    year: "2027",
    label: "Year 2",
    title: "Prove the thing",
    current: false,
    points: [
      "Meaningful traction on the one direction",
      "Find 10 users who would be devastated if it disappeared",
      "Nail the core retention loop",
      "Keep building in public",
    ],
  },
  {
    year: "2028",
    label: "Year 3",
    title: "Scale the thing",
    current: false,
    points: [
      "Apply to Y Combinator",
      "Small team: co-founders or early hires",
      "Clear thesis on what makes this a billion-dollar outcome",
    ],
  },
  {
    year: "2029-2031",
    label: "Years 4-5",
    title: "Go big",
    current: false,
    points: [
      "Post-YC (or equivalent) funding and scale",
      "The company matters more than the milestone",
    ],
  },
];

export default function PlanPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-black"
        style={{ paddingTop: "120px", paddingBottom: "48px" }}
      >
        <GridCanvas />
        <div className="relative z-[2] mx-auto max-w-4xl px-6">
          <span
            className="mb-5 block text-[#A5E446]"
            style={{
              fontFamily: metaFont,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            The Public Plan
          </span>
          <h1
            className="text-white"
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Y Combinator by 2031
          </h1>
          <div className="mt-6">
            <Countdown target="2027-04-22T00:00:00" label="Until Graduation" />
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <div className="mx-auto max-w-4xl px-6 pb-24">
        <Reveal className="max-w-2xl border-t border-white/[0.08] pt-10">
          <p
            data-reveal
            className="mb-12 text-[17px] leading-[1.7] text-white/70"
          >
            Everything I build is a rep toward founding something worth funding.
            This page is the plan itself, gates and all, updated as it moves.
            Holding the plan in public keeps me honest.
          </p>

          <div className="space-y-10">
            {roadmap.map((phase) => (
              <div
                key={phase.year}
                data-reveal
                className={`border-l-2 pl-6 ${
                  phase.current ? "border-[#A5E446]" : "border-white/[0.12]"
                }`}
              >
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span
                    className={
                      phase.current ? "text-[#A5E446]" : "text-white/40"
                    }
                    style={{
                      fontFamily: metaFont,
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {phase.year} · {phase.label}
                  </span>
                  {phase.current && (
                    <span
                      className="border border-[#A5E446]/40 px-2 py-0.5 text-[#A5E446]"
                      style={{
                        fontFamily: metaFont,
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Now
                    </span>
                  )}
                </div>
                <h2 className="mb-3 text-xl font-semibold text-white">
                  {phase.title}
                </h2>
                <ul className="space-y-1.5 text-[15px] leading-[1.7] text-white/60">
                  {phase.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p
            data-reveal
            className="mt-12 text-[15px] leading-[1.7] text-white/40"
          >
            Progress shows up as shipped work on the{" "}
            <Link
              href="/projects"
              className="text-[#A5E446] transition-opacity duration-150 hover:opacity-75"
              style={{ textDecoration: "none" }}
            >
              projects page
            </Link>{" "}
            and write-ups on the{" "}
            <Link
              href="/blog"
              className="text-[#A5E446] transition-opacity duration-150 hover:opacity-75"
              style={{ textDecoration: "none" }}
            >
              blog
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </>
  );
}
