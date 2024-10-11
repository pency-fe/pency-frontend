import { Theme } from "@mui/material";
import { dividerClasses } from "@mui/material/Divider";
import { checkboxClasses } from "@mui/material/Checkbox";
import { menuItemClasses } from "@mui/material/MenuItem";
import { autocompleteClasses } from "@mui/material/Autocomplete";

/**
 * Usage:
 * ...menuItem(theme)
 */
export function menuItem(theme: Theme) {
  return {
    ...theme.typography.body2,
    padding: theme.spacing(0.75, 1),
    borderRadius: theme.shape.borderRadius * 0.75,
    "&:not(:last-of-type)": { marginBottom: 4 },
    [`&.${menuItemClasses.selected}`]: {
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.vars.palette.action.selected,
      "&:hover": { backgroundColor: theme.vars.palette.action.hover },
    },
    [`& .${checkboxClasses.root}`]: {
      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(0.5),
    },
    [`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
      backgroundColor: theme.vars.palette.action.selected,
      "&:hover": { backgroundColor: theme.vars.palette.action.hover },
    },
    [`&+.${dividerClasses.root}`]: { margin: theme.spacing(0.5, 0) },
  };
}
