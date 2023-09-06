import { Divider, Drawer, List, ListItem, Toolbar } from "@mui/material";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import Forward from "@mui/icons-material/Forward";
import { useNavigate } from "react-router-dom";

import { useStore } from "./store";

const oneDay = 86400000; // milliseconds

interface MainMenuProps {
  open: boolean;
  toggleOpen: () => void;
}

const MainMenu = ({ open, toggleOpen }: MainMenuProps) => {
  const navigate = useNavigate();
  const puzzle = useStore((state) => state.currentPuzzle());
  const now = Date.now();
  const puzzleDate = new Date(puzzle.published);
  const prevPuzzleDate = new Date(puzzle.published - oneDay);
  const nextPuzzleDate = new Date(puzzle.published + oneDay);
  const navigatePrevPuzzle = () => {
    navigate(`/puzzles/${puzzle.id - 1}`);
    toggleOpen();
  };
  const navigateNextPuzzle = () => {
    navigate(`/puzzles/${puzzle.id + 1}`);
    toggleOpen();
  };

  return (
    <Drawer variant="temporary" open={open} onClose={toggleOpen}>
      <Toolbar onClick={toggleOpen} sx={{ justifyContent: "flex-start" }}>
        <NavigateBefore fontSize="large" />
      </Toolbar>
      <Divider />
      <List>
        {puzzle.id > 1 ? (
          <ListItem onClick={navigateNextPuzzle} sx={{ cursor: "pointer" }}>
            <Forward />
            {nextPuzzleDate.toLocaleDateString()}
          </ListItem>
        ) : null}
        {now - puzzleDate.getTime() >= oneDay ? (
          <ListItem onClick={navigatePrevPuzzle} sx={{ cursor: "pointer" }}>
            <Forward sx={{ transform: "scaleX(-1)" }} />
            {prevPuzzleDate.toLocaleDateString()}
          </ListItem>
        ) : null}
      </List>
    </Drawer>
  );
};
export default MainMenu;
