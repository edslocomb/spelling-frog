import * as React from "react";
import { SxProps, Theme, Typography, keyframes } from "@mui/material";

interface ScoreNotificationType {
  word: string;
  score: number;
  sx?: SxProps<Theme>;
}

const rise = keyframes`
  0% { transform: translateY(250%) }
  75% { transform: translateY(-50%); opacity: 1 }
  100% { transform: translateY(-50%); opacity: 0 }
`;

const ScoreNotification = ({ word, score, sx }: ScoreNotificationType) => (
  <Typography
    component="div"
    sx={{
      textTransform: "capitalize",
      animation: `${rise} 1s`,
      ...sx,
    }}
  >
    {word}
    <Typography component="span" sx={{ fontWeight: 700 }}>
      {` +${score}`}
    </Typography>
  </Typography>
);

export default ScoreNotification;
