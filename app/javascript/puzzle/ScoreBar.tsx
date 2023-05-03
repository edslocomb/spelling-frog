import * as React from "react";
import { Box, LinearProgress, SxProps, Theme, Typography } from "@mui/material";

interface ScoreBarProps {
  score: number;
  maxScore: number;
  sx?: SxProps<Theme>;
}

export const ScoreBar = ({ sx, score, maxScore }: ScoreBarProps) => {
  const winningScore = Math.round(maxScore * 0.7);
  const displayedMax = score >= winningScore ? maxScore : winningScore;
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
