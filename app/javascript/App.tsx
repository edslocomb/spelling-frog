import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

const App = () => (
  <Container
    sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Typography variant="h1">Spelling Frog</Typography>

    <Outlet />
  </Container>
);

export default App;
