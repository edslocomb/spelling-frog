import { shuffle } from "radash";
import { Puzzle, PuzzleDefinition } from "../types";

export const usesAllLetters = (word: string, letters: string) =>
  letters.split("").every((char) => word.includes(char));

export function wordScore(word: string, letters: string) {
  if (word.length < 5) {
    return 1;
  }
  if (usesAllLetters(word, letters)) {
    return word.length + 7;
  }
  return word.length;
}

export const puzzleScore = (puzzle: Puzzle) =>
  puzzle.foundWords
    .map((w) => wordScore(w, puzzle.letters))
    .reduce((memo, s) => memo + s, 0);

export function shuffleLetters(puzzle: PuzzleDefinition) {
  const { requiredLetter, letters } = puzzle;
  return [
    requiredLetter,
    ...shuffle(letters.split("").filter((l) => l !== requiredLetter)),
  ];
}
