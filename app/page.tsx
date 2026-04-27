import Image from "next/image";

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
  worksFor: {
    "@type": "Organization",
    name: "STU - Upgrading Academia",
  },
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
];

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
      <div className="mx-auto max-w-4xl px-4 py-4">
        {/* Hero */}
        <section className="mb-14 flex flex-col items-center text-center">
          <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full ring-1 ring-white/20">
            <Image
              src="/headshot_IS_square.jpg"
              alt="Vin Jones smiling"
              fill
              sizes="(max-width: 768px) 8rem, 8rem"
              priority
              className="object-cover"
            />
          </div>

          <span className="mb-4 font-mono text-xs tracking-widest text-[#a5e446] uppercase">
            AI Engineer · Co-Founder
          </span>

          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Vin Jones
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            Master&apos;s student in Information Systems at BYU. I specialize in
            agentic applications, secure software development, and cloud
            engineering. I love getting close to the people I&apos;m building
            for to quickly iterate and deliver high-impact solutions.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/60">
            Co-founder of{" "}
            <a
              className="text-[#a5e446] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a5e446]"
              href="https://stuplanning.com/"
            >
              stu
            </a>
            , building scalable cloud solutions and AI-driven applications
            closer to the end-users.
          </p>
        </section>

        {/* Experience logo strip */}
        <section className="mb-14">
          <span className="mb-5 block text-center font-mono text-xs tracking-widest text-white/30 uppercase">
            Where I&apos;ve Worked
          </span>
          <div className="flex items-center justify-center gap-10">
            {experience.map((co) => (
              <div
                key={co.name}
                className="relative flex items-center justify-center opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={co.src}
                  alt={co.name}
                  width={co.width}
                  height={co.height}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <span className="mb-4 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
            Expertise
          </span>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-white uppercase">
                Technical Skills
              </h3>
              <ul className="space-y-2">
                {technicalSkills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#a5e446]" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-white uppercase">
                Specializations
              </h3>
              <ul className="space-y-2">
                {specializations.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#a5e446]" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Credential badges */}
        <section className="mb-12">
          <span className="mb-5 block font-mono text-xs tracking-widest text-white/30 uppercase">
            Credentials
          </span>
          <div className="flex flex-wrap gap-4">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className="relative h-20 w-20 transition-transform hover:-translate-y-1"
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

        {/* CTA */}
        <section className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
          <span className="mb-3 block font-mono text-xs tracking-widest text-[#a5e446] uppercase">
            Got a Second?
          </span>
          <p className="mb-6 text-white/60">
            Explore a few of my solutions to problems I&apos;ve tackled
            recently.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/projects"
              className="rounded bg-[#a5e446] px-5 py-2.5 font-mono text-xs font-medium tracking-wide text-black transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5e446]"
            >
              View My Projects →
            </a>
            <span className="text-white/30">or</span>
            <a
              className="font-mono text-xs tracking-wide text-white/60 transition-colors hover:text-[#a5e446] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5e446]"
              href="/game"
            >
              Try Untitled Battle Squares →
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
