import * as React from "react";
import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import {
  BackspaceOutlined,
  KeyboardReturn,
  Refresh,
} from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";
import { shuffle, unique, omit } from "radash";
import useExpiringQueue from "./useExpiringQueue";
import Tiles from "./Tiles";
import GuessedWordList from "./GuessedWordList";
import GuessedWordDropdown from "./GuessedWordDropdown";
import ScoreBar from "./ScoreBar";
import Guess from "./Guess";
import ScoreNotification from "./ScoreNotification";

const iconStyles = { fontSize: "50px", padding: "5px" };
const iconButtonStyles = { margin: "0 20px" };

const wordScore = (word: string, letters: string) => {
  if (word.length < 5) {
    return 1;
  }
  if (unique(word.split("").sort()).join("") === letters) {
    return word.length + 7;
  }
  return word.length;
};

interface PuzzleProps {
  letters: string;
  requiredLetter: string;
  maxScore: number;
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
  const id = params.puzzleId || 0;
  return await getPuzzle(id);
}

const modifierKeyNames = ["Alt", "Control", "OS"];
type KeyModifier = (typeof modifierKeyNames)[number];

export interface PuzzleStateType {
  guess: string;
  shuffledLetters: string[];
  guessedWords: string[];
  keyModifiers: { [key in KeyModifier]: boolean };
}

const Puzzle = () => {
  const puzzleProps = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { letters, requiredLetter, words, maxScore } = puzzleProps;

  const [puzzleState, setPuzzleState] = useState({
    guess: "",
    shuffledLetters: [
      requiredLetter,
      ...letters.split("").filter((l) => l !== requiredLetter),
    ],
    guessedWords: [] as string[],
    keyModifiers: {} as { [key in KeyModifier]: boolean },
  } as PuzzleStateType);

  const setStateOf = <K extends keyof PuzzleStateType>(
    key: K,
    value: PuzzleStateType[K]
  ) => setPuzzleState({ ...puzzleState, [key]: value });

  const addToGuess = (letter: string) =>
    setStateOf("guess", `${puzzleState.guess}${letter}`);

  const backspaceGuess = () =>
    setStateOf("guess", puzzleState.guess.slice(0, -1));

  const shuffleLetters = () =>
    setStateOf("shuffledLetters", [
      puzzleState.shuffledLetters[0],
      ...shuffle(puzzleState.shuffledLetters.slice(1)),
    ]);

  const score = () =>
    puzzleState.guessedWords
      .map((w) => wordScore(w, letters))
      .reduce((memo, s) => memo + s, 0);

  const handleKeyDown = (e: KeyboardEvent) => {
    const { keyModifiers, guessedWords } = puzzleState;

    if (e.key === "Enter") {
      processGuess();
    } else if (keyModifiers["Control"] && keyModifiers["Alt"]) {
      // Debugging/Cheat codes
      if (e.key === "ArrowUp") {
        setStateOf("guessedWords", []);
      } else if (e.key === "ArrowDown") {
        setStateOf("guessedWords", shuffle(words.slice()));
      } else if (e.key === "ArrowRight" && guessedWords.length < words.length) {
        const missingWords = words.filter((w) => !guessedWords.includes(w));
        setStateOf("guessedWords", [...guessedWords, shuffle(missingWords)[0]]);
      } else if (e.key === "ArrowLeft") {
        setStateOf("guessedWords", guessedWords.slice(0, -1));
      } else if (e.key === "'" && guessedWords.length < words.length) {
        const missingWords = words.filter((w) => !guessedWords.includes(w));
        setStateOf("guess", shuffle(missingWords)[0]);
      }
    } else if (modifierKeyNames.includes(e.key) && !keyModifiers[e.key]) {
      setStateOf("keyModifiers", { ...keyModifiers, [e.key]: true });
    } else if (Object.keys(keyModifiers).length === 0) {
      if (e.key === "Backspace") {
        backspaceGuess();
      } else if (e.key === " ") {
        shuffleLetters();
      } else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
        addToGuess(e.key.toLowerCase());
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (puzzleState.keyModifiers[e.key]) {
      setStateOf("keyModifiers", omit(puzzleState.keyModifiers, [e.key]));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  const [scoreNotifications, addScoreNotification] = useExpiringQueue<string>();

  const processGuess = () => {
    const { guess, guessedWords } = puzzleState;

    if (guess === "") {
      return;
    } else if (!guess.includes(requiredLetter)) {
      console.log(
        `"${guess}" does not include "${requiredLetter.toUpperCase()}"`
      );
    } else if (guess.length < 4) {
      console.log(`"${guess}" is less than 4 letters long`);
    } else if (!guess.split("").every((l) => letters.includes(l))) {
      console.log(`"${guess}" contains letter not in puzzle`);
    } else if (guessedWords.includes(guess)) {
      console.log(`"${guess}" already found`);
    } else if (!words.includes(guess)) {
      console.log(`"${guess}" is not in the word list`);
    } else {
      addScoreNotification(guess);
      setPuzzleState({
        ...puzzleState,
        guessedWords: [...guessedWords, guess],
        guess: "",
      });
      return;
    }
    setStateOf("guess", "");
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
            flexDirection: "column",
            display: { xs: "flex", sm: "none" },
          }}
        >
          <ScoreBar
            score={score()}
            maxScore={maxScore}
            sx={{
              width: "100%",
              height: "5vh",
              paddingBottom: "5px",
            }}
          />
          <GuessedWordDropdown
            words={puzzleState.guessedWords}
            letters={letters}
            sx={{ width: "calc(100vw - 32px)", maxHeight: "80vh" }}
            guessedWordListSx={{ height: "72vh" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column-reverse",
              height: { xs: "10vh", sm: "20%" },
              overflow: "hidden",
            }}
          >
            {scoreNotifications.map((word) => (
              <ScoreNotification
                key={word}
                word={word}
                score={wordScore(word, letters)}
              />
            ))}
          </Box>
          <Guess
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "10px",
            }}
            guess={puzzleState.guess}
            letters={letters}
            requiredLetter={requiredLetter}
          />
          <Tiles
            addToGuess={addToGuess}
            letters={puzzleState.shuffledLetters}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        <ScoreBar
          sx={{
            height: "8%",
          }}
          maxScore={maxScore}
          score={score()}
        />
        <GuessedWordList
          letters={letters}
          words={puzzleState.guessedWords}
          sx={{
            border: "1.5px solid",
            borderColor: "divider",
            borderRadius: "5px",
            minHeight: "87%",
            maxHeight: "87%",
            padding: "5px 20px",
            marginBottom: "2%",
          }}
        />
      </Box>
    </Box>
  );
};

export default Puzzle;
