export interface PuzzleState {
  shuffledLetters: string[];
  foundWords: string[];
}

export const emptyPuzzleState = {
  shuffledLetters: [],
  foundWords: [],
} as PuzzleState;

export interface PuzzleDefinition {
  id: number;
  letters: string;
  requiredLetter: string;
  maxScore: number;
  words: string[];
}

export const emptyPuzzleDefinition = {
  id: 0,
  letters: "",
  requiredLetter: "",
  maxScore: 0,
  words: [],
} as PuzzleDefinition;

export interface Puzzle extends PuzzleDefinition, PuzzleState {}

export interface Puzzles {
  currentPuzzleId: number;
  puzzles: { [key: string]: Puzzle };
}

export interface PuzzleActions {
  addFoundWord: (word: string) => void;
  shuffle: () => void;
  cheats: {
    reset: () => void;
    solve: () => void;
    findNext: () => void;
    removeLast: () => void;
  };
}
