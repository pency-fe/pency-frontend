import {
  ColorSystemOptions,
  SupportedColorScheme,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
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
  cssVarPrefix: "",
};

const colorSchemes: Partial<Record<SupportedColorScheme, ColorSystemOptions>> = {
  light: {
    palette: lightPalette,
  },
  dark: {
    palette: darkPalette,
  },
};

export const lightTheme = extendTheme({
  ...baseTheme,
  colorSchemes,
  shadows: lightShadows,
  customShadows: lightCustomShadows,
});

export const darkTheme = extendTheme({
  ...baseTheme,
  colorSchemes,
  shadows: darkShadows,
  customShadows: darkCustomShadows,
});
