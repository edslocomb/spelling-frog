import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useStore } from "../store";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FrogDoodle from "../icons/FrogDoodle";

interface NavbarProps {
  toggleMenu: () => void;
}

const Navbar = ({ toggleMenu }: NavbarProps) => {
  const puzzle = useStore((state) => state.currentPuzzle());
  const puzzleDate = puzzle ? new Date(puzzle.published) : undefined;

  return (
    <AppBar position="fixed" enableColorOnDark>
      <Toolbar color={"primary"}>
        <Box
          sx={{
            display: "flex",
            flexGrow: { sm: 1 },
            justifyContent: "flex-start",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            size="large"
            onClick={toggleMenu}
            aria-label="Open Main Menu"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FrogDoodle fontSize="large" sx={{ mr: 0.5 }} />
            <Typography variant="h3">Spelling Frog </Typography>
          </Box>
          <Typography variant="button">
            {puzzleDate?.toLocaleDateString()}
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" size="large">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
