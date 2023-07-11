import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { assign } from "radash";
import { Puzzle } from "./types";

interface Puzzles {
  currentPuzzleId: number;
  puzzles: { [key: string]: Puzzle };
}

interface PuzzleActions {
  currentPuzzle: () => Puzzle;
}

export type Store = Puzzles & PuzzleActions;

export type StoreSlice<T> = StateCreator<
  Store,
  [["zustand/immer", never]],
  [["zustand/persist", Partial<T>]],
  T
>;

const createPuzzlesSlice: StoreSlice<Puzzles> = () => ({
  currentPuzzleId: 0,
  puzzles: {},
});

const createPuzzleActionsSlice: StoreSlice<PuzzleActions> = (set, get) => ({
  currentPuzzle: () => get().puzzles[get().currentPuzzleId],
});

export const useStore = create<Store>()(
  persist(
    immer((...args) => ({
      ...createPuzzlesSlice(...args),
      ...createPuzzleActionsSlice(...args),
    })),
    {
      name: "spelling-frog",
      merge: (persisted, current) => assign(persisted as Store, current),
    }
  )
);

export default useStore;
