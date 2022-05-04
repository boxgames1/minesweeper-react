import Paper from "@mui/material/Paper";
import { createTheme, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

type ContentProps = {
  mapLength: number;
};

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "80%",
  height: "90%",
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: 10,
  borderColor: "transparent",
  display: "flex",
  flexDirection: "column",
}));

export const Layout = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  overflow: "hidden",
  background: "white",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const HeadText = styled("p")({
  fontWeight: "bold",
  fontSize: 32,
});

export const Header = styled("header")({
  flex: 2,
});

export const Footer = styled("footer")({
  flex: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const Message = styled("p")({
  fontSize: 20,
  fontWeight: "bold",
  color: "red",
});

export const LevelSelector = styled(FormControl)({
  maxWidth: "150px !important",
  marginBottom: "15px !important",
});

export const StartButton = styled(Button)({
  minWidth: "150px !important",
});

export const Content = styled("div")<ContentProps>(({ mapLength }) => ({
  flex: 5,
  display: "flex",
  overflow: "scroll",
  flexDirection: "column",
  margin: 30,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  ...(mapLength <= 10
    ? {
        justifyContent: "center",
        alignItems: "center",
      }
    : {}),
}));

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
