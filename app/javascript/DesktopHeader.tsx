import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, SxProps, Theme } from "@mui/material";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import { useStore } from "./store";
import { FrogDoodle } from "./icons/";

interface DesktopHeaderProps {
  sx?: SxProps<Theme>;
}

const DesktopHeader = ({ sx }: DesktopHeaderProps) => {
  const puzzle = useStore((state) => state.currentPuzzle());
  const navigate = useNavigate();
  const goToNextPuzzle = () => navigate(`/puzzles/${puzzle.id + 1}`);
  const goToPreviousPuzzle = () => navigate(`/puzzles/${puzzle.id - 1}`);

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
            Spelling Frog{" "}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.currentTarget.blur();
                goToPreviousPuzzle();
              }}
            >
              <ArrowLeft color="primary" />
            </IconButton>
            <Typography align="center" variant="h6" color="primary">
              {new Date(puzzle.published).toLocaleDateString()}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.currentTarget.blur();
                goToNextPuzzle();
              }}
            >
              <ArrowRight color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default DesktopHeader;
