import * as React from "react";
import { Box, SxProps, Theme, Typography } from "@mui/material";

interface ScoreNotificationType {
  word: string;
  score: number;
  sx?: SxProps<Theme>;
}

export const ScoreNotification = ({
  word,
  score,
  sx,
}: ScoreNotificationType) => (
  <Box sx={sx}>
    <Typography
      component="span"
      sx={{
        padding: "5px",
        textTransform: "capitalize",
      }}
    >
      {word}!
    </Typography>
    <Typography component="span" sx={{ fontWeight: 700 }} variant="body2">
      &nbsp;+{score}
    </Typography>
  </Box>
);

export default ScoreNotification;
