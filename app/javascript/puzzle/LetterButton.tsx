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
  const color = required ? "primary" : "inherit";
  const borderStyle = required
    ? {}
    : { borderColor: "#ddd", borderWidth: "1.5px" };
  return (
    <Button
      disableElevation
      variant={variant}
      color={color}
      onClick={() => addToGuess(letter)}
      sx={{
        ...borderStyle,
        borderRadius: "50%",
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
