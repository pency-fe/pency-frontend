"use client";

import { Experimental_CssVarsProvider as CssVarsProvider, useColorScheme } from "@mui/material/styles";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { darkTheme, lightTheme, ColorScheme } from "./core";

// ----------------------------------------------------------------------
// mode
export const DEFAULT_MODE = "system";
export const MODE_STORAGE_KEY = "mode";

// ----------------------------------------------------------------------
// color-scheme
const DEFAULT_COLOR_SCHEME = "light";
export const ATTRIBUTE = "color-scheme";
export const COLOR_SCHEME_STORAGE_KEY = ATTRIBUTE;

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

type ThemeContextValue = {
  updateTheme: (theme: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState(DEFAULT_COLOR_SCHEME === "light" ? lightTheme : darkTheme);

  const updateTheme: ThemeContextValue["updateTheme"] = useCallback(
    (theme) => {
      if (theme === "light") {
        setTheme(lightTheme);
      } else {
        setTheme(darkTheme);
      }
    },
    [setTheme],
  );

  const themeContextValue: ThemeContextValue = useMemo(
    () => ({
      updateTheme,
    }),
    [updateTheme],
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <CssVarsProvider
        defaultMode={DEFAULT_MODE}
        modeStorageKey={MODE_STORAGE_KEY}
        attribute={ATTRIBUTE}
        colorSchemeStorageKey={COLOR_SCHEME_STORAGE_KEY}
        theme={theme}
      >
        {children}
      </CssVarsProvider>
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("useThemeContext must be use inside ThemeProvider");

  return context;
}

// ----------------------------------------------------------------------

function ConfigThemeProviderFunction({ children }: Props) {
  const { colorScheme } = useColorScheme();
  const { updateTheme } = useThemeContext();

  useEffect(() => {
    if (colorScheme) {
      updateTheme(colorScheme);
    }
  }, [colorScheme, updateTheme]);

  return children;
}

function withThemeProvider(Comp: typeof ConfigThemeProviderFunction) {
  const Wrapped = (props: Props) => (
    <ThemeProvider>
      <Comp {...props} />
    </ThemeProvider>
  );

  return Wrapped;
}

// ----------------------------------------------------------------------

export const ConfigThemeProvider = withThemeProvider(ConfigThemeProviderFunction);
