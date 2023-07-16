interface WordsFoundTextProps {
  numWords: number;
}

export const WordsFoundText = ({ numWords }: WordsFoundTextProps) => (
  <>
    You have found {numWords} word{numWords === 1 ? "" : "s"}
  </>
);

export default WordsFoundText;
