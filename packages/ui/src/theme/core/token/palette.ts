import { PaletteOptions } from "@mui/material";
import { createPaletteChannel, varAlpha } from "../../../util";
import COLORS from "./colors.json";

// ----------------------------------------------------------------------

// [TODO] declare module해야 한다.

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
  mode: "light",
};

export const darkPalette: PaletteOptions = {
  ...basePalette,
  text: text.dark,
  background: background.dark,
  action: action.dark,
  mode: "dark",
};
