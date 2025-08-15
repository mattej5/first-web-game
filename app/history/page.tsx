export default function HistoryPage() {
    const historyData = [
      { title: "Software Engineering Intern - Digital Engineering Consulting", companyOrSchool: "EY", date: "Summer 2025", type: "work" },
      { title: "Lead Developer & Cloud Engineer", companyOrSchool: "STU - Upgrading Academia", date: "February 2024 - Present", type: "work" },
      { title: "Student Software Engineer", companyOrSchool: "BYU Life Sciences IT", date: "February 2025 - Present", type: "work" },
      { title: "Project Implementation Assistant", companyOrSchool: "BYU - Program Granite", date: "February 2024 - February 2025", type: "work" },
      { title: "Masters Information Systems Management", companyOrSchool: "Brigham Young University - Marriott School of Business", date: "Expected: April 2027", type: "education" },
      { title: "INTEX I", companyOrSchool: "Brigham Young University - Marriott School of Business", date: "December 2024", type: "education" },
      { title: "INTEX II", companyOrSchool: "Brigham Young University - Marriott School of Business", date: "April 2025", type: "education" },
      { title: "Sandbox Hackathon", companyOrSchool: "Brigham Young University - Marriott School of Business", date: "March 7, 2025", type: "education" },
      
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
                  <p className="text-sm text-gray-600">{item.companyOrSchool} • {item.date}</p>
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
                  <p className="text-sm text-gray-600">{item.companyOrSchool} • {item.date}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  }