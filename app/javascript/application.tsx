import * as React from "react";
import { useMemo } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useMediaQuery, CssBaseline } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  ThemeOptions,
} from "@mui/material/styles";
import { assign } from "radash";
import lightGreen from "@mui/material/colors/lightGreen";

import "@fontsource/roboto/latin-300.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-700.css";

const themeCustomizations = {
  palette: {
    primary: lightGreen,
    secondary: lightGreen,
    mode: undefined,
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
} as ThemeOptions;

const Root = () => {
  const mode = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
  console.log(mode);
  const modedTheme = assign(themeCustomizations, { palette: { mode: mode } });
  console.log(modedTheme);
  console.log(themeCustomizations);
  const theme = useMemo(
    () => responsiveFontSizes(createTheme(modedTheme), { factor: 3 }),
    [mode]
  );
  console.log(theme);
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("app") as Element);
  root.render(<Root />);
});
