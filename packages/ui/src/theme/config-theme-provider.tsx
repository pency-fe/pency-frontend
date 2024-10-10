import { ThemeProvider } from "@mui/material";
import { theme } from "./core";
import { createContext } from "react";

type ConfigThemeContextValue = {
  mode: string;
  colorScheme: string;
  setMode: () => void;
  setColorScheme: () => void;
};

export const ConfigThemeContext = createContext<ConfigThemeContextValue | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function ConfigThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
