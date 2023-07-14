import * as React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import LetterButton from "./LetterButton";

const letterButtonColumnSx = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

interface TilesProps {
  letters: string;
  addToGuess: (letter: string) => void;
  sx?: SxProps<Theme>;
}

export const Tiles = ({ letters, addToGuess, sx }: TilesProps) => {
  const letter = letters.split("");

  return (
    <Box sx={{ display: "flex", justifyContent: "center", ...sx }}>
      <Box sx={letterButtonColumnSx}>
        <LetterButton letter={letter[1]} addToGuess={addToGuess} />
        <LetterButton letter={letter[2]} addToGuess={addToGuess} />
      </Box>
      <Box sx={letterButtonColumnSx}>
        <LetterButton letter={letter[3]} addToGuess={addToGuess} />
        <LetterButton letter={letter[0]} addToGuess={addToGuess} required />
        <LetterButton letter={letter[4]} addToGuess={addToGuess} />
      </Box>
      <Box sx={letterButtonColumnSx}>
        <LetterButton letter={letter[5]} addToGuess={addToGuess} />
        <LetterButton letter={letter[6]} addToGuess={addToGuess} />
      </Box>
    </Box>
  );
};

export default Tiles;
