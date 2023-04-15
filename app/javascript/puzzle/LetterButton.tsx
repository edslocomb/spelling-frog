import * as React from "react";
import { Button } from "@mui/material";

interface LetterButtonProps {
  addToGuess: (letter: string) => void;
  letter: string;
  required?: boolean;
}

export const LetterButton = ({
  addToGuess,
  letter,
  required,
}: LetterButtonProps) => {
  const variant = required ? "contained" : "outlined";
  const color = required ? "secondary" : "inherit";
  const borderWidth = required ? {} : { borderWidth: "2px" };
  return (
    <Button
      disableElevation
      variant={variant}
      color={color}
      onClick={() => addToGuess(letter)}
      sx={{
        ...borderWidth,
        borderRadius: "50%",
        borderColor: "divider",
        fontSize: "25px",
        fontWeight: 700,
        marginTop: "5px",
        marginBottom: "6px",
        width: "85px",
        height: "85px",
      }}
    >
      {letter}
    </Button>
  );
};

export default LetterButton;
