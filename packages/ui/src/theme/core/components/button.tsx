import type { ButtonProps } from "@mui/material/Button";
import type { Theme, CSSObject, Components, ComponentsVariants } from "@mui/material/styles";

import { buttonClasses } from "@mui/material/Button";
import { loadingButtonClasses } from "@mui/lab/LoadingButton";

import { stylesColorScheme, varAlpha } from "@/util";

// ----------------------------------------------------------------------

// NEW VARIANT
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

const COLORS = ["primary", "secondary", "info", "success", "warning", "error"] as const;

type ColorType = (typeof COLORS)[number];

function styleColors(ownerState: ButtonProps, styles: (val: ColorType) => CSSObject) {
  const outputStyle = COLORS.reduce((acc, color) => {
    if (!ownerState.disabled && ownerState.color === color) {
      acc = styles(color);
    }
    return acc;
  }, {});

  return outputStyle;
}

// ----------------------------------------------------------------------

const MuiButtonBase: Components<Theme>["MuiButtonBase"] = {
  /** **************************************
   * STYLE
   *************************************** */
  // styleOverrides: { root: ({ theme }) => ({ fontFamily: theme.typography.fontFamily }) },
};

// ----------------------------------------------------------------------

const softVariant: Record<string, ComponentsVariants<Theme>["MuiButton"]> = {
  base: [
    {
      props: ({ ownerState }) =>
        !ownerState.disabled && ownerState.variant === "soft" && ownerState.color === "inherit",
      style: ({ theme }) => ({
        color: theme.vars.palette.common.black,
        backgroundColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
        "&:hover": { backgroundColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.24) },
        [stylesColorScheme.dark]: {
          color: theme.vars.palette.common.white,
        },
      }),
    },
    {
      props: ({ ownerState }) => !!ownerState.disabled && ownerState.variant === "soft",
      style: ({ theme }) => ({
        [`&.${buttonClasses.disabled}`]: {
          color: theme.vars.palette.action.disabled,
          backgroundColor: theme.vars.palette.action.disabledBackground,
        },
      }),
    },
    {
      props: ({ ownerState }) => ownerState.variant === "soft",
      style: () => ({
        [`& .${loadingButtonClasses.loadingIndicatorStart}`]: { left: 14 },
        [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: { right: 14 },
        [`&.${buttonClasses.sizeSmall}`]: {
          [`& .${loadingButtonClasses.loadingIndicatorStart}`]: { left: 10 },
          [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: { right: 10 },
        },
      }),
    },
  ],
  colors: COLORS.map((color) => ({
    props: ({ ownerState }) => !ownerState.disabled && ownerState.variant === "soft" && ownerState.color === color,
    style: ({ theme }) => ({
      color: theme.vars.palette[color].dark,
      backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.16),
      "&:hover": { backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.32) },
      [stylesColorScheme.dark]: { color: theme.vars.palette[color].light },
    }),
  })),
};

const MuiButton: Components<Theme>["MuiButton"] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { color: "inherit", disableElevation: true },

  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    /**
     * @variant soft
     */
    ...[...softVariant.base!, ...softVariant.colors!],
  ],

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    /**
     * @variant contained
     */
    contained: ({ theme, ownerState }) => {
      const styled = {
        inheritColor: {
          ...(ownerState.color === "inherit" &&
            !ownerState.disabled && {
              color: theme.vars.palette.common.white,
              backgroundColor: theme.vars.palette.grey[800],
              "&:hover": {
                backgroundColor: theme.vars.palette.grey[700],
              },
              [stylesColorScheme.dark]: {
                color: theme.vars.palette.grey[800],
                backgroundColor: theme.vars.palette.common.white,
                "&:hover": { backgroundColor: theme.vars.palette.grey[400] },
              },
            }),
        },
      };
      return { ...styled.inheritColor };
    },
    /**
     * @variant outlined
     */
    outlined: ({ theme, ownerState }) => {
      const styled = {
        colors: styleColors(ownerState, (color) => ({
          borderColor: varAlpha(theme.vars.palette[color].mainChannel, 0.48),
        })),
        inheritColor: {
          ...(ownerState.color === "inherit" &&
            !ownerState.disabled && {
              color: theme.vars.palette.common.black,
              borderColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.32),
              "&:hover": { backgroundColor: theme.vars.palette.action.hover },
              [stylesColorScheme.dark]: {
                color: theme.vars.palette.common.white,
              },
            }),
        },
        base: {
          "&:hover": { borderColor: "currentColor" },
        },
      };
      return { ...styled.base, ...styled.inheritColor, ...styled.colors };
    },
    /**
     * @variant text
     */
    text: ({ ownerState, theme }) => {
      const styled = {
        inheritColor: {
          ...(ownerState.color === "inherit" &&
            !ownerState.disabled && {
              color: theme.vars.palette.common.black,
              "&:hover": { backgroundColor: theme.vars.palette.action.hover },
              [stylesColorScheme.dark]: {
                color: theme.vars.palette.common.white,
              },
            }),
        },
      };
      return { ...styled.inheritColor };
    },
    /**
     * @size
     */
    sizeSmall: ({ ownerState }) => ({
      height: 30,
      ...(ownerState.variant === "text"
        ? { paddingLeft: "4px", paddingRight: "4px" }
        : { paddingLeft: "8px", paddingRight: "8px" }),
    }),
    sizeMedium: ({ ownerState }) => ({
      ...(ownerState.variant === "text"
        ? { paddingLeft: "8px", paddingRight: "8px" }
        : { paddingLeft: "12px", paddingRight: "12px" }),
    }),
    sizeLarge: ({ ownerState }) => ({
      height: 48,
      ...(ownerState.variant === "text"
        ? { paddingLeft: "10px", paddingRight: "10px" }
        : { paddingLeft: "16px", paddingRight: "16px" }),
    }),
  },
};

// ----------------------------------------------------------------------

export const button = { MuiButtonBase, MuiButton };
