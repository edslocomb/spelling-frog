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

interface ScoreFrogProps extends SvgIconProps {
  frogFraction: number;
}
const ScoreFrog = ({ frogFraction, ...props }: ScoreFrogProps) => {
  if (frogFraction > 0.7) {
    return (
      <FrogSmiling
        {...props}
        color="primary"
        sx={{ ...(props.sx || {}), transform: "scaleX(-1)" }}
      />
    );
  } else if (frogFraction > 0.5) {
    return (
      <FrogLanding
        {...props}
        color="primary"
        sx={{ ...(props.sx || {}), transform: "scaleX(-1)" }}
      />
    );
  } else if (frogFraction > 0.35) {
    return <FrogJumping color="primary" {...props} />;
  } else if (frogFraction > 0.2) {
    return (
      <FrogCrouching
        {...props}
        color="primary"
        sx={{ ...(props.sx || {}), transform: "scaleX(-1)" }}
      />
    );
  } else if (frogFraction > 0.1) {
    return <Frog color="primary" {...props} />;
  }
  return <Frog color="inherit" opacity={0.1 + 2 * frogFraction} {...props} />;
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
        sx={{
          width: { xs: "4vh", sm: "2.4em" },
          height: { xs: "4vh", sm: "2.4em" },
          strokeWidth: "10px",
          marginRight: "0.6em",
        }}
      />
      <Box sx={{ flexGrow: 1, marginRight: "5px" }}>
        <LinearProgress
          variant="determinate"
          value={(100 * score) / displayedMax}
          sx={{ color: "primary.light" }}
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
