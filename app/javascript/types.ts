export const modifierKeyNames = ["Alt", "Control", "OS"];
export type KeyModifier = (typeof modifierKeyNames)[number];

export interface PuzzleState {
  guess: string;
  shuffledLetters: string[];
  foundWords: string[];
  keyModifiers: { [key in KeyModifier]: boolean };
  guessError: string;
}

export const emptyPuzzleState = {
  guess: "",
  shuffledLetters: [],
  foundWords: [],
  keyModifiers: {},
  guessError: "",
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
