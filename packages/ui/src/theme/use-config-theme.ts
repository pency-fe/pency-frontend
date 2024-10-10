import { useContext } from "react";
import { ConfigThemeContext } from "./config-theme-provider";

export function useConfigThemeContext() {
  const context = useContext(ConfigThemeContext);

  if (!context) throw new Error("useConfigThemeContext must be use inside ConfigThemeProvider");

  return context;
}
