import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  SxProps,
  Theme,
  Typography,
  keyframes,
} from "@mui/material";
import {
  BackspaceOutlined,
  KeyboardReturn,
  Refresh,
} from "@mui/icons-material";
import { shuffle, omit } from "radash";

import { wordScore } from "../lib";
import Error from "./Error";
import ScoreNotification from "./ScoreNotification";
import Tiles from "./Tiles";
import { useExpiringQueue } from "./useExpiringQueue";
import { PuzzleActions } from "../../types";

const fontStyle = {
  fontSize: "35px",
  fontWeight: 600,
  textTransform: "uppercase",
};

const cursorKeyframes = keyframes`
  0% { opacity: 0; }
  25% { opacity: 1 }
  75% { opacity: 1 }
  100% { opacity: 0 }
`;

const Cursor = () => (
  <Typography
    color="secondary"
    component="span"
    sx={{
      ...fontStyle,
      animation: `${cursorKeyframes} 1s infinite ease-in-out`,
    }}
  >
    |
  </Typography>
);

interface LetterProps {
  letter: string;
}

const RequiredLetter = ({ letter }: LetterProps) => (
  <Typography component="span" color="primary" sx={fontStyle}>
    {letter}
  </Typography>
);

const IllegalLetter = ({ letter }: LetterProps) => (
  <Typography component="span" color="text.disabled" sx={fontStyle}>
    {letter}
  </Typography>
);

interface RenderLetterProps {
  l: string;
  letters: string;
  requiredLetter: string;
}

const RenderLetter = ({ letters, requiredLetter, l }: RenderLetterProps) => {
  if (l === requiredLetter) {
    return <RequiredLetter letter={l} />;
  } else if (letters.includes(l)) {
    return <>{l}</>;
  }
  return <IllegalLetter letter={l} />;
};

const jiggly = keyframes`
  0% { transform: translateX(0) }
  25% { transform: translateX(-3px) }
  75% { transform: translateX(3px) }
  100% { translateX: 0 }
`;

const iconStyles = { fontSize: "50px", padding: "5px" };
const iconButtonStyles = { margin: "0 20px" };

export const modifierKeyNames = ["Alt", "Control", "OS"];
export type KeyModifier = (typeof modifierKeyNames)[number];

interface GuessState {
  guess: string;
  keyModifiers: { [key in KeyModifier]: boolean };
  guessError: string;
}

const emptyGuessState = {
  guess: "",
  keyModifiers: {},
  guessError: "",
};

interface GameBoardProps {
  actions: PuzzleActions;
  letters: string;
  requiredLetter: string;
  foundWords: string[];
  solutions: string[];
  sx?: SxProps<Theme>;
}

export const GameBoard = ({
  actions,
  letters,
  requiredLetter,
  foundWords,
  solutions,
  sx,
}: GameBoardProps) => {
  const jiggler = `${jiggly} 0.15s 3`;

  const [guessState, setGuessState] = useState(emptyGuessState as GuessState);
  const guess = guessState.guess;
  const jiggle = guessState.guessError !== "";

  function setStateOf<K extends keyof GuessState>(
    key: K,
    value: GuessState[K]
  ) {
    setGuessState((currentState) => ({ ...currentState, [key]: value }));
  }

  const addToGuess = (letter: string) =>
    guessState.guessError === "" &&
    setStateOf("guess", `${guessState.guess}${letter}`);

  const backspaceGuess = () =>
    setStateOf("guess", guessState.guess.slice(0, -1));

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
        setStateOf("guess", shuffle(missingWords)[0]);
      }
    } else if (modifierKeyNames.includes(e.key) && !keyModifiers[e.key]) {
      setStateOf("keyModifiers", { ...keyModifiers, [e.key]: true });
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
      setStateOf("keyModifiers", omit(guessState.keyModifiers, [e.key]));
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
    const { guess } = guessState;
    let error = "";

    if (guess === "" || guessState.guessError !== "") {
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
      setStateOf("guess", "");
      actions.addFoundWord(guess);
      return;
    }

    setTimeout(
      () =>
        setGuessState((currentGuessState) => ({
          ...currentGuessState,
          guess: "",
          guessError: "",
        })),
      1200
    );
    setStateOf("guessError", error);
  };

  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column-reverse",
          height: { xs: "10vh", sm: "20%" },
        }}
      >
        {guessState.guessError !== "" && (
          <Error message={guessState.guessError} />
        )}
        {scoreNotifications.map((word) => (
          <ScoreNotification
            key={word}
            word={word}
            score={wordScore(word, letters)}
          />
        ))}
      </Box>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Typography
          sx={{ fontStyle, animation: jiggle ? jiggler : "" }}
          component="span"
        >
          {guess.split("").map((l, i) => (
            <RenderLetter
              l={l}
              letters={letters}
              requiredLetter={requiredLetter}
              key={guess.slice(0, i)}
            />
          ))}
          <Cursor />
        </Typography>
      </Box>
      <Tiles addToGuess={addToGuess} letters={letters} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton sx={iconButtonStyles} onClick={backspaceGuess}>
          <BackspaceOutlined sx={iconStyles} />
        </IconButton>
        <IconButton sx={iconButtonStyles} onClick={actions.shuffle}>
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
  );
};

export default GameBoard;
