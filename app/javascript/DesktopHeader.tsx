import { Box, Typography, SxProps, Theme } from "@mui/material";
import { FrogDoodle } from "./icons/";
import DesktopNav from "./DesktopNav";

interface DesktopHeaderProps {
  sx?: SxProps<Theme>;
}

const DesktopHeader = ({ sx }: DesktopHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: "primary.dark",
        }}
      >
        <FrogDoodle
          sx={{
            fontSize: "6rem",
            marginTop: "auto",
            marginBottom: "auto",
            marginRight: ".2em",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h1" color="primary.dark">
            Spelling Frog
          </Typography>
          <DesktopNav />
        </Box>
      </Box>
    </Box>
  );
};
export default DesktopHeader;
