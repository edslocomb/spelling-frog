import * as React from "react";
import { Typography, SxProps, Theme, useTheme } from "@mui/material";

interface GuessErrorProps {
  message: string;
  sx?: SxProps<Theme>;
}

export const GuessError = ({ message, sx }: GuessErrorProps) => {
  const theme = useTheme();
  const colors =
    theme.palette.mode === "light"
      ? { color: "secondary.light", bgcolor: "text.primary" }
      : {
          color: "secondary.main",
          border: "1px solid",
          borderColor: "primary.dark",
        };
  return (
    <Typography
      component="div"
      sx={{
        padding: "5px 10px",
        borderRadius: "5px",
        ...colors,
        ...sx,
      }}
    >
      {message}
    </Typography>
  );
};

export default GuessError;
