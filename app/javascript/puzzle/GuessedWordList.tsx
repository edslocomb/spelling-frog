import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListSubheader,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

interface GuessedWordListProps {
  words: string[];
  sx?: SxProps<Theme>;
}

export const GuessedWordList = ({ sx, words }: GuessedWordListProps) => {
  const subheader = (
    <ListSubheader>You have found {words.length} words</ListSubheader>
  );
  return (
    <Box sx={sx}>
      <List subheader={subheader} sx={{ maxWidth: "190px" }}>
        {words.sort().map((word) => (
          <ListItem
            key={word}
            sx={{ borderBottom: "1px solid", borderBottomColor: "divider" }}
          >
            <Typography sx={{ textTransform: "capitalize" }}>{word}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GuessedWordList;
