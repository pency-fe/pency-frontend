import type { Theme, Components } from "@mui/material/styles";

// ----------------------------------------------------------------------

const MuiListItemIcon: Components<Theme>["MuiListItemIcon"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: {
      color: "inherit",
      minWidth: "auto",
      "& svg": {
        fontSize: "1.25rem",
      },
    },
  },
};

// ----------------------------------------------------------------------

const MuiListItemAvatar: Components<Theme>["MuiListItemAvatar"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { root: ({ theme }) => ({ minWidth: "auto", marginRight: theme.spacing(2) }) },
};

// ----------------------------------------------------------------------

const MuiListItemText: Components<Theme>["MuiListItemText"] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { primaryTypographyProps: { typography: "subtitle2" } },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { root: { margin: 0 }, multiline: { margin: 0 } },
};

// ----------------------------------------------------------------------

export const list = {
  MuiListItemIcon,
  MuiListItemAvatar,
  MuiListItemText,
};
