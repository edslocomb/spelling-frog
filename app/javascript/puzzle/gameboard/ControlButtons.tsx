import * as React from "react";
import { Box, IconButton } from "@mui/material";
import {
  BackspaceOutlined,
  KeyboardReturn,
  Refresh,
} from "@mui/icons-material";

const iconStyles = { fontSize: "50px", padding: "5px" };
const iconButtonStyles = { margin: "0 20px" };

interface ControlButtonProps {
  backspace: () => void;
  shuffle: () => void;
  enter: () => void;
}

const ControlButtons = ({ backspace, shuffle, enter }: ControlButtonProps) => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <IconButton sx={iconButtonStyles} onClick={backspace}>
      <BackspaceOutlined sx={iconStyles} />
    </IconButton>
    <IconButton sx={iconButtonStyles} onClick={shuffle}>
      <Refresh sx={iconStyles} />
    </IconButton>
    <IconButton
      sx={iconButtonStyles}
      onClick={enter}
      color="primary"
      id="enter"
    >
      <KeyboardReturn sx={iconStyles} />
    </IconButton>
  </Box>
);

export default ControlButtons;
