import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import lightGreen from "@mui/material/colors/lightGreen";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: lightGreen,
      secondary: lightGreen,
    },
    typography: {
      fontSize: 12,
      h1: { fontSize: "2.2rem" },
      h2: { fontSize: "1.8rem" },
      h3: { fontSize: "1.6rem" },
      h4: { fontSize: "1.3rem" },
      h5: { fontSize: "1.2rem" },
      h6: { fontSize: "1rem" },
    },
  }),
  { factor: 3 }
);
console.log(theme);

const Root = () => {
  return (
    <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("app") as Element);
  root.render(<Root />);
});
