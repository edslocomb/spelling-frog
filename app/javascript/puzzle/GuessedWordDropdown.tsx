import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import GuessedWordList from "./GuessedWordList";
import WordsFoundText from "./WordsFoundText";
import { usesAllLetters } from "./lib";

interface GuessedWordDropdownProps {
  words: string[];
  letters: string;
  guessedWordListSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

export const GuessedWordDropdown = ({
  words,
  letters,
  guessedWordListSx,
  sx,
}: GuessedWordDropdownProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = () => setExpanded(!expanded);

  const WordsLine = () =>
    words.length === 0 ? (
      <Typography
        variant="button"
        color="text.disabled"
        align="center"
        width="100%"
      >
        No words found yet...
      </Typography>
    ) : (
      <Typography
        component="div"
        sx={{ whiteSpace: "nowrap", textTransform: "capitalize" }}
      >
        {words
          .slice()
          .reverse()
          .map((w) =>
            usesAllLetters(w, letters) ? (
              <Typography key={w} component="span" sx={{ fontWeight: 700 }}>
                {w}{" "}
              </Typography>
            ) : (
              `${w} `
            ),
          )}
      </Typography>
    );

  return (
    <Accordion
      disableGutters
      expanded={expanded}
      variant="outlined"
      sx={{ ...sx }}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={words.length > 0 ? <ExpandMore /> : null}
        aria-controls="guessed words dropdown"
        sx={{
          padding: "0 5px 0 10px",
          "& .MuiAccordionSummary-content": {
            overflow: "hidden",
          },
        }}
      >
        {expanded ? (
          <Typography variant="subtitle2" color="text.secondary">
            <WordsFoundText numWords={words.length} />
          </Typography>
        ) : (
          <WordsLine />
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0 1em" }}>
        <GuessedWordList
          noHeader
          words={words}
          letters={letters}
          sx={{ padding: 0, ...guessedWordListSx }}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default GuessedWordDropdown;
