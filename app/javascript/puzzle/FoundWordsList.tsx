import {
  List,
  ListItem,
  ListSubheader,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { FoundWordsSummary } from "./FoundWordsSummary";
import { usesAllLetters } from "./lib";

interface FoundWordsListProps {
  noHeader?: boolean;
  words: string[];
  letters: string;
  sx?: SxProps<Theme>;
}

export const FoundWordsList = ({
  words,
  letters,
  noHeader,
  sx,
}: FoundWordsListProps) => {
  const subheader = (
    <ListSubheader sx={{ paddingLeft: 0, columnSpan: "all" }}>
      <FoundWordsSummary numWords={words.length} />
    </ListSubheader>
  );

  return (
    <List
      subheader={noHeader ? undefined : subheader}
      sx={{
        columnCount: { xs: 2, sm: 2, md: 3 },
        columnWidth: "auto",
        columnFill: "auto",
        overflow: "scroll",
        ...sx,
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
            <Typography
              component="span"
              sx={{
                textTransform: "capitalize",
                fontWeight: usesAllLetters(word, letters) ? 700 : "inherit",
              }}
            >
              {word}
            </Typography>
          </ListItem>
        ))}
    </List>
  );
};

export default FoundWordsList;
