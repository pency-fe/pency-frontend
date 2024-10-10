import { ThemeProvider } from "@mui/material";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { arrayIncludes, generateStorage } from "@pency/util";
import { ColorScheme, Mode } from "./types";
import { darkTheme, lightTheme } from "./core";

// ----------------------------------------------------------------------

const MODES: Mode[] = ["system", "light", "dark"] as const;
const COLOR_SCHEMES: ColorScheme[] = ["light", "dark"] as const;

// ----------------------------------------------------------------------

type ConfigThemeContextValue = {
  mode: Mode;
  colorScheme: ColorScheme;
  updateMode: (mode: Mode) => void;
  updateColorScheme: (colorScheme: ColorScheme) => void;
};

export const ConfigThemeContext = createContext<ConfigThemeContextValue | undefined>(undefined);

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ConfigThemeProvider({ children }: Props) {
  const safeLocalStorage = generateStorage();

  const initialMode = safeLocalStorage.get("mode") ?? "system";
  const initialColorScheme = safeLocalStorage.get("color-scheme") ?? "light";

  const [mode, setMode] = useState<Mode>(arrayIncludes(MODES, initialMode) ? initialMode : "system");
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    arrayIncludes(COLOR_SCHEMES, initialColorScheme) ? initialColorScheme : "light",
  );

  const updateMode: ConfigThemeContextValue["updateMode"] = useCallback(
    (mode) => {
      setMode(mode);
    },
    [setMode],
  );

  const updateColorScheme: ConfigThemeContextValue["updateColorScheme"] = useCallback(
    (colorScheme) => {
      setColorScheme(colorScheme);
    },
    [setColorScheme],
  );

  const configThemeContextValue: ConfigThemeContextValue = useMemo(
    () => ({
      mode,
      colorScheme,
      updateMode,
      updateColorScheme,
    }),
    [mode, colorScheme, updateMode, updateColorScheme],
  );

  useEffect(() => {
    safeLocalStorage.set("mode", mode);
    safeLocalStorage.set("color-scheme", colorScheme);
  }, [mode, colorScheme]);

  return (
    <ConfigThemeContext.Provider value={configThemeContextValue}>
      <ThemeProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>{children}</ThemeProvider>
    </ConfigThemeContext.Provider>
  );
}
