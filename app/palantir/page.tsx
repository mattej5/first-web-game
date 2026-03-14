import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Vin's Portfolio - Palantir Application",
  description:
    "Tailored portfolio for Palantir showcasing relevant experience in scalable software development and data solutions.",
};

export default function PalantirPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative h-36 w-36 rounded-full shadow-xl ring-4 ring-white/70">
              <Image
                src="/headshot_IS_square.jpg"
                alt="Vin Jones smiling"
                fill
                sizes="(max-width: 768px) 9rem, 9rem"
                priority
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
            Vin
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Software Engineer & Co-Founder
          </p>
        </header>

        {/* Personalized Intro */}
        <section className="mb-12">
          <div className="rounded-lg bg-blue-50 p-8 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Hello, Palantir Team!
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              I&apos;m excited about the opportunity to contribute to
              Palantir&apos;s mission of building the future. As someone
              who&apos;s built scalable software solutions from the ground up,
              I&apos;m particularly drawn to your focus on turning complex data
              into actionable insights. My experience building automation tools
              and data-driven applications aligns perfectly with Palantir&apos;s
              approach to solving the world&apos;s most important problems
              through technology.
            </p>
          </div>
        </section>

        {/* Tailored Highlights */}
        <section className="mb-12">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Relevant Experience
          </h2>

          <div className="space-y-8">
            {/* STU Planning */}
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  STU Planning - Co-Founder & Lead Developer
                </h3>
                <a
                  href="https://stuplanning.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Visit Site
                </a>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Built and scaled a student planning platform from concept to
                production, demonstrating the kind of scrappiness and
                resourcefulness that drives innovation. Developed automated
                course scheduling algorithms, implemented real-time data
                processing, and created scalable cloud infrastructure to serve
                thousands of users.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  Automation
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Scalability
                </span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Data Processing
                </span>
              </div>
            </div>

            {/* Deep Dive Blog Post */}
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Technical Deep Dive: Building STU
                </h3>
                <Link
                  href="/blog/STU"
                  className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Read More
                </Link>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                A detailed technical breakdown of how I architected and built
                STU from scratch, including challenges with data modeling,
                performance optimization, and scaling decisions. This post
                demonstrates my approach to solving complex technical problems
                and building robust systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  System Design
                </span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  Problem Solving
                </span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800 dark:bg-red-900 dark:text-red-200">
                  Technical Leadership
                </span>
              </div>
            </div>

            {/* Quick Engagement */}
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Untitled Battle Squares - Game Development
                </h3>
                <a
                  href="/game"
                  className="font-medium text-emerald-800 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  Play Game
                </a>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                A fun, interactive demonstration of my full-stack development
                skills. Built with React, TypeScript, and Canvas API, featuring
                real-time game mechanics, mobile-responsive controls, and clean
                code architecture.{" "}
                <span className="font-medium">
                  Perfect for a quick 2-minute break during interviews!
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  TypeScript
                </span>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                  React
                </span>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                  Creative Problem Solving
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Resume & Portfolio Access */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Resources
          </h2>
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900 dark:text-gray-100">
                  Resume & Portfolio
                </h3>
                <div className="space-y-3">
                  <button className="w-full rounded-lg bg-emerald-700 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-emerald-600">
                    Download Resume (PDF)
                  </button>
                  <Link
                    href="/projects"
                    className="block w-full rounded-lg border border-emerald-700 px-6 py-3 text-center font-medium text-emerald-800 transition-colors duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-900"
                  >
                    View All Projects
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900 dark:text-gray-100">
                  Technical Work
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://github.com/mattej5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-lg bg-emerald-700 px-6 py-3 text-center font-medium text-white transition-colors duration-200 hover:bg-emerald-600"
                  >
                    GitHub Profile
                  </a>
                  <Link
                    href="/blog"
                    className="block w-full rounded-lg border border-emerald-700 px-6 py-3 text-center font-medium text-emerald-800 transition-colors duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-900"
                  >
                    Technical Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action / Contact */}
        <section className="text-center">
          <h2 className="mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Let&apos;s Connect
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            Ready to discuss how I can contribute to Palantir&apos;s mission?
            I&apos;d love to hear from you.
          </p>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:mattej5@byu.edu"
              className="rounded-lg bg-emerald-700 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-emerald-600"
            >
              Send Email
            </a>
            <a
              href="https://linkedin.com/in/vin-matt-jones/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
            >
              LinkedIn Profile
            </a>
          </div>

          <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
            <p>Email: mattej5@byu.edu</p>
          </div>
        </section>
      </div>
    </div>
  );
}
