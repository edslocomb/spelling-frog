import { Box, Typography, Theme, SxProps, keyframes } from "@mui/material";
import Cursor from "./Cursor";
import GuessLetter from "./GuessLetter";
import { Puzzle } from "../../../types";
import { fontStyle } from "./style";

const jiggly = keyframes`
  0% { transform: translateX(0) }
  25% { transform: translateX(-3px) }
  75% { transform: translateX(3px) }
  100% { translateX: 0 }
`;

const jiggler = `${jiggly} 0.15s 3`;

interface GuessProps {
  jiggle?: boolean;
  guess: string;
  puzzle: Puzzle;
  sx: SxProps<Theme>;
}

const Guess = ({ sx, guess, jiggle, puzzle }: GuessProps) => {
  return (
    <Box sx={sx}>
      <Typography
        sx={{ fontStyle, animation: jiggle ? jiggler : "" }}
        component="span"
      >
        {guess.split("").map((l, i) => (
          <GuessLetter letter={l} puzzle={puzzle} key={guess.slice(0, i)} />
        ))}
        <Cursor />
      </Typography>
    </Box>
  );
};

export default Guess;
