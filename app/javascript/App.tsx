import { Outlet } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import { useStore } from "./store";
import Navbar from "./navbar";
import { FrogDoodle } from "./icons/";

const App = () => {
  const puzzle = useStore((state) => state.currentPuzzle());

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
      <Navbar />
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          maxHeight: "calc(20vh - 64px)",
          minHeight: "calc(20vh - 64px)",
          justifyContent: { sm: "center" },
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
            <Typography align="center" variant="h6" color="primary">
              {new Date(+puzzle.published).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
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
};

export default App;
