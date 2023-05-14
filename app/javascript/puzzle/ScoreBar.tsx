import * as React from "react";
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

const levels = [0.1, 0.25, 0.4, 0.55, 0.7];

interface ScoreFrogProps extends SvgIconProps {
  frogFraction: number;
}
const ScoreFrog = ({ frogFraction, ...props }: ScoreFrogProps) => {
  if (frogFraction >= levels[4]) {
    return <FrogSmiling {...props} />;
  } else if (frogFraction >= levels[3]) {
    return <FrogLanding {...props} />;
  } else if (frogFraction >= levels[2]) {
    return <FrogJumping {...props} />;
  } else if (frogFraction >= levels[1]) {
    return <FrogCrouching {...props} />;
  } else if (frogFraction >= levels[0]) {
    return <Frog {...props} />;
  }
  return <Frog {...props} />;
};

interface ScoreBarProps {
  score: number;
  maxScore: number;
  sx?: SxProps<Theme>;
}

export const ScoreBar = ({ sx, score, maxScore }: ScoreBarProps) => {
  const winningScore = Math.round(maxScore * 0.7);
  const displayedMax = score >= winningScore ? maxScore : winningScore;
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
      <ScoreFrog
        frogFraction={frogFraction}
        color={frogFraction >= levels[0] ? "primary" : "inherit"}
        opacity={frogFraction >= levels[0] ? 0.87 : 1.25 * frogFraction}
        sx={{
          width: { xs: "4vh", sm: "2.4em" },
          height: { xs: "4vh", sm: "2.4em" },
          marginRight: "0.6em",
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          marginRight: "5px",
          height: "100%",
          position: "relative",
        }}
      >
        {levels
          .filter((_level, i) => frogFraction >= (levels[i - 1] || levels[0]))
          .map((level) => (
            <ScoreFrog
              frogFraction={level}
              key={`level${level}`}
              color={frogFraction >= level ? "primary" : "inherit"}
              opacity={frogFraction >= level ? 0.7 : 0.05}
              sx={{
                position: "absolute",
                "--size": { xs: "3vh", sm: "1.8em" },
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
          minWidth: { xs: "4vh", sm: "2.4em" },
          height: { xs: "4vh", sm: "2.4em" },
          bgcolor: "secondary.main",
          borderRadius: "5px",
          padding: { xs: "1vh", sm: ".8em" },
        }}
      >
        <Typography
          variant="button"
          color="black"
          component="div"
          sx={{ lineHeight: { xs: "2vh", sm: "1em" } }}
        >
          {score}
        </Typography>
      </Box>
    </Box>
  );
};

export default ScoreBar;
