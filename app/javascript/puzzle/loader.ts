import { type Params } from "react-router-dom";
import { assign } from "radash";

import { useStore, type Store } from "../store";
import { shuffleLetters } from "./lib";
import { emptyPuzzleState, type PuzzleDefinition } from "../types";

async function fetchPuzzle(id: string): Promise<PuzzleDefinition> {
  const response = await fetch(`/puzzles/${id}.json`);
  const json = await response.json();
  json.published = +json.published * 1000;
  return json;
}

interface LoaderParams {
  params: Params<"puzzleId">;
}

export async function loader({ params }: LoaderParams) {
  const puzzleId = params.puzzleId || "0";
  const currentState = useStore.getState();
  if (currentState.puzzles[puzzleId]) {
    useStore.setState(
      assign(currentState, { currentPuzzleId: +puzzleId } as Partial<Store>),
    );
  } else {
    const puzzleDefinition = await fetchPuzzle(puzzleId);
    useStore.setState(
      assign(currentState, {
        currentPuzzleId: +puzzleId,
        puzzles: {
          [puzzleDefinition.id]: {
            ...emptyPuzzleState,
            ...puzzleDefinition,
            shuffledLetters: shuffleLetters(puzzleDefinition),
          },
        },
      } as Partial<Store>),
    );
  }
  return useStore.getState().puzzles[useStore.getState().currentPuzzleId];
}
