import {
  Box,
  LinearProgress,
  SxProps,
  Theme,
  type SvgIconProps,
  Typography,
} from "@mui/material";
import {
  Frog,
  FrogCrouching,
  FrogJumping,
  FrogLanding,
  FrogDoodle,
  FrogQueen,
} from "../icons/";

import { type Puzzle } from "../types";
import { puzzleScore } from "./lib";

const winningFraction = 0.75;
const levels = [0.08, 0.16, 0.33, 0.5, winningFraction];

interface ScoreFrogProps extends SvgIconProps {
  level: number;
}

const ScoreFrog = ({ level, ...props }: ScoreFrogProps) => {
  if (level >= levels[3]) {
    return <FrogLanding {...props} />;
  } else if (level >= levels[2]) {
    return <FrogJumping {...props} />;
  } else if (level >= levels[1]) {
    return <FrogCrouching {...props} />;
  }

  return <Frog {...props} />;
};

interface FrogressProps {
  score: number;
  maxScore: number;
  winningScore: number;
  sx?: SxProps<Theme>;
}

const Frogress = ({ score, maxScore, winningScore, sx }: FrogressProps) => {
  const frogFraction = score / maxScore;

  if (score >= winningScore) {
    const message = score == maxScore ? "Queen!" : "Winner!";
    const WinningIcon = score == maxScore ? FrogQueen : FrogDoodle;

    return (
      <Box sx={{ ...sx, justifyContent: "center" }}>
        <WinningIcon
          color="primary"
          sx={{
            "--size": { xs: "2.4ch", sm: "4ch" },
            width: "var(--size)",
            height: "var(--size)",
            zIndex: -1,
          }}
        />
        <Typography color="primary" variant="h3">
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ ...sx }}>
      {levels
        .filter((_level, i) => frogFraction >= (levels[i] || 0))
        .map((level, i) => (
          <ScoreFrog
            level={level}
            key={`level${level}`}
            color="primary"
            sx={{
              "--size": { xs: "2.4ch", sm: "4ch" },
              width: "var(--size)",
              height: "var(--size)",
              zIndex: -1,
            }}
          />
        ))}
    </Box>
  );
};

interface ScoreBarProps {
  puzzle: Puzzle;
  sx?: SxProps<Theme>;
}

export const ScoreBar = ({ sx, puzzle }: ScoreBarProps) => {
  const { maxScore } = puzzle;
  const score = puzzleScore(puzzle);
  const winningScore = Math.round(maxScore * winningFraction);
  const displayedMax = score >= winningScore ? maxScore : winningScore;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          marginRight: "1ch",
        }}
      >
        <Frogress
          score={score}
          maxScore={maxScore}
          winningScore={winningScore}
          sx={{
            display: "flex",
            "--size": { xs: "2.4ch", sm: "4ch" },
            gap: "var(--size)",
            alignItems: "center",
            zIndex: -1,
          }}
        />
        <LinearProgress
          variant="determinate"
          value={(100 * score) / displayedMax}
          sx={{
            color: "primary.light",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "4ch",
          height: "4ch",
          bgcolor: "secondary.main",
          borderRadius: "5px",
        }}
      >
        <Typography variant="button" color="black" component="div">
          {score}
        </Typography>
      </Box>
    </Box>
  );
};

export default ScoreBar;
