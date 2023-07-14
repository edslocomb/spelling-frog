import * as React from "react";
import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { assign } from "radash";

import GuessedWordList from "./GuessedWordList";
import GuessedWordDropdown from "./GuessedWordDropdown";
import ScoreBar from "./ScoreBar";
import GameBoard from "./gameboard";
import { useStore, currentPuzzle, type Store } from "../store";
import { wordScore, shuffleLetters } from "./lib";
import { PuzzleDefinition, Puzzle, emptyPuzzleState } from "../types";

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
  } else {
    const puzzleDefinition = await fetchPuzzle(puzzleId);
    useStore.setState(
      assign(currentState, {
        currentPuzzleId: +puzzleId,
        puzzles: {
          [puzzleId]: {
            ...emptyPuzzleState,
            ...puzzleDefinition,
            shuffledLetters: shuffleLetters(puzzleDefinition),
          },
        },
      } as Partial<Store>)
    );
  }
  return useStore.getState().puzzles[useStore.getState().currentPuzzleId];
}

const Puzzle = () => {
  useLoaderData();

  const puzzle = useStore((state) => currentPuzzle(state));

  const {
    letters,
    requiredLetter,
    words,
    maxScore,
    foundWords,
    shuffledLetters,
  } = puzzle;

  const actions = useStore((state) => state.actions);

  const score = foundWords
    .map((w) => wordScore(w, letters))
    .reduce((memo, s) => memo + s, 0);

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
            score={score}
            maxScore={maxScore}
            sx={{
              width: "100%",
              height: "5vh",
              paddingBottom: "5px",
            }}
          />
          <GuessedWordDropdown
            words={foundWords}
            letters={letters}
            sx={{ width: "calc(100vw - 32px)", maxHeight: "80vh" }}
            guessedWordListSx={{ height: "72vh" }}
          />
        </Box>
        <GameBoard
          actions={actions}
          letters={shuffledLetters.join("")}
          requiredLetter={requiredLetter}
          foundWords={foundWords}
          solutions={words}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        />
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
          score={score}
        />
        <GuessedWordList
          letters={letters}
          words={foundWords}
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
