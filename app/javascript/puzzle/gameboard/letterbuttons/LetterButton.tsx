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
  // const borderWidth = required ? {} : { borderWidth: "2px" };
  const borderWidth = required ? {} : { borderWidth: "2px" };

  return (
    <Button
      centerRipple
      disableElevation
      variant={variant}
      color={color}
      onClick={() => addToGuess(letter)}
      sx={{
        ...borderWidth,
        borderColor: "divider",
        borderRadius: "50%",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "5px",
        marginBottom: "6px",
        width: "5rem",
        height: "5rem",
      }}
    >
      {letter}
    </Button>
  );
};

export default LetterButton;
