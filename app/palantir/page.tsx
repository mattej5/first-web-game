import { Avatar } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Vin's Portfolio - Palantir Application",
  description: "Tailored portfolio for Palantir showcasing relevant experience in scalable software development and data solutions.",
};

export default function PalantirPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Avatar
                alt="Vin's Profile Photo"
                src="/headshot_IS_square.jpg"
                sx={{ width: 150, height: 150 }}
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Vin
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Software Engineer & Co-Founder
          </p>
        </header>

        {/* Personalized Intro */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Hello, Palantir Team!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I&apos;m excited about the opportunity to contribute to Palantir&apos;s mission of building the future. 
              As someone who&apos;s built scalable software solutions from the ground up, 
              I&apos;m particularly drawn to your focus on turning complex data into actionable insights. My experience 
              building automation tools and data-driven applications aligns perfectly with Palantir&apos;s approach 
              to solving the world&apos;s most important problems through technology.
            </p>
          </div>
        </section>

        {/* Tailored Highlights */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            Relevant Experience
          </h2>
          
          <div className="space-y-8">
            {/* STU Planning */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  STU Planning - Co-Founder & Lead Developer
                </h3>
                <a 
                  href="https://stuplanning.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Visit Site →
                </a>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Built and scaled a student planning platform from concept to production, demonstrating the kind of 
                scrappiness and resourcefulness that drives innovation. Developed automated course scheduling algorithms, 
                implemented real-time data processing, and created scalable cloud infrastructure to serve thousands of users.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                  Automation
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  Scalability
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  Data Processing
                </span>
              </div>
            </div>

            {/* Deep Dive Blog Post */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Technical Deep Dive: Building STU
                </h3>
                <Link 
                  href="/blog/STU" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Read More →
                </Link>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                A detailed technical breakdown of how I architected and built STU from scratch, including 
                challenges with data modeling, performance optimization, and scaling decisions. This post 
                demonstrates my approach to solving complex technical problems and building robust systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                  System Design
                </span>
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm">
                  Problem Solving
                </span>
                <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm">
                  Technical Leadership
                </span>
              </div>
            </div>

            {/* Quick Engagement */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Untitled Battle Squares - Game Development
                </h3>
                <a 
                  href="/game" 
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium"
                >
                  Play Game →
                </a>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                A fun, interactive demonstration of my full-stack development skills. Built with React, TypeScript, 
                and Canvas API, featuring real-time game mechanics, mobile-responsive controls, and clean code architecture.{' '}
                <span className="font-medium">Perfect for a quick 2-minute break during interviews!</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-3 py-1 rounded-full text-sm">
                  React
                </span>
                <span className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full text-sm">
                  Creative Problem Solving
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Resume & Portfolio Access */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Resources
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Resume & Portfolio
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                    Download Resume (PDF)
                  </button>
                  <Link 
                    href="/projects" 
                    className="block w-full text-center border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    View All Projects
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Technical Work
                </h3>
                <div className="space-y-3">
                  <a 
                    href="https://github.com/mattej5" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    GitHub Profile
                  </a>
                  <Link 
                    href="/blog" 
                    className="block w-full text-center border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
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
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Ready to discuss how I can contribute to Palantir&apos;s mission? I&apos;d love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="mailto:mattej5@byu.edu" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Send Email
            </a>
            <a 
              href="https://linkedin.com/in/vin-matt-jones/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              LinkedIn Profile
            </a>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>Email: mattej5@byu.edu</p>
          </div>
        </section>
      </div>
    </div>
  );
}
