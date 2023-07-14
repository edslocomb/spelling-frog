import * as React from "react";
import { Typography } from "@mui/material";

import { fontStyle } from "./style";
import { Puzzle } from "../../../types";

function color(letter: string, puzzle: Puzzle) {
  if (letter === puzzle.requiredLetter) {
    return "primary";
  } else if (puzzle.letters.includes(letter)) {
    return "text";
  }
  return "text.disabled";
}

interface GuessLetterProps {
  letter: string;
  puzzle: Puzzle;
}

const GuessLetter = ({ letter, puzzle }: GuessLetterProps) => (
  <Typography component="span" color={color(letter, puzzle)} sx={fontStyle}>
    {letter}
  </Typography>
);

export default GuessLetter;
