import { varAlpha } from "@/util";
import type { Theme, Components } from "@mui/material/styles";

// ----------------------------------------------------------------------

const MuiLink: Components<Theme>["MuiLink"] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { underline: "hover" },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.text.secondary,
      textDecorationColor: varAlpha(theme.vars.palette.text.secondaryChannel, 0.4),
    }),
  },
};

// ----------------------------------------------------------------------

export const link = { MuiLink };
