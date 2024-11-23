import type { Theme, Components } from "@mui/material/styles";

import { menuItem } from "@/util";
import { listItemIconClasses } from "@mui/material";

// ----------------------------------------------------------------------

const MuiMenuItem: Components<Theme>["MuiMenuItem"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      ...menuItem(theme),
      minHeight: "auto",
      [`& .${listItemIconClasses.root}`]: {
        minWidth: "30px",
      },
    }),
  },
};

export const menu = { MuiMenuItem };
