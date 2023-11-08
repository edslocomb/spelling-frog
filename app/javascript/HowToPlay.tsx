import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Adjust as Bullet,
  BackspaceOutlined as Backspace,
  KeyboardReturn as Enter,
  Refresh as Shuffle,
} from "@mui/icons-material";

export const HowToPlay = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        paddingBottom: { xs: 2, sm: 4, md: 6, lg: 8 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: { xs: 2, sm: 4, md: 6, lg: 8 },
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
          borderRadius: { xs: 2, sm: 4, md: 6, lg: 8 },
          maxWidth: { xs: "100vw", sm: "75vw", md: "50vw" },
        }}
      >
        <Typography variant="h2" align="center" color="primary">
          How To Play
        </Typography>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginTop: { xs: 2, sm: 4, md: 6, lg: 8 }, maxWidth: "70vw" }}
        >
          Type or tap letters to find as many words as you can.
        </Typography>
        <List sx={{ marginTop: 2 }}>
          <ListItem>
            <ListItemIcon>
              <Bullet color="primary" />
            </ListItemIcon>
            <ListItemText primary="Words must be at least 4 letters long and include the center letter." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Bullet color="primary" />
            </ListItemIcon>
            <ListItemText primary="Words may use the same letter more than once." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Bullet color="primary" />
            </ListItemIcon>
            <ListItemText primary="Each puzzle is guaranteed to have at least one word that uses all letters." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Bullet color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography>
                  To enter your word, use{" "}
                  <Enter color="primary" sx={{ verticalAlign: "middle" }} /> or
                  the [Enter] key. To backspace, use{" "}
                  <Backspace sx={{ verticalAlign: "middle" }} />. To reshuffle,
                  use
                  <Shuffle sx={{ verticalAlign: "middle" }} /> or the space bar.
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => navigate("/puzzles/0")}
          >
            Play!
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HowToPlay;
