import type { Theme, Components } from "@mui/material/styles";

import { paper, stylesColorScheme, varAlpha } from "../../../util";

// ----------------------------------------------------------------------

const MuiDrawer: Components<Theme>["MuiDrawer"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    paperAnchorRight: ({ ownerState, theme }) => ({
      ...(ownerState.variant === "temporary" && {
        ...paper({ theme }),
        boxShadow: `-40px 40px 80px -8px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.24)}`,
        [stylesColorScheme.dark]: {
          boxShadow: `-40px 40px 80px -8px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
        },
      }),
    }),
    paperAnchorLeft: ({ ownerState, theme }) => ({
      ...(ownerState.variant === "temporary" && {
        ...paper({ theme }),
        boxShadow: `40px 40px 80px -8px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.24)}`,
        [stylesColorScheme.dark]: {
          boxShadow: `40px 40px 80px -8px  ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
        },
      }),
    }),
  },
};

// ----------------------------------------------------------------------

export const drawer = { MuiDrawer };
