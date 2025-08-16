import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';

export default function ProjectPage() {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Current and Past Projects</h1>
        <p className="text-gray-400">
        Here you can find a selection of my recent projects, showcasing my skills in software development and cloud architecture.
        </p>
        <br />
        <Accordion className="mb-6">
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
                <Typography>Next.JS as a Game Engine</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Check out one of my experimental builds that uses Next.js as a game engine!
                </Typography>
                <Button variant="contained" color="primary" href="/game">
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
                <Typography>Data Migration Accuracy Tool</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    This tool allows a user to compare two excel files representing the before and after 
                    states of a data migration, highlighting discrepancies in the data and providing a
                    high-level overview of the accuracy of each column. This is an older project using
                    python and pandas, but it remains a useful utility for data migration tasks.
                    
                    <br />
                    <a className="text-blue-500 hover:underline" href="https://github.com/mattej5/data-migration-accuracy-tool" target="_blank" rel="noopener noreferrer">
                        See Github Repository
                    </a>
                </Typography>
            </AccordionDetails>
        </Accordion>
    </div>
  );
}
