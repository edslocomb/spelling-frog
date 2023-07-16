import * as React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import LetterButton from "./LetterButton";

const letterButtonColumnSx = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

interface LetterButtonsProps {
  letters: string[];
  addToGuess: (letter: string) => void;
  sx?: SxProps<Theme>;
}

export const LetterButtons = ({
  letters,
  addToGuess,
  sx,
}: LetterButtonsProps) => {
  return (
    <Box sx={sx}>
      <Box sx={letterButtonColumnSx}>
        <LetterButton letter={letters[1]} addToGuess={addToGuess} />
        <LetterButton letter={letters[2]} addToGuess={addToGuess} />
      </Box>
      <Box sx={letterButtonColumnSx}>
        <LetterButton letter={letters[3]} addToGuess={addToGuess} />
        <LetterButton letter={letters[0]} addToGuess={addToGuess} required />
        <LetterButton letter={letters[4]} addToGuess={addToGuess} />
      </Box>
      <Box sx={letterButtonColumnSx}>
        <LetterButton letter={letters[5]} addToGuess={addToGuess} />
        <LetterButton letter={letters[6]} addToGuess={addToGuess} />
      </Box>
    </Box>
  );
};

export default LetterButtons;
