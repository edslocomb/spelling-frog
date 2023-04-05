import * as React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Backspace, KeyboardReturn, Refresh } from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";
import { shuffle } from "radash";
import LetterButton from "./LetterButton";

interface PuzzleProps {
  letters: string;
  requiredLetter: string;
  score?: number;
  words: string[];
}

export async function getPuzzle(id: number): Promise<PuzzleProps> {
  const response = await fetch(`/puzzles/${id}.json`);
  const json = await response.json();
  return json;
}

interface loaderParams {
  params: { puzzleId?: number };
}

export async function loader({ params }: loaderParams) {
  const id = params.puzzleId || 1;
  return await getPuzzle(id);
}

const Puzzle = () => {
  const { letters, requiredLetter } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  const nonRequiredLetters = letters
    .split("")
    .filter((l) => l !== requiredLetter);

  let shuffled = shuffle(nonRequiredLetters);

  const letterButtonColumnSx = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <TextField
          sx={{ fieldSet: { borderColor: "#ddd", borderWidth: "1.5px" } }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={letterButtonColumnSx}>
          <LetterButton letter={shuffled[0]} />
          <LetterButton letter={shuffled[1]} />
        </Box>
        <Box sx={letterButtonColumnSx}>
          <LetterButton letter={shuffled[2]} />
          <LetterButton letter={requiredLetter} required />
          <LetterButton letter={shuffled[3]} />
        </Box>
        <Box sx={letterButtonColumnSx}>
          <LetterButton letter={shuffled[4]} />
          <LetterButton letter={shuffled[5]} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton sx={{ margin: "15px" }}>
          <Backspace sx={{ fontSize: "50px" }} />
        </IconButton>
        <IconButton sx={{ margin: "15px" }}>
          <Refresh sx={{ fontSize: "50px" }} />
        </IconButton>
        <IconButton sx={{ margin: "15px" }} color="primary">
          <KeyboardReturn sx={{ fontSize: "50px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Puzzle;
