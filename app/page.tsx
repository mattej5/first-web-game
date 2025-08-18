import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 text-lg leading-relaxed flex flex-col items-center">
      {/* Avatar */}
      <Avatar
        alt="Vin Jones"
        src="headshot_IS_square.jpg" // replace with your actual image path
        sx={{ width: 120, height: 120, marginBottom: 2 }}
      />

      <h1 className="text-3xl font-bold mt-2 mb-4">
        Hi there!
      </h1>

      <div className="w-full">
        <Typography className="mb-6">
          My name is Vin Jones, and you&apos;ve found my personal portfolio. As a student in information systems at Brigham
          Young University, I&apos;ve learned how to create robust solutions to business and technology challenges. With an
          emphasis in predictive and secure software development, I&apos;m especially prepared for your cloud engineering and
          AI questions. From simple CRUD tables and UX design to data pipelines and recommendation algorithms, if you 
          have a vague and hard-to-describe problem facing your business, you&apos;ve found the right person!
        </Typography>

        <Typography>
          Feel free to check out some of my projects, or try out{" "}
          <a
            className="arcade-font text-pink-500 hover:text-pink-400 transition-colors duration-200"
            href="/game"
          >
            Untitled Battle Squares
          </a>{" "}
          if you want a miniature arcade experience!
        </Typography>
      </div>
    </div>
  );
}
