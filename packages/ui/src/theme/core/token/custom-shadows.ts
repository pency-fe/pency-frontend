import { varAlpha } from "../../../util";
import { ColorScheme } from "../types";
import { grey, info, error, common, primary, success, warning, secondary } from "./palette";

// ----------------------------------------------------------------------

interface CustomShadows {
  z1?: string;
  z4?: string;
  z8?: string;
  z12?: string;
  z16?: string;
  z20?: string;
  z24?: string;
  //
  primary?: string;
  secondary?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  //
  card?: string;
  dialog?: string;
  dropdown?: string;
}

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: CustomShadows;
  }

  interface ThemeOptions {
    customShadows?: CustomShadows;
  }

  interface ThemeVars {
    customShadows: CustomShadows;
  }
}

// ----------------------------------------------------------------------

function createCustomShadows(colorScheme: ColorScheme) {
  const colorChannel = (colorScheme === "light" ? grey["500Channel"] : common.blackChannel) as string;

  return {
    z1: `0 1px 2px 0 ${varAlpha(colorChannel, 0.16)}`,
    z4: `0 4px 8px 0 ${varAlpha(colorChannel, 0.16)}`,
    z8: `0 8px 16px 0 ${varAlpha(colorChannel, 0.16)}`,
    z12: `0 12px 24px -4px ${varAlpha(colorChannel, 0.16)}`,
    z16: `0 16px 32px -4px ${varAlpha(colorChannel, 0.16)}`,
    z20: `0 20px 40px -4px ${varAlpha(colorChannel, 0.16)}`,
    z24: `0 24px 48px 0 ${varAlpha(colorChannel, 0.16)}`,
    //
    dialog: `-40px 40px 80px -8px ${varAlpha(common.blackChannel!, 0.24)}`,
    card: `0 0 2px 0 ${varAlpha(colorChannel, 0.2)}, 0 12px 24px -4px ${varAlpha(colorChannel, 0.12)}`,
    dropdown: `0 0 2px 0 ${varAlpha(colorChannel, 0.24)}, -20px 20px 40px -4px ${varAlpha(colorChannel, 0.24)}`,
    //
    primary: `0 8px 16px 0 ${varAlpha(primary.mainChannel!, 0.24)}`,
    secondary: `0 8px 16px 0 ${varAlpha(secondary.mainChannel!, 0.24)}`,
    info: `0 8px 16px 0 ${varAlpha(info.mainChannel!, 0.24)}`,
    success: `0 8px 16px 0 ${varAlpha(success.mainChannel!, 0.24)}`,
    warning: `0 8px 16px 0 ${varAlpha(warning.mainChannel!, 0.24)}`,
    error: `0 8px 16px 0 ${varAlpha(error.mainChannel!, 0.24)}`,
  };
}

export const lightCustomShadows = createCustomShadows("light");
export const darkCustomShadows = createCustomShadows("dark");
