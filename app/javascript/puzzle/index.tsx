import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";

import { useStore, currentPuzzle } from "../store";
import FoundWordsList from "./FoundWordsList";
import FoundWordsDropdown from "./FoundWordsDropdown";
import ScoreBar from "./ScoreBar";
import GameBoard from "./gameboard";
import { Puzzle } from "../types";

const Puzzle = () => {
  useLoaderData();

  const puzzle = useStore((state) => currentPuzzle(state));
  const { letters, foundWords } = puzzle;
  const actions = useStore((state) => state.actions);

  return (
    <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "left" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          minWidth: { xs: "100%", sm: "50%" },
        }}
      >
        <ScoreBar
          puzzle={puzzle}
          sx={{
            display: { xs: "flex", sm: "none" },
            minHeight: "6ch",
          }}
        />
        <FoundWordsDropdown
          words={foundWords}
          letters={letters}
          sx={{
            display: { sm: "none" },
            width: "calc(100vw - 32px)",
            maxHeight: "calc(100vh - 60px - 6ch - 5rem)",
          }}
          guessedWordListSx={{
            height: "calc(100vh - 60px - 6ch - 48px - 5rem)",
          }}
        />
        <GameBoard
          actions={actions}
          puzzle={puzzle}
          sx={{
            flexDirection: "column",
            flexGrow: 1,
          }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        <ScoreBar
          puzzle={puzzle}
          sx={{
            height: "8%",
          }}
        />
        <FoundWordsList
          letters={letters}
          words={foundWords}
          sx={{
            border: "1.5px solid",
            borderColor: "divider",
            borderRadius: "5px",
            minHeight: "87%",
            maxHeight: "87%",
            padding: "5px 20px",
            marginBottom: "2%",
          }}
        />
      </Box>
    </Box>
  );
};

export default Puzzle;
