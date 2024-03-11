import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./router";
import { useMediaQuery, CssBaseline } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  ThemeOptions,
} from "@mui/material/styles";
import { assign } from "radash";
import green from "@mui/material/colors/green";
import lightGreen from "@mui/material/colors/lightGreen";

import "@fontsource/roboto/latin-300.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-700.css";

const themeCustomizations = {
  palette: {
    primary: {
      main: green[700],
    },
    secondary: { main: lightGreen["A400"] },
  },
  typography: {
    fontSize: 14,
    h1: { fontSize: "2.2rem", fontWeight: 500 },
    h2: { fontSize: "1.8rem" },
    h3: { fontSize: "1.6rem" },
    h4: { fontSize: "1.3rem" },
    h5: { fontSize: "1.2rem" },
    h6: { fontSize: "1rem" },
  },
} as ThemeOptions;

interface RootProps {
  relativeUrlRoot: string;
}

const Root = ({ relativeUrlRoot }: RootProps) => {
  const router = createRouter({ relativeUrlRoot });
  const mode = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
  const modedTheme = assign(themeCustomizations, { palette: { mode: mode } });
  const theme = useMemo(
    () => responsiveFontSizes(createTheme(modedTheme), { factor: 3 }),
    [mode],
  );

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("app") as Element;
  const relativeUrlRoot = rootElement?.getAttribute("relativeUrlRoot") || "";
  const reactRoot = createRoot(rootElement);
  reactRoot.render(<Root relativeUrlRoot={relativeUrlRoot} />);
});
