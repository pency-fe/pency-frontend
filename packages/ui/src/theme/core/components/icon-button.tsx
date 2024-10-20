import { stylesColorScheme, varAlpha } from "@/util";
import { iconButtonClasses } from "@mui/material";
import { Components, ComponentsVariants, Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

declare module "@mui/material/IconButton" {
  // eslint-disable-next-line no-unused-vars
  interface IconButtonPropsColorOverrides {
    default: false;
  }
  // eslint-disable-next-line no-unused-vars
  interface IconButtonOwnProps {
    variant?: "contained" | "outlined" | "soft" | "text";
  }
}

const COLORS = ["primary", "secondary", "info", "success", "warning", "error"] as const;

// ----------------------------------------------------------------------

const containedVariant: Record<string, ComponentsVariants<Theme>["MuiIconButton"]> = {
  base: [
    {
      props: ({ ownerState }) =>
        !ownerState.disabled && ownerState.variant === "contained" && ownerState.color === "inherit",
      style: ({ theme }) => ({
        color: theme.vars.palette.common.white,
        backgroundColor: theme.vars.palette.grey[800],
        "&:hover": { backgroundColor: theme.vars.palette.grey[700] },

        [stylesColorScheme.dark]: {
          color: theme.vars.palette.grey[800],
          backgroundColor: theme.vars.palette.common.white,
          "&:hover": { backgroundColor: theme.vars.palette.grey[400] },
        },
      }),
    },
    {
      props: ({ ownerState }) => !!ownerState.disabled && ownerState.variant === "contained",
      style: ({ theme }) => ({
        [`&.${iconButtonClasses.disabled}`]: {
          color: theme.vars.palette.action.disabled,
          backgroundColor: theme.vars.palette.action.disabledBackground,
        },
      }),
    },
  ],
  colors: COLORS.map((color) => ({
    props: ({ ownerState }) => !ownerState.disabled && ownerState.variant === "contained" && ownerState.color === color,
    style: ({ theme }) => ({
      color: theme.vars.palette[color].contrastText,
      backgroundColor: theme.vars.palette[color].main,
      "&:hover": { backgroundColor: theme.vars.palette[color].dark },
    }),
  })),
};

const softVariant: Record<string, ComponentsVariants<Theme>["MuiIconButton"]> = {
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
        [`&.${iconButtonClasses.disabled}`]: {
          color: theme.vars.palette.action.disabled,
          backgroundColor: theme.vars.palette.action.disabledBackground,
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

const outlinedVariant: Record<string, ComponentsVariants<Theme>["MuiIconButton"]> = {
  base: [
    {
      props: ({ ownerState }) => ownerState.variant === "outlined",
      style: {
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderWidth: "1px",
      },
    },
    {
      props: ({ ownerState }) =>
        !ownerState.disabled && ownerState.variant === "outlined" && ownerState.color === "inherit",
      style: ({ theme }) => ({
        color: theme.vars.palette.common.black,
        borderColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.32),
        "&:hover": { backgroundColor: theme.vars.palette.action.hover },
        [stylesColorScheme.dark]: {
          color: theme.vars.palette.common.white,
        },
      }),
    },
    {
      props: ({ ownerState }) => !!ownerState.disabled && ownerState.variant === "outlined",
      style: ({ theme }) => ({
        [`&.${iconButtonClasses.disabled}`]: {
          color: theme.vars.palette.action.disabled,
          borderColor: theme.vars.palette.action.disabledBackground,
        },
      }),
    },
  ],
  colors: COLORS.map((color) => ({
    props: ({ ownerState }) => !ownerState.disabled && ownerState.variant === "outlined" && ownerState.color === color,
    style: ({ theme }) => ({
      color: theme.vars.palette[color].main,
      borderColor: varAlpha(theme.vars.palette[color].mainChannel, 0.48),
      "&:hover": {
        backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, theme.vars.palette.action.hoverOpacity),
        borderColor: "currentColor",
      },
    }),
  })),
};

const textVariant: Record<string, ComponentsVariants<Theme>["MuiIconButton"]> = {
  base: [
    {
      props: ({ ownerState }) => ownerState.variant === "outlined",
      style: {
        backgroundColor: "transparent",
      },
    },
    {
      props: ({ ownerState }) => !!ownerState.disabled && ownerState.variant === "text",
      style: ({ theme }) => ({
        [`&.${iconButtonClasses.disabled}`]: {
          color: theme.vars.palette.action.disabled,
        },
      }),
    },
    {
      props: ({ ownerState }) =>
        !ownerState.disabled && ownerState.variant === "text" && ownerState.color === "inherit",
      style: ({ theme }) => ({
        color: theme.vars.palette.common.black,
        "&:hover": { backgroundColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.24) },
        [stylesColorScheme.dark]: {
          color: theme.vars.palette.common.white,
        },
      }),
    },
  ],
  colors: COLORS.map((color) => ({
    props: ({ ownerState }) => !ownerState.disabled && ownerState.variant === "text" && ownerState.color === color,
    style: ({ theme }) => ({
      color: theme.vars.palette[color].main,
      "&:hover": {
        backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, theme.vars.palette.action.hoverOpacity),
      },
    }),
  })),
};

// ----------------------------------------------------------------------

const MuiIconButton: Components<Theme>["MuiIconButton"] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { color: "inherit" },

  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    /**
     * @variant contained
     */
    ...[...containedVariant.base!, ...containedVariant.colors!],
    /**
     * @variant soft
     */
    ...[...softVariant.base!, ...softVariant.colors!],

    /**
     * @variant outlined
     */
    ...[...outlinedVariant.base!, ...outlinedVariant.colors!],

    /**
     * @variant text
     */
    ...[...textVariant.base!, ...textVariant.colors!],
  ],

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      transition: theme.transitions.create("background-color", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.short,
      }),
    }),
    sizeSmall: {
      width: 30,
      height: 30,
    },
    sizeMedium: {
      width: 36,
      height: 36,
    },
    sizeLarge: {
      width: 48,
      height: 48,
    },
  },
};

export const iconButton = { MuiIconButton };
