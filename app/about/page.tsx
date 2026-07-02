"use client";

import Image from "next/image";
import { GridCanvas } from "@/components/grid-canvas";
import { Reveal } from "@/components/use-reveal";

const metaFont =
  "'Departure Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace";

const photos = [
  { img: "20230805_120352.jpg", title: "Hiking with Rachel" },
  { img: "20231014_103403.jpg", title: "Eclipse with Rachel" },
  { img: "20240410_172039.jpg", title: "Battlebot prototype" },
  { img: "20250628_205236.jpg", title: "Sunset on the Puget Sound" },
  { img: "IMG_1721.jpeg", title: "Sumo robot battle" },
  { img: "Moab_Wedding-592.jpg", title: "Wedding in Moab" },
];

export default function AboutMe() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-black"
        style={{ paddingTop: "120px", paddingBottom: "48px" }}
      >
        <GridCanvas />
        <div className="relative z-[2] mx-auto max-w-4xl px-6">
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
            AI Builder · AI Education Intern @ Leland
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
            About Me
          </h1>
        </div>
      </section>

      {/* ── Story ── */}
      <div className="mx-auto max-w-4xl px-6 pb-24">
        <Reveal className="max-w-2xl space-y-6 border-t border-white/[0.08] pt-10 text-[17px] leading-[1.7] text-white/70">
          <p data-reveal>
            I&apos;m an AI Education Intern at{" "}
            <a
              href="https://ai.joinleland.com"
              className="text-[#A5E446] transition-opacity duration-150 hover:opacity-75"
              style={{ textDecoration: "none" }}
            >
              Leland&apos;s AI Builder Program
            </a>
            , where I help people learn to actually build with AI, not just talk
            about it.
          </p>
          <p data-reveal>
            Most of what I share comes straight from what I ship. I build
            agents, MCP servers, and on-device AI. Recent work:{" "}
            <strong>School OS</strong>, a Socratic tutor backed by a
            tamper-evident, hash-chained learning ledger; an on-device
            foundation-model iOS app that keeps inference on the phone; a
            personal second-brain MCP server; and an MCP server I built to
            manage this site through an agent. Alongside those I co-founded{" "}
            <strong>stu</strong> and keep a handful of builder projects running:
            Founder OS, buddy-nd, MacroClone, a voice-clone MCP, and more.
          </p>
          <p data-reveal>
            The throughline is a public plan: I&apos;m building toward Y
            Combinator by 2031. Everything I make is a rep toward founding
            something that matters, and toward getting good enough at building
            with AI that I can teach anyone else to do it too.
          </p>
          <p data-reveal>
            Time away from the keyboard keeps the rest of it honest. Whether
            I&apos;m hiking or biking with my wife Rachel, tinkering with a
            Linux box (Mint, for the record), reading, or playing multiplayer
            games with family, I find that understanding real-world complexity
            is what makes software more resilient, empathetic, and pragmatic.
          </p>
        </Reveal>

        {/* ── Photo grid ── */}
        <Reveal className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3">
          {photos.map((p) => (
            <div
              key={p.img}
              data-reveal
              className="relative aspect-[4/3] overflow-hidden border border-white/[0.08] grayscale transition-all duration-200 hover:grayscale-0"
            >
              <Image
                src={encodeURI(`/${p.img}`)}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </>
  );
}
