import Image from "next/image";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinjones.me";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vin Jones",
  jobTitle: "Software Engineer & Co-Founder",
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
  publisher: {
    "@type": "Person",
    name: "Vin Jones",
  },
};

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
      <div className="mx-auto max-w-4xl px-8 text-lg leading-relaxed">
        {/* Hero Section */}
        <section className="mb-12 flex flex-col items-center text-center">
          <div className="relative mb-6 h-36 w-36 rounded-full shadow-xl ring-4 ring-white/70">
            <Image
              src="/headshot_IS_square.jpg"
              alt="Vin Jones smiling"
              fill
              sizes="(max-width: 768px) 9rem, 9rem"
              priority
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Vin Jones, Software Engineer & Co-Founder
          </h1>
          <p className="max-2xl mt-2 text-gray-900">
            You&apos;ve found my portfolio! As a Master&apos;s student in
            Information Systems at BYU, I specialize in predictive analytics,
            secure software development, and cloud engineering solutions. In the
            age of AI, I love getting close to the people I&apos;m building for
            to quickly iterate and deliver high-impact solutions.
          </p>
          <p className="max-2xl mt-2 text-gray-900">
            Throughout my time at BYU and as a co-founder of{" "}
            <a
              className="font-semibold text-emerald-800 transition-colors duration-200 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
              href="https://stuplanning.com/"
            >
              stu
            </a>
            , I&apos;m honing my skills in building scalable cloud solutions,
            developing AI-driven applications, and bringing the development
            process closer to the end-users.
          </p>
        </section>

        {/* Skills & Expertise Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Expertise
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Technical Skills
              </h3>
              <ul className="list-inside list-disc space-y-1 text-gray-900 marker:text-emerald-700">
                <li>Cloud Engineering & Architecture</li>
                <li>AI & Machine Learning Solutions</li>
                <li>Full-Stack Development</li>
                <li>Data Pipelines & Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Specializations
              </h3>
              <ul className="list-inside list-disc space-y-1 text-gray-900 marker:text-emerald-700">
                <li>Predictive Analytics</li>
                <li>Secure Software Development</li>
                <li>UX Design & Implementation</li>
                <li>Recommendation Systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="rounded-lg bg-gray-50 p-6 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Got a Second?
          </h2>
          <p className="mb-6 text-gray-900">
            Explore a few of my solutions to problems I&apos;ve tackled
            recently.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/projects"
              className="rounded-lg bg-emerald-700 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900"
            >
              View My Projects
            </a>
            <span className="text-slate-600">or</span>
            <a
              className="arcade-font font-medium text-emerald-800 transition-colors duration-200 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900"
              href="/game"
            >
              Try Untitled Battle Squares
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
