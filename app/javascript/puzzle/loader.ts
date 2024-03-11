import { redirect, type Params } from "react-router-dom";
import { assign } from "radash";

import { useStore, type Store } from "../store";
import { shuffleLetters } from "./lib";
import { emptyPuzzleState, type PuzzleDefinition } from "../types";

interface LoaderParams {
  params: Params<"puzzleId">;
  request: Request;
}

export async function loader({ params, request }: LoaderParams) {
  const { puzzleId = "0" } = params;
  const currentState = useStore.getState();

  if (+puzzleId > 0 && currentState.puzzles[puzzleId]) {
    // TODO: update user's puzzle state here if logged in
    useStore.setState(
      assign(currentState, { currentPuzzleId: +puzzleId } as Partial<Store>),
    );
  } else {
    const response = await fetch(`${request.url}.json`);
    const puzzleDefinition = (await response.json()) as PuzzleDefinition;
    puzzleDefinition.published = +puzzleDefinition.published * 1000;

    const fetchedId = puzzleDefinition.id.toString();
    const idMismatch = fetchedId != puzzleId;
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
