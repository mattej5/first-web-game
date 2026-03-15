import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export default function ProjectPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Current and Past Projects</h1>
      <p className="text-gray-900">
        Here you can find a selection of my recent projects, showcasing my
        skills in software development, data engineering, and cloud
        architecture.
      </p>
      <br />

      <Accordion className="mb-6">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-agent-3d-content"
          id="panel-agent-3d-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Agent in a 3D Playground
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            An interactive agent playground built using Next.js and Three.js.
            The playground features a 3D office workspace where an AI agent
            navigates between three desks (Planning, Writing, Critique) to
            recursively write a book.
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#047857",
              "&:hover": { backgroundColor: "#065f46" },
            }}
            href="https://www.loom.com/share/ff38ea5b69c34ce0a9f19522c9af04e3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Demo on Loom
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion className="mb-6">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {/* Make the title bold */}
          <Typography sx={{ fontWeight: "bold" }}>
            A Better Way to Graduation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            I&apos;m building a platform to help university students effectively
            plan their academic careers, advisors to guide their students, and
            registrars to forecast their resource allocation. This is an ongoing
            project that I am working on for the Sandbox program.
          </Typography>
          <br />
          {/* Make the button green */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#047857",
              "&:hover": { backgroundColor: "#065f46" },
            }}
            href="https://stuplanning.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the stu website
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion className="mb-6">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-lumenarie-content"
          id="panel-lumenarie-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Lumenarie Marketplace
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A classroom marketplace that helps my wife&apos;s science students
            earn and spend star-themed rewards while reinforcing collaboration,
            kindness, and accountability. Teachers get quick dashboards for
            awarding Lumens, reviewing submissions, and keeping the class
            economy transparent without extra admin work.
          </Typography>
          <br />
          <Typography component="div" sx={{ mt: 2 }}>
            <strong>Impact:</strong>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>
                <strong>73 active students</strong> with{" "}
                <strong>273 transactions</strong> since implementation
              </li>
              <li>
                Reduced daily award time from{" "}
                <strong>40 minutes to 5 minutes</strong> per day
              </li>
              <li>
                <strong>175 minutes saved per week</strong> (87.5% time
                reduction)
              </li>
            </ul>
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#047857",
              "&:hover": { backgroundColor: "#065f46" },
            }}
            href="https://lumenarie-marketplace.vinjones.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Lumenarie Marketplace
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion className="mb-6">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Automation for Teachers: Agentic AI for grading student notes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            I detailed my experience integrating an automation that uses AI
            agents to grade student notes in a blog post. This project was done
            in collaboration with a high school teacher to help automate one of
            their grading processes.
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#047857",
              "&:hover": { backgroundColor: "#065f46" },
            }}
            color="primary"
            href="/blog/automation-for-teachers"
          >
            See blog post
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion className="mb-6">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>App in a Day</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            During the summer, my manager encouraged me to learn React Native,
            so I built an app (android download provided) that allows people to
            link to the same game session from separate devices and play some
            old-fashioned tic-tac-toe.
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#047857",
              "&:hover": { backgroundColor: "#065f46" },
            }}
            color="primary"
            href="https://drive.google.com/file/d/1jfkryUnuZjf38Rk6u1nunske7avgSXOz/view?usp=drive_link"
          >
            Request to download the Android App
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion className="mb-6">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Next.JS as a Game Engine
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Check out one of my experimental builds that uses Next.js as a game
            engine!
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#047857",
              "&:hover": { backgroundColor: "#065f46" },
            }}
            color="primary"
            href="/game"
          >
            Play Game
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion className="mb-6">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>INTEX I</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Since this was a school project that has since been shut down,
            I&apos;ve written a blog post detailing the project and some of the
            challenges we faced.
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#047857",
              "&:hover": { backgroundColor: "#065f46" },
            }}
            color="primary"
            href="/blog/intex-I"
          >
            See Post
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion className="mb-6">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Data Migration Accuracy Tool
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This tool allows a user to compare two excel files representing the
            before and after states of a data migration, highlighting
            discrepancies in the data and providing a high-level overview of the
            accuracy of each column. This is an older project using python and
            pandas, but it remains a useful utility for data migration tasks.
            <br />
            <br />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#047857",
                "&:hover": { backgroundColor: "#065f46" },
              }}
              color="primary"
              href="https://github.com/mattej5/data-migration-accuracy-tool"
            >
              See Github Repository
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
