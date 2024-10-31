import type { Theme, Components } from "@mui/material/styles";

// ----------------------------------------------------------------------

const MuiSvgIcon: Components<Theme>["MuiSvgIcon"] = {
  defaultProps: { fontSize: "inherit" },
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { fontSizeLarge: { width: "32px", height: "32px" } },
};

// ----------------------------------------------------------------------

export const svgIcon = { MuiSvgIcon };
