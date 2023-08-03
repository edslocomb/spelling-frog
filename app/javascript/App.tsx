import { Outlet } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import Navbar from "./navbar";
import { FrogDoodle } from "./icons/";

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
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        maxHeight: "calc(20vh - 64px)",
        minHeight: "calc(20vh - 64px)",
        justifyContent: { sm: "center" },
      }}
    >
      <Typography
        variant="h1"
        color="primary.dark"
        sx={{ display: "flex", alignItems: "center", fontWeight: 400 }}
      >
        <FrogDoodle
          sx={{
            marginTop: "auto",
            marginBottom: "auto",
            marginRight: ".2em",
            fontSize: "2.5em",
          }}
        />
        Spelling Frog
      </Typography>
    </Box>
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
