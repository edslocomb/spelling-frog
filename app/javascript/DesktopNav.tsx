import { useNavigate } from "react-router-dom";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import { IconButton, Box, Typography } from "@mui/material";
import { useStore } from "./store";

export const DesktopNav: React.FC = () => {
  const puzzle = useStore((state) => state.currentPuzzle());
  const navigate = useNavigate();

  if (!puzzle) {
    return null;
  }

  return (
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
          navigate(`/puzzles/${puzzle.id}-1`);
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
          navigate(`/puzzles/${puzzle.id}+1`);
        }}
      >
        <ArrowRight color="primary" />
      </IconButton>
    </Box>
  );
};

export default DesktopNav;
