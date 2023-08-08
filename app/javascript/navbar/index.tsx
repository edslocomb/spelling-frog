import { AppBar, Toolbar, IconButton, Typography, styled } from "@mui/material";
import { useStore } from "../store";
import MenuIcon from "@mui/icons-material/Menu";
import FrogDoodle from "../icons/FrogDoodle";

const Navbar = () => {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  const puzzle = useStore().currentPuzzle();

  return (
    <>
      <AppBar position="fixed" enableColorOnDark>
        <Toolbar color={"primary"}>
          <FrogDoodle
            fontSize="large"
            sx={{ display: { xs: "flex", sm: "none" }, mr: 1 }}
          />
          <Typography
            variant="h3"
            sx={{ display: { sm: "none" }, flexGrow: 1 }}
          >
            Spelling Frog
          </Typography>
          <Typography variant="button" sx={{ display: { sm: "none" } }}>
            {new Date(+puzzle.published).toLocaleDateString()}
          </Typography>

          <IconButton edge="end" color="inherit" size="large">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default Navbar;
