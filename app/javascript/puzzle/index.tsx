import * as React from "react";
import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Backspace, KeyboardReturn, Refresh } from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";
import { shuffle } from "radash";
import Tiles from "./Tiles";
import GuessedWordList from "./GuessedWordList";

interface PuzzleProps {
  letters: string;
  requiredLetter: string;
  score: number;
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

const iconStyles = { fontSize: "50px", padding: "5px" };
const iconButtonStyles = { margin: "0 20px" };
const sectionBoxStyles = {
  display: "flex",
  justifyContent: "center",
  margin: "0",
};

const Puzzle = () => {
  const { letters, requiredLetter, words } = useLoaderData() as Awaited<
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

  const [guessedWords, setGuessedWords] = useState([] as string[]);

  const processGuess = () => {
    if (!guess.includes(requiredLetter)) {
      console.log(`"${guess}" does not include required letter`);
    } else if (guess.length < 4) {
      console.log(`"${guess}" is less than 4 letters long`);
    } else if (!guess.split("").every((l) => letters.includes(l))) {
      console.log(`"${guess}" contains letter not in puzzle`);
    } else if (guessedWords.includes(guess)) {
      console.log(`"${guess}" already found`);
    } else if (!words.includes(guess)) {
      console.log(`"${guess}" is not in the word list`);
    } else {
      setGuessedWords(guessedWords.concat([guess]));
    }
    setGuess("");
  };

  return (
    <Box sx={{ display: "flex", height: "100%", justifyContent: "left" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={sectionBoxStyles}>
          <TextField
            sx={{ fieldSet: { borderColor: "#ddd", borderWidth: "1.5px" } }}
            value={guess}
          />
        </Box>
        <Tiles
          addToGuess={addToGuess}
          nonRequiredLetters={nonRequiredLetters}
          requiredLetter={requiredLetter}
          sx={sectionBoxStyles}
        />
        <Box sx={sectionBoxStyles}>
          <IconButton sx={iconButtonStyles} onClick={backspaceGuess}>
            <Backspace sx={iconStyles} />
          </IconButton>
          <IconButton sx={iconButtonStyles} onClick={shuffleLetters}>
            <Refresh sx={iconStyles} />
          </IconButton>
          <IconButton
            sx={iconButtonStyles}
            onClick={processGuess}
            color="primary"
          >
            <KeyboardReturn sx={iconStyles} />
          </IconButton>
        </Box>
      </Box>
      <GuessedWordList
        sx={{
          flexGrow: 1,
          border: "1.5px solid #ddd",
          borderRadius: "5px",
          paddingLeft: "5px",
        }}
        words={guessedWords}
      />
    </Box>
  );
};

export default Puzzle;
