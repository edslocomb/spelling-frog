import { useState, useEffect } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { shuffle, omit } from "radash";

import Guess from "./guess";
import Notifications from "./notifications";
import LetterButtons from "./letterbuttons";
import ControlButtons from "./ControlButtons";
import { useExpiringQueue } from "./useExpiringQueue";
import { PuzzleActions, Puzzle } from "../../types";

const modifierKeyNames = ["Alt", "Control", "OS"];
type KeyModifier = (typeof modifierKeyNames)[number];

interface GuessState {
  word: string;
  keyModifiers: { [key in KeyModifier]: boolean };
  error: string;
}

const emptyGuessState = {
  word: "",
  keyModifiers: {},
  error: "",
};

interface GameBoardProps {
  actions: PuzzleActions;
  puzzle: Puzzle;
  sx?: SxProps<Theme>;
}

export const GameBoard = ({ actions, puzzle, sx }: GameBoardProps) => {
  const {
    letters,
    requiredLetter,
    foundWords,
    words: solutions,
    shuffledLetters,
  } = puzzle;

  const [guessState, setGuessState] = useState(emptyGuessState as GuessState);

  const setGuess = (word: string) =>
    setGuessState({ ...guessState, word: word });
  const addToGuess = (letter: string) =>
    guessState.error === "" && setGuess(`${guessState.word}${letter}`);
  const backspaceGuess = () => setGuess(guessState.word.slice(0, -1));

  const handleKeyDown = (e: KeyboardEvent) => {
    const { keyModifiers } = guessState;

    if (e.key === "Enter") {
      processGuess();
    } else if (keyModifiers["Control"] && keyModifiers["Alt"]) {
      // Debugging/Cheat codes
      if (e.key === "ArrowUp") {
        actions.cheats.reset();
      } else if (e.key === "ArrowDown") {
        actions.cheats.solve();
      } else if (
        e.key === "ArrowRight" &&
        foundWords.length < solutions.length
      ) {
        actions.cheats.findNext();
      } else if (e.key === "ArrowLeft") {
        actions.cheats.removeLast();
      } else if (e.key === "'" && foundWords.length < solutions.length) {
        const missingWords = solutions.filter((w) => !foundWords.includes(w));
        setGuess(shuffle(missingWords)[0]);
      }
    } else if (modifierKeyNames.includes(e.key) && !keyModifiers[e.key]) {
      setGuessState({
        ...guessState,
        keyModifiers: { ...keyModifiers, [e.key]: true },
      });
    } else if (Object.keys(keyModifiers).length === 0) {
      if (e.key === "Backspace") {
        backspaceGuess();
      } else if (e.key === " ") {
        actions.shuffle();
      } else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
        addToGuess(e.key.toLowerCase());
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (guessState.keyModifiers[e.key]) {
      setGuessState({
        ...guessState,
        keyModifiers: omit(guessState.keyModifiers, [e.key]),
      });
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
    const { word: guess } = guessState;
    let error = "";

    if (guess === "" || guessState.error !== "") {
      return;
    } else if (!guess.includes(requiredLetter)) {
      error = "Missing Center Letter";
    } else if (guess.length < 4) {
      error = "Too Short";
    } else if (!guess.split("").every((l) => letters.includes(l))) {
      error = "Extraneous Letter";
    } else if (foundWords.includes(guess)) {
      error = "Already Found";
    } else if (!solutions.includes(guess)) {
      error = "Unknown Word";
    } else {
      addScoreNotification(guess);
      setGuess("");
      actions.addFoundWord(guess);
      return;
    }

    setTimeout(
      () =>
        setGuessState((currentState) => ({
          keyModifiers: currentState.keyModifiers,
          word: "",
          error: "",
        })),
      1200,
    );
    setGuessState({ ...guessState, error });
  };

  return (
    <Box sx={sx}>
      <Notifications
        error={guessState.error}
        scoreNotifications={scoreNotifications}
        letters={puzzle.letters}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column-reverse",
          height: { xs: "2.4rem", sm: "20%" },
        }}
      />
      <Guess
        guess={guessState.word}
        jiggle={guessState.error !== ""}
        puzzle={puzzle}
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      />
      <LetterButtons
        addToGuess={addToGuess}
        letters={shuffledLetters}
        sx={{ display: "flex", justifyContent: "center" }}
      />
      <ControlButtons
        enter={processGuess}
        backspace={backspaceGuess}
        shuffle={actions.shuffle}
        sx={{ display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default GameBoard;
