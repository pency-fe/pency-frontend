import { createTheme } from "@mui/material";
import { lightCustomShadows, lightPalette, lightShadows, typography } from "./token";

export const themeMode = {
  modeStorageKey: "theme-mode",
  defaultMode: "system",
} as const;

export const theme = createTheme({
  palette: lightPalette,
  shadows: lightShadows,
  customShadows: lightCustomShadows,
  shape: { borderRadius: 8 },
  typography,
});
