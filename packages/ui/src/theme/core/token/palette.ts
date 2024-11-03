import { PaletteOptions } from "@mui/material";
import { createPaletteChannel, varAlpha } from "@/util";
import COLORS from "./colors.json";

// ----------------------------------------------------------------------

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    whiteChannel: string;
    blackChannel: string;
  }

  interface TypeText {
    disabledChannel: string;
  }

  interface TypeBackground {
    neutral: string;
    neutralChannel: string;
  }

  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
    lighterChannel: string;
    darkerChannel: string;
  }

  interface PaletteColor {
    lighter: string;
    darker: string;
    lighterChannel: string;
    darkerChannel: string;
  }

  interface Palette {
    logo: {
      apple: string;
    };
  }

  interface PaletteOptions {
    logo: {
      apple: string;
    };
  }
}

declare module "@mui/material/styles" {
  interface ThemeVars {
    transitions: Theme["transitions"];
  }
}

declare module "@mui/material" {
  interface Color {
    ["50Channel"]: string;
    ["100Channel"]: string;
    ["200Channel"]: string;
    ["300Channel"]: string;
    ["400Channel"]: string;
    ["500Channel"]: string;
    ["600Channel"]: string;
    ["700Channel"]: string;
    ["800Channel"]: string;
    ["900Channel"]: string;
  }
}

// ----------------------------------------------------------------------

// Grey
export const grey = createPaletteChannel(COLORS.grey);

// Primary
export const primary = createPaletteChannel(COLORS.primary);

// Secondary
export const secondary = createPaletteChannel(COLORS.secondary);

// Info
export const info = createPaletteChannel(COLORS.info);

// Success
export const success = createPaletteChannel(COLORS.success);

// Warning
export const warning = createPaletteChannel(COLORS.warning);

// Error
export const error = createPaletteChannel(COLORS.error);

// Common
export const common = createPaletteChannel(COLORS.common);

// Text
const text = {
  light: createPaletteChannel({
    primary: grey[800]!,
    secondary: grey[600]!,
    disabled: grey[500]!,
  }),
  dark: createPaletteChannel({
    primary: "#FFFFFF",
    secondary: grey[500]!,
    disabled: grey[600]!,
  }),
};

// Background
const background = {
  light: createPaletteChannel({
    paper: "#FFFFFF",
    default: grey[200]!,
    neutral: grey[200]!,
  }),
  dark: createPaletteChannel({
    paper: grey[800]!,
    default: grey[900]!,
    neutral: "#28323D",
  }),
};

// Action
const baseAction = {
  hover: varAlpha(grey["500Channel"]!, 0.08),
  selected: varAlpha(grey["500Channel"]!, 0.16),
  focus: varAlpha(grey["500Channel"]!, 0.24),
  disabled: varAlpha(grey["500Channel"]!, 0.8),
  disabledBackground: varAlpha(grey["500Channel"]!, 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const action = {
  light: { ...baseAction, active: grey[600] },
  dark: { ...baseAction, active: grey[500] },
};

const logo = {
  light: {
    apple: "#000000",
  },
  dark: {
    apple: "#FFFFFF",
  },
};

/*
 * Base palette
 */
const basePalette = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: varAlpha(grey["500Channel"]!, 0.2),
};

export const lightPalette: PaletteOptions = {
  ...basePalette,
  text: text.light,
  background: background.light,
  action: action.light,
  logo: logo.light,
  mode: "light",
};

export const darkPalette: PaletteOptions = {
  ...basePalette,
  text: text.dark,
  background: background.dark,
  action: action.dark,
  logo: logo.dark,
  mode: "dark",
};
