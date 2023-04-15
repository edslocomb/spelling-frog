import * as React from "react";
import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import {
  BackspaceOutlined,
  KeyboardReturn,
  Refresh,
} from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";
import { shuffle, unique } from "radash";
import Tiles from "./Tiles";
import GuessedWordList from "./GuessedWordList";
import ScoreBar from "./ScoreBar";
import Guess from "./Guess";

const iconStyles = { fontSize: "50px", padding: "5px" };
const iconButtonStyles = { margin: "0 20px" };
const sectionBoxStyles = {
  display: "flex",
  justifyContent: "center",
};

interface loaderParams {
  params: { puzzleId?: number };
}

export async function loader({ params }: loaderParams) {
  const id = params.puzzleId || 0;
  return await getPuzzle(id);
}

export async function getPuzzle(id: number): Promise<PuzzleProps> {
  const response = await fetch(`/puzzles/${id}.json`);
  const json = await response.json();
  return json;
}

interface PuzzleProps {
  letters: string;
  requiredLetter: string;
  maxScore: number;
  words: string[];
}

const Puzzle = () => {
  const { letters, requiredLetter, words, maxScore } =
    useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const [guess, setGuess] = useState("");

  const addToGuess = (letter: string) => setGuess(`${guess}${letter}`);
  const backspaceGuess = () => setGuess(guess.slice(0, -1));

  const [nonRequiredLetters, setNonRequiredLetters] = useState(
    letters.split("").filter((l) => l !== requiredLetter)
  );

  const shuffleLetters = () =>
    setNonRequiredLetters(shuffle(nonRequiredLetters));

  const [guessedWords, setGuessedWords] = useState([] as string[]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      processGuess();
    } else if (e.key === "Backspace") {
      backspaceGuess();
    } else if (e.key === " ") {
      shuffleLetters();
    } else if (e.key.length === 1 && e.key.match(/[a-z]/)) {
      addToGuess(e.key);
    } else {
      console.log(e.key);
    }
  };

  const wordScore = (word: string) => {
    if (word.length < 5) {
      return 1;
    }
    if (unique(word.split("").sort()).join("") === letters) {
      return word.length + 7;
    }
    return word.length;
  };

  const score = () =>
    guessedWords.map(wordScore).reduce((memo, s) => memo + s, 0);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const processGuess = () => {
    if (guess === "") {
      console.log("empty guess");
      return;
    } else if (!guess.includes(requiredLetter)) {
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
    <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "left" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          minWidth: { xs: "100%", sm: "50%" },
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            flexDirection: "column",
            display: { xs: "flex", sm: "none" },
          }}
        >
          <ScoreBar score={score()} maxScore={maxScore} />
          <Box>{guessedWords.join(" ")}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Guess
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "10px",
            }}
            guess={guess}
            letters={letters}
            requiredLetter={requiredLetter}
          />
          <Tiles
            addToGuess={addToGuess}
            nonRequiredLetters={nonRequiredLetters}
            requiredLetter={requiredLetter}
            sx={sectionBoxStyles}
          />
          <Box sx={sectionBoxStyles}>
            <IconButton sx={iconButtonStyles} onClick={backspaceGuess}>
              <BackspaceOutlined sx={iconStyles} />
            </IconButton>
            <IconButton sx={iconButtonStyles} onClick={shuffleLetters}>
              <Refresh sx={iconStyles} />
            </IconButton>
            <IconButton
              sx={iconButtonStyles}
              onClick={processGuess}
              color="primary"
              id="enter"
            >
              <KeyboardReturn sx={iconStyles} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: "10px",
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
        }}
      >
        <ScoreBar
          sx={{ ...sectionBoxStyles, marginBottom: "5px" }}
          maxScore={maxScore}
          score={score()}
        />
        <GuessedWordList
          sx={{
            borderWidth: "1.5px",
            borderStyle: "solid",
            borderColor: "divider",
            borderRadius: "5px",
            flexGrow: 1,
            padding: "5px",
          }}
          words={guessedWords}
        />
      </Box>
    </Box>
  );
};

export default Puzzle;
