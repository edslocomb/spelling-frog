import * as React from "react";
import { Typography, keyframes } from "@mui/material";
import { fontStyle } from "./style";

const cursorKeyframes = keyframes`
  0% { opacity: 0; }
  25% { opacity: 1 }
  75% { opacity: 1 }
  100% { opacity: 0 }
`;

const Cursor = () => (
  <Typography
    color="secondary"
    component="span"
    sx={{
      ...fontStyle,
      animation: `${cursorKeyframes} 1s infinite ease-in-out`,
    }}
  >
    |
  </Typography>
);

export default Cursor;
