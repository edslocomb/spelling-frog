import * as React from "react";
import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import {
  BackspaceOutlined,
  KeyboardReturn,
  Refresh,
} from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";
import { shuffle, omit, assign } from "radash";
import useExpiringQueue from "./useExpiringQueue";
import Tiles from "./Tiles";
import GuessedWordList from "./GuessedWordList";
import GuessedWordDropdown from "./GuessedWordDropdown";
import ScoreBar from "./ScoreBar";
import Guess from "./Guess";
import GuessError from "./GuessError";
import ScoreNotification from "./ScoreNotification";
import { useStore, type Store } from "../store";
import {
  PuzzleState,
  PuzzleDefinition,
  Puzzle,
  modifierKeyNames,
  emptyPuzzleState,
} from "../types";
import { wordScore } from "./lib";

const iconStyles = { fontSize: "50px", padding: "5px" };
const iconButtonStyles = { margin: "0 20px" };

export async function fetchPuzzle(id: string): Promise<PuzzleDefinition> {
  const response = await fetch(`/puzzles/${id}.json`);
  const json = await response.json();
  return json;
}

interface LoaderParams {
  params: { puzzleId: string };
}

export async function loader({ params }: LoaderParams) {
  const { puzzleId } = params;

  const currentState = useStore.getState();
  if (currentState.puzzles[puzzleId]) {
    useStore.setState(
      assign(currentState, { currentPuzzleId: +puzzleId } as Partial<Store>)
    );
    console.log(`found puzzle ${puzzleId} in cache`);
  } else {
    const puzzleDefinition = await fetchPuzzle(puzzleId);
    useStore.setState(
      assign(currentState, {
        currentPuzzleId: +puzzleId,
        puzzles: { [puzzleId]: { ...emptyPuzzleState, ...puzzleDefinition } },
      } as Partial<Store>)
    );
  }
  return null;
}

const Puzzle = () => {
  useLoaderData();
  const puzzle = useStore((state) => state.currentPuzzle());
  const { letters, requiredLetter, words, maxScore } = puzzle;

  const [puzzleState, setPuzzleState] = useState({
    ...emptyPuzzleState,
    shuffledLetters: [
      requiredLetter,
      ...letters.split("").filter((l) => l !== requiredLetter),
    ],
  } as PuzzleState);

  function setStateOf<K extends keyof PuzzleState>(
    key: K,
    value: PuzzleState[K]
  ) {
    setPuzzleState((currentState) => ({ ...currentState, [key]: value }));
  }

  const addToGuess = (letter: string) =>
    puzzleState.guessError === "" &&
    setStateOf("guess", `${puzzleState.guess}${letter}`);

  const backspaceGuess = () =>
    setStateOf("guess", puzzleState.guess.slice(0, -1));

  const shuffleLetters = () =>
    setStateOf("shuffledLetters", [
      puzzleState.shuffledLetters[0],
      ...shuffle(puzzleState.shuffledLetters.slice(1)),
    ]);

  const score = () =>
    puzzleState.foundWords
      .map((w) => wordScore(w, letters))
      .reduce((memo, s) => memo + s, 0);

  const handleKeyDown = (e: KeyboardEvent) => {
    const { keyModifiers, foundWords } = puzzleState;

    if (e.key === "Enter") {
      processGuess();
    } else if (keyModifiers["Control"] && keyModifiers["Alt"]) {
      // Debugging/Cheat codes
      if (e.key === "ArrowUp") {
        setStateOf("foundWords", []);
      } else if (e.key === "ArrowDown") {
        setStateOf("foundWords", shuffle(words.slice()));
      } else if (e.key === "ArrowRight" && foundWords.length < words.length) {
        const missingWords = words.filter((w) => !foundWords.includes(w));
        setStateOf("foundWords", [...foundWords, shuffle(missingWords)[0]]);
      } else if (e.key === "ArrowLeft") {
        setStateOf("foundWords", foundWords.slice(0, -1));
      } else if (e.key === "'" && foundWords.length < words.length) {
        const missingWords = words.filter((w) => !foundWords.includes(w));
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
    const { guess, foundWords } = puzzleState;
    let error = "";

    if (guess === "" || puzzleState.guessError !== "") {
      return;
    } else if (!guess.includes(requiredLetter)) {
      error = "Missing Center Letter";
    } else if (guess.length < 4) {
      error = "Too Short";
    } else if (!guess.split("").every((l) => letters.includes(l))) {
      error = "Extraneous Letter";
    } else if (foundWords.includes(guess)) {
      error = "Already Found";
    } else if (!words.includes(guess)) {
      error = "Unknown Word";
    } else {
      addScoreNotification(guess);
      setPuzzleState({
        ...puzzleState,
        foundWords: [...foundWords, guess],
        guess: "",
      });
      return;
    }
    setTimeout(
      () =>
        setPuzzleState((currentPuzzleState) => ({
          ...currentPuzzleState,
          guess: "",
          guessError: "",
        })),
      1200
    );
    setStateOf("guessError", error);
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
            words={puzzleState.foundWords}
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
              justifyContent: "center",
              flexDirection: "column-reverse",
              height: { xs: "10vh", sm: "20%" },
            }}
          >
            {puzzleState.guessError !== "" && (
              <GuessError message={puzzleState.guessError} />
            )}
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
            jiggle={puzzleState.guessError !== ""}
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
          words={puzzleState.foundWords}
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
