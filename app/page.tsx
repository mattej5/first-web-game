import Avatar from "@mui/material/Avatar";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 text-lg leading-relaxed">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-12">
        <Avatar
          alt="Vin's Profile Photo"
          src="/headshot_IS_square.jpg"
          sx={{ width: 150, height: 150, marginBottom: 3 }}
        />
        
        <p className="text-xl font-bold text-gray-600 dark:text-gray-300 max-w-2xl">
          Software Engineer & Co-Founder
        </p>
        <p className="text-gray-300 dark:text-gray-300 max-2xl mt-2">
          You&apos;ve found my portfolio! As a Master&apos;s student in Information Systems at BYU,
          I specialize in predictive analytics, secure software development, and cloud engineering solutions.
          In the age of AI, I love getting close to the people I&apos;m building for to quickly iterate and deliver
          high-impact solutions.
        </p>
        <p className="text-gray-300 dark:text-gray-300 max-2xl mt-2">
          Throughout my time at BYU and as a co-founder of <a className="font-semibold text-green-500 hover:text-green-400 transition-colors duration-200" href="https://stuplanning.com/">stu</a>, 
          I&apos;m honing my skills in building scalable cloud solutions, developing AI-driven applications, 
          and bringing the development process closer to the end-users.
        </p>
      </section>

      {/* Skills & Expertise Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
              Technical Skills
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Cloud Engineering & Architecture</li>
              <li>• AI & Machine Learning Solutions</li>
              <li>• Full-Stack Development</li>
              <li>• Data Pipelines & Analytics</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
              Specializations
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Predictive Analytics</li>
              <li>• Secure Software Development</li>
              <li>• UX Design & Implementation</li>
              <li>• Recommendation Systems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Got a Second?
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Explore a few of my solutions to problems I&apos;ve tackled recently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/projects"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            View My Projects
          </a>
          <span className="text-gray-500">or</span>
          <a
            className="arcade-font text-green-600 hover:text-green-500 font-medium transition-colors duration-200"
            href="/game"
          >
            Try Untitled Battle Squares →
          </a>
        </div>
      </section>
    </div>
  );
}
