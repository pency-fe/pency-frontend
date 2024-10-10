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
import { arrayIncludes } from "@pency/util";

const baseTheme = {
  shape: { borderRadius: 8 },
  typography,
  cssVarPrefix: "",
  shouldSkipGeneratingVar,
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

function shouldSkipGeneratingVar(keys: string[], value: string | number): boolean {
  const includeGlobalKeys = ["customShadows", "palette"];

  return !arrayIncludes(includeGlobalKeys, keys[0]);
}
