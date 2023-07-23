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
          justifyContent: "center",
          minWidth: { xs: "100%", sm: "50%" },
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            display: { xs: "flex", sm: "none" },
          }}
        >
          <ScoreBar
            puzzle={puzzle}
            sx={{
              height: "5ch",
              paddingBottom: "5px",
            }}
          />
          <FoundWordsDropdown
            words={foundWords}
            letters={letters}
            sx={{ width: "calc(100vw - 32px)", maxHeight: "80vh" }}
            guessedWordListSx={{ height: "72vh" }}
          />
        </Box>
        <GameBoard
          actions={actions}
          puzzle={puzzle}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "flex-start",
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
