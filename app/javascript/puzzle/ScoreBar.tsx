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
    <Box sx={{ ...sx, displzy: "flex", alignItems: "center" }}>
      <Box sx={{ flexGrow: 1, marginRight: "5px" }}>
        <LinearProgress
          variant="determinate"
          value={(100 * score) / displayedMax}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          minWidth: 30,
          height: 30,
          bgcolor: "secondary.main",
          borderRadius: "5px",
        }}
      >
        <Typography variant="button" sx={{ lineHeight: "30px" }}>
          {score}
        </Typography>
      </Box>
    </Box>
  );
};

export default ScoreBar;
