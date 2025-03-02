import type { Theme, Components } from "@mui/material/styles";

import { inputBaseClasses } from "@mui/material/InputBase";
import { filledInputClasses } from "@mui/material/FilledInput";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

import { varAlpha } from "../../../util";

// ----------------------------------------------------------------------

const MuiInputBase: Components<Theme>["MuiInputBase"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      [`&.${inputBaseClasses.disabled}`]: {
        "& svg": { color: theme.vars.palette.text.disabled },
      },
      [`& .${inputBaseClasses.input}:focus`]: {
        borderRadius: "inherit",
      },
    }),
    input: ({ theme }) => ({
      fontSize: theme.typography.pxToRem(15),
      [theme.breakpoints.down("sm")]: {
        // This will prevent zoom in Safari min font size ~ 16px
        fontSize: theme.typography.pxToRem(16),
      },
      "&::placeholder": {
        opacity: 1,
        color: theme.vars.palette.text.disabled,
      },
      "&:-webkit-autofill": {
        transitionDelay: "9999s",
        transitionProperty: "background-color, color",
      },
    }),
  },
};

// ----------------------------------------------------------------------

const MuiInput: Components<Theme>["MuiInput"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    underline: ({ theme }) => ({
      "&::before": { borderBottomColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.32) },
      "&::after": { borderBottomColor: theme.vars.palette.text.primary },
    }),
  },
};

// ----------------------------------------------------------------------

const MuiOutlinedInput: Components<Theme>["MuiOutlinedInput"] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      [`&.${outlinedInputClasses.focused}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.vars.palette.text.primary,
        },
      },
      [`&.${outlinedInputClasses.error}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.vars.palette.error.main,
        },
      },
      [`&.${outlinedInputClasses.disabled}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.vars.palette.action.disabledBackground,
        },
      },
    }),
    notchedOutline: ({ theme }) => ({
      borderColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.2),
      transition: theme.transitions.create(["border-color"], {
        duration: theme.transitions.duration.shortest,
      }),
    }),
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: "inherit !important",
        WebkitTextFillColor: "inherit !important",
        caretColor: "inherit !important",
      },
    },
  },
};

// ----------------------------------------------------------------------

const MuiFilledInput: Components<Theme>["MuiFilledInput"] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { disableUnderline: true },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius,
      backgroundColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
      "&:hover": { backgroundColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.16) },
      [`&.${filledInputClasses.focused}`]: {
        backgroundColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.16),
      },
      [`&.${filledInputClasses.error}`]: {
        backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
        [`&.${filledInputClasses.focused}`]: {
          backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.16),
        },
      },
      [`&.${filledInputClasses.disabled}`]: {
        backgroundColor: theme.vars.palette.action.disabledBackground,
      },
    }),
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: "inherit !important",
        WebkitTextFillColor: "inherit !important",
        caretColor: "inherit !important",
      },
    },
  },
};

// ----------------------------------------------------------------------

export const textfield = {
  MuiInput,
  MuiInputBase,
  MuiFilledInput,
  MuiOutlinedInput,
};
