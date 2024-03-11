import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HowToPlay from "./HowToPlay";
import Puzzle from "./puzzle";
import { loader as puzzleLoader } from "./puzzle/loader";

interface CreateRouter {
  relativeUrlRoot: string;
}

export const createRouter = ({ relativeUrlRoot }: CreateRouter) =>
  createBrowserRouter(
    [
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
    ],
    { basename: relativeUrlRoot },
  );

export default createRouter;
