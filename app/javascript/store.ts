import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { assign, shuffle } from "radash";
import { shuffleLetters } from "./puzzle/lib";
import { Puzzles, PuzzleActions } from "./types";

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

interface PuzzleActionSlice {
  actions: PuzzleActions;
}

export type Store = Puzzles & PuzzleActionSlice;

export const currentPuzzle = (state: Store) =>
  state.puzzles[state.currentPuzzleId];

const createPuzzleActionsSlice: StoreSlice<PuzzleActionSlice> = (set) => ({
  actions: {
    addFoundWord: (word) =>
      set((state) => {
        const puzzle = currentPuzzle(state);
        puzzle.foundWords = [...puzzle.foundWords, word];
      }),
    shuffle: () =>
      set((state) => {
        const puzzle = currentPuzzle(state);
        puzzle.shuffledLetters = shuffleLetters(puzzle);
      }),
    cheats: {
      reset: () =>
        set((state) => {
          currentPuzzle(state).foundWords = [];
        }),
      solve: () =>
        set((state) => {
          const puzzle = currentPuzzle(state);
          puzzle.foundWords = shuffle([...puzzle.words]);
        }),
      findNext: () =>
        set((state) => {
          const puzzle = currentPuzzle(state);
          const missingWords = puzzle.words.filter(
            (w) => !puzzle.foundWords.includes(w),
          );
          puzzle.foundWords.push(shuffle(missingWords)[0]);
        }),
      removeLast: () =>
        set((state) => {
          const puzzle = currentPuzzle(state);
          puzzle.foundWords = puzzle.foundWords.slice(0, -1);
        }),
    },
  },
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
    },
  ),
);

export default useStore;
