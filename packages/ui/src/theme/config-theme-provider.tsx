import { useMediaQuery } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { arrayIncludes, generateStorage, isClient, useIsMounted } from "@pency/util";
import { ColorScheme, Mode } from "./types";
import { darkTheme, lightTheme } from "./core";

// ----------------------------------------------------------------------

type ConfigThemeContextValue = {
  mode: Mode;
  colorScheme: ColorScheme;
  updateMode: (value: Mode) => void;
  updateColorScheme: (value: ColorScheme) => void;
};

export const ConfigThemeContext = createContext<ConfigThemeContextValue | undefined>(undefined);

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ConfigThemeProvider({ children }: Props) {
  const { mode, updateMode } = useMode();
  const { colorScheme, updateColorScheme } = useColorScheme(mode);

  const configThemeContextValue: ConfigThemeContextValue = useMemo(
    () => ({
      mode,
      colorScheme,
      updateMode,
      updateColorScheme,
    }),
    [mode, colorScheme, updateMode, updateColorScheme],
  );

  const theme = useMemo(() => {
    return colorScheme === "light" ? lightTheme : darkTheme;
  }, [colorScheme]);

  return (
    <ConfigThemeContext.Provider value={configThemeContextValue}>
      <CssVarsProvider
        defaultMode={DEFAULT_MODE}
        modeStorageKey={MODE_STORAGE_KEY}
        attribute={ATTRIBUTE}
        colorSchemeStorageKey={COLOR_SCHEME_STORAGE_KEY}
        theme={theme}
      >
        {children}
      </CssVarsProvider>
    </ConfigThemeContext.Provider>
  );
}

// ----------------------------------------------------------------------

const safeLocalStorage = generateStorage();

// ----------------------------------------------------------------------

const MODES: Mode[] = ["system", "light", "dark"] as const;
export const DEFAULT_MODE = "system";
export const MODE_STORAGE_KEY = "mode";

function useMode() {
  const [mode, setMode] = useState<Mode>(() => {
    const localStorageMode = safeLocalStorage.get(MODE_STORAGE_KEY);
    if (localStorageMode && arrayIncludes(MODES, localStorageMode)) {
      return localStorageMode;
    }
    return DEFAULT_MODE;
  });

  const updateMode: ConfigThemeContextValue["updateMode"] = useCallback(
    (value) => {
      setMode(value);
    },
    [setMode],
  );

  useEffect(() => {
    safeLocalStorage.set(MODE_STORAGE_KEY, mode);
  }, [mode]);

  return { mode, updateMode };
}

// ----------------------------------------------------------------------

export const ATTRIBUTE = "color-scheme";
export const COLOR_SCHEME_STORAGE_KEY = ATTRIBUTE;
const COLOR_SCHEMES: ColorScheme[] = ["light", "dark"] as const;
const DEFAULT_COLOR_SCHEME = "light";

function useColorScheme(mode: Mode) {
  const isMounted = useIsMounted();
  const isPreferDarkScheme = useMediaQuery("(prefers-color-scheme: dark)");

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    if (isClient()) {
      const documentColorScheme = document.documentElement.getAttribute(ATTRIBUTE);

      return arrayIncludes(COLOR_SCHEMES, documentColorScheme) ? documentColorScheme : DEFAULT_COLOR_SCHEME;
    }
    return DEFAULT_COLOR_SCHEME;
  });

  const updateColorScheme: ConfigThemeContextValue["updateColorScheme"] = useCallback(
    (colorScheme) => {
      setColorScheme(colorScheme);
    },
    [setColorScheme],
  );

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (mode === "system") {
      if (isPreferDarkScheme) {
        setColorScheme("dark");
      } else {
        setColorScheme("light");
      }
    } else {
      setColorScheme(mode);
    }
  }, [mode]);

  return { colorScheme, updateColorScheme };
}
