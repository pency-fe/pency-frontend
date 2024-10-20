import { stylesColorScheme, varAlpha } from "@/util";
import { CSSObject, IconButtonProps, iconButtonClasses } from "@mui/material";
import { Components, ComponentsVariants, Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    default: false;
  }
  interface IconButtonOwnProps {
    variant?: "contained" | "outlined" | "soft" | "text";
  }
}

const COLORS = ["primary", "secondary", "info", "success", "warning", "error"] as const;

// ----------------------------------------------------------------------

const containedVariant: Record<string, ComponentsVariants<Theme>["MuiIconButton"]> = {};

const outlinedVariant: Record<string, ComponentsVariants<Theme>["MuiIconButton"]> = {};

const softVariant: Record<string, ComponentsVariants<Theme>["MuiIconButton"]> = {};

const textVariant: Record<string, ComponentsVariants<Theme>["MuiIconButton"]> = {};

// ----------------------------------------------------------------------

const MuiIconButton: Components<Theme>["MuiIconButton"] = {};
