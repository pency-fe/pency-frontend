import { maxLine } from "@/util";
import type { Theme, Components } from "@mui/material/styles";

// ----------------------------------------------------------------------

const MuiListItemButton: Components<Theme>["MuiListItemButton"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 0.75,
    }),
  },
};

// ----------------------------------------------------------------------

const MuiListItemIcon: Components<Theme>["MuiListItemIcon"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: {
      color: "inherit",
      minWidth: "44px",
    },
  },
};

// ----------------------------------------------------------------------

const MuiListItemAvatar: Components<Theme>["MuiListItemAvatar"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { root: { minWidth: "44px" } },
};

// ----------------------------------------------------------------------

const MuiListItemText: Components<Theme>["MuiListItemText"] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { primaryTypographyProps: { typography: "subtitle1" } },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { root: { margin: 0 }, multiline: { margin: 0 }, primary: { ...maxLine({ line: 1 }) } },
};

// ----------------------------------------------------------------------

export const list = {
  MuiListItemButton,
  MuiListItemIcon,
  MuiListItemAvatar,
  MuiListItemText,
};
