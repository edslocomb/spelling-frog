import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Navbar from "./navbar";
import DesktopHeader from "./DesktopHeader";

const App = () => (
  <Container
    sx={{
      minHeight: "100vh",
      maxHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <Navbar />
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

export default App;
