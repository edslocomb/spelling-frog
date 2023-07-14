import * as React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import ScoreNotification from "./ScoreNotification";
import ErrorNotification from "./ErrorNotification";
import { wordScore } from "../../lib";

interface NotificationsProps {
  error: string;
  scoreNotifications: string[];
  letters: string;
  sx?: SxProps<Theme>;
}

const Notifications = ({
  sx,
  error,
  scoreNotifications,
  letters,
}: NotificationsProps) => (
  <Box sx={sx}>
    {error !== "" && <ErrorNotification message={error} />}
    {scoreNotifications.map((word) => (
      <ScoreNotification
        key={word}
        word={word}
        score={wordScore(word, letters)}
      />
    ))}
  </Box>
);

export default Notifications;
