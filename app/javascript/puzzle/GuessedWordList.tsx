import * as React from "react";
import {
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
    <ListSubheader sx={{ paddingLeft: 0, columnSpan: "all" }}>
      You have found {words.length} words
    </ListSubheader>
  );

  return (
    <List
      subheader={subheader}
      sx={{
        ...sx,
        columnCount: { xs: 2, sm: 2, md: 3 },
        columnWidth: "auto",
        columnFill: "auto",
        overflow: "scroll",
      }}
    >
      {words
        .slice() // clone, don't sort the array passed in
        .sort()
        .map((word) => (
          <ListItem
            key={word}
            sx={{
              borderBottom: "1px solid",
              borderBottomColor: "divider",
              display: "inline-block",
              padding: "0",
              marginTop: "6px",
            }}
          >
            <Typography component="span" sx={{ textTransform: "capitalize" }}>
              {word}
            </Typography>
          </ListItem>
        ))}
    </List>
  );
};

export default GuessedWordList;
