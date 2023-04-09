import * as React from "react";
import { Outlet } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const App = () => (
  <Container sx={{ height: "100vh" }}>
    <Typography variant="h1">Spelling Frog</Typography>
    <Outlet />
  </Container>
);

export default App;
