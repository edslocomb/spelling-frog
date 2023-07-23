interface FoundWordsSummaryProps {
  numWords: number;
}

export const FoundWordsSummary = ({ numWords }: FoundWordsSummaryProps) => (
  <>
    You have found {numWords} word{numWords === 1 ? "" : "s"}
  </>
);

export default FoundWordsSummary;
