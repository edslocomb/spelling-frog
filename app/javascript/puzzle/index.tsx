import * as React from "react";
import { useState } from "react";
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

  const [guess, setGuess] = useState("");

  const addToGuess = (letter: string) => setGuess(`${guess}${letter}`);
  const backspaceGuess = () => setGuess(guess.slice(0, -1));

  const [nonRequiredLetters, setNonRequiredLetters] = useState(
    letters.split("").filter((l) => l !== requiredLetter)
  );

  const shuffleLetters = () =>
    setNonRequiredLetters(shuffle(nonRequiredLetters));

  const letterButtonColumnSx = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <TextField
          sx={{ fieldSet: { borderColor: "#ddd", borderWidth: "1.5px" } }}
          value={guess}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={letterButtonColumnSx}>
          <LetterButton
            letter={nonRequiredLetters[0]}
            addToGuess={addToGuess}
          />
          <LetterButton
            letter={nonRequiredLetters[1]}
            addToGuess={addToGuess}
          />
        </Box>
        <Box sx={letterButtonColumnSx}>
          <LetterButton
            letter={nonRequiredLetters[2]}
            addToGuess={addToGuess}
          />
          <LetterButton
            letter={requiredLetter}
            addToGuess={addToGuess}
            required
          />
          <LetterButton
            letter={nonRequiredLetters[3]}
            addToGuess={addToGuess}
          />
        </Box>
        <Box sx={letterButtonColumnSx}>
          <LetterButton
            letter={nonRequiredLetters[4]}
            addToGuess={addToGuess}
          />
          <LetterButton
            letter={nonRequiredLetters[5]}
            addToGuess={addToGuess}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton sx={{ margin: "15px" }} onClick={() => backspaceGuess()}>
          <Backspace sx={{ fontSize: "50px", padding: "5px" }} />
        </IconButton>
        <IconButton sx={{ margin: "15px" }} onClick={shuffleLetters}>
          <Refresh sx={{ fontSize: "50px", padding: "5px" }} />
        </IconButton>
        <IconButton sx={{ margin: "15px" }} color="primary">
          <KeyboardReturn sx={{ fontSize: "50px", padding: "5px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Puzzle;
