import { Outlet } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import { FrogDoodle } from "./icons/";

const App = () => (
  <Container
    sx={{
      minHeight: "100vh",
      maxHeight: { xs: "auto", sm: "100vh" },
      flexDirection: "column",
      display: "flex",
    }}
  >
    <Box
      sx={{
        display: "flex",
        maxHeight: { xs: "10vh", sm: "20vh" },
        minHeight: { xs: "10vh", sm: "20vh" },
        justifyContent: { xs: "left", sm: "center" },
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
        maxHeight: { xs: "90vh", sm: "80vh" },
        minHeight: { xs: "90vh", sm: "80vh" },
        display: "flex",
      }}
    >
      <Outlet />
    </Box>
  </Container>
);

export default App;
