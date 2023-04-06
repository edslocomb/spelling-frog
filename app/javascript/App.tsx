import * as React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const App = () => (
  <Container sx={{ height: "100vh" }}>
    <Outlet />
  </Container>
);

export default App;
