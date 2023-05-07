import * as React from "react";
import { Box, SxProps, Theme, Typography, keyframes } from "@mui/material";

const fontStyle = {
  fontSize: "35px",
  fontWeight: 600,
  textTransform: "uppercase",
};

const cursorKeyframes = keyframes`
  0% { opacity: 0; }
  25% { opacity: 1 }
  75% { opacity: 1 }
  100% { opacity: 0 }
`;

const Cursor = () => (
  <Typography
    color="secondary"
    component="span"
    sx={{
      ...fontStyle,
      animation: `${cursorKeyframes} 1s infinite ease-in-out`,
    }}
  >
    |
  </Typography>
);

interface LetterProps {
  letter: string;
}

const RequiredLetter = ({ letter }: LetterProps) => (
  <Typography component="span" color="primary" sx={fontStyle}>
    {letter}
  </Typography>
);

const IllegalLetter = ({ letter }: LetterProps) => (
  <Typography component="span" color="text.disabled" sx={fontStyle}>
    {letter}
  </Typography>
);

interface RenderLetterProps {
  l: string;
  letters: string;
  requiredLetter: string;
}

const RenderLetter = ({ letters, requiredLetter, l }: RenderLetterProps) => {
  if (l === requiredLetter) {
    return <RequiredLetter letter={l} />;
  } else if (letters.includes(l)) {
    return <>{l}</>;
  }
  return <IllegalLetter letter={l} />;
};

const jiggly = keyframes`
  0% { transform: translateX(0) }
  25% { transform: translateX(-3px) }
  75% { transform: translateX(3px) }
  100% { translateX: 0 }
`;

interface GuessProps {
  guess: string;
  letters: string;
  requiredLetter: string;
  jiggle?: boolean;
  sx?: SxProps<Theme>;
}

export const Guess = ({
  guess,
  jiggle,
  letters,
  requiredLetter,
  sx,
}: GuessProps) => {
  const jiggler = `${jiggly} 0.15s 3`;

  return (
    <Box sx={{ textAlign: "center", ...sx }}>
      <Typography
        sx={{ fontStyle, animation: jiggle ? jiggler : "" }}
        component="span"
      >
        {guess.split("").map((l, i) => (
          <RenderLetter
            l={l}
            letters={letters}
            requiredLetter={requiredLetter}
            key={guess.slice(0, i)}
          />
        ))}
        <Cursor />
      </Typography>
    </Box>
  );
};

export default Guess;
