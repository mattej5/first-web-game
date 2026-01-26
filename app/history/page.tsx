export default function HistoryPage() {
    const historyData = [
      { 
        title: "Software Engineering Intern - Digital Engineering Consulting", 
        companyOrSchool: "EY", 
        date: "Summer 2025", 
        type: "work",
        techStack: ["AngularJS", ".NET", "TFVC", "DevOps"]
      },
      { 
        title: "Lead Developer & Cloud Engineer", 
        companyOrSchool: "STU - Upgrading Academia", 
        date: "February 2024 - Present", 
        type: "work",
        techStack: ["Next.js", ".NET", "Docker", "Kubernetes"]
      },
      { 
        title: "Student Software Engineer", 
        companyOrSchool: "BYU Life Sciences IT", 
        date: "February 2025 - Present", 
        type: "work",
        techStack: ["Web Development", "Database Management", "System Administration"]
      },
      { 
        title: "Project Implementation Assistant", 
        companyOrSchool: "BYU - Program Granite", 
        date: "February 2024 - February 2025", 
        type: "work",
        techStack: ["Project Management", "System Integration", "Data Analysis"]
      },
      { 
        title: "Masters Information Systems Management", 
        companyOrSchool: "Brigham Young University - Marriott School of Business", 
        date: "Expected: April 2027", 
        type: "education"
      },
      { 
        title: "INTEX I", 
        companyOrSchool: "Brigham Young University - Marriott School of Business", 
        date: "December 2024", 
        type: "education",
        techStack: ["PostgreSQL", "Node.js", "Express", "AWS Beanstalk", "Tableau"]
      },
      { 
        title: "INTEX II", 
        companyOrSchool: "Brigham Young University - Marriott School of Business", 
        date: "April 2025", 
        type: "education",
        techStack: ["Full-Stack Development", "Database Design", "Cloud Architecture"]
      },
      { 
        title: "Sandbox Hackathon", 
        companyOrSchool: "Brigham Young University - Marriott School of Business", 
        date: "March 7, 2025", 
        type: "education",
        techStack: ["Next.js", "AWS (EC2, S3)", "MySQL (RDS)", "CI/CD"]
      },
      
    ];
  
    return (
      <div className="min-h-screen py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-6">Work & Education History</h1>
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
          {/* Left Column - Work Experience */}
          <div>
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Work Experience</h2>
            {historyData
              .filter(item => item.type === "work")
              .map((item, index) => (
                <div key={index} className="shadow-md p-4 rounded-lg mb-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.companyOrSchool} • {item.date}</p>
                  {item.techStack && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-md"
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
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Education & Projects</h2>
            {historyData
              .filter(item => item.type === "education")
              .map((item, index) => (
                <div key={index} className="shadow-md p-4 rounded-lg mb-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.companyOrSchool} • {item.date}</p>
                  {item.techStack && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md"
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