import * as React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";

const App = () => (
  <Container
    sx={{
      height: "100vh",
      flexDirection: "column",
      display: "flex",
    }}
  >
    <Box
      sx={{
        display: "flex",
        minHeight: "20vh",
        maxHeight: "20vh",
        alignContent: "center",
        justifyContent: "center",
        borderBottomColor: { sm: "secondary.light" },
        borderBottomWidth: { sm: "1px" },
        borderBottomStyle: { sm: "solid" },
      }}
    >
      <Typography variant="h1" sx={{ display: "flex", alignItems: "center" }}>
        Spelling Frog
      </Typography>
    </Box>
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        width: "100%",
      }}
    >
      <Outlet />
    </Box>
  </Container>
);

export default App;
