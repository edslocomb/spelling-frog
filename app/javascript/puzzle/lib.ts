import { shuffle } from "radash";
import { PuzzleDefinition } from "../types";

export const usesAllLetters = (word: string, letters: string) =>
  letters.split("").every((char) => word.includes(char));

export const wordScore = (word: string, letters: string) => {
  if (word.length < 5) {
    return 1;
  }
  if (usesAllLetters(word, letters)) {
    return word.length + 7;
  }
  return word.length;
};

export function shuffleLetters(puzzle: PuzzleDefinition) {
  const { requiredLetter, letters } = puzzle;
  return [
    requiredLetter,
    ...shuffle(letters.split("").filter((l) => l !== requiredLetter)),
  ];
}
