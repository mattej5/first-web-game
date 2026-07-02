import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PasswordGate } from "@/components/password-gate";
import {
  getEventsSummary,
  type AnalyticsSummary,
} from "@/app/api/events/store";

export const metadata: Metadata = {
  title: "Vin's Portfolio - Palantir Dashboard",
  description:
    "Password-gated Palantir portal with tailored portfolio content and analytics.",
};

const CONTACT_EMAIL = "mattej5@byu.edu";

function formatLabel(slug: string) {
  return slug
    .replace(/^\/blog\//, "")
    .replace(/^\/projects\//, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function StatList({
  title,
  emptyLabel,
  items,
}: {
  title: string;
  emptyLabel: string;
  items: AnalyticsSummary["groups"][keyof AnalyticsSummary["groups"]];
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="text-xs tracking-[0.22em] text-white/45 uppercase">
          {items.length} items
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-white/50">{emptyLabel}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={`${title}-${item.slug}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-black/20 px-4 py-3"
            >
              <span className="min-w-0 truncate text-sm text-white/75">
                {formatLabel(item.slug)}
              </span>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function PalantirPage() {
  const summary = await getEventsSummary();
  const pageViewItems = summary.groups.page_view;
  const projectClickItems = summary.groups.project_click;
  const ctaClickItems = summary.groups.cta_click;
  const password = process.env.PALANTIR_PASSWORD;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <PasswordGate
          isProtected
          password={password}
          contactEmail={CONTACT_EMAIL}
          storageKey="palantir:dashboard"
          title="Palantir analytics dashboard"
        >
          <div className="space-y-10">
            <header className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-emerald-950/30">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs tracking-[0.28em] text-emerald-300/80 uppercase">
                    Private Palantir Portal
                  </p>
                  <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
                    Analytics dashboard + tailored portfolio context
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                    This route now doubles as a password-gated analytics
                    surface. It tracks blog views, project-card clicks, and CTA
                    engagement without relying on local SQLite state.
                  </p>
                </div>

                <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <Image
                    src="/headshot_IS_square.jpg"
                    alt="Vin Jones smiling"
                    fill
                    sizes="7rem"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </header>

            <section className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-white/55">Page views</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {summary.totals.page_view}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-white/55">Post clicks</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {summary.totals.post_click}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-white/55">CTA clicks</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {summary.totals.cta_click}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-white/55">Project clicks</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {summary.totals.project_click}
                </p>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
              <StatList
                title="Views per blog post"
                emptyLabel="No page views recorded yet."
                items={pageViewItems}
              />
              <StatList
                title="Project-card clicks"
                emptyLabel="No project clicks recorded yet."
                items={projectClickItems}
              />
              <StatList
                title="CTA click counts"
                emptyLabel="No CTA clicks recorded yet."
                items={ctaClickItems}
              />
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold text-white">
                  Why this backend change matters
                </h2>
                <p className="mt-4 leading-7 text-white/70">
                  The old SQLite approach worked poorly for Vercel because local
                  files do not persist across serverless invocations and
                  `better-sqlite3` native bindings were brittle. This page now
                  reads from the shared analytics aggregate instead.
                </p>
                <div className="mt-6 space-y-4 text-sm text-white/65">
                  <p>Blog views are grouped by tracked slug.</p>
                  <p>
                    Project and CTA counters are ready for other agents to wire
                    into the UI.
                  </p>
                  <p>
                    When Redis credentials are absent, everything degrades
                    cleanly to zeroed data.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold text-white">
                  Tailored links
                </h2>
                <div className="mt-6 space-y-3">
                  <a
                    href="https://stuplanning.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/15"
                  >
                    STU Planning
                  </a>
                  <Link
                    href="/blog/STU"
                    className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white"
                  >
                    Technical deep dive: Building STU
                  </Link>
                  <Link
                    href="/projects"
                    className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white"
                  >
                    Browse all projects
                  </Link>
                  <a
                    href="mailto:mattej5@byu.edu"
                    className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white"
                  >
                    Email Vin
                  </a>
                </div>
              </div>
            </section>
          </div>
        </PasswordGate>
      </div>
    </div>
  );
}
