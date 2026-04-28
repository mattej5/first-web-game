export const metadata = {
  title: "Looking for a Cofounder | Vin Jones",
  description:
    "Building an operating system for the depth-over-volume job search. Looking for a complementary cofounder.",
  robots: { index: false, follow: false },
};

const missionPillars = [
  {
    title: "Why this company",
    body: "Help the candidate articulate why they want to work there — and pressure-test it.",
  },
  {
    title: "Reality of working there",
    body: "What the team actually does, what the bar is, what the day looks like.",
  },
  {
    title: "The right relationships",
    body: "The 5–10 people inside who can vouch — and the playbook to earn those conversations.",
  },
];

const existingTools = [
  {
    name: "Career services",
    why: "Free, but generic. Limited capacity. No operating system for going deep on a single employer.",
  },
  {
    name: "Job boards (Handshake, Symplicity)",
    why: "Engineered for application volume — the exact behavior that hurts the candidate.",
  },
  {
    name: "Paid coaches (Pathrise, Forage)",
    why: "Effective for a narrow audience. Expensive. Heavy on interview prep, light on company strategy.",
  },
  {
    name: "DIY LinkedIn outreach",
    why: "Free in theory. No playbook, no narrative, no accountability.",
  },
];

const productSurfaces = [
  {
    name: "Role-research agent",
    body: "Synthesizes what the company does, the team's recent priorities, and the bar for early talent.",
  },
  {
    name: "Networking agent",
    body: "Identifies the right people inside, drafts a candidate-specific outreach playbook, supports prep and follow-up.",
  },
  {
    name: "Candidate CRM",
    body: "Tracks every interaction — coffee chats, calls, emails — so progress is visible and the next move is obvious.",
  },
  {
    name: "Talent-profile service",
    body: "Maps candidate skills against what the company values most. Surfaces gaps to close. Recommends targeted upskilling.",
  },
];

const whyNow = [
  {
    n: "01",
    title: "AI broke the application funnel",
    body: "Auto-apply tools and AI-generated resumes have collapsed the cost of an application to ~zero. Volume strategies stopped working — for candidates and for hiring teams.",
  },
  {
    n: "02",
    title: "Employers are screaming for signal",
    body: "Hiring teams already filter for signs of real interest, real research, and real referrals. The candidate side hasn't caught up.",
  },
  {
    n: "03",
    title: "Agentic AI makes depth feasible at scale",
    body: "Doing real research and coordinated outreach used to take 20+ hours per company. Agents collapse that to 2 — making the depth strategy realistic for one student, not just consultants and bankers.",
  },
];

const marketStats = [
  { stat: "~20M", label: "U.S. undergraduate students" },
  { stat: "~4M", label: "Graduating each year" },
  { stat: "$1B+", label: "Spent on early-career prep annually" },
];

const haveList = [
  "A clear, defensible thesis (depth > volume)",
  "Lived experience of the early-career job hunt",
  "Builder / operator background",
  "Direct access to candidates and university networks",
  "An emerging product surface (4 services) and a 30-day plan",
];

const dontHaveList = [
  "A built product — pure idea stage",
  "Paying customers or a concierge cohort yet",
  "A locked revenue model (likely B2C concierge → B2B2C)",
  "A locked vertical wedge — actively a question to test",
  "A team. That's why we're here.",
];

const planPhases = [
  {
    range: "Days 0–30",
    title: "Customer discovery",
    items: [
      "30 unstructured student interviews",
      "Listen for the 1–2 companies pattern",
      "Test willingness-to-pay informally",
    ],
  },
  {
    range: "Days 30–60",
    title: "Concierge cohort #1",
    items: [
      "5–10 paid students at $49–$199",
      "Fully human-delivered playbook",
      "Weekly check-ins — track interactions",
    ],
  },
  {
    range: "Days 60–90",
    title: "First product surface",
    items: [
      "Pick the single highest-leverage agent (likely role-research)",
      "Build the thinnest version that earns trust",
      "Decide: vertical wedge or stay broad",
    ],
  },
];

const cofounderProfiles = [
  {
    role: "Recruiting / TA background",
    body: "You've worked inside hiring teams and know what an early-career hire needs to look like to get a yes.",
  },
  {
    role: "Career coaching / education",
    body: "You've coached students through this and have seen the gap between advice and execution.",
  },
  {
    role: "Product design + AI",
    body: "You can take an agent loop from sketch to working concierge in a week.",
  },
];

const ownership = [
  "Co-defining the depth playbook",
  "Running the first concierge cohort end-to-end",
  "Owning one of the four product surfaces",
  "Equal voice in every strategic call",
  "Real founder equity — we're early enough that this is honest",
];

export default function PitchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* ── HERO ── */}
      <section className="mb-16 text-center">
        <span className="mb-4 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Founder working draft v0.1 · April 2026
        </span>
        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Looking for a Cofounder
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
          We help early-talent candidates land their ideal role through network
          coaching and targeted upskilling — by going deep on one or two
          companies instead of spraying a hundred applications.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:matthew.jones6288@gmail.com"
            className="rounded bg-[#a5e446] px-6 py-3 font-mono text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5e446]"
          >
            matthew.jones6288@gmail.com →
          </a>
          <span className="font-mono text-xs text-white/30">Vin Jones</span>
        </div>
      </section>

      <div className="border-t border-white/10" />

      {/* ── MISSION ── */}
      <section className="my-16">
        <span className="mb-2 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Mission
        </span>
        <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white">
          Give every early-career candidate the operating system to land the job
          they actually want.
        </h2>
        <p className="mb-8 text-white/60">
          By going deep on the few companies that matter to them.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {missionPillars.map((p) => (
            <div
              key={p.title}
              className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <h3 className="mb-2 text-sm font-semibold tracking-wide text-white">
                {p.title}
              </h3>
              <p className="text-sm text-white/60">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10" />

      {/* ── PROBLEM ── */}
      <section className="my-16">
        <span className="mb-2 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Problem
        </span>
        <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white">
          In 2026, early talent is taught to optimize for the wrong number.
        </h2>
        <p className="mb-8 text-white/60">
          AI-assisted application tools have made spray-and-pray free, fast, and
          frictionless. Candidates are exhausted. Employers are drowning.
          Conversion rates have collapsed.
        </p>
        <span className="mb-4 block font-mono text-xs tracking-widest text-white/30 uppercase">
          What candidates have today — and why each fails
        </span>
        <div className="space-y-3">
          {existingTools.map((t) => (
            <div
              key={t.name}
              className="flex gap-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <span className="mt-0.5 mt-2 h-1.5 w-1.5 shrink-0 self-start rounded-full bg-[#a5e446]" />
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-sm text-white/60">{t.why}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10" />

      {/* ── INSIGHT ── */}
      <section className="my-16">
        <span className="mb-2 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Insight
        </span>
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white">
          The leverage isn&apos;t in applications. It&apos;s in interactions.
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="mb-4 font-mono text-xs tracking-widest text-white/30 uppercase">
              What most students do
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                "Apply to 200 jobs",
                "Send generic cover letters",
                "Hope resume gets through ATS",
                "Re-watch interview prep videos",
                "Hear nothing — feel behind",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-[#a5e446]/30 bg-[#a5e446]/5 p-6 backdrop-blur">
            <p className="mb-4 font-mono text-xs tracking-widest text-[#a5e446] uppercase">
              What people who land roles do
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                "Pick 1–2 companies",
                "Learn the team and bar deeply",
                "Build real relationships inside",
                "Show up to interviews already trusted",
                "Convert — and enjoy the process",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#a5e446]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-t border-white/10" />

      {/* ── PRODUCT VISION ── */}
      <section className="my-16">
        <span className="mb-2 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Product Vision
        </span>
        <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white">
          Four surfaces. One operating system for going deep.
        </h2>
        <p className="mb-8 text-white/60">
          AI is leverage, not the product. The product is a strategy a candidate
          can actually execute.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {productSurfaces.map((s) => (
            <div
              key={s.name}
              className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <h3 className="mb-2 text-sm font-semibold text-white">
                {s.name}
              </h3>
              <p className="text-sm text-white/60">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10" />

      {/* ── WHY NOW ── */}
      <section className="my-16">
        <span className="mb-2 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Why Now
        </span>
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white">
          Three forces have made the depth-over-volume thesis urgent.
        </h2>
        <div className="space-y-4">
          {whyNow.map((f) => (
            <div
              key={f.n}
              className="flex gap-5 rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <span className="shrink-0 font-mono text-2xl font-bold text-[#a5e446]/40">
                {f.n}
              </span>
              <div>
                <p className="mb-1 font-semibold text-white">{f.title}</p>
                <p className="text-sm text-white/60">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10" />

      {/* ── MARKET ── */}
      <section className="my-16">
        <span className="mb-2 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Market Opportunity
        </span>
        <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white">
          Big pool. Real money currently flowing to the wrong tools.
        </h2>
        <p className="mb-8 text-white/60">
          If we only ever serve 1% of U.S. undergrads at $200/year, that&apos;s
          a $40M ARR business. Market sizing is back-of-envelope and meant to be
          challenged, not defended.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {marketStats.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
            >
              <p className="mb-2 text-4xl font-bold text-[#a5e446]">{m.stat}</p>
              <p className="text-sm text-white/60">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10" />

      {/* ── HONEST STAGE CHECK ── */}
      <section className="my-16">
        <span className="mb-2 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Honest Stage Check
        </span>
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white">
          No fake traction here.
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="mb-4 font-mono text-xs tracking-widest text-[#a5e446] uppercase">
              What we have
            </p>
            <ul className="space-y-2">
              {haveList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white/60"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#a5e446]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="mb-4 font-mono text-xs tracking-widest text-white/30 uppercase">
              What we don&apos;t have yet
            </p>
            <ul className="space-y-2">
              {dontHaveList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white/60"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-t border-white/10" />

      {/* ── 90-DAY PLAN ── */}
      <section className="my-16">
        <span className="mb-2 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          90-Day Plan
        </span>
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white">
          Earn the right to build by learning, not by guessing.
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {planPhases.map((phase, i) => (
            <div
              key={phase.range}
              className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <p className="mb-1 font-mono text-xs tracking-widest text-[#a5e446] uppercase">
                {phase.range}
              </p>
              <h3 className="mb-3 font-semibold text-white">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white/60"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#a5e446]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10" />

      {/* ── WHO I'M LOOKING FOR ── */}
      <section className="my-16">
        <span className="mb-2 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Who I&apos;m Looking For
        </span>
        <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white">
          A complementary cofounder who shares the depth-over-volume conviction.
        </h2>
        <p className="mb-8 text-white/60">
          One of three backgrounds fits what I&apos;m missing:
        </p>
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {cofounderProfiles.map((p) => (
            <div
              key={p.role}
              className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <h3 className="mb-2 text-sm font-semibold text-white">
                {p.role}
              </h3>
              <p className="text-sm text-white/60">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-[#a5e446]/20 bg-[#a5e446]/5 p-6 backdrop-blur">
          <p className="mb-4 font-mono text-xs tracking-widest text-[#a5e446] uppercase">
            What you&apos;d own
          </p>
          <ul className="space-y-2">
            {ownership.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-white/70"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#a5e446]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── LET'S TALK ── */}
      <section className="rounded-lg border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
        <span className="mb-3 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
          Let&apos;s Talk
        </span>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white">
          If this thesis lights you up, I want an hour with you.
        </h2>
        <p className="mx-auto mb-2 max-w-xl text-white/60">
          No pitch. We talk about why this matters to you, what you&apos;d want
          to own, and what would have to be true for you to go all-in.
        </p>
        <p className="mb-8 text-sm text-white/40">
          Founder working draft v0.1 · April 2026
        </p>
        <a
          href="mailto:matthew.jones6288@gmail.com"
          className="inline-block rounded bg-[#a5e446] px-8 py-3 font-mono text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5e446]"
        >
          matthew.jones6288@gmail.com →
        </a>
      </section>
    </div>
  );
}
