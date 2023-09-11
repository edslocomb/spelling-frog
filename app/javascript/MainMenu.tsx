import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import Forward from "@mui/icons-material/Forward";
import Today from "@mui/icons-material/Today";
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
  const navigateLatest = () => {
    navigate("puzzles/0");
    toggleOpen();
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={toggleOpen}
      disableRestoreFocus
    >
      <Toolbar onClick={toggleOpen} sx={{ justifyContent: "flex-start" }}>
        <IconButton onClick={toggleOpen} edge="start">
          <NavigateBefore fontSize="large" />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {puzzle.id > 1 ? (
          <ListItemButton onClick={navigatePrevPuzzle}>
            <ListItemIcon>
              <Forward sx={{ transform: "scaleX(-1)" }} />
            </ListItemIcon>
            <ListItemText>{prevPuzzleDate.toLocaleDateString()}</ListItemText>
          </ListItemButton>
        ) : null}
        {now - puzzleDate.getTime() >= oneDay * 2 ? (
          <ListItemButton onClick={navigateNextPuzzle}>
            <ListItemIcon>
              <Forward />
            </ListItemIcon>
            <ListItemText>{nextPuzzleDate.toLocaleDateString()}</ListItemText>
          </ListItemButton>
        ) : null}
        {now - puzzleDate.getTime() >= oneDay ? (
          <ListItemButton onClick={navigateLatest}>
            <ListItemIcon>
              <Today />
            </ListItemIcon>
            <ListItemText>Today</ListItemText>
          </ListItemButton>
        ) : null}
      </List>
    </Drawer>
  );
};
export default MainMenu;
