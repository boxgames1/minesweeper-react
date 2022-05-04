import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type CellProps = {
  square?: string;
};

const getCellColors = (square?: string) => {
  if (square === "□") {
    return {
      borderColor: "blue",
      color: "primary",
      borderWidth: 1,
    };
  }
  return square === "*"
    ? {
        borderColor: "red",
        color: "error",
        borderWidth: 2,
      }
    : {
        borderColor: "green",
        color: "success",
        borderWidth: 2,
      };
};

export const Cell = styled(Button)<CellProps>(({ square }) => ({
  width: 30,
  height: 30,
  borderStyle: "solid",
  borderRadius: "0px !important",
  ...getCellColors(square),
}));

export const Text = styled("p")({
  fontWeight: "bold",
  margin: 0,
});

export const Row = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
