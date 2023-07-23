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
  FrogSmiling,
} from "../icons/";

import { type Puzzle } from "../types";
import { puzzleScore } from "./lib";

const levels = [0.1, 0.25, 0.4, 0.55, 0.7];

interface ScoreFrogProps extends SvgIconProps {
  level: number;
}
const ScoreFrog = ({ level, ...props }: ScoreFrogProps) => {
  if (level >= levels[4]) {
    return <FrogSmiling {...props} />;
  } else if (level >= levels[3]) {
    return <FrogLanding {...props} />;
  } else if (level >= levels[2]) {
    return <FrogJumping {...props} />;
  } else if (level >= levels[1]) {
    return <FrogCrouching {...props} />;
  }

  return <Frog {...props} />;
};

function frogOpacity(frogFraction: number, levelIndex: number) {
  const level = levels[levelIndex];
  if (frogFraction >= level) {
    return 1.0;
  }
  const previousLevel = levels[levelIndex - 1] || 0;
  return (0.2 * (frogFraction - previousLevel)) / (level - previousLevel);
}

interface ScoreBarProps {
  puzzle: Puzzle;
  sx?: SxProps<Theme>;
}

export const ScoreBar = ({ sx, puzzle }: ScoreBarProps) => {
  const { maxScore } = puzzle;
  const score = puzzleScore(puzzle);
  const winningScore = Math.round(maxScore * 0.7);
  const displayedMax = score >= winningScore ? maxScore : winningScore;
  // indulging in a game design reference with this next variable name
  const frogFraction = score / maxScore;
  const progressMultiplier = score >= winningScore ? 100 : 100 / 0.7;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          marginRight: "5px",
          height: "100%",
          position: "relative",
        }}
      >
        {levels
          .filter((_level, i) => frogFraction >= (levels[i - 1] || 0))
          .map((level, i) => (
            <ScoreFrog
              level={level}
              key={`level${level}`}
              color={frogFraction >= level ? "primary" : "inherit"}
              opacity={frogOpacity(frogFraction, i)}
              sx={{
                position: "absolute",
                "--size": { xs: "2.4ch", sm: "4ch" },
                left: `calc(${level * progressMultiplier}% - var(--size))`,
                bottom: "45%",
                width: "var(--size)",
                height: "var(--size)",
                zIndex: -1,
              }}
            />
          ))}
        <LinearProgress
          variant="determinate"
          value={(100 * score) / displayedMax}
          sx={{
            color: "primary.light",
            top: "50%",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          minWidth: "4ch",
          height: "4ch",
          bgcolor: "secondary.main",
          borderRadius: "5px",
          padding: "0.5ch",
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
