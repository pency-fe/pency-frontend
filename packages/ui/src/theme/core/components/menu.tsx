import type { Theme, Components } from "@mui/material/styles";

import { menuItem } from "@/util";
import { listItemIconClasses, listItemTextClasses, svgIconClasses, typographyClasses } from "@mui/material";

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
        [`& .${svgIconClasses.root}`]: {
          fontSize: "1.25rem",
        },
      },
      [`& .${listItemTextClasses.root} .${typographyClasses.root}`]: {
        ...theme.typography.subtitle2,
      },
    }),
  },
};

export const menu = { MuiMenuItem };
