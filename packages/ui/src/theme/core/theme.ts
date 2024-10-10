import { createTheme } from "@mui/material";
import {
  darkCustomShadows,
  darkPalette,
  darkShadows,
  lightCustomShadows,
  lightPalette,
  lightShadows,
  typography,
} from "./token";

const baseTheme = {
  shape: { borderRadius: 8 },
  typography,
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: lightPalette,
  shadows: lightShadows,
  customShadows: lightCustomShadows,
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: darkPalette,
  shadows: darkShadows,
  customShadows: darkCustomShadows,
});
