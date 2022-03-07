import { ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "",
      light: "",
      dark: "",
      contrastText: "",
    },
    secondary: {
      main: "",
      light: "",
      dark: "",
      contrastText: "",
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontWeight: 600,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
};
