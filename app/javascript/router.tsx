import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Puzzle, { loader as puzzleLoader } from "./puzzle";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "puzzles/:puzzleId",
        element: <Puzzle />,
        loader: puzzleLoader,
      },
    ],
  },
]);

export default router;
