import type { Theme, Components } from "@mui/material/styles";

import { menuItem } from "../mixins";

// ----------------------------------------------------------------------

const MuiMenuItem: Components<Theme>["MuiMenuItem"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { root: ({ theme }) => ({ ...menuItem(theme) }) },
};

// ----------------------------------------------------------------------

export const menu = { MuiMenuItem };
