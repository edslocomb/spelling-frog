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
import { Link } from "react-router-dom";

import { useStore } from "./store";

const oneDay = 86400000; // milliseconds

interface MainMenuProps {
  open: boolean;
  toggleOpen: () => void;
}

const MainMenu = ({ open, toggleOpen }: MainMenuProps) => {
  const puzzle = useStore((state) => state.currentPuzzle());
  const now = Date.now();
  const puzzleDate = new Date(puzzle?.published);

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={toggleOpen}
      disableRestoreFocus
    >
      <Toolbar onClick={toggleOpen} sx={{ justifyContent: "flex-start" }}>
        <IconButton onClick={toggleOpen} edge="start" aria-label="Close Menu">
          <NavigateBefore fontSize="large" />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {puzzle && puzzle.id > 1 ? (
          <ListItemButton
            component={Link}
            to={`/puzzles/${puzzle.id}-1`}
            onClick={toggleOpen}
            aria-label="Previous Puzzle"
          >
            <ListItemIcon>
              <Forward sx={{ transform: "scaleX(-1)" }} />
            </ListItemIcon>
            <ListItemText>Previous Puzzle</ListItemText>
          </ListItemButton>
        ) : null}
        {puzzle && now - puzzleDate.getTime() >= oneDay * 2 ? (
          <ListItemButton
            component={Link}
            to={`/puzzles/${puzzle.id}+1`}
            onClick={toggleOpen}
            aria-label="Next Puzzle"
          >
            <ListItemIcon>
              <Forward />
            </ListItemIcon>
            <ListItemText>Next Puzzle</ListItemText>
          </ListItemButton>
        ) : null}
        {!puzzle || now - puzzleDate.getTime() >= oneDay ? (
          <ListItemButton
            component={Link}
            to="/puzzles/0"
            onClick={toggleOpen}
            aria-label="Latest Puzzle"
          >
            <ListItemIcon>
              <Today />
            </ListItemIcon>
            <ListItemText>Latest Puzzle</ListItemText>
          </ListItemButton>
        ) : null}
      </List>
    </Drawer>
  );
};
export default MainMenu;
