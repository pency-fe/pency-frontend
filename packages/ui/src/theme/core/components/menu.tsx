import type { Theme, Components } from "@mui/material/styles";

import { menuItem } from "@/util";

// ----------------------------------------------------------------------

const MuiMenuItem: Components<Theme>["MuiMenuItem"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { root: ({ theme }) => ({ ...menuItem(theme), minHeight: "auto" }) },
};

// ----------------------------------------------------------------------

export const menu = { MuiMenuItem };
