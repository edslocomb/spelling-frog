import { redirect, type Params } from "react-router-dom";
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
  const paramsId = params.puzzleId || "0";
  const currentState = useStore.getState();
  if (+paramsId > 0 && currentState.puzzles[paramsId]) {
    // TODO: update user's puzzle state here if logged in
    useStore.setState(
      assign(currentState, { currentPuzzleId: +paramsId } as Partial<Store>),
    );
  } else {
    const puzzleDefinition = await fetchPuzzle(paramsId);
    const fetchedId = puzzleDefinition.id.toString();
    const idMismatch = fetchedId != paramsId;
    const puzzleState =
      idMismatch && currentState.puzzles[fetchedId]
        ? currentState.puzzles[fetchedId]
        : emptyPuzzleState;

    useStore.setState(
      assign(currentState, {
        currentPuzzleId: puzzleDefinition.id,
        puzzles: {
          [fetchedId]: {
            ...puzzleState,
            ...puzzleDefinition,
            shuffledLetters: shuffleLetters(puzzleDefinition),
          },
        },
      } as Partial<Store>),
    );

    if (idMismatch) {
      return redirect(`/puzzles/${fetchedId}`);
    }
  }

  const state = useStore.getState();
  return state.puzzles[state.currentPuzzleId];
}
