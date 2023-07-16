import * as React from "react";
import { Box, IconButton, SxProps, Theme } from "@mui/material";
import {
  BackspaceOutlined,
  KeyboardReturn,
  Refresh,
} from "@mui/icons-material";

const iconStyles = { fontSize: "50px", padding: "5px" };
const iconButtonStyles = { margin: { xs: "0 10px", sm: "0 20px" } };

interface ControlButtonProps {
  backspace: () => void;
  shuffle: () => void;
  enter: () => void;
  sx?: SxProps<Theme>;
}

const ControlButtons = ({
  backspace,
  shuffle,
  enter,
  sx,
}: ControlButtonProps) => (
  <Box sx={sx}>
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
