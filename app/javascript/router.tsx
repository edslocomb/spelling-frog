import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HowToPlay from "./HowToPlay";
import Puzzle from "./puzzle";
import { loader as puzzleLoader } from "./puzzle/loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HowToPlay /> },
      {
        path: "puzzles/:puzzleId",
        element: <Puzzle />,
        loader: puzzleLoader,
      },
    ],
  },
]);

export default router;
