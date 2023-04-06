import * as React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import LetterButton from "./LetterButton";

const letterButtonColumnSx = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

interface TilesProps {
  requiredLetter: string;
  nonRequiredLetters: string[];
  addToGuess: (letter: string) => void;
  sx?: SxProps<Theme>;
}

export const Tiles = ({
  requiredLetter,
  nonRequiredLetters,
  addToGuess,
  sx,
}: TilesProps) => {
  return (
    <Box sx={sx}>
      <Box sx={letterButtonColumnSx}>
        <LetterButton letter={nonRequiredLetters[0]} addToGuess={addToGuess} />
        <LetterButton letter={nonRequiredLetters[1]} addToGuess={addToGuess} />
      </Box>
      <Box sx={letterButtonColumnSx}>
        <LetterButton letter={nonRequiredLetters[2]} addToGuess={addToGuess} />
        <LetterButton
          letter={requiredLetter}
          addToGuess={addToGuess}
          required
        />
        <LetterButton letter={nonRequiredLetters[3]} addToGuess={addToGuess} />
      </Box>
      <Box sx={letterButtonColumnSx}>
        <LetterButton letter={nonRequiredLetters[4]} addToGuess={addToGuess} />
        <LetterButton letter={nonRequiredLetters[5]} addToGuess={addToGuess} />
      </Box>
    </Box>
  );
};

export default Tiles;
