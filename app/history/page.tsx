export default function HistoryPage() {
  const historyData = [
    {
      title: "Growth Management Intern",
      companyOrSchool: "Leland",
      date: "April 2026 - Present",
      type: "work",
      techStack: ["Claude", "Codex", "Gemini", "n8n"],
    },
    {
      title: "Sandbox (sb05 cohort)",
      companyOrSchool: "Brigham Young University",
      date: "April 2025 - April 2026",
      type: "education",
      techStack: ["AI Building", "Tech Sales", "Build in Public", "Supabase"],
    },
    {
      title: "SCRUM certification",
      companyOrSchool: "Certification",
      date: "February 2025",
      type: "education",
    },
    {
      title: "Software Engineering Intern - Digital Engineering Consulting",
      companyOrSchool: "EY",
      date: "Summer 2025",
      type: "work",
      techStack: ["AngularJS", ".NET", "TFVC", "DevOps"],
    },
    {
      title: "Student Founder",
      companyOrSchool: "STU - Recruiting",
      date: "February 2026 - Present",
      type: "work",
      techStack: [
        "Next.js",
        "Supabase",
        "Docker",
        "Kubernetes",
        "Vercel",
        "Mastra",
        "OpenAI AI SDK",
      ],
    },
    {
      title: "Lead Developer & Cloud Engineer",
      companyOrSchool: "STU - Upgrading Academia",
      date: "February 2024 - February 2026",
      type: "work",
      techStack: ["Next.js", ".NET", "Docker", "Kubernetes"],
    },
    {
      title: "Student Software Engineer",
      companyOrSchool: "BYU Life Sciences IT",
      date: "February 2025 - November 2026",
      type: "work",
      techStack: [
        "Web Development",
        "Database Management",
        "System Administration",
      ],
    },
    {
      title: "Project Implementation Assistant",
      companyOrSchool: "BYU - Program Granite",
      date: "February 2024 - February 2025",
      type: "work",
      techStack: ["Project Management", "System Integration", "Data Analysis"],
    },
    {
      title: "Masters Information Systems Management",
      companyOrSchool: "Brigham Young University - Marriott School of Business",
      date: "Expected: April 2027",
      type: "education",
    },
    {
      title: "Data Engineering Pipeline Project",
      companyOrSchool: "Brigham Young University - Marriott School of Business",
      date: "April 2026",
      type: "education",
      techStack: ["Python", "Prefect", "Snowflake", "Docker"],
    },
    {
      title: "INTEX I",
      companyOrSchool: "Brigham Young University - Marriott School of Business",
      date: "December 2024",
      type: "education",
      techStack: [
        "PostgreSQL",
        "Node.js",
        "Express",
        "AWS Beanstalk",
        "Tableau",
      ],
    },
    {
      title: "INTEX II",
      companyOrSchool: "Brigham Young University - Marriott School of Business",
      date: "April 2025",
      type: "education",
      techStack: [
        "Full-Stack Development",
        "Database Design",
        "Cloud Architecture",
      ],
    },
    {
      title: "Sandbox Hackathon",
      companyOrSchool: "Brigham Young University - Marriott School of Business",
      date: "March 7, 2025",
      type: "education",
      techStack: ["Next.js", "AWS (EC2, S3)", "MySQL (RDS)", "CI/CD"],
    },
  ];

  return (
    <div className="min-h-screen px-4 py-10 md:px-6 md:py-16">
      <h1 className="mb-8 text-center text-3xl font-bold md:mb-12 md:text-4xl">
        Work & Education History
      </h1>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
        {/* Left Column - Work Experience */}
        <div>
          <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
            Work Experience
          </h2>
          {historyData
            .filter((item) => item.type === "work")
            .map((item, index) => (
              <div key={index} className="mb-4 rounded-lg p-4 shadow-md">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mb-2 text-sm text-gray-600">
                  {item.companyOrSchool} • {item.date}
                </p>
                {item.techStack && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Right Column - Education */}
        <div>
          <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
            Education & Projects
          </h2>
          {historyData
            .filter((item) => item.type === "education")
            .map((item, index) => (
              <div key={index} className="mb-4 rounded-lg p-4 shadow-md">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mb-2 text-sm text-gray-600">
                  {item.companyOrSchool} • {item.date}
                </p>
                {item.techStack && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
