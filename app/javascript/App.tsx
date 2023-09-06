import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Box, styled } from "@mui/material";
import Navbar from "./navbar";
import DesktopHeader from "./DesktopHeader";
import MainMenu from "./MainMenu";

const App = () => {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Container
      sx={{
        minHeight: "100vh",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Navbar toggleMenu={toggleMenu} />
      <MainMenu open={menuOpen} toggleOpen={toggleMenu} />
      <Offset />
      <DesktopHeader
        sx={{
          display: { xs: "none", sm: "flex" },
          maxHeight: "calc(20vh - 64px)",
          minHeight: "calc(20vh - 64px)",
        }}
      />
      <Box
        sx={{
          maxHeight: { xs: "calc(100vh - 56px)", sm: "80vh" },
          minHeight: { xs: "calc(100vh - 56px)", sm: "80vh" },
          paddingTop: { xs: "2rem", sm: 0 },
          display: "flex",
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
};
export default App;
