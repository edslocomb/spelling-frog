import * as React from "react";
import { Box, type SxProps, Theme } from "@mui/material";

interface MessageProps {
  sx?: SxProps<Theme>;
}

const Message = ({ sx }: MessageProps) => {
  return <Box sx={sx}></Box>;
};

export default Message;
